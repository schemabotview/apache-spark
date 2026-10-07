import type { Section } from '../types'

export const unboundedTableSection: Section = {
  id: 'unbounded-table',
  title: 'The unbounded table',
  scene: 'unbounded-table',
  focus: 'agg',
  slide: `## The unbounded table

The model underneath the API, and it is worth holding literally rather than as a metaphor.

### Three tables, not one
- The **input table** grows forever as rows arrive — nothing is ever replaced
- Your query produces a **result table**, recomputed incrementally each batch

### Output mode is a claim about your result
- \`append\` — only brand-new rows. Legal only if nothing already written can change
- \`update\` — rows that changed this batch. Almost always the right answer
- \`complete\` — the whole result, every batch. Only for small aggregated results

### The error everyone hits once
- A streaming aggregate **cannot use \`append\`**: a running count can always change later
- So there is no final row to append — until a **watermark** declares the window closed`,
  narration:
    'Let us make the model precise, because holding it literally rather than as a metaphor is what makes the rest of this chapter easy. There are three tables in play. The first is the input table. It is unbounded, it grows as data arrives, and crucially, rows are appended — nothing is ever replaced or removed. Each time the engine wakes up, some new rows have landed at the bottom. The second is the result table. That is whatever your query produces from the input table. If your query is a groupBy and a count, the result table has one row per country with a running count. And here is the part to internalise: conceptually, Spark recomputes the result table from the entire input table every time. In practice it does this incrementally, which is the whole engineering achievement, but the semantics you should reason with are the simple ones: the answer is always whatever the query says about everything received so far. The third thing is the sink, and between the result table and the sink sits the one decision people get wrong: output mode. Output mode says what gets written out each batch, and it is really a claim about your result. Append mode writes only brand-new rows. It is legal only if a row, once written, can never change. Update mode writes rows that changed in this batch, and it is almost always the right answer for anything aggregated. Complete mode rewrites the entire result table every batch, which is fine when the result is a small aggregate — a count per country, say — and catastrophic otherwise. Now, the error essentially everybody hits once, and it is worth meeting here rather than at two in the morning. You write a streaming aggregation, you choose append mode because appending sounds right for a stream, and Spark refuses to start the query. The message is about streaming semantics and it does not obviously tell you what to do. Here is why. You are counting orders by country. You write out France, forty-one. Then more French orders arrive, and the correct answer becomes forty-three. But you already appended forty-one and append mode cannot take it back. There is no final row to append, because every row can always change. So append is illegal on an aggregate — unless something declares that a particular window of time is finished and will never change again. That something is a watermark, and it is section six. Next: where the data comes from and goes to.',
}
