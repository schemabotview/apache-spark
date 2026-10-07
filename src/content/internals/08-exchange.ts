import type { Section } from '../types'

export const exchangeSection: Section = {
  id: 'exchange',
  title: 'Exchange and stage boundaries',
  scene: 'exchange',
  focus: 'rule',
  slide: `## Exchange and stage boundaries

In a physical plan, the shuffle has a name. Once you can spot it, you can read stage boundaries straight off the text.

### \`Exchange\` **is** the shuffle
- Chapter 2 said a shuffle cuts a stage. \`Exchange\` is where you see the cut
- **Count the Exchanges and add one.** That is your stage count, before you run anything

### The partitioning tells you why
- \`hashpartitioning(key, n)\` — a join or a \`groupBy\` on that key
- \`rangepartitioning\` — a global \`orderBy\`
- \`SinglePartition\` — **everything onto one task.** Almost always a mistake worth finding

### Reading the example
- Two \`Exchange\` nodes, both hash-partitioning on \`customer_id\`, one per side of the join
- So: three stages, and the join is sort-merge because neither side was small enough to broadcast`,
  narration:
    'You now know what a shuffle costs. This section is about spotting one, which turns out to be easy once you know the word. In a physical plan, a shuffle is called Exchange. That is it. Chapter two told you that a shuffle is the only thing that cuts a stage; Exchange is where you can see the cut, written down, before you run anything. Which gives you a rule you can apply by eye: count the Exchange nodes in a plan and add one, and you have the number of stages. Look at the plan on the board. It is a join between orders and customers. Read it bottom-up as always. There are two FileScans, one per side. Above each one there is an Exchange, hash-partitioning on customer_id into two hundred partitions. Above each Exchange there is a Sort. And at the top, a SortMergeJoin. So: two Exchanges, therefore three stages. And you can read the strategy straight off it too — it is a sort-merge join, which from the last section tells you neither side was small enough to broadcast. Now the detail that turns Exchange from a label into a diagnostic: the partitioning named after the word tells you why Spark shuffled. Hash partitioning on a key means a join or a grouping on that key — the rows had to be regrouped so matching keys met. Range partitioning means a global ordering: a full orderBy has to range-partition so that partition one holds the smallest values and partition two the next, and so on. And the third one is the one to watch for, because it is almost always a problem: SinglePartition means Spark is moving your entire dataset onto one task. That happens with a window function that has no partitionBy, or an orderBy with a limit, or a few aggregations without a grouping key. Whatever the size of your cluster, that stage is now single-threaded and holding everything in one executor\'s memory. If you see SinglePartition in a plan over real data, stop and work out why, because you have found your bottleneck. So the practical habit is: find the Exchanges, count your stages, and read the partitioning on each one to understand what forced it. Last section — putting that together into a way of reading any plan.',
}
