import type { Scene } from '@graphlearning/flow'

// §5 columns-and-functions — a CODE card, because a Column is a thing you write and a diagram of one
// is a box saying "Column". The snippet is built so the reader sees the key weirdness: `col("total")`
// evaluates to an EXPRESSION, not a value, which is why `df.total > 100` produces something you can
// print rather than True or False.
//
// The band is families rather than a function list. There are hundreds of built-ins and listing them
// is a reference page's job; knowing there are five shelves to look on is what a reader can hold.
export const columnsAndFunctions: Scene = {
  id: 'columns-and-functions',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'columns.py',
      label: [
        'from pyspark.sql import functions as F',
        '',
        'df.total > 100          # not True/False — an EXPRESSION',
        '',
        'orders.select(',
        '    F.col("order_id"),',
        '    F.upper("country").alias("country"),',
        '    (F.col("total") * 1.2).alias("gross"),',
        '    F.year("placed_at").alias("yr"),',
        ').filter(F.col("total") > 100)',
      ].join('\n'),
    },
    {
      id: 'families',
      label: 'Five shelves to look on — there are hundreds of built-ins, and you import them all as F',
      pattern: 'group',
      icon: 'none',
      cols: 5,
      children: [
        { id: 'f-str', label: 'String', variant: 'tile', pattern: 'service', icon: 'pencil', sub: 'upper, trim, split' },
        { id: 'f-num', label: 'Math', variant: 'tile', pattern: 'service', icon: 'sigma', sub: 'round, abs, floor' },
        { id: 'f-time', label: 'Date & time', variant: 'tile', pattern: 'network', icon: 'calendar', sub: 'year, datediff' },
        { id: 'f-agg', label: 'Aggregate', variant: 'tile', pattern: 'network', icon: 'barchart', sub: 'sum, avg, countDistinct' },
        { id: 'f-cond', label: 'Conditional', variant: 'tile', pattern: 'storage', icon: 'gitbranch', sub: 'when, coalesce, isNull' },
      ],
    },
    { id: 'why', label: 'Always reach for F first', pattern: 'storage', icon: 'zap', sub: 'a UDF is a black box to Catalyst' },
  ],
  edges: [
    { source: 'code', target: 'families' },
    { source: 'families', target: 'why', label: 'a built-in is optimisable and runs in the JVM; your Python UDF is neither' },
  ],
}
