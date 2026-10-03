import type { Scene } from '@graphlearning/flow'

export const wideDependency: Scene = {
  id: 'rdd-wide',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'shape',
      label: 'Wide — an output partition needs rows from many inputs',
      pattern: 'network',
      sub: 'groupByKey · reduceByKey · join · distinct · sortBy — every input can contribute to every output',
      flow: 'LR',
      children: [
        {
          id: 'w-in',
          icon: 'none',
          label: 'inputs',
          pattern: 'storage',
          children: [
            { id: 'w-i0', variant: 'tile', icon: 'layers', label: '0', pattern: 'storage' },
            { id: 'w-i1', variant: 'tile', icon: 'layers', label: '1', pattern: 'storage' },
            { id: 'w-i2', variant: 'tile', icon: 'layers', label: '2', pattern: 'storage' },
          ],
        },
        {
          id: 'w-out',
          icon: 'none',
          label: 'outputs',
          pattern: 'warn',
          children: [
            { id: 'w-o0', variant: 'tile', icon: 'layers', label: '0′', pattern: 'warn' },
            { id: 'w-o1', variant: 'tile', icon: 'layers', label: '1′', pattern: 'warn' },
            { id: 'w-o2', variant: 'tile', icon: 'layers', label: '2′', pattern: 'warn' },
          ],
        },
      ],
      edges: [
        { source: 'w-i0', target: 'w-o0' },
        { source: 'w-i0', target: 'w-o2' },
        { source: 'w-i1', target: 'w-o0' },
        { source: 'w-i1', target: 'w-o1' },
        { source: 'w-i2', target: 'w-o1' },
        { source: 'w-i2', target: 'w-o2' },
      ],
    },
    {
      id: 'costs',
      label: 'Everything narrow gave you, taken back',
      pattern: 'warn',
      sub: 'one wide dependency undoes all three gifts at once — which is why the count of them is the cost of the job',
      cols: 3,
      children: [
        { id: 'c-pipe', label: 'pipelining ends', pattern: 'warn', sub: 'a stage boundary, here' },
        { id: 'c-net', label: 'the network', pattern: 'warn', sub: 'written to disk, then fetched' },
        { id: 'c-redo', label: 'recovery is costly', pattern: 'warn', sub: 'one lost partition, MANY parents' },
      ],
    },
  ],
  edges: [{ source: 'shape', target: 'costs' }],
}
