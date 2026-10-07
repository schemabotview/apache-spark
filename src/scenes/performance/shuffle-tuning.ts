import type { Scene } from '@graphlearning/flow'

// §2 shuffle-tuning — chapter 5 §7 showed the machinery; this is what to do about it. The ladder is
// the shape of the whole section and the order is the advice: almost everyone skips straight to the
// third rung and turns a config knob, when the first two are where the wins actually are.
//
// The 200 table exists because `spark.sql.shuffle.partitions` defaults to 200 regardless of your
// data or your cluster, which makes it wrong for nearly everybody — too many on small data, far too
// few on large. It is the single most commonly mis-set value in Spark.
export const shuffleTuning: Scene = {
  id: 'shuffle-tuning',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'ladder',
      label: 'Three rungs, and almost everyone starts on the third',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'l-avoid', label: '1 · Avoid it', variant: 'tile', pattern: 'service', icon: 'ban', sub: 'broadcast, or pre-partition' },
        { id: 'l-shrink', label: '2 · Shrink it', variant: 'tile', pattern: 'service', icon: 'funnel', sub: 'filter and project first' },
        { id: 'l-tune', label: '3 · Tune it', variant: 'tile', pattern: 'network', icon: 'gauge', sub: 'only now, the partition count' },
      ],
    },
    {
      id: 'count',
      kind: 'table',
      label: 'spark.sql.shuffle.partitions defaults to 200 — for every job, on every cluster',
      sub: 'which makes it wrong for almost everyone; aim for ~128 MB per shuffle partition',
      pattern: 'storage',
      headers: ['Shuffle data', '200 gives you', 'Sensible'],
      values: [
        ['2 GB', '10 MB each — too many tiny tasks', '~16'],
        ['25 GB', '128 MB each — about right', '200'],
        ['500 GB', '2.5 GB each — spill and OOM', '~4000'],
      ],
    },
    { id: 'aqe', label: 'Or let AQE do it', pattern: 'service', icon: 'brain', sub: 'it coalesces them from real sizes — §7' },
  ],
  edges: [
    { source: 'ladder', target: 'count', label: 'the cheapest shuffle is the one that never runs; the next cheapest moves less data' },
    { source: 'count', target: 'aqe' },
  ],
}
