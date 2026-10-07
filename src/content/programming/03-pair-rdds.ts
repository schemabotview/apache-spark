import type { Section } from '../types'

export const pairRdds: Section = {
  id: 'pair-rdds',
  title: 'Pair RDDs and combining',
  scene: 'combine-locally',
  focus: 'rule',
  slide: `## Pair RDDs and combining

Key/value data is where aggregation happens — and where the single most famous Spark mistake lives.

### Pair data
- An RDD of \`(key, value)\` tuples unlocks the \`*ByKey\` family

### Two ways to count, wildly different costs
- \`groupByKey()\` — ships **every raw record** across the network, then combines at the far end
- \`reduceByKey()\` — combines **on each machine first**, then ships one partial per key
- Same answer. On the board: six records crossing the wire against two

### The rule worth memorising
- **Combine before you shuffle.** The cheapest record is the one never sent
- Prefer \`reduceByKey\`, \`aggregateByKey\`, \`combineByKey\` over \`groupByKey\`, always
- In the DataFrame API this is automatic — one more reason to stay there`,
  narration:
    'Key-value data is where aggregation happens, and it is also where the single most famous performance mistake in Spark lives — so this section is worth your full attention, because it is the first thing in this course you can act on immediately. A pair RDD is just an RDD whose records are key-value tuples, and having that shape unlocks the whole family of operations ending in ByKey. In the DataFrame API you express the same idea with groupBy on a column followed by agg, and the machinery underneath is identical, so everything here applies to both. Now, suppose you want to count words. There are two obvious ways. The first is groupByKey, which gathers all the values for each key together, and then you sum them. The second is reduceByKey, where you give it a combining function and it does the grouping and the summing in one go. They produce exactly the same answer. They do not cost remotely the same. Here is what actually happens. With groupByKey, every single raw record has to travel to the machine that owns its key, because the grouping happens at the destination. If the word the appears a million times in your input, that is a million individual records crossing the network, and only then do they get added up. With reduceByKey, Spark applies your combining function on each machine first, before anything is shuffled. That million occurrences of the on one executor becomes one record: the, one million. Then that single partial result travels. The reduction happened at the source. Look at the board. On the left, six records going over the wire. On the right, two. And on real data that ratio is not six to two, it is thousands to one. This gives us a rule worth memorising, and it generalises far past this one example: combine before you shuffle. The cheapest record is the one that is never sent. In practice, prefer reduceByKey, aggregateByKey or combineByKey, and treat groupByKey as something you reach for only when you genuinely need every value in a list rather than a reduction. And here is a happy footnote: in the DataFrame API, Spark does this partial aggregation for you automatically. It is one more reason the rest of this chapter lives up there.',
}
