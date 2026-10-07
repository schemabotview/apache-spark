import type { Section } from '../types'

export const driverExecutors: Section = {
  id: 'driver-and-executors',
  title: 'Driver, executors, workers, managers',
  scene: 'application-shape',
  focus: 'w1',
  slide: `## Driver, executors, workers, managers

Four roles. The useful thing is not the list but the **conversation** between them — it is the same three steps every time.

### Who is who
- **Driver** — plans, schedules, tracks. One per application
- **Cluster manager** — owns the machines and hands them out. YARN, Kubernetes, standalone
- **Worker** — a *machine* with capacity · **Executor** — a *process* on it, several per machine
- Worker ≠ executor: the worker is hardware, the executor is what you are paying for

### The startup conversation
1. The driver asks the manager for N executors, with so many cores and so much memory each
2. The manager finds machines with room and starts an executor JVM on each
3. Each executor **registers back** with the driver — only now can it be sent work`,
  narration:
    'There are four roles in a running Spark application, and while the list is easy, the thing that actually makes it click is the conversation between them. Let me name them first. The driver you have met: it plans, schedules and tracks, and there is one per application. The cluster manager is a separate system that owns the machines and hands them out — that is YARN, or Kubernetes, or Spark\'s own standalone manager. A worker is a machine with spare capacity. And an executor is a process running on a worker. That last distinction is the one people get wrong, so hold onto it: a worker is hardware, an executor is a process, and one worker machine can comfortably host several executors. They are not two names for the same thing, and when you are sizing a cluster you are buying workers but configuring executors. Now the conversation, which happens the same way every single time an application starts. Step one: the driver starts up and goes to the cluster manager with a request. It says, in effect, give me N executors, each with this many cores and this much memory. Those numbers come from your submit command or your config. Step two: the cluster manager looks across the machines it owns, finds ones with enough free capacity, and starts an executor JVM on each of them. Notice the manager is doing the placing — the driver does not pick machines, it only states requirements. Step three, and this is the one that is almost never mentioned: each executor, once it is alive, registers back with the driver. It connects and announces itself. And only after that registration can the driver send it any work at all. That is why a Spark application has a startup cost, and why you will sometimes watch a job sit there doing nothing for twenty seconds — it is waiting for executors to come up and check in. One more thing about the driver before we move on. It holds no data and does no processing; it is purely a coordinator. It becomes a bottleneck only when you force it to be one, and the classic way to do that is calling collect, which pulls every row from across the cluster back into the driver\'s own memory. Many an out-of-memory error is exactly that. Next, the object in your code that represents all of this.',
}
