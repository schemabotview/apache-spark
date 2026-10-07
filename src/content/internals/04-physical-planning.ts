import type { Section } from '../types'

export const physicalPlanning: Section = {
  id: 'physical-planning',
  title: 'Physical planning',
  scene: 'physical-choice',
  focus: 'stats',
  slide: `## Physical planning

One logical node, several physical ways to do it, and a cost model that picks. This is where a plan stops being obvious.

### The same join, three ways
- **Broadcast hash** — ship the small side to every executor. No shuffle at all
- **Sort-merge** — shuffle both sides, sort both, walk them together. The default for large joins
- **Shuffle hash** — shuffle both, build a hash table on one side

### How it chooses
- Mostly on **estimated size**: under \`autoBroadcastJoinThreshold\` (10 MB default) → broadcast

### The caveat that matters more than the mechanism
- The cost model runs on **statistics**, so the chosen plan is the cheapest *estimate*
- Stale or missing stats give a confidently wrong plan — which is exactly why **AQE** exists`,
  narration:
    'Physical planning is where the plan stops being obvious, because now we are choosing methods rather than meanings. A logical operator says join these two datasets on this key. It does not say how. And there are several ways to execute a join, which are genuinely different algorithms with genuinely different costs. Look at the fan on the board: one logical join node, three physical candidates. The first is a broadcast hash join. If one side is small enough, Spark sends a complete copy of it to every executor, and then each task joins its partition of the big side against that local copy. The enormous advantage is that the big side never moves — there is no shuffle at all. This is the fastest join Spark has, by a wide margin, when it applies. The second is a sort-merge join, which is the default for two large datasets. Both sides are shuffled so that matching keys land on the same task, both sides are sorted by the key, and then the two sorted streams are walked together. Two shuffles and two sorts, which is why it costs what it does. The third is a shuffle hash join: shuffle both sides, then build a hash table from one side in memory rather than sorting. Sometimes faster than sort-merge, more memory-hungry, and Spark is conservative about choosing it. So how does it decide? Mostly on one number: the estimated size of each side. If one side\'s estimate is below the auto broadcast join threshold — ten megabytes by default — Spark picks broadcast. Otherwise it generally picks sort-merge. It also considers whether a side is already sorted or already partitioned on the join key from an earlier step, in which case a shuffle can be skipped entirely. And here is the caveat that matters more than the mechanism, so I want to be precise about it. The cost model runs on statistics — file sizes, row counts, and sometimes column histograms. The plan Spark picks is the cheapest estimate, not the cheapest plan. When the statistics are missing, stale, or thrown off by a filter the optimiser cannot see through, Spark will confidently choose a bad plan. The classic case: a table is genuinely small after filtering, but the statistics describe it before filtering, so Spark sort-merge joins two datasets when it could have broadcast one, and the job takes twenty times longer than it should. This is such a common failure that Spark grew a whole mechanism to fix it at runtime — adaptive query execution, which re-plans using actual sizes once a stage has finished. That is chapter six. Next: what the data looks like in memory while all this runs.',
}
