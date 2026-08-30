import type { Scene } from '../../render-engine'

// lambda-arch — the ONE master map of the capstone course ("Everything, end to end"), shared by all
// 13 sections. It shows the whole Lambda-architecture pipeline the project builds: one clickstream,
// fed into two layers, merged for serving, and run on a cluster — a single spine:
//
//        Sources (Data Lake · Kafka)
//        Two layers ┬── Batch layer (nightly, accurate):  read ▸ clean ▸ aggregate ▸ view   (TOP)
//                   └── Speed layer (streaming, fresh):   readStream ▸ enrich ▸ window ▸ view
//              Serving layer (merge history + recent → one answer)
//                     Run it (spark-submit · cluster · tune)
//
// Composition: each lane runs LR and the two lanes STACK inside a `lanes` wrapper. Drawn as two TB
// lanes side by side the scene was 746×1508 — a 0.49 aspect in a roughly square pane, so fitView
// was height-bound at 0.65 and the right half of the pane sat empty. Folded this way it is ~1166×1192
// (0.98), essentially the pane's own aspect, and scales to ~0.85. The cost is the old branch → merge
// diamond: with the lanes stacked, a `batch → serving` edge would route straight through the speed
// lane's box, so the in/out edges are container-level (sources → lanes → serving). The parallelism
// now reads from the two lane boxes sitting side by side inside one wrapper, and every intra-lane
// arrow survives — those are what each section actually walks.
//
// The whole capstone stays on this one map (owner's design — no separate code-walk scenes): each
// section's RIGHT slide carries that stage's real code + an "Exercises: <concept>" tag; the section
// heading names the stage. Studio spotlit the current stage via focus-dimming; with no reveal here
// the map is a persistent orientation device and the heading/code carry "you are here". Batch LEFT,
// speed RIGHT. Node ids: `src-*`, `ba-*` batch, `sp-*` speed, `sv-*` serving, `run-*` deploy.
export const lambdaArch: Scene = {
  id: 'lambda-arch',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'sources',
      label: 'Sources — one event stream, two entry points',
      pattern: 'group',
      sub: 'the clickstream',
      cols: 2,
      children: [
        { id: 'src-lake', label: 'Data Lake', pattern: 'storage', icon: 'database', sub: 'raw events as Parquet · feeds batch' },
        { id: 'src-kafka', label: 'Kafka', pattern: 'external', icon: 'waves', sub: 'real-time events · feeds speed' },
      ],
    },
    {
      id: 'lanes',
      label: 'Two layers — one clickstream, two speeds',
      pattern: 'group',
      sub: 'the Lambda split',
      // No edges between the lanes — an edgeless container STACKS its children, which is what folds
      // the two LR lanes into a near-square block instead of a 2320px-wide row.
      children: [
        {
          id: 'batch',
          label: 'Batch layer — nightly · accurate',
          pattern: 'service',
          icon: 'database',
          sub: 'the source of truth',
          flow: 'LR',
          children: [
            { id: 'ba-read', label: 'read the lake', pattern: 'service', icon: 'database', sub: 'Parquet · pushdown' },
            { id: 'ba-clean', label: 'clean + dedup', pattern: 'service', icon: 'wrench', sub: 'filter · withColumn' },
            { id: 'ba-agg', label: 'join + aggregate', pattern: 'service', icon: 'gears', sub: 'sort-merge · groupBy' },
            { id: 'ba-view', label: 'batch view', pattern: 'service', icon: 'layers', sub: 'partitioned write' },
          ],
          edges: [
            { source: 'ba-read', target: 'ba-clean' },
            { source: 'ba-clean', target: 'ba-agg' },
            { source: 'ba-agg', target: 'ba-view' },
          ],
        },
        {
          id: 'speed',
          label: 'Speed layer — streaming · low latency',
          pattern: 'service',
          icon: 'waves',
          sub: "what's happening now",
          flow: 'LR',
          children: [
            { id: 'sp-read', label: 'readStream', pattern: 'service', icon: 'waves', sub: 'from Kafka' },
            { id: 'sp-enrich', label: 'enrich', pattern: 'service', icon: 'share', sub: 'broadcast-join product dim' },
            { id: 'sp-window', label: 'window + watermark', pattern: 'service', icon: 'clock', sub: 'revenue per 5-min · per category' },
            { id: 'sp-view', label: 'real-time view', pattern: 'service', icon: 'layers', sub: 'writeStream + checkpoint' },
          ],
          edges: [
            { source: 'sp-read', target: 'sp-enrich' },
            { source: 'sp-enrich', target: 'sp-window' },
            { source: 'sp-window', target: 'sp-view' },
          ],
        },
      ],
    },
    {
      id: 'serving',
      label: 'Serving layer — merge the two views',
      pattern: 'user',
      icon: 'share',
      sub: 'accuracy from batch · latency from speed',
      flow: 'LR',
      children: [
        { id: 'sv-merge', label: 'merge', pattern: 'user', icon: 'share', sub: 'batch history + recent stream' },
        { id: 'sv-answer', label: 'the answer', pattern: 'service', icon: 'gauge', sub: 'revenue by category, up to now' },
      ],
      edges: [{ source: 'sv-merge', target: 'sv-answer' }],
    },
    {
      id: 'deploy',
      label: 'Run it — package · submit · watch',
      pattern: 'group',
      sub: 'the runtime from the architecture course',
      cols: 3,
      children: [
        { id: 'run-submit', label: 'spark-submit', pattern: 'network', icon: 'terminal', sub: 'deploy mode · config' },
        { id: 'run-cluster', label: 'on a cluster', pattern: 'external', icon: 'server', sub: 'driver + executors' },
        { id: 'run-tune', label: 'observe + tune', pattern: 'service', icon: 'gauge', sub: 'Spark UI · AQE · cache' },
      ],
    },
  ],
  // Container-level in/out: with the lanes stacked, a `batch → serving` edge would be drawn straight
  // through the speed lane's box (layout remaps the endpoint to `lanes`, but the ARROW keeps its real
  // deep endpoint). So the spine addresses the wrapper.
  edges: [
    { source: 'sources', target: 'lanes' },
    { source: 'lanes', target: 'serving' },
    { source: 'serving', target: 'deploy' },
  ],
}
