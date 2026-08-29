import type { Section } from '../types'

export const sinks: Section = {
  id: 'sinks',
  title: 'Sinks: where results land',
  scene: 'stream-sinks',
  slide: `## Sinks: where results land

A **sink** is the destination for the result stream — and the sink’s guarantees decide your **end-to-end** correctness.

### The built-in sinks
- **Kafka** — publish the result stream downstream; the production default
- **Files** — write Parquet / JSON to a directory; append-only, partitioned
- **Console** — print each batch to stdout — for debugging
- **Foreach / ForeachBatch** — custom logic per row or per batch — write *anywhere*

### Delivery guarantees
- Replayable source + checkpointed progress → the same data is re-processed after a crash
- If the sink is **idempotent** or transactional (like files), that becomes **exactly-once**

Replay handles the input; an idempotent sink handles the output — together, exactly-once.`,
  narration:
    'At the far right of the pipeline sit the sinks — the destinations where your results are written. As with sources, Spark gives you a set to choose from. The Kafka sink publishes your result stream back out to another topic, so downstream systems can consume it — that’s the common production choice. The file sink writes results as Parquet or JSON into a directory, append-only and partitioned, which is great for building up a data lake. The console sink just prints each batch to standard out, which is invaluable while you’re developing. And the most flexible option, foreachBatch — and its per-row cousin foreach — hands you each micro-batch as an ordinary DataFrame and lets you run any code you like, so you can write to a database, an API, or any store that doesn’t have a built-in connector. But here’s the part that really matters about sinks: they’re where your end-to-end correctness guarantee is ultimately decided. Remember that replayable sources plus checkpointing mean that, after a crash, Spark will re-process some data — it guarantees at-least-once by design. To turn that into exactly-once, the sink has to cooperate: it needs to be idempotent, so that writing the same result twice has the same effect as writing it once, or transactional, like the file sink, which commits a batch atomically so a replayed batch doesn’t duplicate. When that’s true, the replay on the input side and the idempotence on the output side line up, and the whole pipeline delivers exactly-once. So think of it as two halves of one guarantee — replay protects the input, an idempotent sink protects the output — and we’ll see the machinery that makes it hold in a couple of sections.',
}
