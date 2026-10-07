import type { Scene } from '@graphlearning/flow'

// §1 rdd-lineage — the chapter opens underneath the API everyone actually uses, because the RDD is
// what a DataFrame is still made of.
//
// COMPOSITION: the code sits BESIDE the chain, in an LR row, not above it. Stacked, the board was
// tall and narrow — a 3-line code card over a 3-deep vertical chain — so fitView scaled to the
// height and the code, which is the thing the section asks the reader to read, came out tiny. Side
// by side the board is roughly square and the code is legible at capture size. Worth remembering as
// a rule: a tall diagram wants its code to its left, not on top of it.
//
// The chain runs VERTICALLY and has no `cols`, which is honest rather than lazy: depthOf
// (ui-flow/src/layout.ts:37) ignores `cols` entirely the moment a container carries edges, and ranks
// its children topologically instead. An earlier draft of this scene said `cols: 3` and was simply
// describing something that could never happen.
//
// Three partitions per RDD, the same three all the way down, is the claim: a narrow derivation
// preserves the partitioning, so p1 of `pairs` traces straight back to p1 of `lines`. That is exactly
// why losing one costs one branch and not the dataset.
export const rddLineage: Scene = {
  id: 'rdd-lineage',
  padding: 0.1,
  flow: 'TB',
  nodes: [
    {
      id: 'top',
      label: 'Three names, three descriptions — and nothing read yet',
      pattern: 'group',
      icon: 'none',
      flow: 'LR',
      align: 'start',
      children: [
        {
          id: 'code',
          kind: 'code',
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
          label: 'Each RDD records the one it came from',
          pattern: 'group',
          icon: 'none',
          align: 'start',
          children: [
            {
              id: 'r-lines',
              label: 'lines',
              sub: 'read from the file',
              pattern: 'storage',
              icon: 'file',
              cols: 3,
              children: [
                { id: 'l0', label: 'p0', variant: 'chip', pattern: 'storage', icon: 'none' },
                { id: 'l1', label: 'p1', variant: 'chip', pattern: 'storage', icon: 'none' },
                { id: 'l2', label: 'p2', variant: 'chip', pattern: 'storage', icon: 'none' },
              ],
            },
            {
              id: 'r-words',
              label: 'words',
              sub: 'flatMap — narrow',
              pattern: 'service',
              icon: 'share',
              cols: 3,
              children: [
                { id: 'w0', label: 'p0', variant: 'chip', pattern: 'service', icon: 'none' },
                { id: 'w1', label: 'p1', variant: 'chip', pattern: 'service', icon: 'none' },
                { id: 'w2', label: 'p2', variant: 'chip', pattern: 'service', icon: 'none' },
              ],
            },
            {
              id: 'r-pairs',
              label: 'pairs',
              sub: 'map — narrow',
              pattern: 'service',
              icon: 'copy',
              cols: 3,
              children: [
                { id: 'q0', label: 'p0', variant: 'chip', pattern: 'service', icon: 'none' },
                { id: 'q1', label: 'p1', variant: 'chip', pattern: 'service', icon: 'none' },
                { id: 'q2', label: 'p2', variant: 'chip', pattern: 'service', icon: 'none' },
              ],
            },
          ],
          edges: [
            { source: 'r-lines', target: 'r-words' },
            { source: 'r-words', target: 'r-pairs' },
          ],
        },
      ],
      edges: [{ source: 'code', target: 'chain', route: 'step' }],
    },
    { id: 'lost', label: 'Lose p1 of pairs', pattern: 'warn', icon: 'skull', sub: 'replay that branch only' },
  ],
  edges: [{ source: 'top', target: 'lost', label: 'p1 of lines → flatMap → map. One branch, not the whole dataset' }],
}
