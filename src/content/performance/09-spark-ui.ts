import type { Section } from '../types'

export const sparkUiSection: Section = {
  id: 'spark-ui',
  title: 'Reading the Spark UI',
  scene: 'spark-ui',
  focus: 'done',
  slide: `## Reading the Spark UI

The deliverable of this chapter. A method, so that "this job is slow" stops being a guessing game.

### The order
1. **Find the slowest stage** — sort stages by duration. One usually dominates
2. **Open its task summary** — min, median, max duration and shuffle read
3. **Name the cause** from the numbers before touching anything
4. **Change one thing**, then measure again

### What the numbers mean
- Max ≫ median → **skew** · Spill non-zero → **partitions too big**
- Thousands of millisecond tasks → **too many partitions**
- Huge shuffle read on one stage → **a join that should have broadcast**

### The habit that matters
- Two of those four steps are looking. Only the last one changes anything`,
  narration:
    'This is the section the chapter exists for. Everything so far has been a technique; this is the order you apply them in, so that this job is slow stops being a guessing game. The failure mode I want you to avoid is the common one: somebody says the job is slow, and the response is to change three configuration settings at once, rerun, and see if it got better. That is not debugging, and when it accidentally works you have learned nothing you can reuse. Here is the method, and it is four steps, of which only the last changes anything. Step one: find the slowest stage. Open the Spark UI, go to the Stages tab, sort by duration. There is almost always one stage dominating the job, and optimising any other stage is wasted effort. Step two: open that stage and read the task summary table. Spark gives you minimum, twenty-fifth percentile, median, seventy-fifth, and maximum, for duration, for shuffle read, for spill. Do not skip to conclusions; just read the distribution. Step three: name the cause from those numbers, before touching anything. And now the numbers tell you specific things. If maximum duration is dramatically above the median, that is skew — section five. If spill memory and spill disk are non-zero, your partitions are too large for the memory available, which is section one. If you see thousands of tasks each taking tens of milliseconds, you have too many partitions and you are paying pure scheduling overhead — sections one and two. If one stage shows an enormous shuffle read while the others show little, you are almost certainly sort-merge joining something that should have been broadcast, which is section three. If the executors tab shows a large fraction of time in garbage collection, your heap is too small for what you are doing, or you are caching too much — sections four and eight. And if you look at the stage\'s plan and its operators have no star-number markers, a UDF has broken whole-stage code generation, which is section six by way of chapter five. Step four: change exactly one thing, and measure again. One, because if you change three and it gets faster you do not know which one did it, and one of the other two may have made it worse. This matters even more than it sounds, because Spark performance work is full of changes that help one stage and hurt another. And that closes chapter six. You should now be able to take a job you have never seen, find where its time is going, name the cause from evidence, and fix it deliberately rather than by trying things. Two chapters remain. The next one takes the entire model we have built — partitions, stages, shuffles, plans — and extends it to data that never stops arriving.',
}
