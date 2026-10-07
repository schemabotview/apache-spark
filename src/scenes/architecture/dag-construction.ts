import type { Scene } from '@graphlearning/flow'

// §7 dag-construction — §4 showed the RESULT (a job holding stages); this shows the BUILD, which is a
// different claim and deserves a different picture. Four tiles, because each is a real transformation
// of the representation: your calls become a lineage graph, the lineage graph is by construction a
// DAG, and the DAG is cut into stages at the wide dependencies §6 just defined.
//
// The acyclic card is not pedantry. Lineage-based recovery (chapter 1 §6) only works because the
// graph cannot loop: a lost partition has a finite derivation to replay. Acyclicity is the property
// that makes the whole fault-tolerance story possible, so it gets a card rather than an adjective.
export const dagConstruction: Scene = {
  id: 'dag-construction',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'prog',
      kind: 'code',
      filename: 'job.py',
      label: [
        'orders = spark.read.parquet("s3://lake/orders")',
        'big    = orders.filter(orders.total > 100)',
        'by_c   = big.groupBy("country").count()',
        'by_c.write.parquet("s3://out/by_country")',
      ].join('\n'),
    },
    {
      id: 'build',
      label: 'What Spark does with those four lines, before running any of them',
      pattern: 'group',
      icon: 'none',
      cols: 4,
      children: [
        { id: 'b-calls', label: 'Your calls', variant: 'tile', pattern: 'user', icon: 'code', sub: 'read, filter, groupBy' },
        { id: 'b-lin', label: 'A lineage graph', variant: 'tile', pattern: 'service', icon: 'gitbranch', sub: 'each result knows its parent' },
        { id: 'b-dag', label: 'A DAG', variant: 'tile', pattern: 'service', icon: 'workflow', sub: 'acyclic, by construction' },
        { id: 'b-stages', label: 'Stages', variant: 'tile', pattern: 'network', icon: 'scissors', sub: 'cut at each wide dependency' },
      ],
    },
    { id: 'acyclic', label: 'Why acyclic matters', pattern: 'storage', icon: 'repeat', sub: 'a lost partition has a finite replay' },
  ],
  edges: [
    { source: 'prog', target: 'build', label: 'one groupBy in there — so exactly one cut, so exactly two stages' },
    { source: 'build', target: 'acyclic', label: 'nothing loops back, so recomputing from lineage always terminates' },
  ],
}
