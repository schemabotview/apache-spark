import type { Section } from '../types'

export const whichApi: Section = {
  id: 'which-api',
  title: 'RDD, DataFrame or SQL?',
  scene: 'which-api',
  focus: 'default',
  slide: `## RDD, DataFrame or SQL?

Three APIs, but really two choices — DataFrames and SQL are the same engine, so the question is whether to drop below them.

### What you give up with an RDD
- **Catalyst cannot see inside a lambda.** None of chapter 5's optimisation applies
- No column pruning, no predicate pushdown, no reordering — it runs exactly as written
- In Python, row-by-row lambdas pay to cross the JVM boundary and back

### When an RDD is still right
- **Truly unstructured** data with no rows or columns to name
- **Partition-level control** — \`mapPartitions\`, a custom partitioner
- **Legacy code** that exists and works

### The honest default
- Reach for **DataFrames or SQL**, and drop to RDDs only when one of the three above applies
- "It depends" is true and useless. This is the guidance`,
  narration:
    'Let us settle the API question, because it comes up constantly and it has a clearer answer than most people give. There are three APIs, but really only two choices, because we just established that DataFrames and SQL are the same engine with different syntax. So the real question is whether to drop below them to RDDs. Start with what you give up. The decisive one is on the board: Catalyst cannot see inside a lambda. When you write an RDD map with a Python or Scala function in it, Spark cannot inspect that function — it can only call it. So it cannot know that you only touch two of the forty columns, and it cannot prune the rest. It cannot know your function is a filter, so it cannot push it down into the file read. It cannot reorder anything around it. Your code runs exactly as written, in the order written, and the entire optimisation story of chapter five simply does not apply. On top of that, RDD data lives as JVM objects rather than compact columnar buffers, so it uses considerably more memory. And in Python specifically, row-by-row lambdas pay the serialisation cost across the JVM boundary for every single record. So when is an RDD still the right tool? The list is short and worth knowing honestly. First, genuinely unstructured data — if you are processing raw text or binary with no rows and no columns to name, imposing a schema is fighting the problem rather than solving it. Second, when you need partition-level control: mapPartitions, where you do something once per partition rather than once per row — opening a database connection, say — or a custom partitioner because you know something about your key distribution the engine cannot. Third, legacy code. Plenty of working Spark was written before DataFrames matured, and working code is worth a lot. That is the whole list. So the honest default is simple: reach for DataFrames or SQL, and drop to RDDs only when one of those three genuinely applies. I am deliberately not saying it depends, because it depends is true and useless. Know what the escape hatch is for, and stay out of it the rest of the time. Next, a decision that costs one word and outweighs most tuning you will ever do.',
}
