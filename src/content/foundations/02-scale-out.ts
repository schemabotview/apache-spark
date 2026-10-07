import type { Section } from '../types'

export const scaleOut: Section = {
  id: 'scale-out',
  title: 'Scale up, or scale out',
  scene: 'scale-up-vs-out',
  slide: `## Scale up, or scale out

Two shapes of "more capacity": replace the machine with a bigger one, or add more ordinary machines and use them together.

### Scale up — one bigger box
- More cores, more RAM, faster disk; **no coordination, no partitioning, no partial failure**
- Ceiling is the biggest box on sale, and the cost curve turns **super-linear** near it

### Scale out — more ordinary boxes
- Capacity grows by **adding a node** — near-linear cost, commodity parts
- No practical ceiling: the same approach works at 3 nodes and at 3,000

### The part nobody advertises
- Scale-out **moves the work onto you**: partitioning, coordination, surviving failure
- One node dying stops being an emergency and becomes a **routine event**
- Spark exists to take that work back — which is the rest of this course`,
  narration:
    'So you need more capacity. There are exactly two shapes it can take, and the choice between them determines everything that follows. The first is scale up, sometimes called vertical scaling: you keep one machine and you make it bigger. More cores, more memory, a faster disk, all inside one box. The second is scale out, or horizontal scaling: you leave the machines ordinary and you add more of them, then you get them to work on the problem together. Let us be fair to scale up, because it has a genuine and underrated advantage. It is simple. One machine means there is no coordination problem — nothing to split, nothing to keep in sync, and no such thing as half of your job failing. If scale up can solve your problem, it is very often the right answer, and a surprising number of workloads that get a cluster thrown at them did not need one. But it has that hard ceiling we talked about: eventually you are buying the largest machine that exists, and the price of each doubling along the way gets worse, not better. Scale out has the opposite profile. Capacity grows by adding another node, the cost stays roughly linear because you are buying ordinary hardware, and there is no practical ceiling — the same approach that works across three machines works across three thousand. And here is the part the sales pitch leaves out. Scale out does not remove the difficulty; it moves the difficulty onto you. Now you have to decide how to split the data across machines. You have to coordinate those machines so they are working on different pieces and not duplicating each other. And critically, you have to survive failure, because once you have a thousand machines, one of them dying is not an emergency, it is a Tuesday. Something has to notice and redo that machine\'s share of the work without restarting everything. Those three problems — partitioning, coordination, and failure — are the real price of scaling out. And they are precisely what a system like Spark exists to handle on your behalf. So before we look at Spark, let us look at how the generation of systems before it answered the first two.',
}
