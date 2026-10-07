import type { Section } from '../types'

export const aqeSection: Section = {
  id: 'aqe',
  title: 'Adaptive Query Execution',
  scene: 'aqe',
  focus: 'still',
  slide: `## Adaptive Query Execution

Chapter 5 ended on a caveat: the cost model plans from statistics, so a bad estimate gives a confidently bad plan. AQE is the fix.

### Re-planning with real numbers
- At each shuffle boundary a stage has just finished, so Spark knows **actual** sizes

### The three it does
- **Coalesces shuffle partitions** — your 200 becomes whatever the data needed
- **Switches sort-merge to broadcast** — when a filter made one side small after planning
- **Splits a skewed partition** — statistics describe averages; AQE sees the outlier

### Reading it in a plan
- \`AdaptiveSparkPlan isFinalPlan=false\` — what you're reading is still a guess
- Run it, then look again: \`isFinalPlan=true\`, and the join may have changed underneath you`,
  narration:
    'Chapter five ended on a caveat I promised to come back to. The cost model plans your query using statistics — file sizes, row counts, estimates. And when those statistics are missing, stale, or thrown off by a filter the optimiser could not see through, Spark produces a confidently wrong plan. It will sort-merge join two datasets when one of them is actually tiny, and the job takes twenty times longer than it needed to, and nothing in the plan looks obviously wrong. Adaptive query execution is the fix, and the idea behind it is elegant. Remember that a shuffle is a hard boundary: the stage before it must completely finish before the stage after it can start. At that moment, Spark is not estimating anything — it has just written the data and it knows exactly how big it is, how many rows there are, and how they are distributed. AQE uses that moment. At each shuffle boundary, it takes the real numbers and re-plans the remainder of the query. It does three things, and they are worth knowing by name because you will see them in the UI. First, it coalesces shuffle partitions. You set two hundred, or you left the default; AQE looks at the actual output size and merges them down into however many give sensible task sizes. This is why I said in section two that you often should not set that number at all. Second, it switches a sort-merge join to a broadcast join. The plan said both sides were large, but one of them turned out small after filtering, and now that Spark can see that, it changes the strategy mid-query. Third, it splits skewed partitions, which is the AQE fix from section five: it detects a partition much larger than its peers and divides it so several tasks share the work. It has been on by default since Spark three point two. And here is the practical consequence for reading plans, which catches people out. When AQE is on, explain shows you a tree wrapped in AdaptiveSparkPlan with isFinalPlan equals false. That is Spark telling you plainly: this is my current guess and I expect to change it. If you debug that plan, you may be debugging something that never ran. Run the query, then look at the plan again — in the SQL tab of the UI, you will see isFinalPlan true, and the join at the bottom may have become a different join entirely. One honest limit: AQE fixes plans, not data. It cannot undo a badly laid out table, it cannot invent statistics that were never collected, and it will not rescue a job whose real problem is reading ten times more data than it needs. It is a very good safety net under a plan, not a substitute for the earlier sections. Next: the resources all of this runs on.',
}
