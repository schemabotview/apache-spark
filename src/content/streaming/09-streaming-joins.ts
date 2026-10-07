import type { Section } from '../types'

export const streamingJoinsSection: Section = {
  id: 'streaming-joins',
  title: 'Streaming joins and patterns',
  scene: 'streaming-joins',
  focus: 'next',
  slide: `## Streaming joins and patterns

Two kinds of join, and the difference between them is the difference between free and expensive.

### Stream ⋈ static — try to need only this
- Join a stream against a table: a dimension, a lookup, a config
- **No state at all.** Usually broadcastable, so usually no shuffle either

### Stream ⋈ stream — powerful, and it holds everything
- Both sides are buffered in state until a match arrives, because either could be late
- Needs a watermark on **both** sides, and a time bound in the condition — *within 30 minutes of*
- Without those, state grows until the job dies

### Four habits
- Checkpoint on durable storage · watermark everything stateful
- \`foreachBatch\` for any sink Spark lacks: a real DataFrame and ordinary batch code`,
  narration:
    'Last section of the chapter, and we start with the join, because there are two kinds and the difference between them is the difference between free and expensive. The first is a stream joined against a static table. You have a stream of orders and you want to attach customer details, or a product catalogue, or some configuration. The static side is an ordinary DataFrame read from a table. This is the cheap case, and it is cheap in the specific way that matters: it keeps no state at all. Each micro-batch joins its rows against the static side and that is the end of it — nothing is buffered, nothing accumulates, nothing can grow without bound. Better still, the static side is usually small enough to broadcast, which means no shuffle either. One useful detail: the static side is re-read on each batch, so if the underlying table changes, your stream does pick up the new values, which is often exactly what you want for a slowly-changing dimension. The second kind is a stream joined against another stream, and it is genuinely powerful and genuinely expensive. Think about what it requires. A click arrives, and the impression it corresponds to has not arrived yet. Or the reverse. So Spark must buffer rows from both sides, holding them in state, waiting for a match that may come later. That is the cost: unlike the static case, this one accumulates, and it accumulates on both sides. Which means two things are mandatory. First, a watermark on both streams — one is not enough, because either side can be the late one, and without both Spark cannot ever decide that a buffered row will never find its partner. Second, a time bound in the join condition itself: not just join on impression id, but join on impression id where the click is within thirty minutes of the impression. That range condition is what lets Spark discard buffered rows once they are too old to match anything. Without both of those, state grows until the job dies, and it will take weeks to do it. The honest advice is this: a surprising number of problems that look like they need a stream-to-stream join are really a stream against a slowly-changing dimension. Check whether the cheap one will do before you take on the expensive one. And then the four habits that separate a demo from something you can actually leave running. Checkpoint on durable storage — we covered why. Watermark everything stateful, including dropDuplicates, on the day you write it. Monitor the batch duration trend rather than any single batch: a stream is healthy when batch duration is stable and well under the arrival rate, and the warning sign is duration creeping upward, because that means you are falling behind and the lag will compound. And use foreachBatch whenever you need a sink Spark does not have, or when you need to do something per batch that the streaming API does not express — it hands you a genuine DataFrame and lets you write completely ordinary batch code against it. That closes chapter seven. You can now reason about time, state and recovery, which are the three things batch never made you think about. One chapter remains, and it is the one that puts everything together: running Spark in production, and a capstone that uses all eight chapters at once.',
}
