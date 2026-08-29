import type { Scene } from '../../render-engine'

// api-engine — the focused ENGINE band: the bridge between what you DECLARE and what actually RUNS,
// as a high-level two-step. Catalyst, the query optimizer, turns your structured query into a
// logical plan, rewrites it with rules, and picks the cheapest physical plan. Tungsten, the
// execution backend, compiles that plan into tight JVM bytecode (whole-stage codegen) over off-heap
// binary memory, and emits ordinary RDDs — back down to the core the course started at. The payoff
// (you say WHAT, the engine works out HOW; often beats hand-written RDD code) rides the slide. Kept
// a clean four-node chain — the sibling `catalyst` scene unpacks the full logical/physical pipeline.
//
// TB (a top-to-bottom column), with single-word labels and short subs so each card stays on one/two
// lines — the long "Catalyst · query optimizer" / multi-clause subs wrapped 3 lines and read tall &
// lean; the descriptive detail lives on the slide.
export const apiEngine: Scene = {
  id: 'api-engine',
  padding: 0.15,
  flow: 'TB',
  nodes: [
    { id: 'query', label: 'structured query', pattern: 'network', icon: 'terminal', sub: 'what you declare' },
    { id: 'catalyst', label: 'Catalyst', pattern: 'user', icon: 'brain', sub: 'query optimizer · picks the plan' },
    { id: 'tungsten', label: 'Tungsten', pattern: 'storage', icon: 'memory', sub: 'codegen → JVM bytecode · off-heap' },
    { id: 'rdds', label: 'RDDs on the cluster', pattern: 'external', icon: 'server', sub: 'what actually runs' },
  ],
  edges: [
    { source: 'query', target: 'catalyst', label: 'plan' },
    { source: 'catalyst', target: 'tungsten', label: 'compile' },
    { source: 'tungsten', target: 'rdds', label: 'emit' },
  ],
}
