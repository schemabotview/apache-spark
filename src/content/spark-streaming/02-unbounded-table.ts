import type { Section } from '../types'

export const unboundedTable: Section = {
  id: 'unbounded-table',
  title: 'The unbounded table',
  scene: 'streaming-model',
  slide: `## The unbounded table

This is the whole trick: model the stream as a table that only ever **grows**, and let Spark run your **batch query** over it incrementally.

### The mental model
- The **input table** starts empty and gains **new rows** as data arrives — it never ends
- You write a normal query against it — \`select\`, \`groupBy\`, \`join\` — as if it were static
- Each **trigger**, Spark runs that query over the new rows and updates a **result table**

### Incremental, not re-run
- Spark doesn’t re-scan all of history each trigger — it processes **only what’s new**
- It keeps just enough **state** between triggers to match a full re-run’s answer

### Why it matters
- **One programming model** for batch and streaming — the same DataFrame code either way
- You reason about *what the answer should be*; Spark handles the incremental *how*`,
  narration:
    'Let’s zoom into the middle, because this is the idea the whole course rests on. Picture an ordinary table — but instead of holding a fixed set of rows, this one starts empty and keeps gaining new rows as data streams in. It never ends; that’s why we call it the unbounded input table. Now here’s the move that makes Structured Streaming so elegant: you write an ordinary query against that table — a select, a groupBy, a join — exactly as if it were a normal static table sitting in a database. You don’t write special streaming code. Then, on each trigger, Spark runs your query and updates a result table with the answer. The crucial subtlety is the word incrementally. Spark does not re-read your entire history every trigger — that would get slower and slower forever. Instead it processes only the new rows that arrived, and it keeps just enough state between triggers to produce exactly the same answer a full re-run would have given. So conceptually you can always think, "the result table is what my query would return over all the data seen so far," while under the hood Spark is doing the efficient, incremental thing. And the payoff is huge: it’s one single programming model for both batch and streaming. The very same DataFrame code you’d run once over a static file will run continuously over a stream — you reason about what the answer should be, and Spark works out the incremental how. Which means the query itself is the easy part; it’s just your batch query. Everything else in this picture — sources, triggers, output modes, state, checkpoints — is really just plumbing arranged around this one growing table.',
}
