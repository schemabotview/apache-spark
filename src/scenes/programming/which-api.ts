import type { Scene } from '@graphlearning/flow'

// §7 which-api — the decision section, so the board is a table and then an answer. The table's last
// row is the one that settles it in practice: an RDD lambda is opaque, so Catalyst cannot see inside
// it, so none of chapter 5 applies to it.
//
// The answer card is deliberately blunt. "It depends" is true and useless; the honest guidance is
// that DataFrames and SQL are the default and RDDs are a narrow escape hatch, and a reader who takes
// only that away has taken the right thing.
export const whichApi: Scene = {
  id: 'which-api',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'three',
      kind: 'table',
      label: 'Three ways to say the same thing',
      sub: 'two of them are the same thing',
      pattern: 'service',
      headers: ['', 'RDD', 'DataFrame / SQL'],
      values: [
        ['What it knows', 'opaque objects', 'named, typed columns'],
        ['Optimised by Catalyst', 'no', 'yes — all of chapter 5'],
        ['Python speed', 'slow, row by row', 'same as Scala'],
        ['Memory layout', 'JVM objects', 'compact columnar (Tungsten)'],
        ['You write', 'how to do it', 'what you want'],
      ],
    },
    {
      id: 'when',
      label: 'When an RDD is still the right answer — it is a short list',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'w-unstruct', label: 'Truly unstructured', pattern: 'storage', icon: 'file', sub: 'no rows, no columns to name' },
        { id: 'w-control', label: 'Low-level control', pattern: 'network', icon: 'gears', sub: 'mapPartitions, partitioner' },
        { id: 'w-legacy', label: 'Legacy code', pattern: 'user', icon: 'history', sub: 'it exists and it works' },
      ],
    },
    { id: 'default', label: 'Default to DataFrames', pattern: 'service', icon: 'circlecheck', sub: 'drop to RDDs only when you must' },
  ],
  edges: [
    { source: 'three', target: 'when', label: 'the second row is the one that decides it — a lambda is a black box' },
    { source: 'when', target: 'default' },
  ],
}
