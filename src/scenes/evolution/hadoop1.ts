import type { Scene } from '../../render-engine'

// §3 evo-hadoop1 — Hadoop 1 split the problem in two: STORE (HDFS), then COMPUTE (MapReduce).
// HDFS = a NameNode indexing where every block lives + DataNodes holding the blocks. MapReduce =
// one JobTracker scheduling every job + TaskTrackers running map/reduce tasks. The catch (the warn
// callout) is that single JobTracker doing both scheduling AND resources — the bottleneck Hadoop 2
// fixes. Two subsystems side by side inside the era container, then the limitation beneath.
export const hadoop1: Scene = {
  id: 'evo-hadoop1',
  padding: 0.14,
  nodes: [
    {
      id: 'h1',
      label: 'Hadoop 1 · 2006',
      pattern: 'group',
      sub: 'store, then compute',
      cols: 2,
      children: [
        {
          id: 'hdfs',
          label: 'HDFS',
          pattern: 'storage',
          icon: 'database',
          sub: 'storage',
          flow: 'LR',
          children: [
            { id: 'namenode', label: 'NameNode', pattern: 'network', sub: 'block index' },
            { id: 'datanodes', label: 'DataNodes', pattern: 'storage', icon: 'server', sub: 'hold the blocks' },
          ],
          edges: [{ source: 'namenode', target: 'datanodes' }],
        },
        {
          id: 'mapreduce',
          label: 'MapReduce',
          pattern: 'service',
          icon: 'gears',
          sub: 'compute',
          flow: 'LR',
          children: [
            { id: 'jobtracker', label: 'JobTracker', pattern: 'network', icon: 'workflow', sub: 'schedules jobs' },
            { id: 'tasktrackers', label: 'TaskTrackers', pattern: 'external', sub: 'run map / reduce' },
          ],
          edges: [{ source: 'jobtracker', target: 'tasktrackers' }],
        },
      ],
    },
    {
      id: 'limit',
      label: 'One JobTracker = scheduling + resources',
      pattern: 'warn',
      sub: 'bottleneck · MapReduce-only · disk-heavy',
    },
  ],
  edges: [{ source: 'h1', target: 'limit' }],
}
