import type { Section } from '../types'

export const sourcesSinksSection: Section = {
  id: 'sources-sinks',
  title: 'Sources and sinks',
  scene: 'sources-sinks',
  focus: 'e2e',
  slide: `## Sources and sinks

Ignore the connector list. Two properties decide whether your pipeline is correct.

### A source must be replayable
- Recovery means re-reading from a stored offset. A source that cannot do that cannot recover
- **Kafka** replays by offset · **files** by listing · **socket** cannot, which is why it is demo-only

### A sink must be idempotent
- On recovery Spark will re-emit a batch. Whether that duplicates your data is the sink's property
- **Delta / Iceberg** are transactional · **file sinks** use a write log · **Kafka** is at-least-once

### Exactly-once is not something Spark gives you
- Spark guarantees it will **replay correctly**. That is its half of the contract
- Whether the replay duplicates output is between you and your sink
- \`foreachBatch\` hands you a real DataFrame and normal batch code — and all the responsibility`,
  narration:
    'Sources and sinks look like a connector list, and if you read them that way you will learn the names and miss the point. There are two properties that decide whether your pipeline is correct, and almost everything else is detail. The first property, for a source: can it be replayed? Think about what recovery has to mean. A machine dies mid-batch. Spark restarts, looks at its checkpoint, sees that it had committed through offset one million, and needs to read from there again. That only works if the source can be asked for data from a specific position. Kafka can — that is exactly what an offset is, and it is why Kafka is the production default. A file source can, because the checkpoint records which files were already processed and the directory listing is still there. The rate source can, because it is synthetic and deterministic. A socket source cannot: the bytes went past and they are gone. That is the real reason socket is a demo source and must never appear in production — not that it is slow or limited, but that it makes correct recovery impossible. The second property, for a sink: is writing the same thing twice harmless? Because on recovery, Spark will re-emit a batch it is not certain was committed. Delta and Iceberg are transactional, so the duplicate write is atomically replaced and you get genuine exactly-once. The built-in file sinks use a write-ahead log to the same effect. Kafka as a sink is at-least-once by default, which means a recovery can genuinely produce duplicate messages, and the standard answer is to deduplicate downstream on a business key. And foreachBatch hands you a DataFrame and lets you write it anywhere you like with ordinary batch code — which also hands you full responsibility for idempotence. Which brings me to the claim I want to be careful about, because it is widely misunderstood. People say Structured Streaming gives you exactly-once. What Spark actually guarantees is that it will replay correctly: it knows what it processed, it will not skip anything, and it will reprocess precisely what it is unsure about. That is its half of the contract. Whether a reprocessed batch results in duplicate rows in your destination is a property of the destination. Exactly-once end to end is a replayable source, plus Spark, plus an idempotent sink. Take any one of the three away and you do not have it. Next: how often the loop goes round.',
}
