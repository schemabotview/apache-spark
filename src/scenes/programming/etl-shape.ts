import type { Scene } from '@graphlearning/flow'

// §9 etl-shape — the chapter's bookend, and the first time everything taught so far is one program.
// So the program IS the board: one code card with a full row to itself, and the handoff beneath it.
//
// THE FIVE-STEP COLUMN WAS CUT, deliberately. It listed read → filter → clean → join → write beside
// the code, which read nicely but cost a flat 328px of board width: a prose card is always PROSE_W
// (300px) wide no matter how short its label (proseMetrics.ts:34), so no amount of editing could
// narrow it. On a width-bound board that is 328px taken straight off the rendered type, and it held
// the snippet to 18.5px against §6's 23.5. The same five steps are numbered 1–5 in this section's
// slide, so the board lost no information — and the `# 1`..`# 5` comments still map onto them.
//
// With the column gone the snippet got its REAL spelling back: `customers` rather than `custs`,
// `customer_id` rather than `cid`, `placed_at` rather than `day`. Those abbreviations existed only to
// buy width, which is the wrong trade in a section whose content IS the code. Lines sit at 63
// columns, just inside CODE_MIN_COLS (64) — past that a card widens its own scene again.
export const etlShape: Scene = {
  id: 'etl-shape',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'pipeline.py',
      label: [
        'orders = (spark.read.schema(ORDERS).parquet(SRC)        # 1',
        '    .filter(F.col("placed_at") >= cutoff)               # 2',
        '    .dropDuplicates(["order_id"])                       # 3',
        '    .withColumn("total", F.col("total").cast("decimal(10,2)")))',
        '',
        'by_country = (orders',
        '    .join(F.broadcast(customers), "customer_id")        # 4',
        '    .groupBy("country")',
        '    .agg(F.sum("total").alias("rev")))',
        '',
        'by_country.write.mode("overwrite").parquet(OUT)         # 5',
      ].join('\n'),
    },
    { id: 'next', label: 'Next', pattern: 'user', icon: 'brain', sub: 'what Catalyst does with all of this' },
  ],
  edges: [
    {
      source: 'code',
      target: 'next',
      label: 'narrow work first, the one wide step as late as possible — that ordering IS the craft',
    },
  ],
}
