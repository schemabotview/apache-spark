import type { Scene } from '@graphlearning/flow'

// §5 slots-and-waves — the arithmetic, done once, with real numbers. Chapter 1 §4 established the
// chain (partition → task → slot → width); this is where a reader divides one by the other and gets
// the single most useful mental model in the course: tasks do not all run at once, they run in WAVES.
//
// Each executor draws its four slots 2x2 rather than in a row. That is a LAYOUT decision, not a
// cosmetic one: twelve tiles abreast makes the scene so wide that fitView shrinks everything to fit,
// and the table — which is the actual content — ends up unreadable. Squaring the band fixes it.
//
// The table is the scene. Every row is a number the reader could have worked out themselves, which
// is the point — once they have seen the division done, they can do it for their own cluster, and
// "why is my job slow" starts having checkable answers. The last two rows are the sting: 17 waves,
// and the final one leaves a third of the cluster idle.
export const slotsAndWaves: Scene = {
  id: 'slots-and-waves',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'cluster',
      label: 'The cluster you were given — 3 executors, 4 cores each',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        {
          id: 'x1',
          label: 'Executor',
          pattern: 'service',
          icon: 'box',
          cols: 2,
          children: [
            { id: 's1a', label: 'slot', variant: 'chip', pattern: 'network', icon: 'gears' },
            { id: 's1b', label: 'slot', variant: 'chip', pattern: 'network', icon: 'gears' },
            { id: 's1c', label: 'slot', variant: 'chip', pattern: 'network', icon: 'gears' },
            { id: 's1d', label: 'slot', variant: 'chip', pattern: 'network', icon: 'gears' },
          ],
        },
        {
          id: 'x2',
          label: 'Executor',
          pattern: 'service',
          icon: 'box',
          cols: 2,
          children: [
            { id: 's2a', label: 'slot', variant: 'chip', pattern: 'network', icon: 'gears' },
            { id: 's2b', label: 'slot', variant: 'chip', pattern: 'network', icon: 'gears' },
            { id: 's2c', label: 'slot', variant: 'chip', pattern: 'network', icon: 'gears' },
            { id: 's2d', label: 'slot', variant: 'chip', pattern: 'network', icon: 'gears' },
          ],
        },
        {
          id: 'x3',
          label: 'Executor',
          pattern: 'service',
          icon: 'box',
          cols: 2,
          children: [
            { id: 's3a', label: 'slot', variant: 'chip', pattern: 'network', icon: 'gears' },
            { id: 's3b', label: 'slot', variant: 'chip', pattern: 'network', icon: 'gears' },
            { id: 's3c', label: 'slot', variant: 'chip', pattern: 'network', icon: 'gears' },
            { id: 's3d', label: 'slot', variant: 'chip', pattern: 'network', icon: 'gears' },
          ],
        },
      ],
    },
    {
      id: 'sums',
      kind: 'table',
      label: '200 partitions meet 12 slots — do the division',
      sub: 'every row here is arithmetic you can redo for your own cluster',
      pattern: 'storage',
      headers: ['', 'Value', 'Where it comes from'],
      values: [
        ['Partitions', '200', 'how the data was split'],
        ['Tasks', '200', 'one per partition, always'],
        ['Slots', '12', '3 executors × 4 cores'],
        ['Waves', '17', '200 ÷ 12, rounded up'],
        ['Final wave', '8 tasks', 'so 4 slots sit idle to the end'],
      ],
    },
    { id: 'waves', label: 'Tasks run in waves', pattern: 'warn', sub: 'never all at once' },
  ],
  edges: [
    { source: 'cluster', target: 'sums', label: 'the cluster fixes how many tasks can be in flight — nothing else does' },
    { source: 'sums', target: 'waves' },
  ],
}
