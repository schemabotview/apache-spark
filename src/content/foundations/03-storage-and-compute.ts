import type { Section } from '../types'

export const storageAndCompute: Section = {
  id: 'storage-and-compute',
  title: 'Distributed storage and compute',
  scene: 'cluster-storage',
  focus: 'ship-code',
  slide: `## Distributed storage and compute

If the data will not fit on one machine it has to live **across** machines — and that one decision shapes every layer above it.

### How a file is actually stored
- Cut into fixed-size **blocks** (classically 128 MB), never kept whole
- Each block written to **more than one machine** — replication, usually 3 copies
- The cluster presents one namespace, so \`/logs/2026/\` looks like one path

### Replication buys two different things
- **Durability** — a machine dies, and no block lived only there
- **Choice** — a block exists in several places, so a scheduler can pick a copy

### The idea the whole field turns on
- Moving a 128 MB block is **expensive**. Moving the code that reads it is **free**
- So: **send the computation to the data** — every Spark performance problem breaks this`,
  narration:
    'If the data does not fit on one machine, then it has to live across many machines — and that one decision shapes every layer above it, so it is worth understanding properly. Here is how a distributed filesystem actually stores a file. It does not keep the file whole on some machine. It cuts it into fixed-size blocks — classically a hundred and twenty-eight megabytes each — and scatters those blocks across the cluster. A six hundred gigabyte file becomes a few thousand blocks spread over however many machines you have. Then it does something that looks wasteful and is not: it writes each block to more than one machine, typically three. That is replication. On top of all of that, the cluster presents a single namespace, so a path like slash logs slash twenty twenty-six looks like one ordinary directory to you, even though the bytes behind it are scattered across a hundred disks. Now, replication is buying you two quite different things, and most people only notice the first. The obvious one is durability: when a machine dies — and it will — no block was living only on that machine, so nothing is actually lost. The subtler one is choice. Because every block exists in several places, a scheduler that wants to process a particular block gets to pick WHICH copy to use, which means it can pick the copy that is most convenient. And that brings us to the idea this entire field turns on. Compare two things. Moving a hundred and twenty-eight megabyte block across the network to the machine that wants to process it: that is slow, it competes with every other transfer happening, and the network is the scarcest resource in a cluster. Now compare moving the code that processes it — a few kilobytes of instructions. That is effectively free. So the whole strategy inverts. You do not bring the data to the computation. You send the computation to the data: you schedule the work onto the machine where that block is already sitting, and it reads from a local disk. Hold on to this, because it is not just a nice idea from the Hadoop era. Almost every performance problem you will ever debug in Spark is some version of this rule being violated, and the shuffle we will meet shortly is the one place Spark cannot avoid violating it. Next, the unit all of this is measured in.',
}
