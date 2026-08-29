import type { Section } from '../types'

export const hadoop1: Section = {
  id: 'hadoop-1',
  title: 'Hadoop 1: store, then MapReduce',
  scene: 'evo-hadoop1',
  slide: `## Hadoop 1 · 2006

The first answer: store the data, then compute over it.

### Storage — HDFS
- **HDFS** — each file split into large blocks, replicated across nodes
- **NameNode** — indexes where every block lives (the metadata master)
- **DataNodes** — store the actual blocks on local disk

### Compute — MapReduce
- **MapReduce** — the batch model: *map* in parallel, then *reduce*
- **JobTracker** — one master scheduling every job
- **TaskTrackers** — run the map / reduce tasks on each node

### The catch
- One **JobTracker** did scheduling *and* resources — a bottleneck & single point of failure
- **MapReduce-only**, and heavy on disk between every step

It worked at scale — but that JobTracker was the crack Hadoop 2 would fix.`,
  narration:
    'Hadoop 1 was the first real answer, and it split the problem in two: store the data, then compute over it. On the storage side, HDFS chopped each file into large blocks and spread them, replicated, across the cluster — a NameNode kept the index of where every block lived, while the DataNodes held the blocks themselves on local disk. On the compute side, MapReduce ran the work as a batch model: map over the data in parallel, then reduce the results, with a single JobTracker scheduling every job and handing tasks to TaskTrackers on each node. It genuinely worked at scale — but that one JobTracker did both scheduling and resource management, making it a bottleneck and a single point of failure, and it only ever ran MapReduce, writing to disk between every step. That crack is exactly what Hadoop 2 set out to fix.',
}
