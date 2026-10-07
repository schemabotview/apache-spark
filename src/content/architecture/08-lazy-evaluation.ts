import type { Section } from '../types'

export const lazyEvaluation: Section = {
  id: 'lazy-evaluation',
  title: 'Lazy evaluation and actions',
  scene: 'lazy-and-actions',
  slide: `## Lazy evaluation and actions

Now the reveal: while those first three lines ran, **nothing happened on the cluster**. No stages, no tasks, no waves.

### Two kinds of call
- A **transformation** describes a new dataset and returns another DataFrame. It does not run
- An **action** asks for a real result — and submits a job to get it

### The test is mechanical
- Hands you back a **DataFrame** → transformation, nothing happened
- Hands you back a **value**, or writes something → action, you just paid for a job

### Why Spark bothers
- Waiting lets it see the **whole plan** before choosing how to run any of it
- So it can reorder filters, fuse steps, and skip columns nobody asked for
- The cost: your bug surfaces at the **action**, not at the line that caused it`,
  narration:
    'Here is the reveal this chapter has been building to. Look at the code. The first line reads a parquet file. The second filters it. The third groups and counts. And on the cluster, during all three of those lines, nothing happened. No executor did any work. No stage ran. No task was scheduled. Not one byte of that file was read. Spark simply wrote down what you asked for and returned immediately. It is only the fourth line — show — that makes the cluster do anything, and at that moment it does all of it. This is lazy evaluation, and it splits every Spark call into two categories. A transformation describes a new dataset from an existing one and hands you back another DataFrame. It does not run. An action asks for an actual result — a number, some rows, a file on disk — and to produce that result it has to submit a job and wait. Now, how do you tell which is which without memorising lists? The test is mechanical, and it is the return type. If a call hands you back another DataFrame, it is a transformation and nothing has happened. If it hands you back a value, or writes something somewhere, it is an action and you have just paid for a full job. Select, filter, join, groupBy all return DataFrames — lazy. Count returns a number, collect returns rows, show prints, write produces files — all actions. So why does Spark do this? Because of the thing we saw in the last section: by waiting until you ask for a result, Spark gets to see the entire plan at once before deciding how to execute any of it. And with the whole picture it can do things no step-at-a-time system could. It can push your filter down so it happens during the read instead of after it. It can fuse several narrow operations into one pass. It can notice you only ever use three columns and never read the other fifty from disk at all. Chapter five is entirely about those optimisations. There is a cost, and you should know it before it bites you. Your error does not surface at the line that caused it. You can write a bad filter on line two and get a stack trace on line forty where the action is, pointing at code that looks fine. Once you know the execution is deferred, that stops being mysterious. One thing left: where all of this physically runs.',
}
