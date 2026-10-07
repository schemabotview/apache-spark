import type { Section } from '../types'

export const eventTimeSection: Section = {
  id: 'event-time',
  title: 'Event time and processing time',
  scene: 'event-time',
  focus: 'use',
  slide: `## Event time and processing time

Two clocks. Batch systems can pretend they are the same; streaming systems cannot.

### The two
- **Event time** — when the thing actually happened. It is in your data, as a column
- **Processing time** — when Spark saw it. It is the wall clock, and it is always later

### The gap is normal, not exceptional
- Networks retry · a phone was in a tunnel · you replayed yesterday's topic to fix a bug
- On the chart, every point sits below the line. The vertical distance **is** the delay

### Always aggregate on event time
- Group by processing time and your "9am" bucket means "whatever reached us around 9am"
- Rerun the same job tomorrow and you get different numbers for the same hour
- Which raises the question the next section answers: how long do you wait for stragglers?`,
  narration:
    'Here is where streaming stops being batch-in-a-loop and starts being its own discipline. There are two clocks, and in a batch system you can usually pretend they are the same. In a streaming system you cannot. Event time is when the thing actually happened: the moment the customer clicked buy, the moment the sensor took its reading. It lives in your data, as a timestamp column, written by whatever produced the event. Processing time is when Spark saw it — the wall clock on the machine at the moment the row entered a micro-batch. Processing time is always later, and the gap is not fixed. Look at the chart. The dashed diagonal is the fiction: it is the line where event time equals processing time, where everything arrives the instant it happens. Every real point sits below it, and the vertical distance from the line is the delay. Most points sit a little below — that is ordinary lag, a second or two of network and queueing. And then there is the one in the bottom right. That event happened at two minutes past nine and did not reach Spark until twenty-one minutes past. Nineteen minutes late. Now, the important thing about that point is that it is not an anomaly or a bug. Late data is normal and there are ordinary reasons for it. Networks retry and back off. A mobile device goes into a tunnel or loses signal and buffers its events until it reconnects — that can be minutes or hours. An upstream service goes down and replays its backlog when it recovers. Or you yourself reset a Kafka consumer group to reprocess yesterday, and suddenly a day-old event arrives in today\'s stream. Which gives us the rule: always aggregate on event time, never on processing time. Suppose you group by processing time instead. Your nine-a-m bucket does not mean the events that happened between nine and ten; it means whatever happened to reach your cluster in that interval. The late event from two minutes past nine lands in the nine-twenty bucket, where it is simply wrong. Worse, the numbers are not reproducible: rerun the same job tomorrow with the same data and a different network, and you get different answers for the same hour. Aggregating on event time fixes all of that, because the answer depends only on the data. But it raises a question immediately, and it is the hard one. If you are bucketing by event time, and an event for the nine a m bucket might arrive at nine twenty-one — or tomorrow — then when is the nine a m bucket finished? How long do you wait? That is the next section.',
}
