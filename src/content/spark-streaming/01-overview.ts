import type { Section } from '../types'

export const overview: Section = {
  id: 'overview',
  title: 'The stream is a table',
  scene: 'streaming-model',
  slide: `## The stream is a table

The one idea to hold onto: a stream is an **unbounded table** — and you query it with the *same* DataFrame/SQL you’d use on a static one.

### The dataflow, end to end
- **Sources** — Kafka, files, a socket — append new rows to an **input table** that never ends
- **Your query** runs **incrementally** — each trigger processes only what’s new
- Results land in a **result table**, written through an **output mode** to a **sink**

### What makes it tick
- A **trigger** clock decides how often to run — **micro-batch** (default) or **continuous**
- A **state store** carries aggregations across triggers — counts, joins, dedup

### Why you can trust it
- **Checkpoints** record source offsets + state → restart exactly where it left off
- Replay + idempotent sinks give **end-to-end exactly-once**`,
  narration:
    'In the last course we ended on a promise: that the structured APIs you learned — DataFrames and SQL — carry straight over to live, streaming data. This is how. And there’s really just one idea to hold onto, so hold onto it: a stream is an unbounded table. Instead of a fixed set of rows, you have a table that new data keeps getting appended to, forever — and the beautiful part is that you write exactly the same DataFrame or SQL query you’d write against a static table. Spark takes care of running it incrementally. Here’s the whole machine at a glance. On the left, sources — like Kafka, files, or a socket — append new rows to an input table that never ends. Your query reads that table, but each time it runs it only processes what’s new, and its output lands in a result table, which is written out through an output mode to a sink on the right. Driving the whole cycle from the top is a trigger — a clock that decides how often the query runs, either in small micro-batches, which is the default, or in a low-latency continuous mode. Underneath the query sits a state store, which remembers things across triggers — running counts, joins, deduplication. And holding it all up from below is durability: Spark checkpoints the source offsets and the state, so if it crashes it restarts exactly where it left off, and together with idempotent sinks that gives you end-to-end exactly-once guarantees. So it’s the same engine and the same API as batch — just pointed at data that never stops arriving. We’ll build this picture up left to right, starting with that one core idea: the unbounded table.',
}
