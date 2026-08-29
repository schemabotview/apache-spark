import type { Scene } from '../../render-engine'

// event-time — the shared scene for the two windowing sections (event-time-windows + watermarks),
// the part of streaming that has no equivalent in batch. When events carry their own timestamp you
// must reason over EVENT TIME (when it happened), not processing time (when Spark saw it) — because
// events arrive delayed and out of order. Three stacked bands:
//
//   Events     labelled by event time, out of order — one late (still counts), one too-late (dropped)
//   Windows    bucket by event time — tumbling (fixed) · sliding (overlapping) · session (gap-based)
//   Watermark  max event-time seen − threshold → finalize & evict old windows · drop too-late events
//
// FIDELITY NOTE: studio drew the window kinds as overlapping time-bars via hand-placed cell spans;
// this engine has no cell placement, so each kind is a labelled ROW of window tiles and the
// overlap/gap is carried by the row label + the tiles' time-range subs. Lateness is colour-coded:
// on-time = service, late-but-counts = external (neutral), too-late = warn (red).
export const eventTime: Scene = {
  id: 'event-time',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'events',
      label: 'Events — arrive out of order (labelled by event time)',
      pattern: 'group',
      sub: 'arrival order ≠ event time',
      cols: 5,
      children: [
        { id: 'ev-1', label: '10:07', pattern: 'service', sub: 'on time' },
        { id: 'ev-2', label: '10:02', pattern: 'service', sub: 'on time' },
        { id: 'ev-3', label: '10:06', pattern: 'service', sub: 'on time' },
        { id: 'ev-late', label: '10:01', pattern: 'external', sub: 'late — still counts' },
        { id: 'ev-drop', label: '09:58', pattern: 'warn', sub: 'too late — dropped' },
      ],
    },
    {
      id: 'windows',
      label: 'Windows — bucket by event time (three kinds)',
      pattern: 'group',
      sub: 'each window aggregates its events, held in state',
      children: [
        {
          id: 'wt', label: 'Tumbling · fixed 5-min · non-overlapping', pattern: 'group', cols: 4,
          children: [
            { id: 'wt-1', label: 'W1', pattern: 'service', sub: '10:00–05' },
            { id: 'wt-2', label: 'W2', pattern: 'service', sub: '10:05–10' },
            { id: 'wt-3', label: 'W3', pattern: 'service', sub: '10:10–15' },
            { id: 'wt-4', label: 'W4', pattern: 'service', sub: '10:15–20' },
          ],
        },
        {
          id: 'ws', label: 'Sliding · 10-min, slide 5-min · overlapping', pattern: 'group', cols: 3,
          children: [
            { id: 'ws-1', label: 'W1', pattern: 'network', sub: '10:00–10' },
            { id: 'ws-2', label: 'W2', pattern: 'network', sub: '10:05–15 · overlaps' },
            { id: 'ws-3', label: 'W3', pattern: 'network', sub: '10:10–20' },
          ],
        },
        {
          id: 'wg', label: 'Session · gap-based · variable width', pattern: 'group', cols: 3,
          children: [
            { id: 'wg-1', label: 'S1', pattern: 'user', sub: '10:00–07' },
            { id: 'wg-2', label: 'S2', pattern: 'user', sub: '10:10–15' },
            { id: 'wg-3', label: 'S3', pattern: 'user', sub: '10:18–20' },
          ],
        },
      ],
    },
    {
      id: 'watermark',
      label: 'Watermark — the line for lateness',
      pattern: 'group',
      sub: 'what keeps stateful streaming bounded in memory',
      flow: 'LR',
      children: [
        { id: 'wm-threshold', label: 'watermark', pattern: 'network', icon: 'clock', sub: 'max event-time − threshold' },
        { id: 'wm-evict', label: 'finalize & evict', pattern: 'service', icon: 'circlecheck', sub: 'windows older than it' },
        { id: 'wm-drop', label: 'drop too-late', pattern: 'warn', icon: 'ban', sub: 'events later than it' },
      ],
      edges: [
        { source: 'wm-threshold', target: 'wm-evict' },
        { source: 'wm-threshold', target: 'wm-drop' },
      ],
    },
  ],
  edges: [
    { source: 'events', target: 'windows', label: 'bucket by event time' },
    { source: 'windows', target: 'watermark', label: 'evaluated against' },
  ],
}
