import type { Section } from '../types'

export const rddFoundation: Section = {
  id: 'rdd-foundation',
  title: 'RDD: the low-level core',
  scene: 'api-rdd',
  slide: `## RDD — the low-level core

Start at the bottom: the **RDD** — *Resilient Distributed Dataset* — the original Spark abstraction everything else compiles down to.

### What an RDD is
- **Distributed collection** — your data split into **partitions** across the cluster
- **Immutable** — a transformation makes a *new* RDD; you never edit one in place
- **Resilient** — Spark tracks each RDD’s **lineage**, so a lost partition is *recomputed*, not lost

### How you work with it
- **Transformations** (\`map\`, \`filter\`, \`flatMap\`) — **lazy**; they just extend the lineage
- **Actions** (\`count\`, \`collect\`, \`reduce\`) — trigger the actual computation
- Purely functional — and *you* hand-control partitioning and placement

### The trade-off
- **Total control** — any data type, any logic, tuned by hand
- But **opaque to the optimizer** — Spark sees your lambdas, not your *intent*, so it can’t optimize for you`,
  narration:
    'We start at the very bottom of the stack, with the RDD — the Resilient Distributed Dataset. This was Spark’s original abstraction, the one we met back in the evolution course, and everything higher up eventually compiles down to it. So what is it? At heart, an RDD is just a distributed collection: your data split into partitions and spread across the executors of the cluster. Two properties make it special. First, it’s immutable — you never modify an RDD in place; every transformation produces a brand-new one. And second, it’s resilient, which is where the name comes from: Spark remembers the exact chain of steps that built each RDD — its lineage — so if a partition is lost when a machine dies, Spark simply recomputes that piece from the lineage instead of failing. You work with it in two kinds of operation. Transformations, like map, filter, and flatMap, are lazy — calling one doesn’t compute anything, it just extends the lineage graph. It’s only an action, like count, collect, or reduce, that actually triggers the work. It’s a purely functional model, and it hands you enormous control: any data type you like, any logic you can write, and manual say over how data is partitioned and placed. But that control is exactly the catch. Because you hand Spark arbitrary lambdas, the engine can’t see what you’re trying to do — it sees opaque functions, not your intent — so it can’t optimize the plan for you; whatever tuning happens is on you. And that blind spot is precisely the problem the structured APIs, one layer up, were built to solve.',
}
