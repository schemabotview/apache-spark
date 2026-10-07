import type { Scene } from '@graphlearning/flow'

// §6 spark-answer — the chapter's payoff, and the only scene in it with a CODE card. The code is not
// here to be taught (chapter 3 does that); it is here as evidence for a claim the narration makes
// about line count, and a diagram cannot carry that claim. Eight lines against roughly sixty of
// Java is an argument the reader can check by looking.
//
// The band is deliberately four answers to §5's four refusals, in the same order, so the two scenes
// read as a question and its reply: in-memory answers iteration, the DAG answers hand-chaining,
// lineage answers the failure cost of keeping things in memory, and one engine answers the rest.
export const sparkAnswer: Scene = {
  id: 'spark-answer',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'wordcount',
      kind: 'code',
      filename: 'wordcount.py',
      label: [
        'text = spark.read.text("s3://logs/*.gz")',
        '',
        'counts = (text',
        '  .selectExpr("explode(split(value, \' \')) AS word")',
        '  .groupBy("word")',
        '  .count())',
        '',
        'counts.write.parquet("s3://out/counts")',
      ].join('\n'),
    },
    {
      id: 'answers',
      label: 'Four design decisions — one per thing MapReduce refused',
      pattern: 'group',
      icon: 'none',
      cols: 4,
      children: [
        { id: 'an-mem', label: 'Keep it in memory', variant: 'tile', pattern: 'service', icon: 'memory', sub: 'reuse without re-reading' },
        { id: 'an-dag', label: 'Plan a whole DAG', variant: 'tile', pattern: 'service', icon: 'workflow', sub: 'not one job at a time' },
        { id: 'an-lineage', label: 'Recover by lineage', variant: 'tile', pattern: 'network', icon: 'gitbranch', sub: 'recompute, not replicate' },
        { id: 'an-one', label: 'One engine', variant: 'tile', pattern: 'storage', icon: 'zap', sub: 'SQL, streams, ML, graphs' },
      ],
    },
  ],
  edges: [
    {
      source: 'wordcount',
      target: 'answers',
      label: 'the same word count MapReduce needs roughly sixty lines of Java to express',
    },
  ],
}
