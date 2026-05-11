import time

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

print("defaultParallelism :", sc.defaultParallelism)

# ---------- Create RDD ----------
txn_rdd = sc.parallelize(txns, numSlices=4)
print("partitions         :", txn_rdd.getNumPartitions())
print("count              :", txn_rdd.count())

# ---------- Transformations + actions (narrow chain) ----------
approved = (
    txn_rdd
    .filter(lambda t: t[5] == "APPROVED")
    .map(lambda t: (t[3], t[4]))
)
print("take(3)            :", approved.take(3))
print("first              :", approved.first())
print("count approved     :", approved.count())

# ---------- flatMap, distinct, countByValue ----------
chars = txn_rdd.flatMap(lambda t: list(t[3]))
print("flatMap sample     :", chars.take(8))

categories = txn_rdd.map(lambda t: t[3]).distinct()
print("distinct categories:", sorted(categories.collect()))
print("countByValue       :", txn_rdd.map(lambda t: t[3]).countByValue())

# ---------- reduce — total approved amount ----------
total = (
    txn_rdd
    .filter(lambda t: t[5] == "APPROVED")
    .map(lambda t: t[4])
    .reduce(lambda a, b: a + b)
)
print("total approved $   :", total)

# ---------- Lineage: narrow vs wide ----------
narrow = txn_rdd.map(lambda t: (t[3], t[4])).filter(lambda kv: kv[1] > 1000)
print("--- narrow lineage ---")
print(narrow.toDebugString().decode())

wide = txn_rdd.map(lambda t: (t[3], t[4])).reduceByKey(lambda a, b: a + b)
print("--- wide lineage ---")
print(wide.toDebugString().decode())

# ---------- Pair RDDs: reduceByKey vs groupByKey ----------
pairs = txn_rdd.filter(lambda t: t[5] == "APPROVED").map(lambda t: (t[3], t[4]))

sums_reduce = pairs.reduceByKey(lambda a, b: a + b).sortByKey()
sums_group = pairs.groupByKey().mapValues(sum).sortByKey()
print("reduceByKey sums   :", sums_reduce.collect())
print("groupByKey  sums   :", sums_group.collect())

counts_per_cat = (
    pairs.mapValues(lambda _: 1).reduceByKey(lambda a, b: a + b).sortByKey()
)
print("count per category :", counts_per_cat.collect())

# ---------- Caching: timing comparison ----------
def expensive_pipeline():
    return (
        sc.parallelize(range(5_000_000), numSlices=4)
        .map(lambda x: (x, x * x))
        .filter(lambda kv: kv[1] % 7 == 0)
    )

uncached = expensive_pipeline()
t0 = time.perf_counter()
uncached.count()
uncached.count()
print(f"no cache           : {time.perf_counter() - t0:.2f}s")

cached = expensive_pipeline().cache()
t0 = time.perf_counter()
cached.count()  # materializes
cached.count()  # hits memory
print(f"cache              : {time.perf_counter() - t0:.2f}s")
cached.unpersist()

# ---------- mapPartitions, repartition, coalesce ----------
def annotate(it):
    items = list(it)
    return [(len(items), x[0]) for x in items]   # (partition_size, transaction_id)


annotated = txn_rdd.mapPartitions(annotate)
print("annotated sample   :", annotated.take(4))
print("before repartition :", txn_rdd.getNumPartitions())
print("after  repartition :", txn_rdd.repartition(8).getNumPartitions())
print("after  coalesce(2) :", txn_rdd.coalesce(2).getNumPartitions())

# ---------- Broadcast + accumulator ----------
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
print("tagged sample      :", tagged.take(5))
print("high-value count   :", high_value_count.value)

b_tier.unpersist()
spark.stop()
