import type { Section } from '../types'

export const jobDecomposes: Section = {
  id: 'job-decomposes',
  title: 'A job decomposes: job → stages → tasks',
  scene: 'arch-execution',
  slide: `## Job → Stages → Tasks

Your code doesn’t run as you write it — an **action** compiles it into a tree of work.

### One action → one job
- Transformations (\`filter\`, \`groupBy\`) are **lazy** — they just build a plan
- An **action** (\`count\`, \`collect\`, \`write\`) is what submits a **job**

### One job → stages
- The **DAG scheduler** cuts the job into **stages** at every **shuffle**
- Work that flows without moving data across the network stays in **one stage**

### One stage → tasks
- Each stage fans out into **tasks** — **one task per partition**
- A task is the unit Spark ships to an executor **slot** to run

So the whole hierarchy is: action → job → stages → tasks — and tasks are what actually run.`,
  narration:
    'Here’s something that surprises people: the code you write doesn’t run line by line as you type it. Transformations like filter and groupBy are lazy — calling them just adds to a plan, and nothing actually executes. It’s only when you call an action — something that needs a real answer, like count, collect, or write — that Spark takes that whole plan and submits it as a single job. From there, the driver’s DAG scheduler cuts the job into stages, and the rule is about data movement: as long as each record can be processed where it already sits — a filter, a map — the work stays inside one stage; but the moment the computation needs to bring related records together across the network, like this groupBy, Spark has to shuffle the data, and a shuffle is exactly where one stage ends and the next begins. Our little job has a single shuffle, so it splits into two stages — Stage 0 does the narrow map-and-filter work, the shuffle redistributes, and Stage 1 finishes the aggregation. Finally, each stage fans out into tasks, and this is the level that actually runs: a task is the work for one partition of the data, so Stage 0’s four partitions become four tasks, and after the shuffle Stage 1’s two partitions become two tasks. Every one of these tasks is the same code pointed at a different slice of data — the exact unit the driver ships out to the executor slots we saw earlier. So the full hierarchy is action, to job, to stages, to tasks — and it’s the tasks, running in those slots, where your data is really processed.',
}
