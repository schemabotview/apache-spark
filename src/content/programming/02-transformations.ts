import type { Section } from '../types'

export const transformations: Section = {
  id: 'transformations',
  title: 'Transformations and actions',
  scene: 'ops-catalog',
  focus: 'danger',
  slide: `## Transformations and actions

Chapter 2 said *when* things run. This is *what you can call* — and the catalogue is smaller than it looks.

### Transformations build the plan
- They return a new DataFrame or RDD and **run nothing**
- The useful split is the one from chapter 2: **narrow** or **wide**
- Narrow — \`map\` \`filter\` \`flatMap\` \`union\`. Stay put, fuse together, cost almost nothing
- Wide — \`groupByKey\` \`join\` \`distinct\` \`repartition\`. Every one is a shuffle and a stage boundary

### Actions are the short list
- \`collect\` \`count\` \`take\` \`first\` \`show\` \`write\` — and not much else
- **Nearly everything in Spark is a transformation**, which is why laziness is easy to reason about

### \`collect\` deserves a warning
- It pulls **every row** into the driver's memory — the one process that was never sized for data
- Use \`take(n)\` or \`show()\` to look at results; use \`write\` to keep them`,
  narration:
    'Chapter two told you when things run — transformations are lazy, actions trigger a job. This section is about what you can actually call, and the good news is the catalogue is much smaller than the documentation makes it look. Transformations build the plan. Every one of them returns a new DataFrame or RDD and runs absolutely nothing. The useful way to organise them is not alphabetically, it is by the distinction from chapter two: narrow or wide. The narrow ones are map, filter, flatMap, union, and friends. Each output partition needs exactly one input partition, the work stays on the machine holding the data, several of them fuse into a single pass over the rows, and they cost close to nothing beyond the reading. The wide ones are groupByKey, join, distinct, repartition. Every single one of these is a shuffle, and therefore a stage boundary, and therefore where your time goes. When you look at a Spark program you have not seen before, scan it for the wide operations first — you have just found the expensive parts and the stage count at the same time. Then there are actions, and the striking thing about actions is how few there are. Collect, count, take, first, show, write. That is very nearly the whole list. Nearly everything in Spark is a transformation, and that is exactly why laziness is easy to reason about in practice: you can read a hundred lines of Spark, find the three actions, and know you have three jobs. One warning before we move on, and it is the most common way a beginner takes down a cluster. Collect is not like the others. Collect takes every row of your distributed dataset, from across all the executors, and pulls it into the driver\'s memory — the one process in the entire system that was never sized to hold your data. On a dataset that genuinely fits, that is fine. On a real one, the driver runs out of memory and the application dies, and the stack trace does not obviously say why. If you want to look at results, use take or show, which bring back a handful of rows. If you want to keep results, use write, which keeps them distributed. Now let us look at keyed data, where the most famous Spark mistake lives.',
}
