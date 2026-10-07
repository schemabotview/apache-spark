import type { Scene } from '@graphlearning/flow'

// §4 triggers — the section that corrects a misconception rather than teaching a feature. Structured
// Streaming is MICRO-BATCH: it is not row-at-a-time, it is a very fast loop of small batches, and
// every mental model from chapters 2 and 5 transfers intact. Say that plainly and the rest is config.
//
// `availableNow` gets its own card because it is the genuinely useful one people have not heard of:
// it drains the backlog and stops, which turns a streaming job into a scheduled batch job that keeps
// its checkpoint — the same code, run hourly, with no duplicate handling to write.
export const triggers: Scene = {
  id: 'triggers',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'loop',
      label: 'It is a LOOP of small batches — every mental model from chapters 2 and 5 still applies',
      pattern: 'group',
      icon: 'none',
      cols: 4,
      children: [
        { id: 'lp-read', label: 'Read new offsets', variant: 'chip', pattern: 'storage', icon: 'none' },
        { id: 'lp-plan', label: 'Plan & run a job', variant: 'chip', pattern: 'service', icon: 'none' },
        { id: 'lp-write', label: 'Write the output', variant: 'chip', pattern: 'service', icon: 'none' },
        { id: 'lp-commit', label: 'Commit offsets', variant: 'chip', pattern: 'network', icon: 'none' },
      ],
    },
    {
      id: 'modes',
      kind: 'table',
      label: 'Four triggers, and the trade is always latency against cost',
      pattern: 'service',
      headers: ['Trigger', 'Behaviour', 'Reach for it when'],
      values: [
        ['default', 'next batch as soon as the last ends', 'lowest latency, always warm'],
        ['processingTime("1 min")', 'a batch on a fixed clock', 'steady cost, predictable load'],
        ['availableNow', 'drain the backlog, then STOP', 'batch job that keeps a checkpoint'],
        ['continuous', 'experimental, ~1 ms latency', 'almost never — limited operators'],
      ],
    },
    { id: 'avail', label: 'availableNow', pattern: 'storage', icon: 'calendar', sub: 'streaming code, run hourly' },
  ],
  edges: [
    { source: 'loop', target: 'modes', label: 'the trigger only decides HOW OFTEN the loop goes round' },
    { source: 'modes', target: 'avail' },
  ],
}
