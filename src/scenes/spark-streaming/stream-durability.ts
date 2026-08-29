import type { Scene } from '../../render-engine'

// stream-durability — the focused DURABILITY band (state-and-checkpoints), the layer holding the
// whole thing up. Streaming keeps STATE across triggers — windowed counts, the running side of a
// join, the keys seen for dedup — per key, on the executors. CHECKPOINTING is what makes that
// survive a crash: every trigger, before it commits, Spark durably writes the source offsets AND the
// state store to a checkpoint location, atomically, so a restart reloads both and resumes from
// exactly that point (nothing skipped, nothing double-counted). Combined with a replayable source
// and an idempotent/transactional sink, that delivers END-TO-END EXACTLY-ONCE. The checkpointLocation
// effectively IS the query's identity (that note rides the slide). Ties back to stream-sinks.
export const streamDurability: Scene = {
  id: 'stream-durability',
  padding: 0.15,
  flow: 'TB',
  nodes: [
    {
      id: 'state',
      label: 'State Store — running state across triggers',
      pattern: 'storage',
      icon: 'memory',
      sub: 'per key · on the executors',
      cols: 3,
      children: [
        { id: 'st-agg', label: 'aggregations', pattern: 'storage', sub: 'running counts / sums' },
        { id: 'st-join', label: 'joins', pattern: 'storage', sub: 'the buffered side' },
        { id: 'st-dedup', label: 'dedup', pattern: 'storage', sub: 'keys seen so far' },
      ],
    },
    {
      id: 'checkpoint',
      label: 'Checkpoint — durable, atomic, every trigger',
      pattern: 'storage',
      icon: 'database',
      sub: 'both saved together',
      cols: 2,
      children: [
        { id: 'cp-offsets', label: 'source offsets', pattern: 'service', icon: 'tag', sub: 'where it was' },
        { id: 'cp-state', label: 'state', pattern: 'service', icon: 'memory', sub: 'running totals' },
      ],
    },
    {
      id: 'exactly-once',
      label: 'End-to-end exactly-once',
      pattern: 'service',
      icon: 'shieldcheck',
      sub: 'replay source + checkpointed state + idempotent sink',
    },
  ],
  edges: [
    { source: 'state', target: 'checkpoint', label: 'saved every trigger' },
    { source: 'checkpoint', target: 'exactly-once', label: 'restart resumes exactly' },
  ],
}
