import type { Scene } from '@graphlearning/flow'

// §2 scale-up-vs-out — the one real fork in the chapter, so the board is TWO PARALLEL COLUMNS read
// downward rather than a pair of pictures collapsing into one shared table. A fork drawn as a fork
// keeps the comparison in the reader's hands: each column is a complete argument — the machine, what
// adding money buys, what it costs, and what you are left holding.
//
// The cost row is the sharpest thing on the board. "$$$ → $$$$$" against "$ + $ + $ + $" says
// super-linear versus additive as a SHAPE, which is the actual difference; a sentence saying
// "super-linear" asks the reader to take it on trust.
//
// The last row is the honest one, and it is the whole rest of the course: scale-out is not simply
// better, it hands you partitioning, coordination and failure. Chapter 4 is the first, chapter 2 the
// second, chapter 8 the third — and Spark exists to take all three back.
export const scaleUpVsOut: Scene = {
  id: 'scale-up-vs-out',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'fork',
      label: 'Two shapes of "more capacity" — and they diverge all the way down',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      align: 'start',
      stretch: true,
      children: [
        {
          id: 'up',
          label: 'SCALE UP — one bigger box',
          pattern: 'service',
          icon: 'cpu',
          cols: 1,
          children: [
            {
              id: 'up-box',
              label: 'Replace the machine',
              pattern: 'group',
              icon: 'none',
              cols: 3,
              children: [
                { id: 'up-cpu', label: 'More cores', variant: 'tile', pattern: 'service', icon: 'gears' },
                { id: 'up-ram', label: 'More RAM', variant: 'tile', pattern: 'service', icon: 'memory' },
                { id: 'up-disk', label: 'Faster disk', variant: 'tile', pattern: 'storage', icon: 'harddrive' },
              ],
            },
            { id: 'up-ceiling', label: 'Bigger ceiling', pattern: 'storage', icon: 'gauge', sub: 'the biggest box on sale' },
            { id: 'up-cost', label: '$$$ → $$$$$', pattern: 'warn', icon: 'receipt', sub: 'super-linear at the top' },
            { id: 'up-own', label: 'Simple', pattern: 'service', icon: 'circlecheck', sub: 'one failure domain, nothing to split' },
          ],
        },
        {
          id: 'out',
          label: 'SCALE OUT — more ordinary boxes',
          pattern: 'network',
          icon: 'network',
          cols: 1,
          children: [
            {
              id: 'out-row',
              label: 'Add another machine, and another',
              pattern: 'group',
              icon: 'none',
              cols: 4,
              children: [
                { id: 'out-1', label: 'node', variant: 'chip', pattern: 'network', icon: 'server' },
                { id: 'out-2', label: 'node', variant: 'chip', pattern: 'network', icon: 'server' },
                { id: 'out-3', label: 'node', variant: 'chip', pattern: 'network', icon: 'server' },
                { id: 'out-4', label: 'node', variant: 'chip', pattern: 'network', icon: 'server' },
              ],
            },
            { id: 'out-ceiling', label: 'No fixed ceiling', pattern: 'storage', icon: 'gauge', sub: 'add another node' },
            { id: 'out-cost', label: '$ + $ + $ + $', pattern: 'service', icon: 'receipt', sub: 'additive, commodity parts' },
            { id: 'out-own', label: 'Your problem now', pattern: 'warn', sub: 'partition · coordinate · survive' },
          ],
        },
      ],
    },
    { id: 'price', label: 'The real price', pattern: 'user', icon: 'workflow', sub: 'is the rest of this course' },
  ],
  edges: [{ source: 'fork', target: 'price', label: 'Spark exists to take partitioning, coordination and failure back off you' }],
}
