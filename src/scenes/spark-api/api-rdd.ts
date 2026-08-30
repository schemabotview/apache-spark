import type { Scene } from '../../render-engine'

// api-rdd — the focused RDD-CORE band. The bottom of the stack, where the course starts. An RDD —
// Resilient Distributed Dataset — is three things: a DISTRIBUTED collection (data split into
// partitions across the executors), IMMUTABLE (every transformation makes a new RDD, never edits in
// place), and RESILIENT (Spark tracks each RDD's lineage, so a lost partition is recomputed, not
// lost). You work with it in two kinds of operation: transformations (map/filter/flatMap) are lazy
// and just extend the lineage; actions (count/collect/reduce) trigger the actual computation. The
// trade-off (the warn node) is the hook into the structured APIs: total control, but opaque to the
// optimizer — Spark sees your lambdas, not your intent, so it can't optimize for you.
export const apiRdd: Scene = {
  id: 'api-rdd',
  padding: 0.15,
  flow: 'TB',
  nodes: [
    {
      id: 'rdd',
      label: 'RDD — Resilient Distributed Dataset',
      pattern: 'storage',
      icon: 'layers',
      sub: 'the original Spark abstraction',
      cols: 3,
      children: [
        { id: 'rdd-distributed', label: 'distributed', pattern: 'storage', icon: 'boxes', sub: 'data split into partitions' },
        { id: 'rdd-immutable', label: 'immutable', pattern: 'storage', icon: 'lock', sub: 'a transformation makes a new RDD' },
        { id: 'rdd-resilient', label: 'resilient', pattern: 'storage', icon: 'shieldcheck', sub: 'lineage → lost partition recomputed' },
      ],
    },
    {
      id: 'work',
      label: 'How you work with it',
      pattern: 'service',
      sub: 'purely functional · you control partitioning',
      flow: 'LR',
      children: [
        { id: 'transforms', label: 'Transformations', pattern: 'service', icon: 'gears', sub: 'map · filter · flatMap · extend the lineage' },
        { id: 'actions', label: 'Actions', pattern: 'service', icon: 'zap', sub: 'count · collect · reduce · trigger compute' },
      ],
      edges: [{ source: 'transforms', target: 'actions', label: 'lazy until an action' }],
    },
    {
      id: 'tradeoff',
      // A leaf card is a fixed 210×96, so the long form (a 4-line label over a 3-line sub) spilled
      // out top and bottom. The headline moves to the label and the trade-off itself to the sub —
      // 1 line + 2 lines fits with room. "Spark sees your lambdas, not your intent" is on the slide.
      label: 'the trade-off',
      pattern: 'warn',
      sub: 'total control, but opaque to the optimizer',
    },
  ],
  edges: [
    { source: 'rdd', target: 'work' },
    { source: 'work', target: 'tradeoff' },
  ],
}
