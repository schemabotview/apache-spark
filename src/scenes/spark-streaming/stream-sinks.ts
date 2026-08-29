import type { Scene } from '../../render-engine'

// stream-sinks — the focused SINKS band, the mirror of stream-sources. A sink is the destination
// for the result stream: Kafka (publish downstream — the production default), files (Parquet/JSON to
// a directory, append-only & partitioned), console (print each batch — for debugging), and
// foreach/foreachBatch (hand each batch/row to your own code — write anywhere). But the sink is also
// where end-to-end correctness is decided. Replayable sources + checkpointed progress mean Spark
// re-processes data after a crash — at-least-once by design (the INPUT half). To make it exactly-
// once, the sink must be idempotent or transactional (the OUTPUT half): writing the same result
// twice has the effect of once. The two halves converge into the exactly-once guarantee.
export const streamSinks: Scene = {
  id: 'stream-sinks',
  padding: 0.15,
  flow: 'LR',
  nodes: [
    {
      id: 'sinks',
      label: 'Sinks — where the result stream lands',
      pattern: 'storage',
      icon: 'server',
      sub: 'the destination',
      children: [
        { id: 'sink-kafka', label: 'Kafka', pattern: 'external', icon: 'waves', sub: 'production · publish downstream' },
        { id: 'sink-files', label: 'files', pattern: 'external', icon: 'scroll', sub: 'Parquet/JSON · append-only' },
        { id: 'sink-console', label: 'console', pattern: 'external', icon: 'terminal', sub: 'stdout · debug' },
        { id: 'sink-foreach', label: 'foreach', pattern: 'external', icon: 'wrench', sub: 'any store · write anywhere' },
      ],
    },
    {
      id: 'guarantee',
      label: 'End-to-end exactly-once',
      pattern: 'group',
      sub: 'two halves of one guarantee',
      flow: 'LR',
      children: [
        { id: 'replay', label: 'replay source', pattern: 'service', icon: 'repeat', sub: 'input half · re-process after crash' },
        { id: 'idempotent', label: 'idempotent sink', pattern: 'service', icon: 'shieldcheck', sub: 'output half · same write twice = once' },
        { id: 'exactly-once', label: 'exactly-once', pattern: 'service', icon: 'circlecheck', sub: 'no dupes · no loss' },
      ],
      edges: [
        { source: 'replay', target: 'exactly-once' },
        { source: 'idempotent', target: 'exactly-once' },
      ],
    },
  ],
  edges: [{ source: 'sinks', target: 'guarantee', label: 'the guarantee is decided here' }],
}
