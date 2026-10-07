import type { Scene } from '@graphlearning/flow'

// §7 shuffle-mechanics — chapter 2 §6 defined a shuffle as "every child reads every parent" and left
// the mechanism alone. This is the mechanism, and the thing that surprises people is that it goes
// through LOCAL DISK on the way: a shuffle is not a network transfer, it is a write, then a fetch,
// then a read. That is why it costs what it does and why it is the thing that fails.
//
// Nesting carries it: a map task writes ONE file containing a block per reducer, and a reduce task
// pulls its block from every one of those files. Drawing the files as containers of per-reducer
// blocks is what makes the fan-out count obvious — M map tasks × R reducers is M×R fetches.
export const shuffleMechanics: Scene = {
  id: 'shuffle-mechanics',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'write',
      label: 'Map side — every task sorts its output by destination and writes it to LOCAL disk',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      align: 'start',
      children: [
        {
          id: 'm1',
          label: 'map task 1 output',
          pattern: 'service',
          icon: 'harddrive',
          cols: 3,
          children: [
            { id: 'm1r0', label: 'for r0', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'm1r1', label: 'for r1', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'm1r2', label: 'for r2', variant: 'chip', pattern: 'storage', icon: 'none' },
          ],
        },
        {
          id: 'm2',
          label: 'map task 2 output',
          pattern: 'service',
          icon: 'harddrive',
          cols: 3,
          children: [
            { id: 'm2r0', label: 'for r0', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'm2r1', label: 'for r1', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'm2r2', label: 'for r2', variant: 'chip', pattern: 'storage', icon: 'none' },
          ],
        },
      ],
    },
    {
      id: 'fetch',
      label: 'Reduce side — each task fetches its own block from EVERY map output',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'r0', label: 'reduce 0', variant: 'tile', pattern: 'network', icon: 'merge', sub: 'pulls both r0 blocks' },
        { id: 'r1', label: 'reduce 1', variant: 'tile', pattern: 'network', icon: 'merge', sub: 'pulls both r1 blocks' },
        { id: 'r2', label: 'reduce 2', variant: 'tile', pattern: 'network', icon: 'merge', sub: 'pulls both r2 blocks' },
      ],
    },
    { id: 'count', label: 'M × R fetches', pattern: 'warn', icon: 'swap', sub: '200 × 200 is 40,000 of them' },
  ],
  edges: [
    { source: 'write', target: 'fetch', label: 'write, then fetch, then read — a shuffle goes through DISK, not just the network' },
    { source: 'fetch', target: 'count' },
  ],
}
