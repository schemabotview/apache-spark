import type { Scene } from '@graphlearning/flow'

// §2 bad-rows — the mode table first, because the default is the dangerous one and almost nobody
// knows what it does. PERMISSIVE silently nulls a malformed row and carries on, so a pipeline can
// run green for months while quietly throwing data away.
//
// `_corrupt_record` gets its own warn card because it is the trap INSIDE the fix: the column only
// appears if you declare it, and selecting it alone throws rather than returning the bad rows.
export const badRows: Scene = {
  id: 'bad-rows',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'modes',
      kind: 'table',
      label: 'Three things Spark can do with a row that does not parse',
      sub: 'the first one is the default, and it is silent',
      pattern: 'service',
      headers: ['mode', 'What happens', 'Use when'],
      values: [
        ['PERMISSIVE', 'nulls the bad fields, keeps the row', 'you have a quarantine column'],
        ['DROPMALFORMED', 'drops the row entirely', 'you can afford to lose it'],
        ['FAILFAST', 'kills the job on the first one', 'any bad row is a real incident'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'quality.py',
      label: [
        'raw = (spark.read',
        '    .schema(ORDERS.add("_corrupt_record", T.StringType()))',
        '    .option("mode", "PERMISSIVE")',
        '    .json(SRC))',
        '',
        'bad  = raw.filter(F.col("_corrupt_record").isNotNull()).cache()',
        'good = raw.filter(F.col("_corrupt_record").isNull())',
        '',
        'good = (good.na.fill({"country": "UNKNOWN"})',
        '            .na.drop(subset=["order_id"]))',
      ].join('\n'),
    },
    { id: 'trap', label: 'Quarantine, do not drop', pattern: 'warn', icon: 'funnel', sub: 'a row you deleted cannot be explained' },
  ],
  edges: [
    { source: 'modes', target: 'code', label: '_corrupt_record only exists if you put it in the schema yourself' },
    { source: 'code', target: 'trap' },
  ],
}
