from delta import configure_spark_with_delta_pip
from pyspark.sql import SparkSession

builder = (SparkSession.builder
           .appName("BankPractice")
           .master("local[*]")
           .config("spark.sql.shuffle.partitions", "4")
           .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension")
           .config("spark.sql.catalog.spark_catalog", "org.apache.spark.sql.delta.catalog.DeltaCatalog"))

spark = configure_spark_with_delta_pip(builder).getOrCreate()

print(spark.version)
print(spark.conf.get("spark.sql.shuffle.partitions"))
print(spark.conf.get("spark.sql.extensions"))
print(spark.conf.get("spark.sql.catalog.spark_catalog"))

# display executor count
print(spark.sparkContext.defaultParallelism)

spark.stop()