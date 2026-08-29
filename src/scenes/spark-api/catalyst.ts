import type { Scene } from '../../render-engine'

// catalyst — the compile-down PIPELINE, the second shared scene of the spark-api course. Where
// api-stack shows the stack of altitudes, this unpacks the engine band: how any structured query —
// DataFrame, Dataset, or SQL — becomes RDDs, read left→right in two bands:
//
//   LOGICAL   Query → Unresolved → Analyzed → Optimized     (Catalog feeds Analysis)   — what to do
//   PHYSICAL  Physical Plans → Cost Model → Selected → Codegen → RDDs                   — how to run it
//
// Shared by all three catalyst sections: catalyst-overview frames the whole pipeline; catalyst-logical
// dwells on the top band (analysis + rule-based rewrites); tungsten-physical dwells on the bottom band
// (candidates → cost model → Tungsten codegen → RDDs). Landscape (two LR bands stacked TB) so the
// whole-pipeline overview reads wide, not tall. Short labels/subs so the 5-wide bands stay legible.
export const catalyst: Scene = {
  id: 'catalyst',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'logical',
      label: 'Logical planning — what to do',
      pattern: 'service',
      icon: 'brain',
      flow: 'LR',
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
      flow: 'LR',
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
