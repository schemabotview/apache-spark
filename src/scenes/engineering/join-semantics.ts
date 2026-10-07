import type { Scene } from '@graphlearning/flow'

// §4 join-semantics — the reference table of the chapter. Ordered so the four everyone knows come
// first and the two almost nobody does come last, because semi and anti are the ones that replace a
// slow pattern: people write a join-then-dropDuplicates or a `isin` over a collected list when they
// wanted a semi join, and both are far more expensive and sometimes wrong.
//
// The row-count column is the part a reference usually omits and the part that bites — a join is the
// one operation that can silently MULTIPLY your data, and a pipeline whose output doubled is much
// harder to notice than one that crashed.
export const joinSemantics: Scene = {
  id: 'join-semantics',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'types',
      kind: 'table',
      label: 'Six joins, and what each does to your row count',
      sub: 'the last two are the ones people reach for a slower pattern instead of',
      pattern: 'service',
      headers: ['Join', 'Keeps', 'Columns', 'Row count'],
      values: [
        ['inner', 'rows matching on both sides', 'both', 'can grow or shrink'],
        ['left', 'all of the left, matched or not', 'both, right nulled', 'at least the left'],
        ['right', 'all of the right', 'both, left nulled', 'at least the right'],
        ['full outer', 'everything from both', 'both, either nulled', 'at least the larger'],
        ['left semi', 'left rows that HAVE a match', 'LEFT ONLY', 'never grows'],
        ['left anti', 'left rows with NO match', 'LEFT ONLY', 'never grows'],
      ],
    },
    {
      id: 'multiply',
      label: 'The one that bites',
      pattern: 'warn',
      icon: 'copy',
      sub: 'a duplicate key on both sides multiplies rows',
    },
    { id: 'semi', label: 'Filtering, not joining?', pattern: 'storage', icon: 'funnel', sub: 'semi and anti never duplicate' },
  ],
  edges: [
    { source: 'types', target: 'multiply', label: '2 matching left rows × 3 matching right rows = 6 output rows, silently' },
    { source: 'multiply', target: 'semi' },
  ],
}
