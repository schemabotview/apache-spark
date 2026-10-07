import type { Scene } from '@graphlearning/flow'

// §8 resources — genuine NESTING, because the claim is containment: what you ask the cluster for is
// the OUTER box, and your heap is a fraction of it that is itself divided. People size the inner
// number and are surprised when the container gets killed at the outer one.
//
// Execution and storage are drawn as one region on purpose: since 1.6 they share a pool and borrow
// from each other, which is why "I gave it enough storage" and "I gave it enough execution" are not
// separate questions any more.
export const resources: Scene = {
  id: 'resources',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'container',
      label: 'What the cluster manager actually reserves — and what gets you killed',
      pattern: 'group',
      icon: 'none',
      children: [
        {
          id: 'heap',
          label: 'spark.executor.memory — the JVM heap, and the only part you usually set',
          pattern: 'service',
          icon: 'memory',
          cols: 2,
          children: [
            { id: 'h-unified', label: 'Unified pool', pattern: 'service', icon: 'boxes', sub: 'execution and storage, borrowing from each other' },
            { id: 'h-user', label: 'User memory', pattern: 'network', icon: 'braces', sub: 'your objects, UDF state, anything you allocate' },
          ],
        },
        { id: 'overhead', label: 'memoryOverhead', pattern: 'warn', icon: 'skull', sub: 'off-heap, shuffle buffers, Python — ~10%' },
      ],
    },
    {
      id: 'shape',
      kind: 'table',
      label: 'Fat executors or thin ones',
      sub: 'the usual answer is in the middle, and for a reason',
      pattern: 'storage',
      headers: ['Shape', 'Gains', 'Loses'],
      values: [
        ['1 core × many', 'no contention', 'no broadcast sharing, many JVMs'],
        ['~5 cores each', 'the usual sweet spot', 'nothing much — start here'],
        ['32 cores × few', 'shares cache and broadcasts', 'GC pauses, HDFS throughput falls off'],
      ],
    },
    { id: 'killed', label: 'Killed, not OOM', pattern: 'warn', icon: 'ban', sub: 'overhead is outside the heap you sized' },
  ],
  edges: [
    { source: 'container', target: 'shape', label: 'the manager kills the CONTAINER on total usage, which includes the part you never set' },
    { source: 'shape', target: 'killed' },
  ],
}
