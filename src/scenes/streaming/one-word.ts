import type { Scene } from '@graphlearning/flow'

// §1 one-word — the chapter's whole thesis in a diff. Two snippets STACKED so the code is large
// (chapter 3 §6's lesson), and they are deliberately almost identical: `read` becomes `readStream`,
// `write` becomes `writeStream`, and the four lines of actual logic between them do not change at
// all. That is not a convenience, it is the design claim, and no diagram states it as plainly as
// the two blocks sitting one above the other.
//
// The card underneath is the mental model everything else in the chapter hangs off: a stream is a
// TABLE THAT KEEPS GROWING, and your query is re-run against it incrementally, forever.
export const oneWord: Scene = {
  id: 'one-word',
  padding: 0.1,
  flow: 'TB',
  nodes: [
    {
      id: 'both',
      label: 'The same query, batch and streaming',
      pattern: 'group',
      icon: 'none',
      cols: 1,
      align: 'start',
      children: [
        {
          id: 'batch',
          kind: 'code',
          hug: true,
          filename: 'batch.py',
          label: [
            'df = spark.read.parquet(SRC)',
            '',
            'out = df.filter(F.col("total") > 100) \\',
            '        .groupBy("country").count()',
            '',
            'out.write.parquet(OUT)',
          ].join('\n'),
        },
        {
          id: 'stream',
          kind: 'code',
          hug: true,
          filename: 'stream.py — three words differ',
          label: [
            'df = spark.readStream.parquet(SRC)',
            '',
            'out = df.filter(F.col("total") > 100) \\',
            '        .groupBy("country").count()',
            '',
            'out.writeStream.outputMode("update").start()',
          ].join('\n'),
        },
      ],
    },
    { id: 'model', label: 'A stream is a table', pattern: 'service', icon: 'waves', sub: 'that never stops growing' },
  ],
  edges: [
    { source: 'both', target: 'model', label: 'the logic in the middle is byte-identical — that is the design claim, not a convenience' },
  ],
}
