import type { Scene } from '@graphlearning/flow'

// FOUR TILES, not four cards. A prose card is a fixed PROSE_W = 300px wide, so four across is
// 1200px before gaps against a 1114px pane — the board was scaled DOWN to 0.77 and took the code
// with it, to 12px. Tiles size to their own content. The rule: a 4-or-5-across band wants tiles or
// chips; prose cards stop fitting at three.
//
// §9 maintainable — the chapter's bookend, and the only section in the course about the CODE rather
// than the engine. The code owns the board (chapter 3 §9's lesson): a pure DataFrame-to-DataFrame
// function is the whole idea, and no diagram of it is as convincing as the five lines themselves
// plus the three-line test underneath that could not have been written against a monolithic script.
//
// Idempotence is the band's first card because it is the property that decides whether a 3am rerun
// is safe, and `mode("overwrite")` on a partition is how you get it for free.
export const maintainable: Scene = {
  id: 'maintainable',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'transform.py',
      label: [
        '# DataFrame -> DataFrame. No reads, no writes, no clock.',
        'def big_orders(orders: DataFrame, floor: int) -> DataFrame:',
        '    return (orders',
        '            .filter(F.col("total") >= floor)',
        '            .withColumn("band", F.when(F.col("total") > 1000, "L")',
        '                                 .otherwise("M")))',
        '',
        '# ...so it is testable with no cluster, no file, no mock.',
        'def test_big_orders(spark):',
        '    rows = [(1, 50), (2, 5000)]',
        '    df = spark.createDataFrame(rows, "id int, total int")',
        '    assert big_orders(df, 100).count() == 1',
      ].join('\n'),
    },
    {
      id: 'props',
      label: 'Four properties that decide whether anyone can safely rerun your job',
      pattern: 'group',
      icon: 'none',
      cols: 4,
      children: [
        { id: 'p-idem', label: 'Idempotent', variant: 'tile', pattern: 'service', icon: 'repeat', sub: 'rerunning changes nothing' },
        { id: 'p-pure', label: 'Pure transforms', variant: 'tile', pattern: 'service', icon: 'braces', sub: 'I/O only at the edges' },
        { id: 'p-config', label: 'Config, not literals', variant: 'tile', pattern: 'network', icon: 'scroll', sub: 'paths and dates passed in' },
        { id: 'p-obs', label: 'Row counts logged', variant: 'tile', pattern: 'storage', icon: 'gauge', sub: 'in, out, quarantined' },
      ],
    },
    { id: 'next', label: 'Next', pattern: 'user', icon: 'brain', sub: 'what Catalyst does with all of it' },
  ],
  edges: [
    { source: 'code', target: 'props', label: 'overwriting one partition is what makes a 3am rerun safe' },
    { source: 'props', target: 'next' },
  ],
}
