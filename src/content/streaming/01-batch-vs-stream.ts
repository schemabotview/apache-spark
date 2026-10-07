import type { Section } from '../types'

export const batchVsStream: Section = {
  id: 'batch-vs-stream',
  title: 'Batch and stream',
  scene: 'one-word',
  focus: 'model',
  slide: `## Batch and stream

The whole chapter in one diff. Compare the two programs on the left: **three words** differ, and none of them is the logic.

### A stream is a table that never stops growing
- New data is **appended** as rows. Your query runs against the whole table, incrementally
- \`read\` → \`readStream\`, \`write\` → \`writeStream\`. The filter and the groupBy are byte-identical
- That is the design claim, not a convenience: one API, one engine, two kinds of data

### What this buys you
- Everything from chapters 2 and 5 still applies — partitions, stages, shuffles, Catalyst, the plan
- Test your logic as a batch job on a fixed file, then point it at a stream

### What it does not buy you
- Streaming adds genuinely hard problems that batch never had: **time, state, and recovery**
- The remaining eight sections are those three problems`,
  narration:
    'Six chapters in, you know how Spark executes a query over a finite dataset. This chapter extends that to data that never stops arriving, and the way in is the two programs on the left. Look at them carefully, because the comparison is the whole thesis. On the top, a batch job: read a parquet directory, filter orders over a hundred, group by country, count, write the result. On the bottom, a streaming job doing the same thing. Three words differ. Read becomes readStream. Write becomes writeStream. And there is an output mode on the write. The filter and the groupBy in the middle are byte-identical — not similar, identical. That is not a convenience the API team added. It is the central design decision of Structured Streaming, and the idea behind it is this: a stream is a table that never stops growing. Picture an ordinary table. Now picture that new rows keep being appended to the bottom of it, forever, and nothing is ever removed or replaced. Your query runs against that whole table — conceptually, continuously, and in practice incrementally, so that only the new work is done each time. Once you hold that, a great deal follows for free. Everything you learned in chapters two and five still applies: there are still partitions, still stages, still shuffles, still Catalyst building a plan, still a physical plan you can read with explain. A streaming query is not a different engine. It is the same engine, in a loop. Which has a practical consequence worth adopting as a habit: develop and test your logic as a batch job against a fixed file, where iteration is fast and debugging is normal, and then point the same code at a stream. The logic you tested is the logic that runs. But let me be honest about the half this does not solve, because the one-word diff can make streaming look easier than it is. Batch has a luxury that streaming does not: the data is all there, and it has stopped. Streaming has to answer three questions batch never asks. What time does this event belong to, when the clock on the event and the clock on the wall disagree? What do I have to remember between batches, and for how long? And what happens when a machine dies halfway through? Time, state, and recovery. Those three problems are the remaining eight sections of this chapter. Next: the model underneath the API.',
}
