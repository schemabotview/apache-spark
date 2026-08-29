import type { Section } from '../types'

export const deployModes: Section = {
  id: 'deploy-modes',
  title: 'Where the driver runs: deploy modes',
  scene: 'arch-deploy',
  slide: `## Deploy modes

You choose **where the driver process runs** — and it decides who’s in charge if your machine drops.

### Client mode
- Driver runs on the **machine that submits** the job — your laptop or an edge node
- Ideal for **interactive** work — shells, notebooks — output streams back live
- But if that machine disconnects, the driver dies and the **whole job dies**

### Cluster mode
- Driver runs **inside the cluster**, as another container the manager launches
- Survives your laptop closing — built for **production, scheduled** jobs
- You lose the live console; you read progress through the manager’s logs

### How you pick
- One flag: \`spark-submit --deploy-mode client|cluster\`
- Interactive sessions default to **client**; schedulers almost always use **cluster**`,
  narration:
    'Before we follow the driver’s request down to the cluster, there is one choice that decides where the driver process physically lives — the deploy mode — and it matters more than it sounds. In client mode, the driver runs on the same machine that submitted the job: your laptop, or an edge node. That is ideal for interactive work like shells and notebooks, because the driver is right there and results stream straight back to you — but it comes with a catch: if that submitting machine disconnects, the driver goes with it and the whole job dies. In cluster mode, the driver instead runs inside the cluster itself, as just another container that the cluster manager launches and supervises. Now the job survives your laptop closing, which is exactly what you want for production and scheduled pipelines — the trade-off is that you lose the live console and read progress through the cluster manager’s logs instead. You pick between them with a single flag on spark-submit — deploy-mode client or cluster; interactive sessions default to client, while schedulers almost always choose cluster. And either way it is the very same application code — the deploy mode only decides where the driver lives, not what it does.',
}
