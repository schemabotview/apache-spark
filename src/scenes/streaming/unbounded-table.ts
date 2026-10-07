import type { Scene } from '@graphlearning/flow'

// §2 unbounded-table — the model, drawn as what it is: rows arriving at the bottom of a table that
// is never closed. The chips are micro-batches, and the two greyed ones are the point — the table
// does not get replaced each time, it gets APPENDED to, and the query sees the whole thing.
//
// Output mode is the part people get wrong, and the error is always the same shape: they pick a mode
// the query cannot support, Spark refuses at start-up, and the message is about streaming semantics
// rather than about the mode. The table's last column is why each one is legal, not just what it does.
export const unboundedTable: Scene = {
  id: 'unbounded-table',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'input',
      label: 'The input table — new rows are APPENDED, nothing is replaced',
      pattern: 'group',
      icon: 'none',
      cols: 4,
      children: [
        { id: 'b1', label: 'batch 1', variant: 'chip', pattern: 'storage', icon: 'none' },
        { id: 'b2', label: 'batch 2', variant: 'chip', pattern: 'storage', icon: 'none' },
        { id: 'b3', label: 'batch 3', variant: 'chip', pattern: 'service', icon: 'none' },
        { id: 'b4', label: '…forever', variant: 'chip', pattern: 'network', icon: 'none' },
      ],
    },
    {
      id: 'modes',
      kind: 'table',
      label: 'The result table is written out in one of three modes',
      sub: 'pick one the query cannot support and Spark refuses at start-up',
      pattern: 'service',
      headers: ['Mode', 'Writes', 'Legal when'],
      values: [
        ['append', 'only brand-new rows', 'nothing already written can change'],
        ['update', 'rows that changed this batch', 'almost always — the usual choice'],
        ['complete', 'the entire result, every batch', 'the result is small and aggregated'],
      ],
    },
    { id: 'agg', label: 'Aggregates block append', pattern: 'warn', icon: 'ban', sub: 'unless a watermark closes the window' },
  ],
  edges: [
    { source: 'input', target: 'modes', label: 'the query runs against the WHOLE table each time, incrementally — not just the new rows' },
    { source: 'modes', target: 'agg', label: 'a running count can always change, so there is no "final" row to append — §6 fixes this' },
  ],
}
