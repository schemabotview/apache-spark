import type { Scene } from '@graphlearning/flow'

export const narrowDependency: Scene = {
  id: 'rdd-narrow',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'shape',
      label: 'Narrow — each output partition reads exactly one input',
      pattern: 'service',
      sub: 'map · filter · flatMap · mapPartitions · union — no row ever needs to know about another partition',
      cols: 3,
      children: [
        { id: 'n-a', icon: 'layers', label: 'partition 0 → 0′', pattern: 'service', sub: 'host A, start to finish' },
        { id: 'n-b', icon: 'layers', label: 'partition 1 → 1′', pattern: 'service', sub: 'host B, start to finish' },
        { id: 'n-c', icon: 'layers', label: 'partition 2 → 2′', pattern: 'service', sub: 'host C, start to finish' },
      ],
    },
    {
      id: 'gifts',
      label: 'Three things this buys, all at once',
      pattern: 'network',
      sub: 'the reason Spark works hard to keep a run of operations narrow for as long as it can',
      cols: 3,
      children: [
        { id: 'g-pipe', icon: 'workflow', label: 'pipelining', pattern: 'network', sub: 'ten narrow steps, one pass over the rows' },
        { id: 'g-local', icon: 'server', label: 'no network', pattern: 'network', sub: 'the work happens where the data is' },
        { id: 'g-cheap', icon: 'repeat', label: 'cheap recovery', pattern: 'network', sub: 'one lost partition, one parent to redo' },
      ],
    },
  ],
  edges: [{ source: 'shape', target: 'gifts' }],
}
