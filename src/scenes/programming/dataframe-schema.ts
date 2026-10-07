import type { Scene } from '@graphlearning/flow'

// §4 dataframe-schema — a TABLE node in SCHEMA mode (`columns`, not `headers`/`values`), the first in
// this repo. A DataFrame IS a schema over partitioned rows, so drawing the schema as a real schema —
// names beside types — rather than as a band of cards is the honest picture.
//
// The three cards below are the whole reason the chapter moves off RDDs. Each is something the engine
// can only do BECAUSE it knows the types: with an opaque lambda over opaque objects, Catalyst has
// nothing to reason about, and chapter 5 is entirely about what it does with this knowledge.
export const dataframeSchema: Scene = {
  id: 'dataframe-schema',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'schema',
      kind: 'table',
      label: 'orders — a DataFrame is a SCHEMA over partitioned rows',
      sub: 'names and types the engine knows before it reads a byte',
      pattern: 'storage',
      columns: [
        { name: 'order_id', type: 'bigint', key: 'PK' },
        { name: 'customer_id', type: 'bigint', key: 'FK' },
        { name: 'country', type: 'string' },
        { name: 'total', type: 'decimal(10,2)' },
        { name: 'placed_at', type: 'timestamp' },
      ],
    },
    {
      id: 'buys',
      label: 'What knowing the types buys you — none of it is possible over an opaque lambda',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'b-opt', label: 'Catalyst can optimise', pattern: 'service', icon: 'brain', sub: 'reorder, prune, push down' },
        { id: 'b-mem', label: 'Compact in memory', pattern: 'storage', icon: 'memory', sub: 'typed columns, not JVM objects' },
        { id: 'b-lang', label: 'Same speed everywhere', pattern: 'network', icon: 'globe', sub: 'Python is no longer slower' },
      ],
    },
    { id: 'under', label: 'Still RDDs underneath', pattern: 'user', icon: 'layers', sub: 'you just stopped writing them' },
  ],
  edges: [
    { source: 'schema', target: 'buys' },
    { source: 'buys', target: 'under', label: 'a DataFrame compiles down to the partitions and tasks of chapter 2' },
  ],
}
