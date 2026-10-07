import type { Scene } from '@graphlearning/flow'

// §2 capacity — the arithmetic, done once, forwards. Chapter 2 §5 divided partitions by slots to
// get waves; chapter 6 §1 gave the target sizes. This chains them into the question people are
// actually asked, which is "how big a cluster do I need", and shows that it is a calculation rather
// than a guess.
//
// Every row derives from the one above it, which is the point: a reader who has seen the chain once
// can redo it for their own numbers instead of copying somebody's cluster config.
export const capacity: Scene = {
  id: 'capacity',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'calc',
      kind: 'table',
      label: 'Sizing a cluster, forwards — 600 GB to process inside 30 minutes',
      sub: 'every row derives from the one above it; none of it is a guess',
      pattern: 'service',
      headers: ['Step', 'Working', 'Result'],
      values: [
        ['Data to read', 'compressed Parquet on the lake', '600 GB'],
        ['Partitions', '600 GB ÷ 128 MB', '~4,800'],
        ['Tasks', 'one per partition', '4,800'],
        ['Task duration', 'measured on a sample', '~20 s'],
        ['Total core-seconds', '4,800 × 20 s', '96,000'],
        ['Cores for 30 min', '96,000 ÷ 1,800 s', '~54'],
        ['Executors at 5 cores', '54 ÷ 5, rounded up', '11'],
      ],
    },
    {
      id: 'then',
      label: 'Then sanity-check it against the two things the arithmetic cannot see',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      children: [
        { id: 't-shuffle', label: 'Shuffle volume', pattern: 'warn', icon: 'swap', sub: 'a wide job needs memory and disk the read does not' },
        { id: 't-skew', label: 'Skew', pattern: 'warn', icon: 'gauge', sub: 'one slow task sets the floor, whatever the average says' },
      ],
    },
    { id: 'measure', label: 'Measure, then scale', pattern: 'storage', icon: 'ruler', sub: 'run a 1% sample and multiply' },
  ],
  edges: [
    { source: 'calc', target: 'then' },
    { source: 'then', target: 'measure', label: 'the honest version of all of this is a sample run — the arithmetic tells you the ballpark' },
  ],
}
