import type { Scene } from '@graphlearning/flow'

// §1 partition-sizing — chapter 2 §5 did the arithmetic (slots, tasks, waves). This is the sizing,
// and it is a different question: not "how many are running" but "how big should each one be".
//
// Each fork column lays its three tiles out ACROSS, not down. Stacked, the board measured 745x1024
// against a 1114x1080 pane — height-bound, and scaled to 0.95. Trading that height for width uses
// the axis that had room. Measure which axis binds before reaching for anything else.
//
// The fork is the one thing people get wrong in code rather than in config: `repartition` and
// `coalesce` both change the partition count and are not interchangeable. One shuffles and can go
// up or down; the other refuses to shuffle, which is why it can only go down and why it silently
// reduces the parallelism of everything UPSTREAM of it.
export const partitionSizing: Scene = {
  id: 'partition-sizing',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'targets',
      kind: 'table',
      label: 'The three numbers worth knowing',
      sub: 'none of them is a setting — they are consequences you steer',
      pattern: 'service',
      headers: ['Aim for', 'Value', 'Why that'],
      values: [
        ['Partition size', '~128 MB', 'the block size everything assumes'],
        ['Partition count', '2–3 × total cores', 'so a slow task is absorbed by a later wave'],
        ['Task duration', 'seconds, not ms', 'under ~100 ms, scheduling dominates'],
      ],
    },
    {
      id: 'fork',
      label: 'Two ways to change the count, and they are not interchangeable',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      align: 'start',
      stretch: true,
      children: [
        {
          id: 'repart',
          label: 'repartition(n)',
          sub: 'a full shuffle',
          pattern: 'network',
          icon: 'swap',
          cols: 3,
          children: [
            { id: 'rp-dir', label: 'Up or down', variant: 'tile', pattern: 'network', icon: 'sortarrows', sub: 'any n you like' },
            { id: 'rp-even', label: 'Even sizes', variant: 'tile', pattern: 'service', icon: 'scale', sub: 'it redistributes' },
            { id: 'rp-cost', label: 'Costs a shuffle', variant: 'tile', pattern: 'warn', icon: 'skull', sub: 'disk, network, disk' },
          ],
        },
        {
          id: 'coal',
          label: 'coalesce(n)',
          sub: 'no shuffle at all',
          pattern: 'service',
          icon: 'merge',
          cols: 3,
          children: [
            { id: 'co-dir', label: 'Down only', variant: 'tile', pattern: 'service', icon: 'funnel', sub: 'it merges neighbours' },
            { id: 'co-even', label: 'Uneven sizes', variant: 'tile', pattern: 'warn', icon: 'scale', sub: 'whatever merging gives' },
            { id: 'co-cost', label: 'Nearly free', variant: 'tile', pattern: 'service', icon: 'zap', sub: 'no data moves' },
          ],
        },
      ],
    },
    { id: 'trap', label: 'It reaches BACKWARD', pattern: 'warn', icon: 'ban', sub: 'coalesce(1) single-threads the job' },
  ],
  edges: [
    { source: 'targets', target: 'fork' },
    { source: 'fork', target: 'trap', label: 'it has no shuffle to hide behind, so it reduces the parallelism of every stage above it' },
  ],
}
