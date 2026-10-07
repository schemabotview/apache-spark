import type { Scene } from '@graphlearning/flow'

// §3 where-the-filter-goes — chapter 3 §2 catalogued the verbs; this is the craft of ordering them,
// and the one ordering decision that actually changes the answer rather than just the cost.
//
// Two columns, the fork grammar: the SAME two words in different places produce different numbers.
// Filtering before the aggregate removes rows from it; filtering after removes whole groups from the
// result. In SQL those are WHERE and HAVING and the language forces you to pick; in the DataFrame API
// both are spelled `.filter`, which is why people write one and mean the other.
export const whereTheFilterGoes: Scene = {
  id: 'where-the-filter-goes',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'fork',
      label: 'The same word, two positions, two different answers',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      align: 'start',
      stretch: true,
      children: [
        {
          id: 'before',
          label: 'Filter BEFORE the aggregate',
          sub: 'SQL calls this WHERE',
          pattern: 'service',
          icon: 'funnel',
          cols: 1,
          children: [
            { id: 'b-what', label: 'Drops rows', pattern: 'service', icon: 'circlecheck', sub: 'from the input to the sum' },
            { id: 'b-eg', label: 'Orders over £100', pattern: 'storage', icon: 'scale', sub: 'revenue from big orders only' },
            { id: 'b-cost', label: 'Always cheaper', pattern: 'storage', icon: 'zap', sub: 'fewer rows reach the shuffle' },
          ],
        },
        {
          id: 'after',
          label: 'Filter AFTER the aggregate',
          sub: 'SQL calls this HAVING',
          pattern: 'network',
          icon: 'funnel',
          cols: 1,
          children: [
            { id: 'a-what', label: 'Drops groups', pattern: 'network', icon: 'circleslash', sub: 'from the finished result' },
            { id: 'a-eg', label: 'Countries over £1m', pattern: 'storage', icon: 'scale', sub: 'every order counted first' },
            { id: 'a-cost', label: 'Cannot be moved', pattern: 'warn', sub: 'it needs the total to exist' },
          ],
        },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'aggregate.py',
      label: [
        'by_country = (orders',
        '    .filter(F.col("total") > 100)          # WHERE  — rows',
        '    .groupBy("country")',
        '    .agg(F.sum("total").alias("rev"),',
        '         F.countDistinct("customer_id").alias("buyers"))',
        '    .filter(F.col("rev") > 1_000_000))     # HAVING — groups',
      ].join('\n'),
    },
  ],
  edges: [{ source: 'fork', target: 'code', label: 'both are `.filter` in the DataFrame API — only the position tells them apart' }],
}
