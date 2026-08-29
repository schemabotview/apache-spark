import type { Section } from '../types'

export const closer: Section = {
  id: 'closer',
  title: 'Everything, end to end',
  scene: 'lambda-arch',
  slide: `## Everything, end to end

One pipeline, every concept — the whole Spark journey, running.

### What we built
- **Batch layer** — read → clean → join → aggregate → partitioned write (accurate)
- **Speed layer** — readStream → enrich → window → write (seconds fresh)
- **Serving** — merge the two into one answer; **deployed** and **tuned** on a cluster

### Every course, exercised
- **evolution** → the engine we stand on · **architecture** → how it runs on the cluster
- **api** → DataFrames, joins, Catalyst/Tungsten · **streaming** → the whole speed layer
- filled inline: data sources · partitioning · broadcast joins · deploy/ops · **AQE**

From the road that built Spark to a real system running on a cluster — that’s Apache Spark, end to end.`,
  narration:
    'Let’s pull all the way back and take in the whole thing, lit up at once. On the left, the batch layer: it reads the day from the lake, cleans and deduplicates it, joins in product details and aggregates, and writes a partitioned, accurate view — our source of truth. On the right, the speed layer: it reads the live stream from Kafka, enriches it with a broadcast join, aggregates it in event-time windows under a watermark, and writes a checkpointed, exactly-once real-time view. Below, the serving layer merges the two — accurate history plus the fresh present — into a single answer, and the whole system runs on a cluster, submitted, configured, and tuned in the Spark UI. And look at what this one project touched. The evolution course gave us the engine we’re standing on. The architecture course is right there in how these jobs run — drivers, executors, stages, shuffles, deploy modes. The API course is in every line — DataFrames, joins, Catalyst planning the sort-merge and the broadcast, Tungsten running them. The streaming course is the entire speed layer, from the unbounded table to watermarks to exactly-once. And the gaps we hadn’t covered — data sources and pushdown, partitioning, broadcast joins, deployment, and adaptive execution — we filled right here, in context, because a real pipeline needs them. That’s the arc of this whole series: from the road that led to Spark, through how a job runs, up the layers you write, out to streaming, and finally into one real, end-to-end system. That is Apache Spark.',
}
