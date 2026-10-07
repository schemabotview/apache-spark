import type { Scene } from '@graphlearning/flow'

// §7 aqe — the payoff of chapter 5 §4's caveat. The cost model plans from statistics; AQE re-plans
// from what actually happened, at each shuffle boundary, with real sizes in hand.
//
// The scene is a BEFORE/AFTER pair of plan fragments because the thing to recognise is a word in the
// output: `AdaptiveSparkPlan` wrapping the tree, and `isFinalPlan=false` meaning what you are reading
// is a guess that will be revised. A reader who does not know that will debug the wrong plan.
export const aqe: Scene = {
  id: 'aqe',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'does',
      kind: 'table',
      label: 'Three things AQE fixes at runtime, once it can see real sizes',
      sub: 'on by default since Spark 3.2 — these are the three worth knowing by name',
      pattern: 'service',
      headers: ['What it does', 'The static plan got it wrong because'],
      values: [
        ['Coalesces shuffle partitions', '200 was a guess, not a measurement'],
        ['Switches sort-merge to broadcast', 'a filter made one side small after planning'],
        ['Splits a skewed partition', 'statistics describe averages, not outliers'],
      ],
    },
    {
      id: 'plan',
      kind: 'code',
      hug: true,
      filename: 'what it looks like in explain()',
      label: [
        'AdaptiveSparkPlan isFinalPlan=false      <- still a guess',
        '+- SortMergeJoin [customer_id]',
        '',
        '# ...and after the first stage finishes:',
        'AdaptiveSparkPlan isFinalPlan=true       <- re-planned',
        '+- BroadcastHashJoin [customer_id]       <- it changed',
      ].join('\n'),
    },
    { id: 'still', label: 'It is not a substitute', pattern: 'warn', icon: 'gauge', sub: 'AQE cannot unread a badly laid out table' },
  ],
  edges: [
    { source: 'does', target: 'plan', label: 'it re-plans at every shuffle boundary, where a stage has just produced real numbers' },
    { source: 'plan', target: 'still' },
  ],
}
