import type { Scene } from '../../render-engine'

// §6 evo-spark2 — Spark 2 turned the engine into a unified platform. It flipped the model: you
// declare WHAT you want and the engine works out HOW. A single SparkSession fronts DataFrames /
// Datasets (structured, typed APIs); behind them the Catalyst optimizer plans your query and
// Tungsten compiles it to tight off-heap code. Structured Streaming brings the same API to streams.
// The result: one engine for batch · SQL · ML · streaming. Inner flow chains the API down to its
// two engines; the unifying payoff sits beneath.
export const spark2: Scene = {
  id: 'evo-spark2',
  padding: 0.16,
  nodes: [
    {
      id: 's2',
      label: 'Spark 2 · 2016',
      pattern: 'service',
      icon: 'layers',
      sub: 'unify the API',
      children: [
        { id: 'session', label: 'SparkSession', pattern: 'network', icon: 'terminal', sub: 'one entry point' },
        { id: 'df', label: 'DataFrame / Dataset', pattern: 'user', icon: 'layers', sub: 'structured · typed' },
        { id: 'catalyst', label: 'Catalyst', pattern: 'user', icon: 'brain', sub: 'query optimizer' },
        { id: 'tungsten', label: 'Tungsten', pattern: 'storage', icon: 'memory', sub: 'codegen · off-heap' },
        { id: 'streaming', label: 'Structured Streaming', pattern: 'network', icon: 'waves', sub: 'same API, over streams' },
      ],
      edges: [
        { source: 'session', target: 'df' },
        { source: 'df', target: 'catalyst' },
        { source: 'catalyst', target: 'tungsten' },
        { source: 'catalyst', target: 'streaming' },
      ],
    },
    { id: 'unified', label: 'one engine', pattern: 'service', icon: 'zap', sub: 'batch · SQL · ML · stream' },
  ],
  edges: [{ source: 's2', target: 'unified' }],
}
