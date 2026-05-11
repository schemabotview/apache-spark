from delta import configure_spark_with_delta_pip
from pyspark.sql import SparkSession

builder = (
    SparkSession.builder
    .appName("BankPractice")
    .master("local[*]")
    .config("spark.sql.shuffle.partitions", "4")
    .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension")
    .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog")
)

spark = configure_spark_with_delta_pip(builder).getOrCreate()
spark.sparkContext.setLogLevel("ERROR")

# ---------- Session sanity checks ----------
print("version            :", spark.version)
print("shuffle partitions :", spark.conf.get("spark.sql.shuffle.partitions"))
print("sql extensions     :", spark.conf.get("spark.sql.extensions"))
print("spark catalog      :", spark.conf.get("spark.sql.catalog.spark_catalog"))
print("defaultParallelism :", spark.sparkContext.defaultParallelism)

# ---------- In-memory DataFrame ----------
data = [
    ("CUST0001", "Aarav Sharma",  "Mumbai",    780),
    ("CUST0002", "Priya Nair",    "Delhi",     650),
    ("CUST0003", "Rohan Gupta",   "Bengaluru", 720),
    ("CUST0004", "Anjali Mehta",  "Pune",      810),
    ("CUST0005", "Vikram Reddy",  "Hyderabad", 590),
]
columns = ["customer_id", "full_name", "city", "credit_score"]
df = spark.createDataFrame(data, columns)

# ---------- Lazy evaluation — transformations build the plan, no work yet ----------
high_credit = (
    df.filter(df.credit_score >= 700)
      .select("customer_id", "full_name", "credit_score")
)
print("transformations defined — nothing has executed yet")

# ---------- explain — inspect the physical plan ----------
high_credit.explain()

# ---------- show — the action that triggers execution ----------
high_credit.show()

# ---------- SQL view + GROUP BY ----------
df.createOrReplaceTempView("customers")

spark.sql("""
    SELECT city,
           COUNT(*)                    AS num_customers,
           ROUND(AVG(credit_score), 0) AS avg_credit_score
    FROM customers
    GROUP BY city
    ORDER BY avg_credit_score DESC
""").show()

spark.stop()
