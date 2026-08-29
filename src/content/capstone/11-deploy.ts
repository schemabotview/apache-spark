import type { Section } from '../types'

export const deploy: Section = {
  id: 'deploy',
  title: 'Run · Deploy on a cluster',
  scene: 'cap-deploy',
  slide: `## Run · Deploy on a cluster

Package the code and **submit both jobs** — the streaming job runs forever in **cluster mode**; the batch job is **scheduled** nightly.

### What’s happening
- **cluster mode** → the streaming driver lives in the cluster and survives your laptop
- Executor **cores / memory** set your parallelism; **dynamic allocation** scales the batch job
- One cluster manager (YARN / K8s) runs both — exactly the runtime from the architecture course

**Exercises:** deploy modes · cluster manager · executor config · dynamic allocation (\`architecture\`)`,
  narration:
    'The pipeline is written; now we run it, and this is where the architecture course comes straight back. Both jobs go to the cluster with spark-submit, and the flags encode decisions we studied. We point master at the cluster manager — YARN here, though it could just as easily be Kubernetes — and for the streaming job we choose cluster deploy mode, so the driver runs inside the cluster rather than on our laptop; that’s essential, because a streaming job runs indefinitely and must survive our machine disconnecting. We size the executors — ten of them, four cores and eight gigabytes each — and those numbers are our parallelism: forty task slots running at once, each with its share of memory. For the batch job we turn on dynamic allocation, so it grabs executors when there’s work and releases them when idle, instead of holding the whole cluster all night. And notice both jobs share one cluster manager — the exact driver, cluster-manager, executors picture we took apart earlier, now with our own code running through it. This is the payoff of understanding the runtime: deploy mode, executor sizing, dynamic allocation aren’t mysterious flags, they’re direct consequences of how a Spark job runs. The jobs are live. The last thing any real engineer does is open the Spark UI and make them faster.',
}
