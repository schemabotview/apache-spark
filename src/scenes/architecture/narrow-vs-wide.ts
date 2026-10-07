import type { Scene } from '@graphlearning/flow'

// §6 narrow-vs-wide — the most important distinction in Spark, and the chapter's hardest scene to
// draw. Two parallel columns (the grammar chapter 1 §2 established) so the fork stays a fork, and
// inside each one a parent row above a child row.
//
// The edges are drawn PARTITION TO PARTITION, not container to container, and that is the entire
// point of the scene: narrow is three straight lines down, wide is nine lines crossing. collectEdges
// flattens every `edges` array in the scene into one list without scoping source/target, so an edge
// may name any node at any depth — which is what makes a fan between two nested rows expressible.
// Declaring them on the column they belong to keeps each column readable on its own.
//
// Nobody needs the phrases "one-to-one" and "many-to-many" after seeing those two pictures together.
// The tangle on the right is not decoration — it IS what crossing the network looks like, and it is
// the only honest way to show why one of these costs a thousand times what the other does.
export const narrowVsWide: Scene = {
  id: 'narrow-vs-wide',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      label: 'Two kinds of dependency — and only one of them is cheap',
      pattern: 'group',
      icon: 'none',
      align: 'start',
      stretch: true,
      cols: 2,
      children: [
        {
          id: 'narrow',
          label: 'NARROW — each child reads ONE parent',
          sub: 'filter · map · union',
          pattern: 'service',
          icon: 'circlecheck',
          cols: 1,
          children: [
            {
              id: 'n-par',
              label: 'Parents',
              pattern: 'group',
              icon: 'none',
              cols: 3,
              children: [
                { id: 'np0', label: 'p0', variant: 'chip', pattern: 'storage', icon: 'none' },
                { id: 'np1', label: 'p1', variant: 'chip', pattern: 'storage', icon: 'none' },
                { id: 'np2', label: 'p2', variant: 'chip', pattern: 'storage', icon: 'none' },
              ],
            },
            {
              id: 'n-chi',
              label: 'Children',
              pattern: 'group',
              icon: 'none',
              cols: 3,
              children: [
                { id: 'nc0', label: 'p0', variant: 'chip', pattern: 'service', icon: 'none' },
                { id: 'nc1', label: 'p1', variant: 'chip', pattern: 'service', icon: 'none' },
                { id: 'nc2', label: 'p2', variant: 'chip', pattern: 'service', icon: 'none' },
              ],
            },
          ],
          // Three lines, straight down. Each child needs exactly one parent, so the work never leaves
          // the machine that parent is already on.
          edges: [
            { source: 'np0', target: 'nc0' },
            { source: 'np1', target: 'nc1', label: 'stays put — no network, no stage boundary' },
            { source: 'np2', target: 'nc2' },
          ],
        },
        {
          id: 'wide',
          label: 'WIDE — each child reads EVERY parent',
          sub: 'groupBy · join · distinct',
          pattern: 'warn',
          icon: 'swap',
          cols: 1,
          children: [
            {
              id: 'w-par',
              label: 'Parents',
              pattern: 'group',
              icon: 'none',
              cols: 3,
              children: [
                { id: 'wp0', label: 'p0', variant: 'chip', pattern: 'storage', icon: 'none' },
                { id: 'wp1', label: 'p1', variant: 'chip', pattern: 'storage', icon: 'none' },
                { id: 'wp2', label: 'p2', variant: 'chip', pattern: 'storage', icon: 'none' },
              ],
            },
            {
              id: 'w-chi',
              label: 'Children',
              pattern: 'group',
              icon: 'none',
              cols: 3,
              children: [
                { id: 'wc0', label: 'k=a', variant: 'chip', pattern: 'network', icon: 'none' },
                { id: 'wc1', label: 'k=b', variant: 'chip', pattern: 'network', icon: 'none' },
                { id: 'wc2', label: 'k=c', variant: 'chip', pattern: 'network', icon: 'none' },
              ],
            },
          ],
          // Nine lines. Every key's rows are scattered across every parent, so every parent has to
          // contribute to every child — and that is the shuffle, drawn.
          edges: [
            { source: 'wp0', target: 'wc0' },
            { source: 'wp0', target: 'wc1' },
            { source: 'wp0', target: 'wc2' },
            { source: 'wp1', target: 'wc0' },
            { source: 'wp1', target: 'wc1', label: 'THE SHUFFLE — written, sent, re-read' },
            { source: 'wp1', target: 'wc2' },
            { source: 'wp2', target: 'wc0' },
            { source: 'wp2', target: 'wc1' },
            { source: 'wp2', target: 'wc2' },
          ],
        },
      ],
    },
    { id: 'cut', label: 'Only wide cuts a stage', pattern: 'storage', icon: 'scissors', sub: 'that is the whole rule' },
  ],
  edges: [{ source: 'compare', target: 'cut', label: 'so counting the wide dependencies counts the stages' }],
}
