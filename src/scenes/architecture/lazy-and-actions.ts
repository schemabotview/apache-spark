import type { Scene } from '@graphlearning/flow'

// §8 lazy-and-actions — the chapter's reveal, and the reason it sits at the END rather than the
// start. Everything the reader has just learned to draw — stages, tasks, waves, the DAG — did not
// exist while those first three lines ran. The code card is written with the comments doing the
// teaching, because the whole point is the asymmetry between four almost identical-looking lines.
//
// The table exists to kill the question "how do I know which is which": the return type IS the test,
// and it is mechanical. Anything handing back another DataFrame is lazy; anything handing back a
// value or writing something is an action and has already cost you a job.
export const lazyAndActions: Scene = {
  id: 'lazy-and-actions',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      filename: 'lazy.py',
      label: [
        'df   = spark.read.parquet("s3://lake/orders")  # nothing happens',
        'big  = df.filter(df.total > 100)               # nothing happens',
        'by_c = big.groupBy("country").count()          # nothing happens',
        '',
        'by_c.show()   # <-- the cluster finally does ALL of it, here',
      ].join('\n'),
    },
    {
      id: 'split',
      kind: 'table',
      label: 'Two kinds of call — and the return type tells you which',
      sub: 'a mechanical test, not a list to memorise',
      pattern: 'service',
      headers: ['', 'Transformation', 'Action'],
      values: [
        ['What it does', 'describes a new dataset', 'asks for an actual result'],
        ['When it runs', 'never, by itself', 'at once — it submits a job'],
        ['It returns', 'another DataFrame', 'a value, or a written file'],
        ['Examples', 'select, filter, join, groupBy', 'count, collect, show, write'],
      ],
    },
    { id: 'why', label: 'Why be lazy', pattern: 'storage', icon: 'brain', sub: 'it can only optimise what it can see' },
  ],
  edges: [
    { source: 'code', target: 'split' },
    { source: 'split', target: 'why', label: 'waiting for the action is what lets Spark see the WHOLE plan at once' },
  ],
}
