import type { Scene } from '@graphlearning/flow'

// §9 streaming-joins — the chapter's bookend. The fork is stream-static against stream-stream
// because they are not variations of one thing: one is nearly free and stateless, the other holds
// both sides in memory and needs watermarks on both or it grows without bound.
//
// Putting the cheap one first is the advice: an enormous number of "I need a stream-stream join"
// problems are actually a stream joined against a slowly-changing dimension, which costs almost
// nothing and keeps no state at all.
export const streamingJoins: Scene = {
  id: 'streaming-joins',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'fork',
      label: 'Two kinds of streaming join, and they are not variations of each other',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      align: 'start',
      stretch: true,
      children: [
        {
          id: 'static',
          label: 'Stream ⋈ static',
          sub: 'try to need only this one',
          pattern: 'service',
          icon: 'merge',
          cols: 3,
          children: [
            { id: 'ss-state', label: 'No state', variant: 'tile', pattern: 'service', icon: 'circlecheck', sub: 'nothing is held' },
            { id: 'ss-cost', label: 'Broadcastable', variant: 'tile', pattern: 'service', icon: 'share', sub: 'usually no shuffle' },
            { id: 'ss-refresh', label: 'Re-read each batch', variant: 'tile', pattern: 'network', icon: 'repeat', sub: 'so it does update' },
          ],
        },
        {
          id: 'stream2',
          label: 'Stream ⋈ stream',
          sub: 'powerful, and it holds everything',
          pattern: 'warn',
          icon: 'swap',
          cols: 3,
          children: [
            { id: 's2-state', label: 'Both sides held', variant: 'tile', pattern: 'warn', icon: 'database', sub: 'waiting for a match' },
            { id: 's2-wm', label: 'Watermark BOTH', variant: 'tile', pattern: 'warn', icon: 'clock', sub: 'or state grows forever' },
            { id: 's2-range', label: 'Bound the time', variant: 'tile', pattern: 'network', icon: 'ruler', sub: 'within 30 minutes of' },
          ],
        },
      ],
    },
    {
      id: 'patterns',
      kind: 'table',
      label: 'Four habits that separate a demo from something you can leave running',
      pattern: 'storage',
      headers: ['Habit', 'Because'],
      values: [
        ['Checkpoint on durable storage', 'local disk survives nothing'],
        ['Watermark everything stateful', 'unbounded state is a delayed outage'],
        ['Monitor the batch duration trend', 'rising duration means you are falling behind'],
        ['Use foreachBatch for odd sinks', 'you get a real DataFrame and normal batch code'],
      ],
    },
    { id: 'next', label: 'Next', pattern: 'user', icon: 'server', sub: 'running all of it in production' },
  ],
  edges: [
    { source: 'fork', target: 'patterns', label: 'most "stream-stream" problems are really a stream against a slow dimension' },
    { source: 'patterns', target: 'next' },
  ],
}
