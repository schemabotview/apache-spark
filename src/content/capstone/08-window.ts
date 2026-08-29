import type { Section } from '../types'

export const window: Section = {
  id: 'window',
  title: 'Speed layer · Window + watermark',
  scene: 'cap-window',
  slide: `## Speed · Window + watermark

Aggregate revenue per category in **5-minute event-time windows**, with a **watermark** to bound late data and state.

### What’s happening
- \`withWatermark\` — tolerate **10 min** of lateness, then finalize & drop stragglers
- \`window("ts", "5 min")\` buckets by **event time**, not when the event arrived
- The running totals live in the **state store**, checkpointed for recovery

**Exercises:** event-time windows · watermarks · state (\`spark-streaming\` §7–9)`,
  narration:
    'The third stage is where the speed layer earns its keep and where all that event-time theory from the streaming course pays off. We want revenue per category in five-minute buckets — but bucketed by when each purchase actually happened, its event time, not when it happened to reach Spark. So we group by a five-minute window over the ts column, alongside category, and sum the amount. The subtlety, as always with streaming, is late data: an event stamped at ten-oh-four might arrive at ten-oh-nine after network delays, and we don’t want to either miss it or keep every window open forever waiting for stragglers. That’s what withWatermark handles — we tell Spark to tolerate up to ten minutes of lateness. Any event later than that is dropped, and once the watermark passes a window’s end, that window is finalized and its state is evicted, which is what keeps memory bounded on an infinite stream. Those running per-window totals live in the state store between triggers, and — crucially — they’re checkpointed, so if the job restarts, the in-progress windows come back exactly as they were. This is the same withWatermark and window API straight from the streaming course, now doing real work in our pipeline. We’ve got live, windowed revenue; the last speed step writes it out.',
}
