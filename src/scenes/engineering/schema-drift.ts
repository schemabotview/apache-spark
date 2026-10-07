import type { Scene } from '@graphlearning/flow'

// §1 schema-drift — chapter 3 §8 said "declare the schema". This says what happens when the thing
// you declared stops matching what arrives, which is the single most common way a working pipeline
// breaks at 3am without anyone having changed it.
//
// The table is the content: an evolution matrix a reader will come back to. It is ordered safe-first
// so the reading direction is itself the advice, and the "Why" column is there because "breaking" on
// its own teaches nothing — the reason is always about what an EXISTING READER of old files will do.
export const schemaDrift: Scene = {
  id: 'schema-drift',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'schema.py',
      label: [
        'from pyspark.sql import types as T',
        '',
        'ORDERS = T.StructType([',
        '    T.StructField("order_id",  T.LongType(),   False),',
        '    T.StructField("country",   T.StringType(), True),',
        '    T.StructField("total",     T.DecimalType(10, 2), True),',
        '])',
        '',
        'spark.read.schema(ORDERS).parquet(SRC)   # never inferSchema',
      ].join('\n'),
    },
    {
      id: 'evolution',
      kind: 'table',
      label: 'What you can change, and what breaks every reader of the old files',
      sub: 'safe operations first — the reading order is the advice',
      pattern: 'storage',
      headers: ['Change', 'Safe?', 'Why'],
      values: [
        ['Add a NULLABLE column', 'safe', 'old files read it back as null'],
        ['Widen a type (int → long)', 'safe', 'every old value still fits'],
        ['Add a REQUIRED column', 'breaks', 'old rows have nothing to put there'],
        ['Rename a column', 'breaks', 'it is a drop plus an add, to a reader'],
        ['Narrow a type (long → int)', 'breaks', 'old values may not fit'],
        ['Drop a column', 'breaks', 'anything selecting it fails'],
      ],
    },
    { id: 'rule', label: 'Additive only', pattern: 'service', icon: 'circlecheck', sub: 'rename = new column + backfill' },
  ],
  edges: [
    { source: 'code', target: 'evolution', label: 'nullable is not decoration — it is the whole evolution story' },
    { source: 'evolution', target: 'rule' },
  ],
}
