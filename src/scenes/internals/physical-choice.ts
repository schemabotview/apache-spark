import type { Scene } from '@graphlearning/flow'

// §4 physical-choice — the fan is the scene: ONE logical operator, several physical ways to do it,
// and a cost model that picks. Drawn as a fan because the branching IS the content; a list of three
// strategies would lose the fact that they are alternatives for the same node.
//
// The bottom card is the honest caveat and it matters more than the mechanism: the cost model runs
// on STATISTICS, so a plan is only as good as what Spark knows about the data. That is the setup for
// AQE in chapter 6, which exists precisely because those statistics are often wrong.
export const physicalChoice: Scene = {
  id: 'physical-choice',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    { id: 'logical', label: 'Join, logically', pattern: 'network', icon: 'merge', sub: 'one node, no method yet' },
    {
      id: 'candidates',
      label: 'Three physical ways to do that one node',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'c-broadcast', variant: 'tile', label: 'Broadcast hash', pattern: 'service', icon: 'share', sub: 'ship the small side everywhere' },
        { id: 'c-sortmerge', variant: 'tile', label: 'Sort-merge', pattern: 'network', icon: 'sortarrows', sub: 'shuffle both, sort, walk them' },
        { id: 'c-shufflehash', variant: 'tile', label: 'Shuffle hash', pattern: 'network', icon: 'hash', sub: 'shuffle both, build a table' },
      ],
    },
    {
      id: 'cost',
      kind: 'table',
      label: 'How it decides — and it is mostly one number',
      sub: 'the chosen plan is the cheapest ESTIMATE, not the cheapest plan',
      pattern: 'storage',
      headers: ['Input', 'Where it comes from'],
      values: [
        ['Size of each side', 'file statistics, or a guess'],
        ['autoBroadcastJoinThreshold', 'default 10 MB — under it, broadcast'],
        ['Whether a side is already sorted', 'the plan so far'],
        ['Partition counts', 'spark.sql.shuffle.partitions'],
      ],
    },
    { id: 'stats', label: 'Only as good as the stats', pattern: 'warn', icon: 'gauge', sub: 'a bad estimate is a bad plan' },
  ],
  edges: [
    { source: 'logical', target: 'candidates', label: 'the logical plan never says HOW — that is the whole distinction' },
    { source: 'candidates', target: 'cost' },
    { source: 'cost', target: 'stats', label: 'which is exactly why AQE exists — chapter 6' },
  ],
}
