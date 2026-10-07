import type { Scene } from '@graphlearning/flow'

// §8 anti-patterns — the course's greatest hits, and deliberately the only scene that cites chapter
// numbers in its content rather than its comments. Every row is something taught earlier and
// forgotten later, and the citation is the point: this is a page to come back to, and each row
// should take you to where the reasoning lives.
//
// Ordered by how often it actually happens, not by severity, because the reader scanning this is
// looking for the one they just did.
export const antiPatterns: Scene = {
  id: 'anti-patterns',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'table',
      kind: 'table',
      label: 'The greatest hits — every one of these was taught earlier and gets forgotten',
      sub: 'ordered by how often it happens, not by how bad it is',
      pattern: 'warn',
      headers: ['Anti-pattern', 'What it costs', 'Where'],
      values: [
        ['collect() on a real dataset', 'the driver dies', 'ch3 §2'],
        ['inferSchema on every read', 'a full extra pass over the file', 'ch3 §8'],
        ['A Python UDF where a built-in exists', 'per-row boundary, no optimisation', 'ch4 §7'],
        ['coalesce(1) before a write', 'the whole job goes single-threaded', 'ch6 §1'],
        ['groupByKey instead of reduceByKey', 'every raw row crosses the network', 'ch3 §3'],
        ['dropDuplicates with no watermark', 'state grows until the job dies', 'ch7 §7'],
        ['Caching something read once', 'pays to materialise, uses it once', 'ch6 §4'],
        ['Partitioning by a high-cardinality key', 'a directory per row', 'ch4 §8'],
      ],
    },
    { id: 'shape', label: 'They share a shape', pattern: 'storage', icon: 'brain', sub: 'each one hides work the engine would have done' },
  ],
  edges: [
    { source: 'table', target: 'shape', label: 'none of these errors — every one of them just makes the job quietly worse' },
  ],
}
