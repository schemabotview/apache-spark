import type { Scene } from '../../render-engine'

// §1 evo-overview — the whole road at a glance: five eras, each a card with its year + the pieces
// that era added. Big data (the problem) → Hadoop 1 → Hadoop 2/YARN → Spark 1 → Spark 2. The Spark
// eras wear the `service` orange (Spark's brand colour); the Hadoop eras are `network` blue; the
// opening problem is a neutral `external`. Detail lives in the per-era scenes that follow — this one
// stays a clean spine.
//
// Composition: the five cards are FOLDED into two era bands sitting side by side (scene flow LR),
// each band a TB spine. As one flat chain the scene was 210×840 — a 0.25 aspect ribbon in a roughly
// square pane, so it read as a thin vertical line with dead space either side. Folded it is ~566×537
// (1.05), close to the pane's own aspect, so fitView scales it up instead of leaving margins. The
// crossing edge is still h2 → s1, the real cards: layout remaps it to the owning bands to position
// them, but the arrow itself is drawn between the two era cards, so the road stays one chain. Each
// band still reads top → bottom, which is what the narration promises.
export const overview: Scene = {
  id: 'evo-overview',
  padding: 0.16,
  flow: 'LR',
  nodes: [
    {
      id: 'hadoop-era',
      label: 'The Hadoop era',
      pattern: 'network',
      icon: 'server',
      sub: '2006 → 2013',
      flow: 'TB',
      children: [
        { id: 'bigdata', label: 'Big data', pattern: 'external', icon: 'database', sub: 'outgrew one machine' },
        { id: 'h1', label: 'Hadoop 1', pattern: 'network', icon: 'server', sub: '2006 · HDFS · MapReduce · JobTracker' },
        { id: 'h2', label: 'Hadoop 2 / YARN', pattern: 'network', icon: 'workflow', sub: '2013 · ResourceManager · many engines' },
      ],
      edges: [
        { source: 'bigdata', target: 'h1' },
        { source: 'h1', target: 'h2' },
      ],
    },
    {
      id: 'spark-era',
      label: 'The Spark era',
      pattern: 'service',
      icon: 'zap',
      sub: '2014 → 2016',
      flow: 'TB',
      children: [
        { id: 's1', label: 'Spark 1', pattern: 'service', icon: 'zap', sub: '2014 · Driver · RDD · DAG · in-memory' },
        { id: 's2', label: 'Spark 2', pattern: 'service', icon: 'layers', sub: '2016 · DataFrame · Catalyst · unified' },
      ],
      edges: [{ source: 's1', target: 's2' }],
    },
  ],
  edges: [{ source: 'h2', target: 's1' }],
}
