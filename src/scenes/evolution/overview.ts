import type { Scene } from '../../render-engine'

// §1 evo-overview — the whole road at a glance: five eras as a top→bottom timeline, each a card
// with its year + the pieces that era added. Big data (the problem) → Hadoop 1 → Hadoop 2/YARN →
// Spark 1 → Spark 2. The Spark eras wear the `service` orange (Spark's brand colour); the Hadoop
// eras are `network` blue; the opening problem is a neutral `external`. Detail lives in the
// per-era scenes that follow — this one stays a clean spine.
export const overview: Scene = {
  id: 'evo-overview',
  padding: 0.16,
  nodes: [
    { id: 'bigdata', label: 'Big data', pattern: 'external', icon: 'database', sub: 'outgrew one machine' },
    { id: 'h1', label: 'Hadoop 1', pattern: 'network', icon: 'server', sub: '2006 · HDFS · MapReduce · JobTracker' },
    { id: 'h2', label: 'Hadoop 2 / YARN', pattern: 'network', icon: 'workflow', sub: '2013 · ResourceManager · many engines' },
    { id: 's1', label: 'Spark 1', pattern: 'service', icon: 'zap', sub: '2014 · Driver · RDD · DAG · in-memory' },
    { id: 's2', label: 'Spark 2', pattern: 'service', icon: 'layers', sub: '2016 · DataFrame · Catalyst · unified' },
  ],
  edges: [
    { source: 'bigdata', target: 'h1' },
    { source: 'h1', target: 'h2' },
    { source: 'h2', target: 's1' },
    { source: 's1', target: 's2' },
  ],
}
