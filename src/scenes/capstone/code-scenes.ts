import type { Scene } from '../../render-engine'

// The capstone's per-stage CODE scenes — one IDE code card each, shown on the LEFT for the 11 build
// sections (the two bookends, the-plan & closer, keep the `lambda-arch` map). Each is a single
// `kind: 'code'` node whose `label` carries the stage's source; the right slide keeps the prose
// ("What's happening" + the Exercises tag). Filenames follow the batch/speed stage they build.
// NOTE: backslashes in source (e.g. spark-submit line-continuations) are escaped `\\` so the
// template literal keeps the newline.

const codeScene = (id: string, filename: string, source: string): Scene => ({
  id,
  padding: 0.16,
  nodes: [{ id: 'code', kind: 'code', label: source, filename }],
  edges: [],
})

// ── BATCH layer ──
export const capReadLake = codeScene(
  'cap-read-lake',
  'read_lake.py',
  `raw = (spark.read
    .parquet("s3://lake/events/dt=2026-08-04")   # one day's partition
    .select("ts", "user_id", "product_id", "amount", "action")
    .where(col("action") == "purchase"))         # pushed into the scan`,
)

export const capClean = codeScene(
  'cap-clean',
  'clean.py',
  `clean = (raw
    .dropDuplicates(["event_id"])       # kill at-least-once replays
    .withColumn("ts", to_timestamp("ts"))
    .withColumn("day", to_date("ts"))
    .filter(col("amount") > 0))`,
)

export const capAggregate = codeScene(
  'cap-aggregate',
  'aggregate.py',
  `rollup = (clean
    .join(products, "product_id")        # both large -> sort-merge join
    .groupBy("day", "category")
    .agg(sum("amount").alias("revenue"),
         countDistinct("user_id").alias("buyers")))`,
)

export const capWrite = codeScene(
  'cap-write',
  'write.py',
  `(rollup
    .repartition("day")                  # sane file count per day (no small-files)
    .write.mode("overwrite")
    .partitionBy("day")                  # one folder per day -> readers prune by date
    .format("delta")                     # ACID + time-travel (Parquet underneath)
    .save("s3://lake/views/revenue"))`,
)

// ── SPEED layer ──
export const capIngest = codeScene(
  'cap-ingest',
  'ingest.py',
  `events = (spark.readStream
    .format("kafka")
    .option("subscribe", "clicks")
    .load()                             # raw Kafka rows
    .select(from_json(col("value"), schema).alias("e"))
    .select("e.*"))     # -> ts, user_id, product_id, amount`,
)

export const capEnrich = codeScene(
  'cap-enrich',
  'enrich.py',
  `prod = spark.read.parquet("dim/products")   # small - fits in memory
enriched = events.join(
    broadcast(prod), "product_id")          # ship dim to every executor`,
)

export const capWindow = codeScene(
  'cap-window',
  'window.py',
  `agg = (enriched
    .withWatermark("ts", "10 minutes")
    .groupBy(window("ts", "5 minutes"), "category")
    .agg(sum("amount").alias("revenue")))`,
)

export const capRealTimeView = codeScene(
  'cap-real-time-view',
  'write_stream.py',
  `(agg.writeStream
    .outputMode("update")                     # emit only changed windows
    .option("checkpointLocation", "ckpt/speed")
    .toTable("revenue_rt")                    # the real-time view
    .start())`,
)

// ── SERVING + RUN ──
export const capServing = codeScene(
  'cap-serving',
  'serving.py',
  `batch = spark.read.parquet("s3://lake/views/revenue")
rt    = spark.table("revenue_rt")
answer = (batch.where(col("day") < today)        # accurate history
    .unionByName(rt.where(col("day") == today))  # fresh today
    .groupBy("category").agg(sum("revenue")))`,
)

export const capDeploy = codeScene(
  'cap-deploy',
  'submit.sh',
  `# streaming: long-running, driver inside the cluster
spark-submit --master yarn --deploy-mode cluster \\
  --num-executors 10 --executor-cores 4 --executor-memory 8g \\
  --conf spark.dynamicAllocation.enabled=true \\
  speed_job.py

# batch: same cluster, scheduled each night
spark-submit --master yarn --deploy-mode cluster batch_job.py`,
)

export const capTune = codeScene(
  'cap-tune',
  'tune.py',
  `spark.conf.set("spark.sql.adaptive.enabled", True)           # AQE
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", True)  # split hot keys
products.cache()                                             # reused every run
# Spark UI -> Stages -> find the shuffle-heavy / skewed stage`,
)

export const capstoneCodeScenes: Scene[] = [
  capReadLake,
  capClean,
  capAggregate,
  capWrite,
  capIngest,
  capEnrich,
  capWindow,
  capRealTimeView,
  capServing,
  capDeploy,
  capTune,
]
