import type { Section } from '../types'

export const spark1: Section = {
  id: 'spark-1',
  title: 'Spark 1: in-memory RDDs',
  scene: 'evo-spark1',
  slide: `## Spark 1 · 2014

An in-memory engine, running on YARN.

### The insight
- MapReduce wrote to **disk between every step** — murder for iterative work
- Keep the working data **in memory** across steps instead

### Spark 1's pieces
- **Driver** — builds the job and coordinates it
- **RDDs** — distributed datasets held **in memory** between steps
- **DAG scheduler** — pipelines stages instead of round-tripping to disk

### The payoff
- Runs **on YARN** (or standalone / Mesos) — no cluster of its own
- **10–100×** faster for iterative & interactive work

But every workload still meant hand-writing RDD code — Spark 2 would fix that.`,
  narration:
    'Spark was the engine that walked through YARN’s open door, and its key insight was about disk. MapReduce wrote everything to disk between every step, which was murder for iterative jobs that pass over the same data again and again — so Spark’s answer was to keep the working data in memory instead. A Driver builds the job as a graph of RDDs — distributed datasets held in memory across steps — and a DAG scheduler pipelines those stages together rather than round-tripping to disk between each one. Running on YARN like any other application, and needing no cluster of its own, it came out ten to a hundred times faster for the iterative and interactive work MapReduce struggled with. The one rough edge: every workload still meant hand-writing low-level RDD code — and that is exactly what Spark 2 would smooth over.',
}
