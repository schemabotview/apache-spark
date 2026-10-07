import type { Section } from '../types'

export const theDag: Section = {
  id: 'the-dag',
  title: 'How the DAG gets built',
  scene: 'dag-construction',
  slide: `## How the DAG gets built

Before running a single line, Spark turns your calls into a graph — and that graph is what it optimises and schedules.

### From four lines to a set of stages
- **Your calls** — \`read\`, \`filter\`, \`groupBy\`, \`write\`
- **A lineage graph** — every result records which dataset it came from, and how
- **A DAG** — directed and *acyclic*, because nothing can depend on its own output
- **Stages** — the DAG cut at every wide dependency

### Reading the example
- One \`groupBy\` in those four lines, so exactly **one cut**, so exactly **two stages**
- You can do this by eye before you ever open the UI

### Why *acyclic* earns its letter
- A lost partition has a **finite** derivation to replay — the replay always terminates
- This is what makes lineage-based recovery possible at all`,
  narration:
    'So what is Spark actually doing while you type? Look at the four lines on the board: read a parquet file, filter it, group by country and count, write the result. Before executing a single one of them, Spark turns those calls into a graph, and that graph is what it optimises and schedules. It happens in four moves. First, your calls — just the methods you invoked, in order. Second, those become a lineage graph: every result Spark hands you records which dataset it came from and what operation produced it. Big knows it came from orders via a filter. By country knows it came from big via a groupBy. Nothing is computed, but the derivation is written down. Third, that lineage graph is a DAG — a directed acyclic graph. Directed because the relationships point one way, from parent to child. Acyclic because nothing can ever depend on its own output: each operation produces a new dataset rather than mutating an old one, so a cycle is not expressible. And fourth, Spark cuts that DAG into stages, at exactly the places we identified in the last section: every wide dependency. Now apply that to the example by eye. Read is narrow. Filter is narrow. GroupBy is wide. Write is narrow. One wide operation means exactly one cut, which means exactly two stages: everything up to and including the shuffle write, then everything after the shuffle read. You just predicted the execution plan without running anything or opening the UI, and that is the skill this chapter exists to give you. One last point, about that word acyclic, because it is not pedantry — it is load-bearing. Remember from chapter one that Spark recovers from failure by recomputing lost partitions from their lineage rather than by replicating data. That only works if the derivation is finite. If the graph could contain a cycle, replaying a lost partition might never terminate, and the entire fault-tolerance model would collapse. Acyclicity is the property that makes recomputation a safe strategy. So Spark has a graph, it has stages, it knows the task counts. And yet, on a real cluster, absolutely nothing has happened yet. That is the last piece.',
}
