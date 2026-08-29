import type { Section } from '../types'

// Reuses the arch-topology spine (no dedicated scene): this is where the two halves of the course —
// the plan (jobs→stages→tasks) and the machines (driver/manager/executors) — finally meet. The
// "tasks land on slots" hand-off rides the slide; per the 2a decision the spine deliberately omits
// the driver→slot dispatch edges so the shared solid topology stays clean.
export const tasksToSlots: Section = {
  id: 'tasks-to-slots',
  title: 'Tasks land on slots: plan meets machines',
  scene: 'arch-topology',
  slide: `## Tasks land on slots

This is where the two halves meet: the driver’s tasks are shipped to the executors’ **slots**.

### The hand-off
- The **Task Scheduler** holds the tasks for the current stage
- It sends each task to a **free slot** on an executor, which runs it
- The result goes back to the driver and the slot **frees up** for the next task

### Locality — send code to data
- Spark prefers a slot on the node that **already holds** that partition
- Moving a little code beats moving lots of data — **data locality**

### Keeping every slot busy
- More tasks than slots? They **queue** and run in waves as slots free up
- When a stage’s tasks all finish, the driver launches the **next stage**

Repeat stage by stage to the end of the job — that’s a Spark application, running.`,
  narration:
    'We’ve seen the plan — jobs, stages, and tasks — and we’ve seen the machines — the driver, the cluster manager, and the executors. This is where the two finally meet. Once the driver’s task scheduler has the tasks for the current stage, it starts handing them out: each task is sent to a free slot on one of the executors, the executor runs it, returns the result to the driver, and that slot immediately frees up to take the next task. But the scheduler doesn’t pick slots at random — wherever it can, it sends a task to a slot on the executor that already holds that task’s partition in memory. That’s data locality, and it’s a core Spark idea: it is far cheaper to ship a little bit of code to where the data already lives than to drag the data across the network to the code. If there are more tasks than there are slots — which is completely normal — the extra tasks simply queue and run in waves as slots free up, and the scheduler’s whole job is to keep every slot busy until the stage is finished. Then, when all the tasks in a stage are done, the driver launches the next stage, and repeats that all the way to the end of the job. That loop — schedule tasks onto slots, run them where the data lives, move to the next stage — is a Spark application actually running.',
}
