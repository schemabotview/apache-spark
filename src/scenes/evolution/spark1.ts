import type { Scene } from '../../render-engine'

// §5 evo-spark1 — Spark walked through YARN's open door. Its insight was about disk: MapReduce
// wrote to disk between every step, murder for iterative work — so Spark keeps the working data in
// MEMORY. A Driver builds the job as a graph of RDDs (in-memory datasets) and a DAG scheduler
// pipelines the stages instead of round-tripping to disk. Running ON YARN and needing no cluster
// of its own, it came out 10–100× faster. The engine is an inner LR flow; the two payoffs fan
// beneath it.
export const spark1: Scene = {
  id: 'evo-spark1',
  padding: 0.16,
  nodes: [
    {
      id: 's1',
      label: 'Spark 1 · 2014',
      pattern: 'service',
      icon: 'zap',
      sub: 'bring it in-memory',
      flow: 'LR',
      children: [
        { id: 'driver', label: 'Driver', pattern: 'network', icon: 'brain', sub: 'builds & coordinates' },
        { id: 'rdd', label: 'RDD', pattern: 'storage', icon: 'layers', sub: 'in-memory dataset' },
        { id: 'dag', label: 'DAG Scheduler', pattern: 'user', icon: 'workflow', sub: 'pipelines stages' },
      ],
      edges: [
        { source: 'driver', target: 'rdd' },
        { source: 'rdd', target: 'dag' },
      ],
    },
    { id: 'onyarn', label: 'runs on YARN', pattern: 'external', sub: 'no cluster of its own' },
    { id: 'fast', label: '10–100× faster', pattern: 'storage', icon: 'zap', sub: 'iterative & interactive' },
  ],
  edges: [
    { source: 's1', target: 'onyarn' },
    { source: 's1', target: 'fast' },
  ],
}
