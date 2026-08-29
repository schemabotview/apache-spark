import type { Section } from '../types'

export const executorsSection: Section = {
  id: 'executors',
  title: 'Executors & slots: where work runs',
  scene: 'arch-executors',
  slide: `## Executors & slots

Executors are the **workers** — a JVM on each node, running your tasks in parallel **slots**.

### The executor
- A **JVM process** the cluster manager launches on a worker node
- **Long-lived** — it stays up for the whole application, reused across jobs
- Usually one (or a few) per node — so **many nodes** = your parallelism

### Slots = task capacity
- Each executor’s **cores** become **slots** — its task capacity
- One slot runs **one task** at a time — a task = work on **one partition**
- Total slots across all executors = how many tasks run **at once**

### Reporting back
- Executors **heartbeat** the driver and return each task’s result

Data lives in partitions, tasks run in slots — the executor’s *memory* comes next.`,
  narration:
    'Now we reach the executors — the processes where your work actually runs. When the cluster manager grants resources, it launches an executor on each worker node, and an executor is simply a JVM process. Crucially, it’s long-lived: it starts up and stays alive for the entire application, reused across every job you run, rather than being spun up and torn down each time. Usually there’s just one executor, or a few, per worker node — so your real parallelism comes from having many nodes. Inside each executor, the cores it was given become slots, and those slots are its task capacity: each slot runs exactly one task at a time, where a task is the unit of work over a single partition of your data. Add up the slots across every executor and that’s how many tasks Spark can run at once — that number is your parallelism. As they work, the executors heartbeat back to the driver and return their results. So the picture so far is this: your data is split into partitions, and tasks run those partitions in the executors’ slots. The other half of an executor — the memory it uses to cache data — is what we’ll look at a little later.',
}
