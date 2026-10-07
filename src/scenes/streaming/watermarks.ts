import type { Scene } from '@graphlearning/flow'

// §6 watermarks — the hardest idea in the chapter, and the trick is to state the problem before the
// mechanism: a streaming aggregate must keep every window open forever, because another late row
// might always turn up. That is unbounded state, and unbounded state is a job that dies next Tuesday.
//
// A watermark is not a filter and not a timer — it is a PROMISE you make to Spark: nothing older
// than this will arrive. Spark believes you, closes the window, emits the result and frees the
// state. The card spells out the cost of that promise, because it is a real trade and people meet
// it as a surprise: anything later than the watermark is silently dropped.
export const watermarks: Scene = {
  id: 'watermarks',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'kinds',
      label: 'Three ways to cut unbounded time into finite buckets',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'k-tumble', label: 'Tumbling', variant: 'tile', pattern: 'service', icon: 'boxes', sub: 'fixed, no overlap' },
        { id: 'k-slide', label: 'Sliding', variant: 'tile', pattern: 'network', icon: 'copy', sub: 'overlaps — a row lands in several' },
        { id: 'k-session', label: 'Session', variant: 'tile', pattern: 'storage', icon: 'users', sub: 'closes after a gap of silence' },
      ],
    },
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'watermark.py',
      label: [
        '(events',
        '  .withWatermark("event_time", "10 minutes")',
        '  .groupBy(F.window("event_time", "5 minutes"), "country")',
        '  .count())',
        '',
        '# the promise: nothing more than 10 min late will arrive.',
        '# Spark closes the window, emits, and frees the state.',
      ].join('\n'),
    },
    { id: 'cost', label: 'The promise has a price', pattern: 'warn', icon: 'skull', sub: 'later than that is dropped, silently' },
  ],
  edges: [
    { source: 'kinds', target: 'code', label: 'without a watermark every window stays open forever — that is unbounded state' },
    { source: 'code', target: 'cost', label: 'too short and you lose real data; too long and you are back to holding everything' },
  ],
}
