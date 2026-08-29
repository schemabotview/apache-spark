import type { Section } from '../types'

export const lifecycle: Section = {
  id: 'lifecycle',
  title: 'The full lifecycle: one job, end to end',
  scene: 'arch-topology',
  slide: `## The full lifecycle

One trip through everything — from **submit** to a returned **result**.

### The three processes
- **Driver** — plans the work and coordinates it
- **Cluster Manager** — grants the machines
- **Executors** — run the tasks and cache the data

### One job, end to end
- You **submit** → the driver starts and asks the manager for executors
- An **action** submits a job → the DAG scheduler cuts it into **stages** at each shuffle
- Each stage → **tasks** (one per partition) → shipped to executor **slots**
- Executors run tasks **near their data**, cache what’s reused, and report back
- Stage done → next stage → job done → **result** returns to the driver

That whole loop — plan, distribute, run, repeat — running on a cluster, is Apache Spark.`,
  narration:
    'Let us put the whole machine together and follow a single job from start to finish. It begins when you submit your application: the driver process starts up, and its first act is to ask the cluster manager for resources — the manager grants machines and launches an executor on each one. Now the driver has workers. Your code, meanwhile, does nothing until you call an action; the moment you do, the driver compiles your plan into a job. Its DAG scheduler cuts that job into stages, breaking at every shuffle where data has to move across the network, and each stage becomes a set of tasks — one task per partition of the data. The task scheduler then ships those tasks down to free slots on the executors, preferring the executor that already holds each partition, so the work runs right next to its data. The executors run their tasks, cache any data you have asked to reuse, and report results back to the driver. When every task in a stage is finished, the driver launches the next stage, and it repeats — stage after stage — until the job is complete and the result comes home to the driver. That entire loop — the driver planning, the manager granting machines, the executors running tasks close to their data, stage after stage — running across a cluster, is Apache Spark. And with the runtime clear, the next course opens up the layers you actually write against: RDDs, DataFrames, Datasets, and the optimizer beneath them.',
}
