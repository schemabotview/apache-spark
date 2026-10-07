import type { Section } from '../types'

export const capacitySection: Section = {
  id: 'capacity',
  title: 'Resource sizing and capacity',
  scene: 'capacity',
  focus: 'measure',
  slide: `## Resource sizing and capacity

"How big a cluster do I need" is a calculation, not a guess. Chapters 2 and 6 gave you every number in it.

### The chain, forwards
- **600 GB** to read ÷ 128 MB per partition = **~4,800 partitions**, so 4,800 tasks
- Measure one task on a sample: **~20 s** → 4,800 × 20 = **96,000 core-seconds**
- Inside 30 minutes: 96,000 ÷ 1,800 s = **~54 cores** → at 5 cores each, **11 executors**

### Two things the arithmetic cannot see
- **Shuffle volume** — a wide job needs memory and local disk the read alone never showed
- **Skew** — the slowest task sets the floor, no matter what the average says

### So measure, then scale
- Run it on 1% of the data, take the real task time, and multiply
- The arithmetic gives you the ballpark; the sample gives you the number`,
  narration:
    'How big a cluster do I need is the question every data engineer gets asked, and it is usually answered with a shrug and someone else\'s config. It is a calculation, and you already have every number in it from chapters two and six. Let me do it forwards. Suppose you have six hundred gigabytes of compressed Parquet to process, and it needs to finish inside thirty minutes. Start with partitions. Chapter six said aim for about a hundred and twenty-eight megabytes per partition, so six hundred gigabytes divided by a hundred and twenty-eight megabytes is roughly four thousand eight hundred partitions. Chapter two told us that gives four thousand eight hundred tasks, because tasks equal partitions. Next, how long does one task take? Do not guess this — measure it. Run the job on a small sample and look at the median task duration in the UI. Say it is twenty seconds. Now multiply: four thousand eight hundred tasks at twenty seconds each is ninety-six thousand core-seconds of work. That is a property of the job, independent of your cluster. Thirty minutes is eighteen hundred seconds. Ninety-six thousand divided by eighteen hundred is about fifty-four. So you need roughly fifty-four cores running continuously to finish in time. At chapter six\'s sweet spot of five cores per executor, that is eleven executors. There is your cluster. Now, two things that arithmetic cannot see, and you must sanity-check both. The first is shuffle volume. The calculation above is about reading and processing; a job with a big shuffle also needs memory to hold it and local disk to spill it, and a cluster sized purely on core-seconds may be correct on CPU and fail on memory. The second is skew, from chapter six section five. All of this is average-based, and if one partition holds forty times what the others hold, your stage takes as long as that one task regardless of how many cores you bought. The average said thirty minutes; the reality is the slowest task plus everything before it. So the honest procedure is: do the arithmetic to get a ballpark, then run the job on one percent of the data on a small cluster, measure the real task time and the real shuffle volume, and scale from the measurement. The arithmetic tells you whether you need ten executors or a thousand. The sample tells you the number. Next, the two platforms you will run it on.',
}
