import type { Scene } from '../../render-engine'

// arch-executors — the focused EXECUTORS band. When the cluster manager grants resources it
// launches an executor on each worker node, and an executor is simply a long-lived JVM: it stays up
// for the whole application, reused across jobs. Inside it, the cores it was given become SLOTS —
// its task capacity: one slot runs one task (one partition) at a time, so total slots across all
// executors = how many tasks run at once = your parallelism. Executors heartbeat the driver and
// return results (the bidirectional edge). The cache half of executor memory is deliberately left
// out here — it's the whole subject of the later `memory-caching` section. Driver collapsed to a
// pointer; the three workers with their slots are the focus.
export const executors: Scene = {
  id: 'arch-executors',
  padding: 0.15,
  flow: 'TB',
  nodes: [
    { id: 'driver', label: 'Driver', pattern: 'network', icon: 'terminal', sub: 'ships tasks · collects results' },
    {
      id: 'workers',
      label: 'Worker Nodes',
      pattern: 'group',
      sub: 'total slots = tasks at once = parallelism',
      cols: 3,
      children: [
        {
          id: 'w1', label: 'Worker Node', pattern: 'group', children: [
            { id: 'w1-exec', label: 'Executor', pattern: 'service', icon: 'box', sub: 'JVM · long-lived' },
            { id: 'w1-s1', label: 'slot', pattern: 'service', icon: 'gears', sub: 'core → one task' },
            { id: 'w1-s2', label: 'slot', pattern: 'service', icon: 'gears', sub: 'core → one task' },
          ],
        },
        {
          id: 'w2', label: 'Worker Node', pattern: 'group', children: [
            { id: 'w2-exec', label: 'Executor', pattern: 'service', icon: 'box', sub: 'JVM · long-lived' },
            { id: 'w2-s1', label: 'slot', pattern: 'service', icon: 'gears', sub: 'core → one task' },
            { id: 'w2-s2', label: 'slot', pattern: 'service', icon: 'gears', sub: 'core → one task' },
          ],
        },
        {
          id: 'w3', label: 'Worker Node', pattern: 'group', children: [
            { id: 'w3-exec', label: 'Executor', pattern: 'service', icon: 'box', sub: 'JVM · long-lived' },
            { id: 'w3-s1', label: 'slot', pattern: 'service', icon: 'gears', sub: 'core → one task' },
            { id: 'w3-s2', label: 'slot', pattern: 'service', icon: 'gears', sub: 'core → one task' },
          ],
        },
      ],
    },
  ],
  edges: [{ source: 'driver', target: 'workers', label: 'tasks ↓ · heartbeats ↑', bidirectional: true }],
}
