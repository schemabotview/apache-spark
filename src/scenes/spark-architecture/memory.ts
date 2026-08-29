import type { Scene } from '../../render-engine'

// arch-memory — the focused EXECUTOR-MEMORY band. An executor's memory isn't only for running
// tasks: it's one UNIFIED pool split into two uses. Execution memory is the scratch space a running
// task uses for shuffles, sorts, and joins; storage memory holds cached partitions for reuse — and
// each side borrows from the other when it's free (the bidirectional edge). By default Spark
// recomputes a DataFrame's whole lineage on every action; cache()/persist() keeps its partitions in
// storage memory so later actions read from memory instead of recomputing — the cache() node feeds
// the storage side. Only pays for data you actually reuse.
export const memory: Scene = {
  id: 'arch-memory',
  padding: 0.15,
  flow: 'TB',
  nodes: [
    { id: 'cache', label: 'cache() / persist()', pattern: 'network', icon: 'repeat', sub: 'keep reused partitions in memory' },
    {
      id: 'mem',
      label: 'Executor memory',
      pattern: 'storage',
      icon: 'memory',
      sub: 'one unified pool',
      flow: 'LR',
      children: [
        { id: 'exec-mem', label: 'Execution memory', pattern: 'service', icon: 'cpu', sub: 'scratch · shuffles · sorts · joins' },
        { id: 'store-mem', label: 'Storage memory', pattern: 'storage', icon: 'memory', sub: 'cached partitions · read back, not recompute' },
      ],
      edges: [{ source: 'exec-mem', target: 'store-mem', label: 'borrow when free', bidirectional: true }],
    },
  ],
  edges: [{ source: 'cache', target: 'mem', label: 'stores partitions' }],
}
