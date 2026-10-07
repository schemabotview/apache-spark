import type { Section } from '../types'

export const partitioning: Section = {
  id: 'partitioning',
  title: 'Partitions, parallelism, locality',
  scene: 'partitions-locality',
  focus: 'ch-part',
  slide: `## Partitions, parallelism, locality

One word to carry out of this chapter: **partition**. Everything else is counted in it.

### The chain — and it really is a chain
- A **partition** is a slice of the dataset, processed as one unit
- A **task** is the work for one partition, so *tasks = partitions*
- A **slot** is one core on one executor, running one task at a time
- Real parallelism is **how many slots are busy**, not how big the cluster is

### Locality is a ladder, not a yes/no
- \`PROCESS_LOCAL\` → \`NODE_LOCAL\` → \`RACK_LOCAL\` → \`ANY\`, best rung first
- The scheduler waits briefly for a better rung before taking a worse one

### Partition count is a dial you must turn
- Too **few** → idle cores · too **many** → overhead swamps the work`,
  narration:
    'If you take one word out of this chapter, take this one: partition. Everything in Spark is counted in partitions, and once the word is solid, a lot of later material stops being mysterious. A partition is a slice of your dataset — the smallest chunk that gets processed as a single unit. When Spark reads that six hundred gigabyte file, it does not see one dataset, it sees a few thousand partitions, often lining up roughly with the blocks on disk. Now follow the chain, because it really is a chain and each link determines the next. For each partition, Spark creates one task. A task is simply the work of applying your logic to exactly one partition, which means the number of tasks is the number of partitions — not a separate setting you tune. Those tasks need somewhere to run, and that somewhere is a slot: one CPU core on one executor, running one task at a time. So your actual parallelism — how much is genuinely happening at once — is the number of slots that are busy. Notice what that implies. A cluster with two hundred cores processing data split into four partitions runs four tasks and leaves a hundred and ninety-six cores doing absolutely nothing. The cluster size was never the parallelism. The partition count was. Now layer locality on top. We said send the computation to the data, but in practice that is not a yes-or-no; it is a ladder the scheduler walks down. The top rung is PROCESS_LOCAL: the data is already sitting in this executor\'s memory, and the task costs nothing to feed. Below that is NODE_LOCAL: the data is on this machine\'s disk, so it is a local read. Below that, RACK_LOCAL: a different machine but the same rack, so one network hop. And at the bottom, ANY: somewhere else entirely, pay the full cost. The scheduler will actually wait a short while hoping for a better rung before it settles for a worse one. Which brings us to the dial. Partition count is something you are expected to turn, and it has a bad answer in both directions. Too few partitions and cores sit idle, and worse, one unusually large partition holds up the entire stage while everything else has finished. Too many and you drown in scheduling overhead and tiny outputs, where the bookkeeping costs more than the work. Finding that balance is a real skill, and we give it a whole chapter later. With the vocabulary in place, let us look at what the previous generation built on top of it.',
}
