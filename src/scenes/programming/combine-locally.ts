import type { Scene } from '@graphlearning/flow'

// §3 combine-locally — the classic, and the first section in the course where the reader can make a
// job ten times faster by changing one word. Two columns, the fork grammar, because the whole lesson
// is that two operations with the same RESULT have wildly different costs.
//
// The chips are what carry it. groupByKey's parent row ships every raw pair across the network, so
// its chips are the individual records; reduceByKey combines on the machine first, so its chips are
// already-summed partials and there are far fewer of them. The reader counts chips and has the
// answer before reading a word — which is the only reason to draw this rather than assert it.
export const combineLocally: Scene = {
  id: 'combine-locally',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'same',
      kind: 'code',
      filename: 'wordcount.py',
      label: [
        '# identical results, wildly different cost',
        'pairs.groupByKey().mapValues(sum)   # ships every pair',
        'pairs.reduceByKey(lambda a, b: a+b) # combines first',
      ].join('\n'),
    },
    {
      id: 'compare',
      label: 'What actually crosses the network',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      align: 'start',
      stretch: true,
      children: [
        {
          id: 'g',
          label: 'groupByKey',
          sub: 'every raw record is shuffled',
          pattern: 'warn',
          icon: 'swap',
          cols: 1,
          children: [
            {
              id: 'g-out',
              label: 'Sent over the wire',
              pattern: 'group',
              icon: 'none',
              cols: 3,
              children: [
                { id: 'g1', label: 'a,1', variant: 'chip', pattern: 'warn', icon: 'none' },
                { id: 'g2', label: 'a,1', variant: 'chip', pattern: 'warn', icon: 'none' },
                { id: 'g3', label: 'a,1', variant: 'chip', pattern: 'warn', icon: 'none' },
                { id: 'g4', label: 'b,1', variant: 'chip', pattern: 'warn', icon: 'none' },
                { id: 'g5', label: 'b,1', variant: 'chip', pattern: 'warn', icon: 'none' },
                { id: 'g6', label: 'a,1', variant: 'chip', pattern: 'warn', icon: 'none' },
              ],
            },
          ],
        },
        {
          id: 'r',
          label: 'reduceByKey',
          sub: 'each machine sums its own first',
          pattern: 'service',
          icon: 'sigma',
          cols: 1,
          children: [
            {
              id: 'r-out',
              label: 'Sent over the wire',
              pattern: 'group',
              icon: 'none',
              cols: 3,
              children: [
                { id: 'r1', label: 'a,4', variant: 'chip', pattern: 'service', icon: 'none' },
                { id: 'r2', label: 'b,2', variant: 'chip', pattern: 'service', icon: 'none' },
              ],
            },
          ],
        },
      ],
    },
    { id: 'rule', label: 'Combine first', pattern: 'storage', icon: 'funnel', sub: 'the cheapest row is never sent' },
  ],
  edges: [
    { source: 'same', target: 'compare', label: 'same answer, six records against two' },
    { source: 'compare', target: 'rule' },
  ],
}
