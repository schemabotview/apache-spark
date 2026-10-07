import type { Scene } from '@graphlearning/flow'

// §6 table-formats — NESTING, because the whole idea is that a "table" is a directory of Parquet
// files PLUS a log, and the log is the part that makes it a table. Drawing the log inside the same
// directory as the data is what makes "it is still just Parquet underneath" land — people assume a
// format change means a new storage engine, and it does not.
//
// Chapter 4 left two problems open and named them: schema evolution that breaks readers (§1) and
// the small-file problem (§8). Both are solved here, which is why this section sits in the
// production chapter rather than with the formats in chapter 3.
export const tableFormats: Scene = {
  id: 'table-formats',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'dir',
      label: 'orders/ — still a directory of Parquet files, plus the thing that makes it a table',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      align: 'start',
      children: [
        {
          id: 'data',
          label: 'The data — unchanged',
          pattern: 'storage',
          icon: 'folder',
          cols: 3,
          children: [
            { id: 'p1', label: 'part-0', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'p2', label: 'part-1', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'p3', label: 'part-2', variant: 'chip', pattern: 'storage', icon: 'none' },
          ],
        },
        {
          id: 'log',
          label: '_delta_log/ — the transaction log',
          pattern: 'service',
          icon: 'scroll',
          cols: 3,
          children: [
            { id: 'v0', label: 'v0', variant: 'chip', pattern: 'service', icon: 'none' },
            { id: 'v1', label: 'v1', variant: 'chip', pattern: 'service', icon: 'none' },
            { id: 'v2', label: 'v2', variant: 'chip', pattern: 'network', icon: 'none' },
          ],
        },
      ],
    },
    {
      id: 'gives',
      kind: 'table',
      label: 'What the log buys you over bare Parquet',
      sub: 'the first two rows are chapter 4 problems this chapter finally closes',
      pattern: 'service',
      headers: ['You get', 'Which fixes'],
      values: [
        ['Schema enforcement and evolution', 'ch4 §1 — drift that breaks every reader'],
        ['Compaction (OPTIMIZE)', 'ch4 §8 — the small-file problem'],
        ['ACID writes', 'a reader never sees a half-written job'],
        ['Time travel', 'read the table as of v1, or as of Tuesday'],
        ['MERGE / upserts', 'the thing plain Parquet simply cannot do'],
      ],
    },
    { id: 'pick', label: 'Pick on engines', pattern: 'storage', icon: 'warehouse', sub: 'not on a feature matrix' },
  ],
  edges: [
    { source: 'dir', target: 'gives', label: 'the log records which files belong to the table at each version — that is the whole trick' },
    { source: 'gives', target: 'pick' },
  ],
}
