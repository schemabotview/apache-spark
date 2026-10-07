import type { Scene } from '@graphlearning/flow'

// §9 reading-explain — the chapter's bookend and the only one that teaches a SKILL rather than a
// mechanism. So the plan output owns the board (chapter 3 §9's lesson) and the checklist sits beneath
// it: a reader should finish this section able to open a plan they have never seen and get four
// answers out of it in under a minute.
//
// The annotations in the snippet are the teaching. Every one of them points at something the previous
// eight sections explained, which is what makes this a recap rather than a tenth topic.
export const readingExplain: Scene = {
  id: 'reading-explain',
  padding: 0.1,
  flow: 'TB',
  nodes: [
    {
      id: 'plan',
      kind: 'code',
      hug: true,
      filename: 'read it BOTTOM-UP — the data flows upward',
      label: [
        '*(2) HashAggregate [country], [sum(rev)]     <- 4 final agg',
        '+- Exchange hashpartitioning(country, 200)    <- 3 the shuffle',
        '   +- *(1) HashAggregate [country], [partial_sum]',
        '      +- *(1) Project [country, total]       <- 2 pruned',
        '         +- *(1) Filter (total > 100)',
        '            +- FileScan parquet [country,total]  <- 1 here',
        '               PushedFilters: [GreaterThan(total,100)]',
      ].join('\n'),
    },
    {
      id: 'checklist',
      kind: 'table',
      label: 'Four questions, every time, in this order',
      sub: 'a plan you have never seen should give these up in under a minute',
      pattern: 'service',
      headers: ['Look for', 'What it tells you'],
      values: [
        ['FileScan: ReadSchema', 'did column pruning happen?'],
        ['FileScan: PushedFilters', 'did the filter reach the disk?'],
        ['Count the Exchanges', 'how many stages, and why each one'],
        ['The `*(n)` markers', 'which operators got fused by codegen'],
      ],
    },
    { id: 'missing', label: 'No star, no codegen', pattern: 'warn', icon: 'ban', sub: 'usually a UDF, usually the problem' },
  ],
  edges: [
    { source: 'plan', target: 'checklist', label: 'explain("formatted") splits it into a tree plus per-node detail — use it on anything real' },
    { source: 'checklist', target: 'missing' },
  ],
}
