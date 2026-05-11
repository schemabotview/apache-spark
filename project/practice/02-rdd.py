from pyspark.sql import SparkSession

txns = [
    ("T0001", "C001", "CUST001", "Groceries",      1200.00, "APPROVED"),
    ("T0002", "C002", "CUST002", "Travel",        18500.00, "APPROVED"),
    ("T0003", "C001", "CUST001", "Food",             450.00, "APPROVED"),
    ("T0004", "C003", "CUST003", "Shopping",        6700.00, "APPROVED"),
    ("T0005", "C002", "CUST002", "Fuel",            2800.00, "DECLINED"),
    ("T0006", "C001", "CUST001", "Entertainment",   1100.00, "APPROVED"),
    ("T0007", "C004", "CUST004", "Travel",        42000.00, "APPROVED"),
    ("T0008", "C003", "CUST003", "Groceries",       1850.00, "APPROVED"),
    ("T0009", "C005", "CUST005", "Shopping",        3200.00, "APPROVED"),
    ("T0010", "C002", "CUST002", "Food",              780.00, "APPROVED"),
    ("T0011", "C001", "CUST001", "Fuel",            3500.00, "APPROVED"),
    ("T0012", "C004", "CUST004", "Groceries",       2400.00, "APPROVED"),
]

spark = (
    SparkSession.builder
    .appName("Practice")
    .master("local[*]")
    .getOrCreate()
)
spark.sparkContext.setLogLevel("ERROR")
sc = spark.sparkContext

txn_rdd = sc.parallelize(txns, numSlices=4)


def annotate(it):
    items = list(it)
    return [(len(items), x[0]) for x in items]   # (partition_size, transaction_id)


annotated = txn_rdd.mapPartitions(annotate)
print("annotated sample   :", annotated.take(4))

print("before repartition :", txn_rdd.getNumPartitions())
print("after  repartition :", txn_rdd.repartition(8).getNumPartitions())
print("after  coalesce(2) :", txn_rdd.coalesce(2).getNumPartitions())

category_tier = {
    "Groceries":     "essential",
    "Fuel":          "essential",
    "Food":          "lifestyle",
    "Entertainment": "lifestyle",
    "Shopping":      "discretionary",
    "Travel":        "discretionary",
}
b_tier = sc.broadcast(category_tier)

high_value_count = sc.accumulator(0)


def tag(t):
    txn_id, _, _, category, amount, _ = t
    if amount > 10000:
        high_value_count.add(1)
    return (txn_id, category, b_tier.value.get(category, "unknown"), amount)


tagged = txn_rdd.map(tag)
print(tagged.foreach(print))
print("high-value transactions:", high_value_count.value)

b_tier.unpersist()
spark.stop()
