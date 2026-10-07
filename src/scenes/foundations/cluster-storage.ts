import type { Scene } from '@graphlearning/flow'

// §3 cluster-storage — built on genuine NESTING, because the claim IS containment: a cluster holds
// machines, a machine holds blocks. A flow of three cards would say "next", which is wrong.
//
// Three nodes with two blocks each is the smallest drawing in which replication is VISIBLE: every
// block appears on exactly two machines, so a reader can lose any one node on the board and still
// find all three blocks. That is the whole durability argument, made geometrically.
//
// The last card is the chapter's hinge and the reason this scene exists before any API: computation
// goes to the data. Everything in chapter 6 about shuffle cost is this card being violated.
export const clusterStorage: Scene = {
  id: 'cluster-storage',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    { id: 'file', label: 'One 600 GB file', pattern: 'storage', icon: 'file', sub: 'logically, one thing' },
    {
      id: 'cluster',
      label: 'Physically — 128 MB blocks, every block on more than one machine',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        {
          id: 'n1',
          label: 'Node 1',
          pattern: 'network',
          icon: 'server',
          cols: 2,
          children: [
            { id: 'b-a1', label: 'blk A', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'b-c1', label: 'blk C', variant: 'chip', pattern: 'storage', icon: 'none' },
          ],
        },
        {
          id: 'n2',
          label: 'Node 2',
          pattern: 'network',
          icon: 'server',
          cols: 2,
          children: [
            { id: 'b-a2', label: 'blk A', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'b-b1', label: 'blk B', variant: 'chip', pattern: 'storage', icon: 'none' },
          ],
        },
        {
          id: 'n3',
          label: 'Node 3',
          pattern: 'network',
          icon: 'server',
          cols: 2,
          children: [
            { id: 'b-b2', label: 'blk B', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'b-c2', label: 'blk C', variant: 'chip', pattern: 'storage', icon: 'none' },
          ],
        },
      ],
    },
    { id: 'ship-code', label: 'Ship the code', pattern: 'service', icon: 'zap', sub: 'not the data' },
  ],
  edges: [
    { source: 'file', target: 'cluster', label: 'split into blocks, then replicated — lose any one node and nothing is lost' },
    { source: 'cluster', target: 'ship-code', label: 'a task is scheduled onto the machine its block is already sitting on' },
  ],
}
