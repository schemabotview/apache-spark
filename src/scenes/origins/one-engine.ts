import type { Scene } from '@graphlearning/flow'

// §6 — one engine. The zoo from §4, collapsed. Same subject, opposite shape, on purpose.
export const oneEngine: Scene = {
  id: 'origins-one-engine',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'libs',
      label: 'The libraries you choose between',
      pattern: 'network',
      sub: 'each one replaces a whole engine from the zoo — and they compose, because they share the layer below',
      cols: 3,
      children: [
        { id: 'l-sql', icon: 'database', label: 'Spark SQL', pattern: 'network', sub: 'replaces Hive and Impala' },
        { id: 'l-stream', icon: 'waves', label: 'Structured Streaming', pattern: 'network', sub: 'replaces Storm' },
        { id: 'l-ml', icon: 'brain', label: 'MLlib', pattern: 'network', sub: 'replaces Mahout' },
        { id: 'l-graph', icon: 'share', label: 'GraphX', pattern: 'network', sub: 'replaces Giraph' },
      ],
    },
    {
      id: 'core',
      framed: true,
      label: 'One core engine',
      pattern: 'service',
      icon: 'cpu',
      sub: 'all four compile to the same DAG of tasks',
    },
    {
      id: 'payoff',
      label: 'Why sharing the layer below is the whole point',
      pattern: 'service',
      sub: 'a SQL read feeding an ML model is one plan, not two systems handing files to each other',
      cols: 2,
      children: [
        { id: 'p-nodisk', icon: 'memory', label: 'no disk at the borders', pattern: 'service', sub: 'the handoff stays in memory' },
        { id: 'p-opt', icon: 'gears', label: 'optimized across them', pattern: 'service', sub: 'a filter can move into the scan' },
      ],
    },
  ],
  edges: [
    { source: 'libs', target: 'core' },
    { source: 'core', target: 'payoff' },
  ],
}
