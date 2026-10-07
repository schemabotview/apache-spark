import type { Scene } from '@graphlearning/flow'

// §2 ops-catalog — the vocabulary, as a table rather than a diagram, because this is a REFERENCE and
// a reader will come back to it. Chapter 2 §6 gave the narrow/wide rule in the abstract; this applies
// it to the operations they will actually type, which is where the rule starts paying.
//
// The actions band is chips: the point of that row is that the list is SHORT. Nearly everything in
// Spark is a transformation, and the handful of things that actually trigger work fit on one line —
// which is the most useful thing a beginner can know about the API surface.
export const opsCatalog: Scene = {
  id: 'ops-catalog',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'ops',
      kind: 'table',
      label: 'The core transformations, and what each one costs',
      sub: 'the Kind column is chapter 2 §6 applied to the API you type',
      pattern: 'service',
      headers: ['Operation', 'Kind', 'What it does'],
      values: [
        ['map / select', 'narrow', 'one row in, one row out'],
        ['filter / where', 'narrow', 'drops rows, keeps partitioning'],
        ['flatMap', 'narrow', 'one row in, zero or many out'],
        ['union', 'narrow', 'concatenates — no regrouping needed'],
        ['groupByKey', 'WIDE', 'every row moves, keyed'],
        ['reduceByKey', 'WIDE', 'but combines locally first — see §3'],
        ['join', 'WIDE', 'both sides regrouped by the key'],
        ['distinct', 'WIDE', 'duplicates can live anywhere'],
        ['repartition', 'WIDE', 'a full shuffle, by definition'],
      ],
    },
    {
      id: 'actions',
      label: 'And the whole action list, near enough — this is why laziness is cheap to reason about',
      pattern: 'network',
      icon: 'none',
      cols: 6,
      children: [
        { id: 'a-collect', label: 'collect', variant: 'chip', pattern: 'warn', icon: 'none' },
        { id: 'a-count', label: 'count', variant: 'chip', pattern: 'network', icon: 'none' },
        { id: 'a-take', label: 'take(n)', variant: 'chip', pattern: 'network', icon: 'none' },
        { id: 'a-first', label: 'first', variant: 'chip', pattern: 'network', icon: 'none' },
        { id: 'a-show', label: 'show', variant: 'chip', pattern: 'network', icon: 'none' },
        { id: 'a-write', label: 'write', variant: 'chip', pattern: 'service', icon: 'none' },
      ],
    },
    { id: 'danger', label: 'collect is dangerous', pattern: 'warn', icon: 'skull', sub: 'every row, into the driver' },
  ],
  edges: [
    { source: 'ops', target: 'actions', label: 'none of the above runs until one of these is called' },
    { source: 'actions', target: 'danger' },
  ],
}
