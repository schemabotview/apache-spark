import type { Scene } from '@graphlearning/flow'

export const arrow: Scene = {
  id: 'pyb-arrow',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'insight',
      framed: true,
      label: 'Not a faster pickle',
      pattern: 'service',
      icon: 'star',
      sub: 'agree on ONE layout both sides read — stop converting',
    },
    {
      id: 'arrow',
      label: 'Apache Arrow — a columnar format neither side has to translate',
      pattern: 'storage',
      sub: 'the JVM writes an Arrow batch; pandas and NumPy read that same memory · spark.sql.execution.arrow.pyspark.enabled',
      cols: 3,
      children: [
        { id: 'a-col', icon: 'table', label: 'columnar, not row-wise', pattern: 'service', sub: 'a column at a time' },
        { id: 'a-batch', icon: 'package', label: 'batched', pattern: 'service', sub: '10,000 rows, not one' },
        { id: 'a-shared', icon: 'share', label: 'one layout, both sides', pattern: 'service', sub: 'no per-row conversion' },
      ],
    },
    {
      id: 'effect',
      label: 'What changes',
      pattern: 'service',
      sub: 'the transport cost stops scaling with your row count and starts scaling with your batch count',
      cols: 2,
      children: [
        { id: 'e-amortise', icon: 'swap', label: 'one crossing per 10k rows', pattern: 'service', sub: 'not one per row' },
        { id: 'e-vector', icon: 'sigma', label: 'and your code vectorises', pattern: 'service', sub: 'NumPy on a whole column' },
      ],
    },
  ],
  edges: [
    { source: 'insight', target: 'arrow' },
    { source: 'arrow', target: 'effect' },
  ],
}
