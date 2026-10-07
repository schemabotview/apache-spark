import type { Scene } from '@graphlearning/flow'

// §5 skew — the repo's first EVOLUTION node, and the only honest way to draw this. Skew is a
// DISTRIBUTION, and a distribution drawn as cards is a list of numbers the reader has to compare in
// their head. As columns it is one glance: five partitions of roughly nothing and one tower.
//
// The row is monochrome by default, which is what the engine wants — the columns are peers of one
// kind. `pattern: 'warn'` on p3 alone is the engine's documented way to single ONE out, and it is
// the one the section is about.
//
// FIVE columns, not six: six measured 1197px against a 1114px pane and scaled the board to 0.84.
// The story is one tower against a row of stubs, and a fifth stub buys width without buying
// evidence.
//
// baseline stays at 0 deliberately. A truncated axis would make the small partitions look
// comparable to each other, and the whole point is that they are all equally irrelevant next to p3.
export const skew: Scene = {
  id: 'skew',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'dist',
      kind: 'evolution',
      label: 'Rows per partition after a groupBy on country',
      sub: 'one stage, five tasks — four finish in seconds',
      pattern: 'network',
      evolution: {
        unit: 'rows in the partition (millions)',
        stages: [
          { label: 'p0', at: 'FR', value: 1.2, valueLabel: '1.2 M' },
          { label: 'p1', at: 'DE', value: 1.6, valueLabel: '1.6 M' },
          { label: 'p2', at: 'ES', value: 0.9, valueLabel: '0.9 M' },
          { label: 'p3', at: 'US', value: 48, valueLabel: '48 M', pattern: 'warn' },
          { label: 'p4', at: 'IT', value: 1.1, valueLabel: '1.1 M' },
        ],
      },
    },
    {
      id: 'fixes',
      label: 'Three ways out, in the order you should try them',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'f-aqe', label: '1 · Let AQE split it', variant: 'tile', pattern: 'service', icon: 'scissors', sub: 'free, and often enough' },
        { id: 'f-broadcast', label: '2 · Broadcast the other side', variant: 'tile', pattern: 'service', icon: 'share', sub: 'no shuffle, no skew' },
        { id: 'f-salt', label: '3 · Salt the key', variant: 'tile', pattern: 'warn', icon: 'hash', sub: 'last resort, two-stage agg' },
      ],
    },
    { id: 'tell', label: 'The tell in the UI', pattern: 'storage', icon: 'gauge', sub: 'max task time ≫ median task time' },
  ],
  edges: [
    { source: 'dist', target: 'fixes', label: 'the stage cannot finish until p3 does, so 4 of your 5 slots sit idle waiting' },
    { source: 'fixes', target: 'tell' },
  ],
}
