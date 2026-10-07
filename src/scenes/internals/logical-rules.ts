import type { Scene } from '@graphlearning/flow'

// §3 logical-rules — the rules, as a reference table, because this is the section a reader comes back
// to when they want to know whether Spark will do a thing for them or whether they must do it
// themselves. The "You can stop doing" column is the point: every row is work people still do by
// hand out of habit from systems that did not optimise.
//
// Predicate pushdown is first because it is the one with the largest effect and the one §1 already
// showed happening — the filter that ended up inside the FileScan.
export const logicalRules: Scene = {
  id: 'logical-rules',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'rules',
      kind: 'table',
      label: 'What the rule-based optimiser does to your tree, for free',
      sub: 'every row is something people still hand-optimise out of habit',
      pattern: 'service',
      headers: ['Rule', 'What it does', 'You can stop'],
      values: [
        ['Predicate pushdown', 'moves filters toward the scan', 'ordering your filters'],
        ['Column pruning', 'reads only referenced columns', 'hand-writing selects'],
        ['Constant folding', 'evaluates 60 * 60 at plan time', 'pre-computing literals'],
        ['Combine filters', 'merges adjacent filters into one', 'chaining them carefully'],
        ['Boolean simplification', 'collapses always-true branches', 'tidying your conditions'],
        ['Limit pushdown', 'stops the scan early for a limit', 'worrying about show()'],
      ],
    },
    {
      id: 'order',
      label: 'Rules run to a FIXED POINT — over and over until the tree stops changing',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'o-why', variant: 'tile', label: 'Why repeat', pattern: 'service', icon: 'repeat', sub: 'one rewrite exposes the next' },
        { id: 'o-eg', variant: 'tile', label: 'One feeds the next', pattern: 'storage', icon: 'funnel', sub: 'folding lets pruning fire' },
        { id: 'o-stop', variant: 'tile', label: 'Then it stops', pattern: 'network', icon: 'circlecheck', sub: 'nothing matched this pass' },
      ],
    },
    { id: 'blind', label: 'A UDF stops all of it', pattern: 'warn', icon: 'ban', sub: 'nothing moves through a black box' },
  ],
  edges: [
    { source: 'rules', target: 'order' },
    { source: 'order', target: 'blind', label: 'chapter 4 §7, from the other side — this is what the opaque wall actually blocks' },
  ],
}
