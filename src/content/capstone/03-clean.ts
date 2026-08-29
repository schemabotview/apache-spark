import type { Section } from '../types'

export const clean: Section = {
  id: 'clean',
  title: 'Batch layer · Clean & prepare',
  scene: 'cap-clean',
  slide: `## Batch · Clean & prepare

Raw events are messy — the batch layer removes **replays** and derives the columns the rollup will need.

### What’s happening
- \`dropDuplicates\` removes **replayed** rows — the source can deliver the same event twice
- \`withColumn\` derives clean, typed fields — a real \`ts\`, a \`day\` bucket to group by
- These are all **lazy transformations** — they just extend the plan; nothing runs yet

**Exercises:** DataFrame operations · lazy transformations (\`spark-api\` §3) · dedup`,
  narration:
    'With the raw events in hand, the next stage cleans them up, because real data is never tidy. The first problem is duplicates. Upstream systems, and Spark’s own recovery, both work on at-least-once delivery, which means the exact same event can show up more than once — so we call dropDuplicates on a unique event id to collapse those replays down to one. Then we shape the data into what the rollup needs: we parse the raw timestamp into a proper timestamp type, and we derive a day column from it that we’ll group by later. And we drop any nonsense rows, like non-positive amounts. The key thing to notice — and it’s a direct callback to the API course — is that not one of these operations has actually run yet. dropDuplicates, withColumn, filter: they’re all transformations, and transformations are lazy. Each call just adds another node to the logical plan; Spark won’t touch a single row until an action forces it. That laziness is exactly what lets Catalyst see the whole chain at once and optimize it — for instance, folding this filter together with the pushdown from the read. So at this point we’ve described a clean, deduplicated, well-typed dataset, without having computed anything. Next we join in product details and aggregate.',
}
