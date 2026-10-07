import type { Section } from '../types'

export const mapreduce: Section = {
  id: 'mapreduce',
  title: 'MapReduce, and where it stops',
  scene: 'mapreduce-pipeline',
  slide: `## MapReduce, and where it stops

The model that proved a cluster could be programmed by ordinary people. Spark's design is a direct reply to it.

### Two functions; the framework does the rest
- **Map** — run over each record independently, emit key/value pairs
- **Shuffle** — the framework groups every pair by key, across the network
- **Reduce** — run over all the values for one key, emit the result
- You write two functions; it handles scheduling, retries and failure

### The contract that became the problem
- A job **reads from disk and writes to disk** — not a detail, the contract
- Chaining work means chaining *jobs*, each round-tripping through the filesystem
- An algorithm needing 10 passes pays that cost **10 times**

### Four refusals, one root cause
- Iteration · interactive queries · streaming · expressiveness`,
  narration:
    'MapReduce deserves to be understood properly rather than used as a punchline, because it solved the hard problem first and Spark is a direct reply to it. Here is the model. You write two functions. The first is map: it runs over each record of your input independently and emits key-value pairs. Because every record is handled on its own, map parallelises perfectly — one task per partition, no coordination at all. The second is reduce: it receives all the values that share a given key and produces a result for that key. And between those two sits the piece you do not write, the one that does the real work: the shuffle. The framework takes every pair that map emitted, across the whole cluster, and rearranges it so all the values for one key end up together on one machine. That involves moving an enormous amount of data over the network, and getting it right is genuinely hard. The insight that made MapReduce historic is that you write two ordinary functions, and the framework handles partitioning, scheduling, failure, retries, and that entire shuffle. People who were not distributed-systems experts could suddenly process data across a thousand machines. That is not a small thing. But look at the shape of a job, and specifically at the two ends of it. A job reads its input from the distributed filesystem and writes its output back to the distributed filesystem. That is not an implementation detail you could optimise away later; it is the contract. A job\'s output is a file. And almost no real problem is one map and one reduce. Real work is a sequence — filter, then join, then aggregate, then rank — and in this model a sequence of steps means a sequence of JOBS, each one reading from disk at the start and writing to disk at the end. Every link in the chain pays a full round-trip through the filesystem, including replication. Now consider an algorithm that iterates — training a model, or computing PageRank — which might need ten or fifty passes over the same dataset. It pays that round-trip on every single pass, re-reading data that has not changed since the last one. And that single fact explains all four of the things MapReduce is bad at. Iteration, because every pass re-reads. Interactive queries, because the floor on latency is minutes when your dataflow goes through a filesystem. Streaming, because the model is batch from end to end. And expressiveness, because two primitives chained by hand is a painful way to say anything complicated. Four complaints, one root cause. Which tells you exactly what the next system had to fix.',
}
