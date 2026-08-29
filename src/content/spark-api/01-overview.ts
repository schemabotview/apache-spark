import type { Section } from '../types'

export const overview: Section = {
  id: 'overview',
  title: 'The layers you write against',
  scene: 'api-stack',
  slide: `## The layers you write against

Spark is a **stack of altitudes** — write high or write low, it all compiles to the **same core**.

### The altitude ladder — high-level on top
- **Structured APIs** — DataFrame, Dataset, Spark SQL: declare *what* you want
- **The engine** — **Catalyst** plans your query, **Tungsten** compiles it to fast code
- **RDD** — the low-level core: resilient, partitioned; the layer it *physically* runs on

### One rule underneath it all
- Every structured query becomes a **plan** → optimized → executed as **RDDs**
- Drop to raw RDDs and you **skip the optimizer** — full control, but you tune it yourself

### On top: the workloads
- **Structured Streaming · MLlib · GraphX** — libraries that all ride this same core
- Each is its own course; here we build the **foundation** they stand on

We’ll start at the bottom — the RDD core — then climb to what you actually write.`,
  narration:
    'Before we climb through it, here’s the whole stack at a glance. The big idea of this course is that Spark isn’t one API — it’s a stack of altitudes, and you get to choose the height you work at. Near the top sit the structured APIs: DataFrame, Dataset, and Spark SQL. These are declarative — you say what result you want, not how to compute it. Beneath them is the engine that makes that possible: Catalyst, which plans and optimizes your query, and Tungsten, which compiles that plan down into tight, fast code. And at the very bottom is the RDD — the low-level core: a resilient, partitioned, distributed collection, and the physical layer that everything ultimately runs on. That’s the one rule tying the whole stack together: no matter which structured API you write, it becomes a plan, gets optimized, and is executed as RDDs — the exact same core the machines ran in the last course. You can also drop straight down to raw RDDs yourself, which skips the optimizer entirely — that gives you total control, but now the tuning is on you. And resting on top of this whole foundation are the workloads — Structured Streaming, MLlib, GraphX — libraries that all ride this same core, each its own course later; here we’re building the foundation they stand on. We’ll walk it bottom to top: start at the RDD core, then climb up to the structured APIs you actually write, and finally look inside the engine that connects them.',
}
