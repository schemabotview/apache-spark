import type { Section } from '../types'

export const resultAndModes: Section = {
  id: 'result-and-modes',
  title: 'The result table & output modes',
  scene: 'stream-result',
  slide: `## The result table & output modes

Each trigger updates a **result table** — the **output mode** decides how much of it gets written out.

### The result table
- Conceptually, the answer your query would give **if run over all data so far**
- For an aggregation it holds one row **per group** — per key, per window

### Three output modes
- **Append** — only **brand-new** rows are emitted; past rows can’t change (non-aggregates, finalized windows)
- **Update** — only rows that **changed** this trigger are emitted (efficient for running aggregates)
- **Complete** — the **whole** result table is rewritten every trigger (small aggregates only)

### Which you can use
- Depends on the query — an un-windowed aggregate can’t use **append**; Spark enforces the valid set

Mode is about *how* the answer is emitted; the **sink** is where it lands — that’s next.`,
  narration:
    'Follow the arrow to the right and we reach the result table, and the choice that sits under it. The result table is just the output of your query — and the clean way to think about it is that, at any moment, it holds whatever answer your query would produce if it were run over all the data seen so far. If your query is an aggregation — say, a count per user — then the result table has one row per group: one per key, and if you’re windowing, one per window. Now, on most triggers only a little of that table actually changes, so Spark makes you declare an output mode, which controls how much of the result gets written out each time. There are three. Append mode emits only brand-new rows and promises never to change a row it’s already written — that fits non-aggregating queries, and windowed aggregations once a window is finalized. Update mode emits just the rows that changed on this trigger, which is the efficient, natural choice for running aggregates that keep ticking up. And complete mode rewrites the entire result table every single trigger — only practical when the result is small, like a top-level dashboard count. The important catch is that you can’t freely pick any mode for any query: an aggregation without a watermark, for instance, can never use append, because an old row might still change later. Spark knows the rules and will reject an invalid combination up front. So the output mode is about how your answer is emitted each trigger — and where that emitted answer actually lands is the sink, which is exactly where we go next.',
}
