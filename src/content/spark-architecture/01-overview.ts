import type { Section } from '../types'

export const overview: Section = {
  id: 'overview',
  title: 'How a Spark job runs',
  scene: 'arch-topology',
  slide: `## How a Spark job runs

Every Spark job is a conversation between **three kinds of process**.

### The three roles
- **Driver** — *your* program; turns your code into a plan and coordinates everything
- **Cluster Manager** — owns the machines and hands out the ones the driver asks for
- **Executors** — the workers that run your tasks and hold your data in memory

### One request, top to bottom
- The driver asks the cluster manager for resources
- The manager **launches an executor** on each granted node
- The driver then drives those executors directly for the rest of the job

### What this course follows
- How the driver compiles your code into **jobs → stages → tasks**
- How tasks are scheduled onto executor **slots**
- Where the driver runs (**deploy modes**) and how executors **cache** data`,
  narration:
    'Before we take anything apart, here is the whole machine at a glance. Every Spark job runs as a conversation between three kinds of process. At the top is the driver — that is your program; it takes the code you wrote and turns it into a plan, then coordinates the entire job. The driver cannot run anything on its own, so it turns to the cluster manager, which owns the pool of machines and hands out the ones the driver asks for. On each machine it grants, the manager launches an executor — and those executors are the real workers: they run your tasks and hold your data in memory. The flow is top to bottom — the driver requests resources, the manager launches executors, and from then on the driver drives those executors directly. Over the course we will follow how the driver compiles your code into jobs, stages, and tasks; how those tasks get scheduled onto the executors’ slots across a shuffle; and the details around it — where the driver itself runs, and how executors cache data. That is the whole machine, drawn in full — we will walk it top to bottom, the driver first, then the cluster manager, then the executors, and finish by watching a real job flow through it.',
}
