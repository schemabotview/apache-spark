import type { Scene } from '@graphlearning/flow'

// §8 formats — the single highest-leverage decision in a pipeline, and it is made by typing one word.
// The table is sorted so the recommendation is a reading direction rather than an opinion: CSV at the
// top with every box unticked, Parquet at the bottom with all of them.
//
// Column pruning and predicate pushdown are named here rather than in chapter 5 because they are
// properties of the FILE, not of the engine: Catalyst can only push a filter into a read if the
// format can answer it, which is why the format choice outranks most tuning.
export const formats: Scene = {
  id: 'formats',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'The one-word decision that outranks most tuning',
      sub: 'read down the Parquet column — this is why it is the default',
      pattern: 'storage',
      headers: ['', 'CSV', 'JSON', 'Parquet'],
      values: [
        ['Carries a schema', 'no', 'inferred', 'yes, embedded'],
        ['Layout', 'row', 'row', 'COLUMNAR'],
        ['Reads only the columns asked for', 'no', 'no', 'yes'],
        ['Skips files by filter (pushdown)', 'no', 'no', 'yes, via statistics'],
        ['Compression', 'external', 'external', 'built in, per column'],
        ['Splittable for parallel reads', 'if uncompressed', 'awkward', 'always'],
      ],
    },
    {
      id: 'opts',
      kind: 'code',
      filename: 'io.py',
      label: [
        'spark.read.csv(path, header=True, inferSchema=True)  # a FULL extra pass',
        'spark.read.schema(my_schema).csv(path)               # declare it instead',
        '',
        'df.write.mode("overwrite").partitionBy("country").parquet(out)',
      ].join('\n'),
    },
    { id: 'rule', label: 'Land raw, keep Parquet', pattern: 'service', icon: 'warehouse', sub: 'convert once, read it a thousand times' },
  ],
  edges: [
    { source: 'table', target: 'opts', label: 'inferSchema reads the whole file just to guess — on a big input it doubles the job' },
    { source: 'opts', target: 'rule' },
  ],
}
