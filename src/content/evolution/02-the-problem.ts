import type { Section } from '../types'

export const theProblem: Section = {
  id: 'the-problem',
  title: 'The problem statement',
  scene: 'evo-problem',
  slide: `## The problem statement

By the mid-2000s, data had outgrown the single machine.

### The shift
- Datasets grew past one machine's disk and memory
- Scaling *up* — a bigger box — hit a hard ceiling of cost and physics
- Scaling *out* across cheap commodity machines was the only affordable path

### But a cluster is hard
- Machines **fail** constantly at scale — the system must expect it
- Data must be **spread and replicated** across many disks
- Work must be **split, shipped to the data, and recombined**

### So it demands
- A **distributed storage** layer — one filesystem over many disks
- A **distributed programming model** — compute that moves to the data`,
  narration:
    'To understand Spark, start with the problem it was built for. By the mid-2000s, datasets had simply outgrown what any single machine could hold or process. Buying a bigger box — scaling up — hit a hard ceiling of both cost and physics, so the only affordable path was to scale out, spreading the work across a cluster of cheap, commodity machines. But a cluster brings its own problems: at that scale machines fail all the time, so the system has to expect failure; the data has to be spread and replicated across many disks; and the computation has to be split up, shipped to wherever the data lives, and then recombined. Solving that cleanly needs two things working together — a distributed storage layer that acts like one filesystem over many disks, and a distributed programming model where the compute moves to the data. That pairing is exactly what Hadoop set out to build.',
}
