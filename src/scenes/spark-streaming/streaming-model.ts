import type { Scene } from '../../render-engine'

// streaming-model — the SPINE of the spark-streaming course ("The stream is a table"). The whole
// course hangs on one insight: a stream is an UNBOUNDED TABLE, and you run the SAME DataFrame/SQL
// query over it — Spark executes it incrementally. Three stacked bands: the trigger clock on top,
// the Sources → Input → Query → Result → Sinks dataflow in the middle, the durability layer below.
//
//   Trigger      micro-batch (default) · continuous (~1 ms)                     — when it runs
//   Pipeline     Sources ▶ Input Table ▶ Query ▶ Result Table ▶ Sinks           — the dataflow
//   Durability   Checkpoint (offsets + state) · exactly-once                    — fault tolerance
//
// Shared by the three whole-model sections — overview (opener), unbounded-table (the heart), and
// closer. The band deep-dives (sources · trigger · result+modes · sinks · durability) each ride
// their own focused scene, and event-time windowing rides the sibling `event-time` scene. Studio
// placed the State Store perpendicular under Query and the output modes under Result via hand-placed
// cells; this engine has no perpendicular placement, so those fold into Query's / Result's subs and
// their full detail lives in stream-durability / stream-result.
export const streamingModel: Scene = {
  id: 'streaming-model',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'trigger',
      label: 'Trigger — when does the query run?',
      pattern: 'group',
      sub: 'the clock',
      cols: 2,
      children: [
        { id: 'tr-microbatch', label: 'micro-batch', pattern: 'service', icon: 'clock', sub: 'default · fixed interval' },
        { id: 'tr-continuous', label: 'continuous', pattern: 'external', icon: 'waves', sub: '~1 ms latency' },
      ],
    },
    {
      id: 'pipeline',
      label: 'The unbounded-table dataflow',
      pattern: 'group',
      sub: 'same query, run incrementally',
      flow: 'LR',
      children: [
        {
          id: 'src', label: 'Sources', pattern: 'storage', icon: 'database', sub: 'append new rows',
          children: [
            { id: 'src-kafka', label: 'Kafka', pattern: 'external', sub: 'production' },
            { id: 'src-files', label: 'files', pattern: 'external' },
            { id: 'src-socket', label: 'socket', pattern: 'external', sub: 'demo only' },
            { id: 'src-rate', label: 'rate', pattern: 'external', sub: 'test source' },
          ],
        },
        {
          id: 'core', label: 'Unbounded table', pattern: 'group', sub: 'input → query → result', flow: 'TB',
          children: [
            { id: 'input', label: 'Input Table', pattern: 'service', icon: 'layers', sub: 'unbounded · append-only' },
            { id: 'query', label: 'Query', pattern: 'service', icon: 'gears', sub: 'same DataFrame/SQL · incremental · stateful' },
            { id: 'result', label: 'Result Table', pattern: 'service', icon: 'layers', sub: 'updated each trigger · output mode' },
          ],
          edges: [
            { source: 'input', target: 'query' },
            { source: 'query', target: 'result' },
          ],
        },
        {
          id: 'sink', label: 'Sinks', pattern: 'storage', icon: 'server', sub: 'where results land',
          children: [
            { id: 'sink-kafka', label: 'Kafka', pattern: 'external', sub: 'production' },
            { id: 'sink-files', label: 'files', pattern: 'external' },
            { id: 'sink-console', label: 'console', pattern: 'external', sub: 'debug' },
            { id: 'sink-foreach', label: 'foreach', pattern: 'external', sub: 'any store' },
          ],
        },
      ],
      edges: [
        { source: 'src', target: 'core' },
        { source: 'core', target: 'sink' },
      ],
    },
    {
      id: 'durability',
      label: 'Fault tolerance — restart where it left off',
      pattern: 'group',
      sub: 'trust the numbers',
      cols: 2,
      children: [
        { id: 'checkpoint', label: 'Checkpoint', pattern: 'storage', icon: 'database', sub: 'source offsets + state' },
        { id: 'exactly-once', label: 'exactly-once', pattern: 'service', icon: 'shieldcheck', sub: 'replay + idempotent sinks' },
      ],
    },
  ],
  edges: [
    { source: 'trigger', target: 'pipeline', label: 'drives each run' },
    { source: 'pipeline', target: 'durability', label: 'backed by' },
  ],
}
