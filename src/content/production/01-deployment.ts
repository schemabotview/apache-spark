import type { Section } from '../types'

export const deployment: Section = {
  id: 'deployment',
  title: 'Deployment architectures',
  scene: 'deployment-shapes',
  focus: 'rule',
  slide: `## Deployment architectures

Chapter 2 covered *where* the driver runs. This is a different question people conflate with it: what **shape** is this workload?

### Three shapes, one engine
- **Interactive** — notebooks and ad-hoc work. A shared cluster, alive for hours
- **Scheduled batch** — the overwhelming majority of production Spark. A cluster per run
- **Always-on streaming** — chapter 7, running forever

### What actually differs is the cluster's lifetime
- Interactive is sized for the busiest user and bills while people are **thinking**
- Batch is sized for one job and bills for exactly the work

### Prefer job clusters
- They start, do the work, and die. Nothing is left running for someone to forget about`,
  narration:
    'Last chapter. Everything so far has been about making Spark do the right thing, and do it quickly. This one is about running it somewhere real, with other people, for a long time. We start with a distinction people routinely conflate with chapter two\'s deployment modes. Chapter two told you where the driver runs — local, standalone, YARN, Kubernetes, client or cluster mode. That is a mechanical question. This is a different one: what shape is this workload, because that decides the cluster\'s lifetime, and the cluster\'s lifetime is where your bill comes from. There are three shapes. Interactive: notebooks, exploration, ad-hoc analysis. A shared cluster that stays alive for hours while people work. Scheduled batch: a pipeline that runs at two in the morning, does its work, and finishes — this is the overwhelming majority of production Spark, whatever the conference talks suggest. And always-on streaming: chapter seven\'s world, a query that never stops. Now compare what they actually cost, because this is where the mistakes are made. An interactive cluster is sized for the busiest user on it, and it bills while people are thinking, reading, in meetings. That is not waste exactly — it is the price of having something warm to type into — but you should know you are paying it. A batch job cluster is sized for exactly one job, exists for exactly as long as that job takes, and bills for the work and nothing else. A streaming cluster is sized for the peak arrival rate and bills for every second, including the quiet ones at four in the morning. So the practical guidance is: prefer job clusters by default. A job cluster starts, does the work, and dies, which means there is nothing left running for somebody to forget about — and forgotten clusters are a genuinely common line item. Share a cluster only when sharing is actually the point, which really means interactive exploration where people need something already warm. And for streaming, think hard about whether you need a continuously running query or whether chapter seven\'s availableNow trigger on an hourly schedule gives you what you need at a fraction of the cost. A great many streaming requirements turn out to be hourly requirements in disguise. Next: how big does that cluster need to be?',
}
