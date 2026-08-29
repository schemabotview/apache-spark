import type { Section } from '../types'

export const spark2: Section = {
  id: 'spark-2',
  title: 'Spark 2: the unified engine',
  scene: 'evo-spark2',
  slide: `## Spark 2 · 2016

One engine for every workload.

### The insight
- Raw **RDD code** was low-level and hand-optimized
- Declare *what* you want — let the engine work out *how*

### Structured, optimized APIs
- **SparkSession** — one entry point to everything
- **DataFrames / Datasets** — structured, typed APIs over your data
- **Catalyst** — a query optimizer that plans your logic for you

### Speed & reach
- **Tungsten** — codegen + off-heap memory for raw speed
- **Structured Streaming** — the same API, now over streams

The result: one engine for batch · SQL · ML · streaming — the Spark we use today.`,
  narration:
    'Spark 2 turned that engine into a unified platform, and it started from the frustration with Spark 1: writing raw RDD code was low-level and had to be hand-optimized. So Spark 2 flipped the model — you declare what you want, and the engine works out how. A single SparkSession is now the one entry point, fronting DataFrames and Datasets: structured, typed APIs over your data. Behind them, the Catalyst optimizer plans your query for you, and Tungsten compiles that plan down to tight, off-heap code for raw speed. Structured Streaming then brought the very same API to streaming data. The result is one engine that covers batch, SQL, machine learning, and streaming — and that is the Spark we use today.',
}
