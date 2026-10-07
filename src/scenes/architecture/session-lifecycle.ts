import type { Scene } from '@graphlearning/flow'

// §3 session-lifecycle — a CODE card, because SparkSession is an object you construct and a diagram
// of one is a box with its name in it. The snippet is a whole application end to end on purpose: it
// is the first time the reader sees where the session is born, what it is used for, and where it dies.
//
// `getOrCreate` is the method worth noticing and the narration spends time on it — it is why a second
// call in a notebook silently hands back the FIRST session, config and all, which is the single most
// common "my setting did nothing" bug in Spark.
export const sessionLifecycle: Scene = {
  id: 'session-lifecycle',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'orders_etl.py',
      label: [
        'from pyspark.sql import SparkSession',
        '',
        'spark = (SparkSession.builder',
        '    .appName("orders-etl")',
        '    .config("spark.sql.shuffle.partitions", 200)',
        '    .getOrCreate())',
        '',
        'df = spark.read.parquet("s3://lake/orders")',
        'df.filter(df.total > 100).write.parquet("s3://out/big")',
        '',
        'spark.stop()',
      ].join('\n'),
    },
    {
      id: 'life',
      label: 'Every application walks the same four steps',
      pattern: 'group',
      icon: 'none',
      cols: 4,
      children: [
        { id: 'lf-create', label: 'Create', variant: 'tile', pattern: 'service', icon: 'power', sub: 'getOrCreate()' },
        { id: 'lf-plan', label: 'Describe', variant: 'tile', pattern: 'service', icon: 'brain', sub: 'transformations' },
        { id: 'lf-run', label: 'Execute', variant: 'tile', pattern: 'network', icon: 'zap', sub: 'an action fires it' },
        { id: 'lf-stop', label: 'Stop', variant: 'tile', pattern: 'warn', icon: 'power', sub: 'executors released' },
      ],
    },
    { id: 'one', label: 'One session', pattern: 'storage', icon: 'key', sub: 'the entry point to everything' },
  ],
  edges: [
    { source: 'code', target: 'life' },
    { source: 'life', target: 'one', label: 'getOrCreate hands back the EXISTING session if there is one — config and all' },
  ],
}
