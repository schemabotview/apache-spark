import type { Section } from '../types'

export const memoryCaching: Section = {
  id: 'memory-caching',
  title: 'Executor memory & caching',
  scene: 'arch-memory',
  slide: `## Memory & caching

An executor’s memory isn’t only for running tasks — it can **hold data** so Spark won’t recompute it.

### Two uses of executor memory
- **Execution memory** — scratch space for a running task (shuffles, sorts, joins)
- **Storage memory** — holds cached partitions for reuse
- One **unified pool** — each side borrows from the other when it’s free

### \`cache()\` / \`persist()\`
- By default Spark **recomputes** a DataFrame’s whole lineage on every action
- \`cache()\` keeps its partitions in memory — later actions read **from memory**
- \`persist()\` picks the level — memory, memory+disk, or serialized

### When it pays
- Big win for **reused** data — ML loops, repeated interactive queries
- Cache only what you reuse; caching a once-used dataset just wastes memory`,
  narration:
    'There’s one part of the executor we’ve been holding back on — its memory, and what it does beyond just running tasks. An executor’s memory actually serves two purposes. There’s execution memory — the scratch space a running task uses for shuffles, sorts, and joins — and there’s storage memory, which holds cached data for reuse. Modern Spark keeps these in a single unified pool, letting one side borrow from the other when it’s free. Here’s why storage memory matters: by default, Spark recomputes a DataFrame from scratch every time you run an action on it, replaying its whole lineage. If you’re going to reuse the same DataFrame again and again — an iterative machine-learning loop, or repeated interactive queries — that’s hugely wasteful. So you call cache, or persist, to tell Spark to keep that DataFrame’s partitions in the executors’ memory after the first time it’s computed; every action after that reads straight from memory instead of recomputing. Persist also lets you choose the level — pure memory, memory that spills to disk, or a serialized form that trades a little CPU for a lot of space. The rule of thumb is simple: cache what you genuinely reuse, because caching something you only touch once just wastes memory the running tasks could be using. And if memory does fill up, Spark doesn’t fall over — it spills to disk, or drops cached partitions and recomputes them from lineage when they’re next needed. It only ever gets slower, never wrong.',
}
