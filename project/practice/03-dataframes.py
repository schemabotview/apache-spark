from decimal import Decimal

import pandas as pd
from delta import configure_spark_with_delta_pip
from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    coalesce,
    col,
    desc,
    expr,
    lit,
    sum as spark_sum,
    upper,
    when,
)
from pyspark.sql.types import (
    BooleanType,
    DecimalType,
    DoubleType,
    StringType,
    StructField,
    StructType,
)

builder = (
    SparkSession.builder
    .appName("DataFramesPractice")
    .master("local[*]")
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension")
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog")
)
spark = configure_spark_with_delta_pip(builder).getOrCreate()
spark.sparkContext.setLogLevel("ERROR")

print("version            :", spark.version)
print("AQE enabled        :", spark.conf.get("spark.sql.adaptive.enabled"))
print("shuffle partitions :", spark.conf.get("spark.sql.shuffle.partitions"))
print("databases          :", [db.name for db in spark.catalog.listDatabases()])

# ---------- Schema: StructType vs DDL string ----------
txn_schema_struct = StructType([
    StructField("transaction_id",    StringType(),       nullable=False),
    StructField("card_id",           StringType(),       nullable=False),
    StructField("customer_id",       StringType(),       nullable=False),
    StructField("merchant_category", StringType()),
    StructField("amount",            DecimalType(18, 2), nullable=False),
    StructField("status",            StringType()),
    StructField("is_flagged",        BooleanType()),
])

txn_schema_ddl = (
    "transaction_id STRING NOT NULL, card_id STRING NOT NULL, customer_id STRING NOT NULL, "
    "merchant_category STRING, amount DECIMAL(18,2) NOT NULL, status STRING, is_flagged BOOLEAN"
)
print("schema simpleString:", txn_schema_struct.simpleString())

# ---------- Creating DataFrames — four ways ----------
data = [
    ("T0001", "C001", "CUST001", "Groceries",     Decimal("1200.00"),  "APPROVED", False),
    ("T0002", "C002", "CUST002", "Travel",        Decimal("18500.00"), "APPROVED", False),
    ("T0003", "C001", "CUST001", "Food",          Decimal("450.00"),   "APPROVED", False),
    ("T0004", "C003", "CUST003", "Shopping",      Decimal("6700.00"),  "APPROVED", True),
    ("T0005", "C002", "CUST002", "Fuel",          Decimal("2800.00"),  "DECLINED", False),
    ("T0006", "C001", "CUST001", "Entertainment", Decimal("1100.00"),  "APPROVED", False),
    ("T0007", "C004", "CUST004", "Travel",        Decimal("42000.00"), "APPROVED", True),
    ("T0008", "C003", "CUST003", "Groceries",     Decimal("1850.00"),  "APPROVED", False),
]

df = spark.createDataFrame(data, schema=txn_schema_struct)
df_inferred = spark.createDataFrame(
    data,
    ["transaction_id", "card_id", "customer_id", "merchant_category",
     "amount", "status", "is_flagged"],
)
df_range = spark.range(0, 5).toDF("idx")
df_from_pandas = spark.createDataFrame(
    pd.DataFrame({"category": ["Food", "Travel"], "weight": [0.3, 0.7]})
)

print("explicit  :", df.count(), "rows")
print("inferred  :", df_inferred.count(), "rows")
print("range     :", df_range.count(), "rows")
print("pandas    :", df_from_pandas.count(), "rows")

# ---------- Exploring a DataFrame ----------
print("rows x cols :", df.count(), "x", len(df.columns))
print("columns     :", df.columns)
print("dtypes      :", df.dtypes)
df.printSchema()
df.show(3, truncate=False)
df.select("amount").describe().show()
df.select("amount").summary().show()

# ---------- Column references — four styles ----------
df.select("merchant_category", "amount").show(3)
df.select(col("merchant_category"), col("amount")).show(3)
df.select(df["merchant_category"], df["amount"]).show(3)
df.selectExpr("merchant_category", "amount * 0.02 AS fee").show(3)

# col() shines when building expressions
df.select(col("amount"), (col("amount") * 0.02).alias("processing_fee")).show(3)
# expr() — SQL-style snippet
df.select(expr("amount * 0.02 AS processing_fee")).show(3)

# ---------- Select / project ----------
df.select("transaction_id", "merchant_category", "amount").show(3)
df.selectExpr("transaction_id", "merchant_category", "amount * 0.02 AS fee").show(3)

# ---------- Add / rename / drop ----------
df_with = (
    df
    .withColumn("amount_double", col("amount").cast(DoubleType()))
    .withColumn("status",        upper(col("status")))
    .withColumn("tier",          when(col("amount") > 10000, "HIGH").otherwise("STANDARD"))
    .withColumnRenamed("merchant_category", "category")
    .drop("is_flagged")
)
df_with.show(3, truncate=False)

