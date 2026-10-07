import type { Section } from '../types'

export const transforms: Section = {
  id: 'transforms',
  title: 'Filter, project, aggregate',
  scene: 'where-the-filter-goes',
  slide: `## Filter, project, aggregate

The everyday verbs — and one ordering decision here changes the *answer*, not just the cost.

### Project early, filter early
- Select only the columns you need; with Parquet the rest are never read
- Every row dropped before a shuffle is a row the shuffle never moves

### Where the filter goes decides what you get
- **Before** the aggregate drops **rows** from the input — SQL calls this \`WHERE\`
- **After** it drops **groups** from the result — SQL calls this \`HAVING\`
- Both are \`.filter\` in the DataFrame API. Only the position tells them apart

### Aggregating
- \`groupBy(...).agg(...)\` takes many aggregates at once — one pass, not one per metric
- Always \`.alias(...)\`, or the column is named after the expression`,
  narration:
    'Now the everyday verbs — filtering, projecting, grouping, aggregating. You met them in chapter three as a catalogue; this is about the craft of ordering them, and there is one ordering decision here that changes the answer rather than just the cost. Start with the two cheap habits. Project early: select only the columns you actually need, as early as you can. With Parquet, a column you never reference is never read off disk at all, so dropping forty of fifty columns at the top of a pipeline is close to a forty-fifty saving on the read. And filter early, which we established in chapter three: every row you drop before a shuffle is a row the shuffle never has to move across the network. Now the interesting part. Consider two questions that sound almost the same. First: what is our revenue from orders over a hundred pounds? Second: which countries bill us over a million pounds? Both involve a filter and a sum. But in the first, the filter happens before the aggregate — it removes individual rows from the input to the sum, so you are summing only the big orders. In the second, the filter happens after — every order is counted, and then whole countries are removed from the finished result based on their total. These are different questions with different answers, and the words are the same. SQL makes you spell them differently: a filter before the aggregate is WHERE, a filter after it is HAVING, and the language forces the choice on you. The DataFrame API does not. Both are dot filter. Look at the code on the board: the first filter sits above the groupBy and the second sits below it, and their position is the only thing distinguishing them. So when you write a filter near an aggregate, stop and ask which one you mean. There is a performance footnote too: a filter before the aggregate is always cheaper, because it removes rows before the shuffle. A filter after it cannot be moved, because it needs the total to exist before it can test it. On aggregating itself, two habits. Pass all your aggregates to a single agg call rather than computing them one at a time — Spark does them in one pass over the data. And always alias the result, or you end up with a column genuinely named sum of total. Next, the operation most likely to change your row count without telling you.',
}
