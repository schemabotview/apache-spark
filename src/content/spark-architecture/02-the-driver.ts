import type { Section } from '../types'

export const theDriver: Section = {
  id: 'the-driver',
  title: 'The driver: your program',
  scene: 'arch-driver',
  slide: `## The Driver

The driver is **your program** — it turns your code into a plan and runs the whole show.

### The entry point
- **SparkSession** — the one object you create; your handle to the entire cluster
- Underneath it sits the lower-level **SparkContext** — the original core

### It builds the plan
- **DAG Scheduler** — turns your transformations into a graph of **stages**
- **Task Scheduler** — breaks each stage into **tasks** and hands them out

### It stays in charge
- **Tracks every executor** — heartbeats, progress, and results
- The single coordinator — if the driver dies, the whole application dies

But the driver owns **no machines** of its own — for those it must ask the cluster manager.`,
  narration:
    'Everything starts with the driver — the process that runs your program. When you write a Spark application, the very first thing you create is a SparkSession: a single object that acts as your handle to the whole cluster. Underneath it sits the older, lower-level SparkContext — the original core — but SparkSession is the entry point you actually touch. From your code, the driver builds a plan in two steps. The DAG scheduler turns your chain of transformations into a graph of stages, and then the task scheduler breaks each stage into individual tasks and hands them out to be run. Once work is in flight, the driver stays firmly in charge: it tracks every executor through heartbeats, watches their progress, and collects their results. It is the single coordinator for the whole application, which also means it is a single point of failure — if the driver dies, the application dies with it. But notice what the driver does not have: any machines of its own to run those tasks on. For that, it has to ask the cluster manager — and that is where we go next.',
}
