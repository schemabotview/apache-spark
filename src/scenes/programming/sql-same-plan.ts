import type { Scene } from '@graphlearning/flow'

// §6 sql-same-plan — the section exists for exactly one claim, so the scene makes exactly one: these
// two programs are not similar, they are THE SAME. Two code cards side by side converging on one
// node is the only shape that says that; a table comparing them would imply a difference to weigh.
//
// It matters practically. It means the DataFrame-versus-SQL argument is about who is reading the
// code, not about speed — and it means a SQL-fluent analyst is already a Spark developer.
//
// ONLY TWO THINGS ON THE BOARD, and the snippets are STACKED rather than side by side. Both choices
// serve one goal: making the code big enough to actually read, in a section whose entire argument is
// "read these two and see that they are the same".
//
// fitView scales a board to whichever axis binds first. Side by side the pair measured ~880px wide
// against ~200 tall, so it scaled to WIDTH, left the bottom half of the pane empty, and the code
// stayed small anyway. Stacked, the board is taller than it is wide, scales to HEIGHT, and the
// snippets roughly double. A third band (the "API composes / SQL is universal" contrast) made it
// worse again and now lives in the slide verbatim, where it costs nothing. The comparison survives
// the rotation: one snippet above the other still reads as "these two are the same thing".
export const sqlSamePlan: Scene = {
  id: 'sql-same-plan',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'both',
      label: 'Two spellings of one query',
      pattern: 'group',
      icon: 'none',
      cols: 1,
      align: 'start',
      children: [
        {
          id: 'api',
          kind: 'code',
          filename: 'dataframe.py',
          label: [
            'orders',
            '  .filter(F.col("total") > 100)',
            '  .groupBy("country")',
            '  .agg(F.sum("total").alias("rev"))',
          ].join('\n'),
        },
        {
          id: 'sql',
          kind: 'code',
          filename: 'query.sql',
          label: [
            'orders.createOrReplaceTempView("orders")',
            '',
            'SELECT country, sum(total) AS rev',
            'FROM orders WHERE total > 100',
            'GROUP BY country',
          ].join('\n'),
        },
      ],
    },
    { id: 'plan', label: 'One plan', pattern: 'service', icon: 'brain', sub: 'Catalyst sees no difference' },
  ],
  edges: [
    { source: 'both', target: 'plan', label: 'a temp view is a NAME for a DataFrame — nothing is copied, nothing is stored' },
  ],
}
