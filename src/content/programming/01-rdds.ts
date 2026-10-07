import type { Section } from '../types'

export const rdds: Section = {
  id: 'rdds',
  title: 'RDDs and lineage',
  scene: 'rdd-lineage',
  focus: 'lost',
  slide: `## RDDs and lineage

The **Resilient Distributed Dataset** — Spark's original abstraction. You will rarely write one, and you should still know it: a DataFrame is still this underneath.

### What an RDD actually is
- An **immutable** collection, split into **partitions**, spread across the executors
- Immutable matters: a transformation never edits, it **describes a new RDD**
- Each one records **how it was derived** — its parent, and the operation. That is *lineage*

### Why lineage is the whole trick
- Nothing is replicated in memory, so recovery cannot mean "fetch the copy"
- Lose a partition and Spark **replays its derivation** — that branch only, not the dataset
- Narrow steps preserve partitioning, so \`p1\` traces straight back through \`p1\`

### Resilient, Distributed, Dataset
- Every word in the name is one of those three properties`,
  narration:
    'Chapter two gave you the execution model. Now we get to the APIs you actually write, and we start one level below the one you will use every day — because a DataFrame is still this thing underneath, and the day something behaves strangely, this is the layer the explanation lives on. The RDD, or Resilient Distributed Dataset, was Spark\'s original abstraction. It is three things, and the name tells you all three. It is a dataset: a collection of records. It is distributed: that collection is split into partitions spread across your executors. And it is resilient, which we will come to in a moment. The property to hold onto first is that an RDD is immutable. When you call a transformation on one, you do not modify it. You get back a description of a new RDD. Look at the code: lines, then words, then pairs. Three names, three RDDs, and at this point not one byte has been read from that file. And here is the part that makes it work. Each RDD records how it was derived — which RDD it came from, and what operation produced it. Words knows it came from lines via a flatMap. Pairs knows it came from words via a map. That chain of derivations is called lineage, and it is the single cleverest thing in the original Spark design. Think about why it has to exist. Spark keeps things in memory for speed, and memory is lost when a machine dies. The obvious fix is to replicate everything, but replicating in memory would cost most of the speed you just bought. So Spark does not replicate. When a partition is lost, it looks at the lineage and replays the derivation for that partition — and only that one. Partition one of pairs came from partition one of words, which came from partition one of lines. One branch gets recomputed, the other partitions are untouched, and the job carries on. That is what the R in RDD means. Notice this works precisely because those steps were narrow — each child partition needed exactly one parent. We will come back to what happens when they are not. Next: what you can actually call on one of these.',
}
