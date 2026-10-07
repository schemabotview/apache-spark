import type { Section } from '../types'

export const deploymentModes: Section = {
  id: 'deployment-modes',
  title: 'Where it all runs',
  scene: 'deployment-modes',
  slide: `## Where it all runs

Same application, same code — four different things can hand out the machines, and one flag decides where the driver lives.

### The four
- \`local[*]\` — one JVM, threads instead of executors. Development, tests, CI
- **Standalone** — Spark's own manager, for a box dedicated to Spark
- **YARN** — Hadoop's resource manager, where a Hadoop estate already exists
- **Kubernetes** — executors as pods; the usual choice for anything new

### \`--deploy-mode\` decides where the driver runs
- **client** — the driver runs on *your* machine. Close the laptop and the job dies
- **cluster** — the driver runs *inside* the cluster and survives you. Use this in production

### Where this leaves you
- You can read a program and predict its jobs, stages and roughly its task count`,
  narration:
    'Last section of the chapter, and it is the one that connects everything abstract we have drawn to things you will actually type. Your application code does not change across any of these; what changes is who hands out the machines. There are four options. Local mode, written local with a star in brackets, is not really a cluster at all: one JVM, and threads standing in for executors. The star means use all the cores on this machine. This is where you develop, where your tests run, and where CI runs — and it is genuinely useful, because the same code runs there as in production. Standalone mode is Spark\'s own built-in cluster manager. It is simple and it works well when the machines are dedicated to Spark and nothing else is competing for them. YARN is Hadoop\'s resource manager, and if your organisation already has a Hadoop estate, this is almost certainly where Spark runs, sharing those machines with everything else scheduled there. And Kubernetes runs your executors as pods. This is the usual choice for anything being built today, because it is how everything else in the stack is already deployed. Now the second half, and this is the flag people copy without reading. Whichever manager you choose, the driver still has to run somewhere, and deploy-mode decides where. In client mode, the driver runs on the machine you submitted from — your laptop, or a gateway box. That is fine for interactive work, because you want the output coming back to your terminal. But it has an obvious consequence: close the laptop, or lose the network, and the driver dies, and the whole application dies with it. In cluster mode, the driver is launched inside the cluster itself, as just another container the manager scheduled. You submit, you get a handle back, and you can walk away — the application survives you. That is what you want in production, every time. And that closes chapter two. You can now take a program you have never seen, count the actions to get the jobs, count the wide dependencies to get the stages, and look at the partition count to get the tasks — all before running it. What you cannot do yet is write anything interesting, because we have barely touched the APIs. That is next: RDDs, DataFrames and Spark SQL, and when to reach for which.',
}
