import type { Scene } from '../../render-engine'

// The capstone's per-stage CODE scenes — one IDE code card each, shown on the LEFT for the 11 build
// sections (the two bookends, the-plan & closer, keep the `lambda-arch` map). Each is a single
// `kind: 'code'` node whose `label` carries the stage's source; the right slide keeps the prose
// ("What's happening" + the Exercises tag). Filenames follow the batch/speed stage they build.
// NOTE: backslashes in source (e.g. spark-submit line-continuations) are escaped `\\` so the
// template literal keeps the newline.
//
// HOUSE RULES for these cards (they are the whole left half of a shot, for 2–3 minutes of narration):
//  · Keep every line at or under CODE_MIN_COLS (76). The card is drawn at a fixed font and scaled by
//    fitView, so a longer line widens the card and SHRINKS that scene's type — one long line is why
//    cap-write used to render 59% smaller than cap-window. Under 76 they all render identically.
//  · Aim for 14–20 lines. These cards are width-bound, so height is free up to ~30 lines: extra lines
//    cost nothing in type size, and 3-line cards leave the pane 80% empty against 300+ words of
//    narration.
//  · Earn the lines three ways — make the snippet SELF-CONTAINED (the import, the schema, or where the
//    input came from); show the API surface the NARRATION already names but never displays; and end
//    with what comes OUT (an .explain(), a printed shape, a result comment).

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
  `from pyspark.sql.functions import col

# one reader, every source — only \`format\` changes
#   parquet · orc · avro · json · csv · jdbc · delta
raw = (spark.read
    .format("parquet")
    .option("mergeSchema", "false")
    .load("s3://lake/events/dt=2026-08-04")   # one day's partition
    .select("ts", "user_id", "product_id", "amount", "action")
    .where(col("action") == "purchase"))      # pushed into the scan

# messy sources need more of the reader's surface:
#   .schema(events_schema)       skip inference, fail on drift
#   .option("mode", "failFast")  vs permissive / dropMalformed
#   .option("header", True) · .option("multiLine", True)

raw.explain()   # PushedFilters: [EqualTo(action,purchase)]`,
)

export const capClean = codeScene(
  'cap-clean',
  'clean.py',
  `from pyspark.sql.functions import col, to_date, to_timestamp

clean = (raw
    .dropDuplicates(["event_id"])       # kill at-least-once replays
    .withColumn("ts", to_timestamp("ts"))
    .withColumn("day", to_date("ts"))   # the rollup groups by this
    .filter(col("amount") > 0))         # drop nonsense rows

# nothing above has RUN. every call is a transformation, and
# transformations are LAZY — each adds a node to the logical
# plan; no row is touched until an action asks for one.
#
#   transformations  select · filter · withColumn · join · groupBy
#   actions          count · collect · show · write · save

clean.explain()      # ONE scan: our filter folded into the
                     # pushdown from read_lake.py, because
                     # Catalyst sees the whole chain at once`,
)

export const capAggregate = codeScene(
  'cap-aggregate',
  'aggregate.py',
  `from pyspark.sql.functions import countDistinct, sum

products = spark.read.parquet("dim/products")   # id -> category

rollup = (clean
    .join(products, "product_id")   # BOTH sides large in batch, so
                                    # Catalyst picks a sort-merge:
                                    # sort each side, then shuffle
    .groupBy("day", "category")     # wide -> shuffle -> new stage
    .agg(sum("amount").alias("revenue"),
         countDistinct("user_id").alias("buyers")))

# we declared WHAT, never HOW — no join hint, no partition count.
# Catalyst chose the strategy; Tungsten compiled it to bytecode.
#
# the speed layer joins this SAME table a different way, because
# there one side is tiny -> broadcast (see enrich.py)

rollup.explain()   # SortMergeJoin + Exchange hashpartitioning`,
)

export const capWrite = codeScene(
  'cap-write',
  'write.py',
  `(rollup
    .repartition("day")        # sane file count per day (no small-files)
    .write.mode("overwrite")   # append · ignore · errorIfExists
    .partitionBy("day")        # one folder per day -> readers prune it
    .format("delta")           # ACID log + time-travel, over Parquet
    .save("s3://lake/views/revenue"))

# layout knobs
#   .repartition(n)   full shuffle, exact file count
#   .coalesce(n)      fewer files, NO shuffle (can only reduce)
#   .bucketBy(n, k)   pre-sorted -> later joins skip the shuffle

# one writer, every sink — only \`format\` changes
#   delta · parquet · orc · json · csv · jdbc · kafka

# the batch view is now perfectly accurate — and exactly as
# stale as the last nightly run. that gap is the speed layer.`,
)

// ── SPEED layer ──
export const capIngest = codeScene(
  'cap-ingest',
  'ingest.py',
  `from pyspark.sql.functions import col, from_json

events = (spark.readStream
    .format("kafka")
    .option("subscribe", "clicks")
    .option("startingOffsets", "latest")     # "earliest" to replay
    .option("maxOffsetsPerTrigger", 500000)  # a backlog can't swamp
    .load()                                  # raw Kafka rows
    .select(from_json(col("value"), schema).alias("e"))
    .select("e.*"))     # -> ts, user_id, product_id, amount

# an UNBOUNDED input table: rows append forever, and we get to
# treat it exactly like a static DataFrame.

# Kafka earns its place twice over:
#   offsets REPLAYABLE   -> rewind on crash, lose nothing
#   topics PARTITIONED   -> the read scales across executors

# same readStream, other sources: file dir · socket · rate`,
)

