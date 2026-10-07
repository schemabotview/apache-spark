import type { Scene } from '@graphlearning/flow'

// §6 pushdown — three different optimisations that people routinely merge into one word. They act at
// different layers, they are enabled by different things, and you verify each one in a different
// place in the plan — so the table's last column is where to look, not what it does.
//
// The code card is the failure mode rather than the happy path, because the happy path needs no
// teaching: a filter on a column the engine cannot see through does not get pushed, and the usual
// culprit is a UDF — chapters 4 and 5 from a third angle.
export const pushdown: Scene = {
  id: 'pushdown',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'three',
      label: 'Three different optimisations that people call one thing',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'p-pred', label: 'Predicate pushdown', variant: 'tile', pattern: 'service', icon: 'funnel', sub: 'skip row groups by stats' },
        { id: 'p-part', label: 'Partition pruning', variant: 'tile', pattern: 'storage', icon: 'folder', sub: 'skip whole directories' },
        { id: 'p-col', label: 'Column pruning', variant: 'tile', pattern: 'network', icon: 'table', sub: 'never read the column' },
      ],
    },
    {
      id: 'verify',
      kind: 'table',
      label: 'Where you check each one actually happened',
      sub: 'all three are silent when they fail — nothing errors, the job is just slow',
      pattern: 'service',
      headers: ['Optimisation', 'Needs', 'Check in the plan'],
      values: [
        ['Predicate pushdown', 'a columnar format', 'FileScan → PushedFilters'],
        ['Partition pruning', 'partitionBy at write time', 'FileScan → PartitionFilters'],
        ['Column pruning', 'nothing — always on', 'FileScan → ReadSchema'],
      ],
    },
    { id: 'blocked', label: 'A UDF blocks all three', pattern: 'warn', icon: 'ban', sub: 'filter BEFORE it, never after' },
  ],
  edges: [
    { source: 'three', target: 'verify' },
    { source: 'verify', target: 'blocked', label: 'the cheapest row in Spark is the one that was never read off the disk' },
  ],
}
