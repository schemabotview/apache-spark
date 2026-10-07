import type { Scene } from '@graphlearning/flow'

// §5 window-anatomy — a window function is the one thing in SQL that reliably defeats people, and
// the reason is almost always that they have been taught the SYNTAX rather than the shape. So the
// board is a real result set: the same customer's rows, ordered, with a running total beside them.
// Reading one row across is the whole concept.
//
// The three-part band is the actual mental model — partitionBy / orderBy / frame — and it is drawn
// as three because the third is the one people never set and then cannot explain their answer.
// The three parts are TILES: three prose cards across measure 976px against a 1114px pane, which
// left the result table — the thing doing the teaching — no room to grow.
//
// A `table` node in DATA mode is doing the teaching here; a diagram of boxes could not show that the
// output has the SAME number of rows as the input, which is the thing that separates a window from a
// groupBy.
export const windowAnatomy: Scene = {
  id: 'window-anatomy',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'result',
      kind: 'table',
      label: 'One customer, ordered by date — the window is the rows it can see',
      sub: 'same row count in and out; that is what makes it not a groupBy',
      pattern: 'storage',
      headers: ['customer', 'placed_at', 'total', 'running_total'],
      values: [
        ['c-1', '2026-01-04', '40', '40'],
        ['c-1', '2026-01-09', '25', '65'],
        ['c-1', '2026-02-02', '80', '145'],
        ['c-2', '2026-01-06', '15', '15'],
        ['c-2', '2026-03-11', '60', '75'],
      ],
    },
    {
      id: 'parts',
      label: 'Three parts, and the third is the one nobody sets',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'w-part', variant: 'tile', label: 'partitionBy', pattern: 'service', icon: 'boxes', sub: 'restart per customer' },
        { id: 'w-order', variant: 'tile', label: 'orderBy', pattern: 'service', icon: 'sortarrows', sub: 'what "running" means' },
        { id: 'w-frame', variant: 'tile', label: 'rowsBetween', pattern: 'warn', icon: 'ruler', sub: 'which rows count' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'window.py',
      label: [
        'from pyspark.sql import Window as W',
        '',
        'w = (W.partitionBy("customer")',
        '      .orderBy("placed_at")',
        '      .rowsBetween(W.unboundedPreceding, W.currentRow))',
        '',
        'orders.withColumn("running_total", F.sum("total").over(w))',
      ].join('\n'),
    },
  ],
  edges: [
    { source: 'result', target: 'parts' },
    { source: 'parts', target: 'code', label: 'leave the frame off and a running total quietly becomes a group total' },
  ],
}
