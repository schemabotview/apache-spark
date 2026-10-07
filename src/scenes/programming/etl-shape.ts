import type { Scene } from '@graphlearning/flow'

// §9 etl-shape — the chapter's bookend, and the first time everything taught so far is one program.
//
// COMPOSITION: the five steps run DOWN the left and the code sits to their RIGHT, so the badges line
// up roughly against the numbered comments in the snippet and a reader can read across. Drawn as a
// 5-wide band with the code underneath, the board was very wide, fitView scaled to that width, and
// the nine-line snippet — the payoff of the whole chapter — rendered too small to read.
// The band is numbered because a pipeline IS an order, and the badges let a reader map the code card
// below onto the stages above without a legend.
//
// The step numbers live in the LABELS, not in `badge`. `badge` is rendered by ContainerNode.tsx and
// by nothing else — on a leaf card it is a silent no-op, which is how this scene's first draft
// shipped five invisible badges with no error anywhere. The numbers matter here because they are what
// lets a reader map these five cards onto the `# 1`..`# 5` comments in the snippet beside them.
//
// Every stage names the thing that goes wrong there, in its `sub`. A pipeline diagram with five
// cheerful verbs on it teaches nothing — the reader already knows you read, clean and write. What
// they do not know is that filtering late costs real money and that writing without a mode is how
// you discover you appended a duplicate.
export const etlShape: Scene = {
  id: 'etl-shape',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'top',
      label: 'The shape almost every production job has',
      pattern: 'group',
      icon: 'none',
      flow: 'LR',
      align: 'start',
      children: [
        {
      id: 'pipeline',
      label: 'Five steps, in this order',
      pattern: 'group',
      icon: 'none',
      cols: 1,
      align: 'start',
      children: [
        { id: 'p-read', label: '1 · Read', pattern: 'storage', icon: 'database', sub: 'declare the schema' },
        { id: 'p-filter', label: '2 · Filter early', pattern: 'service', icon: 'funnel', sub: 'the cheapest row is a dropped one' },
        { id: 'p-clean', label: '3 · Clean', pattern: 'service', icon: 'wrench', sub: 'nulls, types, duplicates' },
        { id: 'p-shape', label: '4 · Join & aggregate', pattern: 'network', icon: 'merge', sub: 'the only wide steps' },
        { id: 'p-write', label: '5 · Write', pattern: 'storage', icon: 'warehouse', sub: 'a mode, and a partitioning' },
      ],
        },
        {
      id: 'code',
      kind: 'code',
      filename: 'pipeline.py',
      label: [
        'orders = (spark.read.schema(ORDERS).parquet(SRC)   # 1',
        '    .filter(F.col("placed_at") >= cutoff)          # 2',
        '    .dropDuplicates(["order_id"])                  # 3',
        '    .withColumn("total", F.col("total").cast("decimal(10,2)")))',
        '',
        'by_country = (orders.join(F.broadcast(customers), "customer_id")',
        '    .groupBy("country").agg(F.sum("total").alias("rev")))   # 4',
        '',
        'by_country.write.mode("overwrite").parquet(OUT)   # 5',
      ].join('\n'),
        },
      ],
      edges: [{ source: 'pipeline', target: 'code', route: 'step' }],
    },
    { id: 'next', label: 'Next', pattern: 'user', icon: 'brain', sub: 'what Catalyst does with all of this' },
  ],
  edges: [
    { source: 'top', target: 'next', label: 'narrow work first, the one wide step as late as possible — that ordering IS the craft' },
  ],
}