export const capEnrich = codeScene(
  'cap-enrich',
  'enrich.py',
  `from pyspark.sql.functions import broadcast

prod = spark.read.parquet("dim/products")   # small - fits in memory

enriched = events.join(
    broadcast(prod), "product_id")          # ship dim to every executor

# the SAME table and the SAME join API as the batch layer — a
# different plan, because the SHAPE of the data is different:
#
#   batch   both sides large  -> sort-merge  -> shuffle
#   speed   one side tiny     -> broadcast   -> NO shuffle
#
# every shuffle costs latency a stream cannot afford, which
# makes broadcast the highest-leverage join fix in Spark.

# Spark also broadcasts on its own under this threshold:
spark.conf.get("spark.sql.autoBroadcastJoinThreshold")   # 10MB

enriched.explain()   # BroadcastHashJoin — and no Exchange`,
)

export const capWindow = codeScene(
  'cap-window',
  'window.py',
  `from pyspark.sql.functions import sum, window

agg = (enriched
    .withWatermark("ts", "10 minutes")   # tolerate this much lateness
    .groupBy(window("ts", "5 minutes"), "category")
    .agg(sum("amount").alias("revenue")))

# bucketed by EVENT time — when the purchase happened, never
# when it reached Spark. a 10:04 event arriving at 10:09 still
# lands in the 10:00-10:05 window.

# what the watermark buys:
#   later than 10 min   -> dropped, not silently mis-bucketed
#   watermark past end  -> window final, its STATE EVICTED
#                          (the only thing bounding memory
#                           on a stream that never ends)

# those running totals live in the state store between triggers
# and are CHECKPOINTED — a restart resumes mid-window, intact.`,
)

export const capRealTimeView = codeScene(
  'cap-real-time-view',
  'write_stream.py',
  `(agg.writeStream
    .outputMode("update")                    # only changed windows
    .option("checkpointLocation", "ckpt/speed")
    .toTable("revenue_rt")                   # the real-time view
    .start())

# output modes
#   append    only rows that are final and will never change
#   complete  rewrite the entire result table every trigger
#   update    emit just what changed          <- ours

# the checkpoint IS the fault-tolerance story: on every trigger
# Spark durably records the Kafka OFFSETS consumed and the
# window STATE, so a crash resumes at exactly that point.
#   nothing lost + nothing double-counted = exactly-once

# same writeStream, other sinks:
#   kafka · files · console (debug) · foreachBatch (anything)`,
)

// ── SERVING + RUN ──
export const capServing = codeScene(
  'cap-serving',
  'serving.py',
  `from pyspark.sql.functions import col, sum

batch = spark.read.parquet("s3://lake/views/revenue")   # accurate
rt    = spark.table("revenue_rt")                       # fresh

answer = (batch.where(col("day") < today)        # history: batch
    .unionByName(rt.where(col("day") == today))  # today: speed
    .groupBy("category")
    .agg(sum("revenue").alias("revenue")))

# unionByName lines the columns up BY NAME — plain union()
# stacks by POSITION and would silently mis-map a reordered
# schema.

# the Lambda division of labour, in one query:
#   batch layer    owns CORRECTNESS (complete, deduplicated)
#   speed layer    owns LATENCY     (seconds fresh, partial)
#   serving layer  owns THE ANSWER  (both of them, merged)

answer.show()   # revenue by category, accurate AND up to now`,
)

export const capDeploy = codeScene(
  'cap-deploy',
  'submit.sh',
  `# streaming: runs forever, so the DRIVER lives in the cluster
# (client mode would tie it to your laptop staying open)
spark-submit --master yarn --deploy-mode cluster \\
  --num-executors 10 --executor-cores 4 --executor-memory 8g \\
  --conf spark.dynamicAllocation.enabled=false \\
  speed_job.py

# batch: same cluster, nightly, hands executors back when idle
spark-submit --master yarn --deploy-mode cluster \\
  --conf spark.dynamicAllocation.enabled=true \\
  --conf spark.dynamicAllocation.minExecutors=2 \\
  --conf spark.dynamicAllocation.maxExecutors=20 \\
  batch_job.py

# 10 executors x 4 cores = 40 task slots running at once
# --master also takes: k8s://... · spark://... · local[*]`,
)

export const capTune = codeScene(
  'cap-tune',
  'tune.py',
  `# always start here: Spark UI -> Stages
#   slow stage?             look at its shuffle read / write
#   one task 10x the rest?  that is SKEW, not bad luck

# AQE (Spark 3): stop trusting the compile-time plan — re-plan
# at runtime from the partition sizes actually observed
spark.conf.set("spark.sql.adaptive.enabled", True)
spark.conf.set("spark.sql.adaptive.coalescePartitions.enabled", True)
spark.conf.set("spark.sql.adaptive.skewJoin.enabled", True)

#   coalescePartitions  200 tiny shuffle parts -> a sensible few
#   skewJoin            split the hot key's oversized partition
#                       so one straggler can't hold the stage
#   AQE can even switch sort-merge -> broadcast mid-flight

products.cache()   # re-read on every batch run — cache it once
# Spark UI -> Storage tab confirms the reuse`,
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