# ---------- Filter — parenthesize each condition (Python precedence) ----------
df.filter((col("status") == "APPROVED") & (col("amount") > 1000)).show(3)
df.where(col("status") != "APPROVED").show(3)
df.filter(col("merchant_category").isin("Travel", "Shopping")).show(3)
df.filter(~col("merchant_category").isin("Travel", "Shopping")).show(3)

# ---------- Nulls ----------
df_nullable = df.withColumn(
    "merchant_category",
    when(col("transaction_id") == "T0005", lit(None)).otherwise(col("merchant_category")),
)
df_nullable.filter(col("merchant_category").isNull()).show()
df_nullable.filter(col("merchant_category").isNotNull()).show(3)
df_nullable.fillna({"merchant_category": "UNKNOWN"}).show(3)
df_nullable.select(
    coalesce(col("merchant_category"), lit("UNKNOWN")).alias("category")
).show(3)
df_nullable.dropna(subset=["merchant_category"]).show(3)

# ---------- Cast / sort / dedupe ----------
df.select(col("amount").cast(DoubleType()).alias("amount_double")).show(3)
df.orderBy(desc("amount")).show(3)
df.select("merchant_category").distinct().show()
df.dropDuplicates(["card_id"]).show(3)

# ---------- Interop: pandas + RDD ----------
small_pdf = df.filter(col("status") == "APPROVED").limit(3).toPandas()
print(type(small_pdf))
print(small_pdf)

first_row = df.rdd.first()
print(type(first_row))
print("merchant_category :", first_row["merchant_category"])
print("amount            :", first_row.amount)

# ==========================================================================
# EXECUTION MODEL
# ==========================================================================

# ---------- Lazy evaluation — transformations build the plan, no work runs ----------
import time

t0 = time.perf_counter()
lazy_chain = (
    df
    .filter(col("status") == "APPROVED")
    .withColumn("fee", col("amount") * 0.02)
    .select("transaction_id", "merchant_category", "amount", "fee")
    .orderBy(desc("amount"))
)
print(f"transformations defined in {time.perf_counter() - t0:.4f}s — no job ran")

t0 = time.perf_counter()
lazy_chain.count()  # action — this is what triggers execution
print(f"action (.count()) executed in {time.perf_counter() - t0:.4f}s — job ran here")

# ---------- The four Catalyst plans (parsed → analyzed → optimized → physical) ----------
query = (
    df
    .filter(col("status") == "APPROVED")
    .groupBy("merchant_category")
    .agg(spark_sum("amount").alias("total_amount"))
)

print("=" * 70, "\nextended — all four Catalyst plans\n", "=" * 70, sep="")
query.explain(extended=True)
# Look for: predicate pushdown, projection pruning, * (N) WholeStageCodegen markers

# ---------- explain() modes ----------
print("=" * 70, "\nsimple — physical plan only\n", "=" * 70, sep="")
query.explain()

print("=" * 70, "\nformatted — physical plan + operator details\n", "=" * 70, sep="")
query.explain(mode="formatted")

print("=" * 70, "\ncost — optimized plan with row-count estimates\n", "=" * 70, sep="")
query.explain(mode="cost")

# ---------- Tungsten — whole-stage codegen (look for `*(N) WholeStageCodegen`) ----------
print("=" * 70, "\ncodegen — generated JVM code per stage (head only)\n", "=" * 70, sep="")
# codegen output is large; capture and print only the first ~30 lines
import io
import contextlib

buf = io.StringIO()
with contextlib.redirect_stdout(buf):
    query.explain(mode="codegen")
print("\n".join(buf.getvalue().splitlines()[:30]))
print("... (truncated)")

# ---------- Adaptive Query Execution (AQE) — runtime re-optimization ----------
spark.conf.set("spark.sql.adaptive.enabled", "true")
aqe_on = (
    df
    .filter(col("status") == "APPROVED")
    .groupBy("merchant_category")
    .agg(spark_sum("amount").alias("total_amount"))
)
aqe_on.collect()  # AQE only kicks in once a real action triggers post-shuffle stats
print("AQE on  : output partitions =", aqe_on.rdd.getNumPartitions())

spark.conf.set("spark.sql.adaptive.enabled", "false")
aqe_off = (
    df
    .filter(col("status") == "APPROVED")
    .groupBy("merchant_category")
    .agg(spark_sum("amount").alias("total_amount"))
)
aqe_off.collect()
print("AQE off : output partitions =", aqe_off.rdd.getNumPartitions())
print("  (without AQE, this would be spark.sql.shuffle.partitions =",
      spark.conf.get("spark.sql.shuffle.partitions"), ")")

spark.conf.set("spark.sql.adaptive.enabled", "true")
spark.stop()
