import type { Scene } from '@graphlearning/flow'

// §4 partitions-locality — the chapter's most load-bearing scene, because "partition" is the word
// every later chapter spends. The top band is one causal chain, not a category list: a partition is
// what a task is made of, a task is what a slot runs, and the count of busy slots IS the parallelism.
//
// The table is the first time a reader sees that "sending the code to the data" is not binary but a
// LADDER the scheduler walks down, which is exactly what the Spark UI shows them in chapter 6.
// PROCESS_LOCAL and friends are the real level names, so they are worth meeting here rather than
// being paraphrased — a table node is exempt from the leaf-card budget, so they fit as written.
export const partitionsLocality: Scene = {
  id: 'partitions-locality',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'chain',
      label: 'One causal chain — this is what "parallel" actually means',
      pattern: 'group',
      icon: 'none',
      cols: 4,
      children: [
        { id: 'ch-part', label: 'Partition', variant: 'tile', pattern: 'storage', icon: 'boxes', sub: 'a slice of the data' },
        { id: 'ch-task', label: 'Task', variant: 'tile', pattern: 'service', icon: 'workflow', sub: 'one partition of work' },
        { id: 'ch-slot', label: 'Slot', variant: 'tile', pattern: 'service', icon: 'gears', sub: 'a core that runs one' },
        { id: 'ch-width', label: 'Width', variant: 'tile', pattern: 'network', icon: 'gauge', sub: 'slots busy at once' },
      ],
    },
    {
      id: 'locality',
      kind: 'table',
      label: 'Data locality — a ladder the scheduler walks DOWN',
      sub: 'it waits a moment for the top rung before settling for a lower one',
      pattern: 'service',
      headers: ['Level', 'Where the data already is', 'What the task pays'],
      values: [
        ['PROCESS_LOCAL', 'in this executor, cached in its heap', 'nothing'],
        ['NODE_LOCAL', 'on this machine, on its disk', 'a local read'],
        ['RACK_LOCAL', 'another machine, same rack', 'one network hop'],
        ['ANY', 'somewhere else in the cluster', 'the full hop'],
      ],
    },
    { id: 'balance', label: 'Partition count', pattern: 'warn', sub: 'a dial, not a default' },
  ],
  edges: [
    { source: 'chain', target: 'locality', label: 'the scheduler puts each task as close to its own partition as it can' },
    { source: 'locality', target: 'balance', label: 'too few and cores sit idle; too many and the overhead eats the work' },
  ],
}
