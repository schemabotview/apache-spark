import type { Scene } from '@graphlearning/flow'

// §5 event-time — the repo's first PLOT node, and the only honest way to draw this. The distinction
// is a RELATIONSHIP between two clocks, and a relationship between two numbers is a scatter. Drawn
// as two cards saying "when it happened" and "when it arrived", the reader has to imagine the gap;
// drawn against axes, the gap IS the vertical distance from the line and there is nothing to imagine.
//
// The diagonal is `processing = event` — the fiction every batch system is built on. Every real
// point sits BELOW it, because arrival always lags the event. How far below is the delay, and the
// one at 09:02 arriving at 09:21 is the late event §6 has to decide what to do about.
//
// The plot owns the board. This scene measured 548x1031 against a 1114x1080 pane — height-bound,
// with width going spare — and a band of three tiles listing WHY data arrives late cost ~180px of
// that height for content the slide already spells out. On a height-bound board, the only thing
// that buys type size is removing height.
//
// `equal: true` because both axes are the same unit (minutes past nine) and the diagonal must read
// as 45°; without it the "distance from the line" the whole scene depends on would be distorted.
export const eventTime: Scene = {
  id: 'event-time',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'plot',
      kind: 'plot',
      label: 'Two clocks, and they do not agree',
      sub: 'every point sits below the line, because arriving always lags happening',
      pattern: 'network',
      plot: {
        x: { min: 0, max: 25, step: 5, label: 'processing time — when Spark saw it' },
        y: { min: 0, max: 25, step: 5, label: 'event time — when it happened' },
        axes: 'corner',
        equal: true,
        series: [
          { kind: 'line', points: [[0, 0], [25, 25]], label: 'if they agreed', dashed: true, color: 'user' },
          { kind: 'scatter', points: [[3, 2], [6, 5], [8, 6], [11, 9], [14, 12], [17, 15], [19, 17]], label: 'normal lag', color: 'service' },
          { kind: 'marker', at: [21, 2], label: 'late by 19 min', color: 'warn', size: 10 },
        ],
      },
    },
    { id: 'use', label: 'Aggregate on EVENT time', pattern: 'service', icon: 'clock', sub: 'or your 9am bucket is a lie' },
  ],
  edges: [
    { source: 'plot', target: 'use', label: 'the point at 09:02 showed up at 09:21 — which bucket does it belong in?' },
  ],
}
