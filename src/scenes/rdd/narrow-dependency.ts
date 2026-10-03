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
      flow: 'LR',
      children: [
        {
          id: 'n-in',
          icon: 'none',
          label: 'inputs',
          pattern: 'storage',
          children: [
            { id: 'n-i0', variant: 'tile', icon: 'layers', label: '0', pattern: 'storage', sub: 'host A' },
            { id: 'n-i1', variant: 'tile', icon: 'layers', label: '1', pattern: 'storage', sub: 'host B' },
            { id: 'n-i2', variant: 'tile', icon: 'layers', label: '2', pattern: 'storage', sub: 'host C' },
          ],
        },
        {
          id: 'n-out',
          icon: 'none',
          label: 'outputs',
          pattern: 'service',
          children: [
            { id: 'n-o0', variant: 'tile', icon: 'layers', label: '0′', pattern: 'service', sub: 'host A' },
            { id: 'n-o1', variant: 'tile', icon: 'layers', label: '1′', pattern: 'service', sub: 'host B' },
            { id: 'n-o2', variant: 'tile', icon: 'layers', label: '2′', pattern: 'service', sub: 'host C' },
          ],
        },
      ],
      edges: [
        { source: 'n-i0', target: 'n-o0' },
        { source: 'n-i1', target: 'n-o1' },
        { source: 'n-i2', target: 'n-o2' },
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
