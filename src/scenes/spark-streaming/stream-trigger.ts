import type { Scene } from '../../render-engine'

// stream-trigger — the focused TRIGGER band: the clock that decides when each incremental run
// fires. Two engines. Micro-batch (the default) collects arrived data and processes it in small
// batches: a fixed interval, or as-fast-as-possible (next batch when the last ends), or
// availableNow/once (drain all waiting data then stop — a streaming query as a scheduled job).
// Continuous is a separate low-latency engine that processes records one at a time (~1 ms), but is
// experimental with a limited operation set. Both sit on one trade-off: bigger batches buy
// throughput at the cost of latency; smaller batches the reverse. Almost everyone runs micro-batch.
export const streamTrigger: Scene = {
  id: 'stream-trigger',
  padding: 0.15,
  flow: 'TB',
  nodes: [
    { id: 'trigger', label: 'Trigger — the clock', pattern: 'network', icon: 'clock', sub: 'how often the query runs' },
    {
      id: 'microbatch',
      label: 'micro-batch · default',
      pattern: 'service',
      sub: 'small batches on a schedule',
      children: [
        { id: 'mb-interval', label: 'fixed interval', pattern: 'service', sub: 'e.g. every 10 s' },
        { id: 'mb-asap', label: 'as fast as possible', pattern: 'service', sub: 'next batch when the last ends' },
        { id: 'mb-once', label: 'availableNow / once', pattern: 'service', sub: 'drain all, then stop · scheduled job' },
      ],
    },
    {
      id: 'continuous',
      label: 'continuous · low latency',
      pattern: 'external',
      sub: 'one record at a time',
      children: [
        { id: 'cont-latency', label: 'record-at-a-time', pattern: 'external', sub: '~1 ms latency' },
        { id: 'cont-exp', label: 'experimental', pattern: 'external', sub: 'limited operation set' },
      ],
    },
    {
      id: 'tradeoff',
      label: 'the trade-off · one dial',
      pattern: 'group',
      sub: 'bigger batches → throughput · smaller → latency',
    },
  ],
  edges: [
    { source: 'trigger', target: 'microbatch' },
    { source: 'trigger', target: 'continuous' },
    { source: 'microbatch', target: 'tradeoff' },
    { source: 'continuous', target: 'tradeoff' },
  ],
}
