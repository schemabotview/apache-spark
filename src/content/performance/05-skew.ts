import type { Section } from '../types'

export const skewSection: Section = {
  id: 'skew',
  title: 'Data skew',
  scene: 'skew',
  focus: 'tell',
  slide: `## Data skew

One partition far larger than the rest. The stage cannot finish until it does, so most of your cluster waits.

### What it looks like
- Five tasks: four hold about a million rows, one holds **48 million**
- Those four finish in seconds. The stage takes as long as the fifth

### The tell in the UI
- In the stage's task summary, **max duration ≫ median duration**
- Same story in Shuffle Read Size. One row of the table is nothing like the others

### Three ways out, in this order
1. **Let AQE split it** — it detects an oversized partition and divides it. Free, and often enough
2. **Broadcast the other side** — no shuffle means no skew, if one side is small enough
3. **Salt the key** — append a random suffix, aggregate twice. Effective, invasive, last resort`,
  narration:
    'Skew is one partition being far larger than the others, and it is probably the most common cause of a Spark stage that takes dramatically longer than it should. Look at the chart. Five partitions after grouping by country. Four of them hold somewhere around a million rows. One holds forty-eight million. That is not a contrived example — it is what real data looks like when you group by anything with a natural concentration: country, customer, product category, or the null key that everything with missing data falls into. Now think about what happens when that stage runs. Five tasks start. Four of them finish in a few seconds. The fifth has forty-eight times the work and runs for forty minutes. And a stage is not finished until all of its tasks are finished, so the next stage cannot start. For those forty minutes your cluster is almost entirely idle — four slots doing nothing, one slot doing everything. Nothing is broken. Nothing errors. You simply bought a cluster and are using one core of it. The tell is easy to spot once you know to look. In the stage detail page, Spark gives you a summary of task metrics: minimum, twenty-fifth percentile, median, seventy-fifth, and maximum. If the maximum duration is dramatically larger than the median — ten times, a hundred times — that is skew, and no other explanation fits that shape. The same pattern shows in Shuffle Read Size: one row of that summary unlike all the others. Three ways out, and genuinely try them in this order. First, let adaptive query execution handle it. AQE detects a partition that is much larger than its peers after a shuffle and splits it into several smaller ones that run in parallel. It is on by default in recent Spark, it costs you nothing, and for moderate skew it is often the whole fix. Second, broadcast the other side, if you can. No shuffle means no regrouping by key, which means the skewed key never concentrates anywhere — the skew simply does not arise. Third, and only if the first two fail: salting. You append a random number to the key, so one hot key becomes, say, a hundred keys that spread across partitions, you aggregate those, then strip the salt and aggregate again. It works, and it is genuinely invasive — it changes your code, it needs a second aggregation pass, and it has to be undone carefully. Treat it as a last resort rather than a party trick. Next: making sure you never read the data in the first place.',
}
