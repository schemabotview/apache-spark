import type { Section } from '../types'

export const eventTimeWindows: Section = {
  id: 'event-time-windows',
  title: 'Event time & windows',
  scene: 'event-time',
  slide: `## Event time & windows

Now the hard part batch never had: when your data carries its **own timestamp**, you must reason over *event time*, not when it arrived.

### Event time vs processing time
- **Event time** — when the thing actually happened, recorded *in* the event
- **Processing time** — when Spark happened to see it — skewed by delays & retries
- Correct answers depend on **event time**; arrival order is unreliable

### Windowed aggregations
- Group events into **windows** over their event time — e.g. a count per 5-minute bucket
- **Tumbling** (fixed, non-overlapping) · **sliding** (overlapping) · **session** (activity gaps)
- Each window’s running aggregate lives in the **state store**, across triggers

But if events can arrive late, when is a window ever *done*? That’s what the watermark answers.`,
  narration:
    'Let’s step over to the side of streaming that has no equivalent in batch, because it’s where most of the real difficulty lives. The moment your events carry their own timestamp — a sensor reading stamped when it was taken, a click stamped when it happened — you have to be careful about which time you mean. There are two. Event time is when the thing actually occurred, and it’s baked into the record itself. Processing time is simply when Spark got around to seeing it. In a perfect world those would line up, but in reality they don’t: events get delayed in the network, buffered in Kafka, retried after failures, so a reading from ten-oh-one might not reach Spark until ten-oh-four, arriving after events that happened later. That’s why, if you want correct answers — an accurate count of what happened in each minute — you have to group by event time, not by arrival order, because arrival order is unreliable. The way you do that grouping is a windowed aggregation: you slice the event-time line into windows and aggregate within each one — for example, a count of events per five-minute bucket. Those windows come in a few shapes: tumbling windows are fixed and non-overlapping, sliding windows overlap so each event can land in several, and session windows are defined by gaps of inactivity rather than a fixed size. And because a window keeps accumulating as more of its events trickle in over many triggers, its running total has to be remembered between triggers — which is exactly what the state store holds. But that raises the obvious, nagging question: if a straggler from ten-oh-one can always show up later, when is a window ever actually finished and safe to emit? Answering that is the whole job of the watermark, and that’s next.',
}
