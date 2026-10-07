import type { Scene } from '@graphlearning/flow'

// §1 rdd-lineage — the chapter opens underneath the API everyone actually uses, because the RDD is
// what a DataFrame is still made of.
//
// COMPOSITION: two rows. The code owns the first on its own, so nothing competes with it for width,
// and the chain runs LEFT TO RIGHT beneath it. Both earlier attempts were worse for the same reason
// in two different directions: stacked with a VERTICAL chain the board was tall and narrow and
// fitView bound on height; side by side the chain ate half the board's width. A horizontal chain is
// the only arrangement where the derivation reads as a sequence AND the code gets a full row.
//
// `hug: true` matters as much as the layout. A code card is padded to CODE_MIN_COLS (64) unless it
// hugs, and these lines are 42 — 22 columns of reserved, empty width that would otherwise come
// straight off the rendered type.
//
// The operations sit on the EDGES, not in each card's `sub`. These containers are only as wide as
// two chips, so a two-line sub wrapped down over them — and a derivation is a relationship between
// two RDDs rather than a property of one, so the edge is where it belonged all along.
//
// Two partitions per RDD rather than three: in a horizontal chain the partition chips set the board's
// width, and the claim ("p1 traces straight back through p1") needs two, not three.
export const rddLineage: Scene = {
  id: 'rdd-lineage',
  padding: 0.1,
  flow: 'TB',
  nodes: [
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'rdd.py',
      label: [
        'lines = sc.textFile("s3://logs/app.log")',
        '# RDD[str]',
        '',
        'words = lines.flatMap(lambda l: l.split())',
        '# RDD[str]',
        '',
        'pairs = words.map(lambda w: (w, 1))',
        '# RDD[(str, int)]',
      ].join('\n'),
    },
    {
      id: 'chain',
      label: 'Each RDD records the one it came from — that record IS the lineage',
      pattern: 'group',
      icon: 'none',
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'r-lines',
          label: 'lines',
          sub: 'from the file',
          pattern: 'storage',
          icon: 'file',
          cols: 2,
          children: [
            { id: 'l0', label: 'p0', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'l1', label: 'p1', variant: 'chip', pattern: 'storage', icon: 'none' },
          ],
        },
        {
          id: 'r-words',
          label: 'words',
          pattern: 'service',
          icon: 'share',
          cols: 2,
          children: [
            { id: 'w0', label: 'p0', variant: 'chip', pattern: 'service', icon: 'none' },
            { id: 'w1', label: 'p1', variant: 'chip', pattern: 'service', icon: 'none' },
          ],
        },
        {
          id: 'r-pairs',
          label: 'pairs',
          pattern: 'service',
          icon: 'copy',
          cols: 2,
          children: [
            { id: 'q0', label: 'p0', variant: 'chip', pattern: 'service', icon: 'none' },
            { id: 'q1', label: 'p1', variant: 'chip', pattern: 'service', icon: 'none' },
          ],
        },
      ],
      edges: [
        { source: 'r-lines', target: 'r-words', label: 'flatMap · narrow' },
        { source: 'r-words', target: 'r-pairs', label: 'map · narrow' },
      ],
    },
    { id: 'lost', label: 'Lose p1 of pairs', pattern: 'warn', icon: 'skull', sub: 'replay that branch only' },
  ],
  edges: [
    { source: 'code', target: 'chain', label: 'nothing has been read — these are three descriptions, not three datasets' },
    { source: 'chain', target: 'lost', label: 'p1 of lines → flatMap → map. One branch, not the whole dataset' },
  ],
}
