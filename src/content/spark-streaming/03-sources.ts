import type { Section } from '../types'

export const sources: Section = {
  id: 'sources',
  title: 'Sources: where the rows come from',
  scene: 'stream-sources',
  slide: `## Sources: where the rows come from

A **source** is what appends rows to the input table — and each one tracks its own **progress** so Spark can replay after a crash.

### The built-in sources
- **Kafka** — the workhorse for production streams; partitioned and replayable
- **Files** — a directory Spark watches; each new file arrives as a batch of rows
- **Socket** — a raw TCP text stream — for demos only, *not* fault-tolerant
- **Rate** — a synthetic source emitting N rows/sec — for benchmarks and examples

### Offsets = replayable progress
- Each source exposes **offsets** — how far it has read (Kafka offsets, file names)
- Spark records those offsets in the checkpoint, so after a crash it **resumes** — no rows lost

Kafka is what you’ll use in anger; the rest earn their keep in tests and demos.`,
  narration:
    'Let’s follow the data from the very left, starting with the sources — the things that actually append rows to that input table. Spark ships with a handful. By far the most important in production is Kafka: it’s a distributed, partitioned log, and crucially it’s replayable, which as we’ll see is the key to fault tolerance. Then there’s the file source, where you point Spark at a directory and every new file that lands there is picked up as a fresh batch of rows — handy for data dropped by other systems. The socket source reads a plain TCP text stream; it’s perfect for quick demos and the classic word-count example, but it can’t recover after a failure, so you never use it in production. And the rate source just generates a steady stream of synthetic rows per second — it exists purely for benchmarks and examples. Now, the property that ties every real source together is the offset. An offset is simply a marker of how far Spark has read into that source — for Kafka it’s the literal partition offsets, for the file source it’s which files have been consumed. On every trigger, Spark writes the offsets it has processed into the checkpoint. That’s what lets it survive a crash: when it restarts, it reads back the last committed offsets and resumes from exactly there, so nothing is skipped and nothing is lost. That replayability is why sources like Kafka and files are fault-tolerant while the socket source isn’t. In practice Kafka is what you’ll reach for in anger; the others earn their keep in testing and demos.',
}
