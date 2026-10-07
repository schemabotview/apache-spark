import type { Scene } from '@graphlearning/flow'

// §7 udf-cost — chapter 3 §5 said "a UDF is a black box to Catalyst" and left it there. This shows
// the second cost, which is the one that actually dominates: the SERIALISATION BOUNDARY. The band is
// drawn as a crossing because that is literally what happens — every row leaves the JVM, becomes a
// Python object, comes back — and drawing it makes "per row" visceral in a way a sentence does not.
//
// The ladder below is ordered by cost, cheapest first, so the reading direction is the advice. The
// middle rung is the one people do not know exists: a pandas UDF pays the boundary ONCE PER BATCH
// via Arrow rather than once per row, which is most of the speed back for the same Python.
export const udfCost: Scene = {
  id: 'udf-cost',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'crossing',
      label: 'What a Python UDF does to every single row',
      sub: 'serialise out of the JVM, run, serialise back — once for every row',
      pattern: 'group',
      icon: 'none',
      flow: 'LR',
      align: 'start',
      children: [
        { id: 'x-jvm', label: 'Executor JVM', pattern: 'service', icon: 'box', sub: 'where the row lives' },
        { id: 'x-py', label: 'Python worker', pattern: 'user', icon: 'terminal', sub: 'a separate process' },
      ],
      edges: [
        { source: 'x-jvm', target: 'x-py', bidirectional: true, label: 'per row' },
      ],
    },
    {
      id: 'ladder',
      kind: 'table',
      label: 'The ladder, cheapest first',
      sub: 'go down it only when the rung above genuinely cannot do the job',
      pattern: 'storage',
      headers: ['Option', 'Boundary cost', 'Catalyst sees'],
      values: [
        ['Built-in F.* function', 'none — stays in the JVM', 'everything'],
        ['Spark SQL expression', 'none', 'everything'],
        ['pandas UDF (Arrow)', 'once per BATCH', 'a black box'],
        ['Python UDF', 'once per ROW', 'a black box'],
      ],
    },
    { id: 'rule', label: 'Ask twice first', pattern: 'service', icon: 'circlecheck', sub: 'a built-in? or a batch?' },
  ],
  edges: [
    { source: 'crossing', target: 'ladder', label: 'and Catalyst cannot reorder, prune or push anything through the box in the middle' },
    { source: 'ladder', target: 'rule' },
  ],
}
