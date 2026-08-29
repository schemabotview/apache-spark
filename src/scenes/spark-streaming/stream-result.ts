import type { Scene } from '../../render-engine'

// stream-result — the focused RESULT-TABLE + OUTPUT-MODES band. The result table is the answer your
// query would give if run over all data seen so far; for an aggregation it holds one row per group
// (per key, per window). On most triggers only a little of it changes, so you declare an OUTPUT MODE
// controlling how much gets written each trigger: append (only brand-new rows, never revises one —
// non-aggregates & finalized windows), update (only rows that changed this trigger — efficient for
// running aggregates), complete (the whole table rewritten every trigger — small aggregates only).
// You can't pick any mode for any query — e.g. an un-windowed aggregate can't use append — and Spark
// enforces the valid set (that rule rides the slide, not the scene).
export const streamResult: Scene = {
  id: 'stream-result',
  padding: 0.15,
  flow: 'LR',
  nodes: [
    { id: 'result', label: 'Result Table', pattern: 'service', icon: 'layers', sub: 'the answer over all data so far · one row per group / window' },
    {
      id: 'outmode',
      label: 'Output mode — how much gets written each trigger',
      pattern: 'group',
      sub: 'most triggers change only a little',
      children: [
        { id: 'om-append', label: 'append', pattern: 'service', icon: 'circlecheck', sub: 'brand-new rows only · non-aggr · finalized windows' },
        { id: 'om-update', label: 'update', pattern: 'service', icon: 'repeat', sub: 'rows changed this trigger · running aggregates' },
        { id: 'om-complete', label: 'complete', pattern: 'service', icon: 'layers', sub: 'whole table rewritten · small aggregates only' },
      ],
    },
  ],
  edges: [{ source: 'result', target: 'outmode', label: 'written via' }],
}
