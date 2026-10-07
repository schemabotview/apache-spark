import type { Section } from '../types'

export const shuffleOptimization: Section = {
  id: 'shuffle-tuning',
  title: 'Shuffle optimization',
  scene: 'shuffle-tuning',
  focus: 'l-avoid',
  slide: `## Shuffle optimization

Chapter 5 showed what a shuffle costs. Three rungs of response — and almost everyone starts on the third.

### The ladder
1. **Avoid it** — broadcast the small side, or read data already partitioned on the key
2. **Shrink it** — filter and project before it; pre-aggregate so fewer rows move
3. **Tune it** — only now, the partition count

### \`spark.sql.shuffle.partitions\` defaults to 200
- For every job, on every cluster, regardless of your data. So it is wrong for almost everyone
- 2 GB of shuffle data over 200 gives 10 MB tasks — scheduling overhead with no work in it
- 500 GB over 200 gives 2.5 GB tasks — spill, then out-of-memory

### Aim for the same ~128 MB
- Divide your shuffle volume by 128 MB. That is your number, not 200`,
  narration:
    'Chapter five showed you what a shuffle actually costs: a write to local disk, a fetch across the network, a read, and M times R of those fetches. Now, what to do about it. There are three levels of response, and the order matters, because almost everybody skips straight to the third one. The first rung is: avoid it. The cheapest shuffle is the one that never runs. Can you broadcast the small side of that join instead of shuffling both? Can you read data that is already partitioned on the key you are grouping by, so no regrouping is needed? Can you restructure so the aggregation happens on data that is already local? These are the big wins, and they are the ones nobody tries first. The second rung is: shrink it. If the shuffle has to happen, move less data through it. Filter before it rather than after — chapter four\'s lesson, and here is the payoff for it. Project away columns you do not need, because a shuffle moves whole rows. Pre-aggregate, so ten thousand records for a key become one partial result before anything crosses the network, which is chapter three\'s combine-before-you-shuffle rule. Only on the third rung do you tune the partition count — and this is where everyone starts. Now, that setting deserves a close look, because it is the single most commonly mis-set value in Spark. Spark dot sql dot shuffle dot partitions defaults to two hundred. Two hundred, for every job, on every cluster, regardless of how much data you have. It is not adaptive and it is not clever; it is a number chosen years ago as a reasonable middle. Work out what it means for you. If your shuffle moves two gigabytes, two hundred partitions gives you ten-megabyte tasks — far too small, so you are paying scheduling overhead on tasks that finish instantly. If your shuffle moves five hundred gigabytes, two hundred partitions gives you two and a half gigabytes per task, which will spill to disk and quite possibly run out of memory. The right way to pick is the same rule as everywhere else in this chapter: divide your shuffle volume by a hundred and twenty-eight megabytes. Two gigabytes wants about sixteen partitions. Five hundred gigabytes wants around four thousand. And the honest modern answer is that you often should not set it at all, because adaptive query execution will coalesce the partitions down based on the actual sizes it measures at runtime — which is almost always better than your estimate. We will get to that in section seven. Next: the join, which is where the biggest single win usually is.',
}
