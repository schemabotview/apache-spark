import type { Scene } from '../../render-engine'

// catalyst — the compile-down PIPELINE, the second shared scene of the spark-api course. Where
// api-stack shows the stack of altitudes, this unpacks the engine band: how any structured query —
// DataFrame, Dataset, or SQL — becomes RDDs, read left→right in two bands:
//
//   LOGICAL   Query → Unresolved → Analyzed → Optimized     (Catalog feeds Analysis)   — what to do
//   PHYSICAL  Physical Plans → Cost Model → Selected → Codegen → RDDs                   — how to run it
//
// Shared by all three catalyst sections: catalyst-overview frames the whole pipeline; catalyst-logical
// dwells on the left band (analysis + rule-based rewrites); tungsten-physical dwells on the right band
// (candidates → cost model → Tungsten codegen → RDDs).
//
// Composition: two TB bands sitting side by side (scene flow LR). The bands are 4 and 5 nodes deep, so
// running them LR made a 2.6:1 ribbon that fitView shrank to ~0.71 in the near-square scene pane —
// tiny nodes, half the pane empty. Turned on their side the scene is ~820×913 (0.9:1), close to the
// pane's own aspect, so it scales up instead of down. Each band still reads as one flow, start to end.
export const catalyst: Scene = {
  id: 'catalyst',
  padding: 0.14,
  flow: 'LR',
  nodes: [
    {
      id: 'logical',
      label: 'Logical planning — what to do',
      pattern: 'service',
      icon: 'brain',
      flow: 'TB',
      children: [
        { id: 'q', label: 'Query', pattern: 'network', icon: 'terminal', sub: 'DataFrame · Dataset · SQL' },
        { id: 'ulp', label: 'Unresolved Plan', pattern: 'external', icon: 'workflow', sub: 'names not bound' },
        { id: 'alp', label: 'Analyzed Plan', pattern: 'service', icon: 'brain', sub: 'names & types resolved' },
        { id: 'olp', label: 'Optimized Plan', pattern: 'service', icon: 'gears', sub: 'rules applied' },
        { id: 'catalog', label: 'Catalog', pattern: 'storage', icon: 'database', sub: 'tables · columns · types' },
      ],
      edges: [
        { source: 'q', target: 'ulp' },
        { source: 'ulp', target: 'alp' },
        { source: 'catalog', target: 'alp' },
        { source: 'alp', target: 'olp' },
      ],
    },
    {
      id: 'physical',
      label: 'Physical planning & codegen — how to run it',
      pattern: 'user',
      icon: 'gears',
      flow: 'TB',
      children: [
        { id: 'pp', label: 'Physical Plans', pattern: 'user', icon: 'workflow', sub: 'candidate strategies' },
        { id: 'cost', label: 'Cost Model', pattern: 'external', icon: 'gauge', sub: 'estimate each' },
        { id: 'spp', label: 'Selected Plan', pattern: 'service', icon: 'circlecheck', sub: 'the cheapest' },
        { id: 'codegen', label: 'Whole-stage Codegen', pattern: 'storage', icon: 'memory', sub: 'Tungsten · JVM bytecode' },
        { id: 'rdds', label: 'RDDs', pattern: 'external', icon: 'layers', sub: 'run on the cluster' },
      ],
      edges: [
        { source: 'pp', target: 'cost' },
        { source: 'cost', target: 'spp' },
        { source: 'spp', target: 'codegen' },
        { source: 'codegen', target: 'rdds' },
      ],
    },
  ],
  edges: [{ source: 'logical', target: 'physical', label: 'optimized plan → physical planning' }],
}
