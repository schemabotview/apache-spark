import type { Section } from '../types'

export const jobsStagesTasks: Section = {
  id: 'jobs-stages-tasks',
  title: 'Jobs, stages and tasks',
  scene: 'job-stage-task',
  focus: 'rule',
  slide: `## Jobs, stages and tasks

Three words you will read off the Spark UI for the rest of your career. They are **nested scopes**, not three steps.

### The nesting
- A **job** is all the work one *action* needs — one action, exactly one job
- A **stage** is a run of work that needs **no shuffle**. A job is a sequence of stages
- A **task** is one stage's work on **one partition** — the smallest unit Spark schedules

### The two rules that make it predictable
- **Jobs = actions you called.** Counting your actions counts your jobs
- **Tasks in a stage = that stage's partitions.** Not a setting — a consequence

### What cuts a stage
- Only a **shuffle**. A stage runs until data has to move between machines, then ends
- So the stage count is the number of shuffles, plus one`,
  narration:
    'Job, stage, task. Three words, and if you get the relationship between them right, the Spark UI stops being intimidating. The most important thing is that these are not three steps in a sequence. They are nested scopes — a job contains stages, and a stage contains tasks — and the UI is organised by exactly that nesting. Start with the job. A job is all the work needed to satisfy one action. One action, exactly one job. If your program calls three actions, your application runs three jobs, and that is a rule you can apply by reading your own code. Inside the job are stages. A stage is a run of work that can happen without any data moving between machines — no shuffle. The job is a sequence of these stages, and crucially, they are sequential: stage one cannot start until stage zero has finished, because it needs stage zero\'s output. And inside a stage are tasks. A task is that stage\'s work applied to exactly one partition. It is the smallest thing Spark schedules, the thing that actually gets sent to an executor and run on a core. Now, two rules fall out of this that make everything predictable. The first: jobs equal the actions you called. The second, and this is the one worth tattooing somewhere: the number of tasks in a stage equals that stage\'s number of partitions. It is not a setting you tune. It is a consequence of how the data is split. If a stage shows two hundred tasks in the UI, that stage had two hundred partitions, and if you want a different number of tasks you change the partitioning, not some task setting. Notice on the board that stage zero has four tasks and stage one has three. That is deliberate — the task count belongs to each stage individually, not to the job, because the partition count can change across a shuffle. And that brings us to the last question: what cuts a stage? There is exactly one answer. A shuffle. A stage runs for as long as the work can stay on the machine where the data already is, and it ends the moment data has to move. So the number of stages is the number of shuffles plus one. We will define a shuffle precisely in two sections. First, the arithmetic of actually running those tasks.',
}
