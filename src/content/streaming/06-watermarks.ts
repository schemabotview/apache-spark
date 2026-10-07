import type { Section } from '../types'

export const watermarksSection: Section = {
  id: 'watermarks',
  title: 'Windows and watermarks',
  scene: 'watermarks',
  focus: 'cost',
  slide: `## Windows and watermarks

The hardest idea in the chapter. State the problem before the mechanism and it gets much easier.

### The problem
- An aggregate over event time needs **windows** — tumbling, sliding, or session
- But a late row could always arrive, so every window must stay open **forever**
- Forever means unbounded state, and unbounded state is a job that dies next Tuesday

### A watermark is a promise, not a filter
- \`withWatermark("event_time", "10 minutes")\` says: *nothing more than 10 minutes late will arrive*
- Spark believes you. It closes windows older than that, emits the result, and **frees the state**

### The promise has a price
- Anything later than the watermark is **dropped, silently**
- Too short and you lose real data; too long and you are holding everything again`,
  narration:
    'This is the hardest idea in the chapter, and it gets much easier if you state the problem before the mechanism. So, the problem. You are aggregating on event time, which means you need windows: buckets of time to group into. There are three shapes. Tumbling windows are fixed and do not overlap — five-minute buckets, nine to nine-oh-five, nine-oh-five to nine-ten. Every event belongs to exactly one. Sliding windows overlap: a five-minute window advancing every minute, so an event belongs to five of them at once, which is how you get smooth moving averages and also five times the state. Session windows have no fixed boundaries at all; a session closes after a defined gap of inactivity, which is how you model user visits. Now the problem. You have a window for nine to nine-oh-five. When can you emit its result and forget about it? Never, strictly. A late event for that window could always arrive — tomorrow, next week. So in the absence of any other information, Spark must keep every window it has ever opened, forever, in case something late turns up. That is unbounded state, and unbounded state is not a job that fails today. It is a job that runs beautifully for three weeks and then starts dying, which is much worse, because by then nobody connects the failure to the code. A watermark is the answer, and the thing to understand is what kind of thing it is. It is not a filter, and it is not a timer. It is a promise you make to Spark. When you write withWatermark on event time with ten minutes, you are saying: I guarantee that nothing more than ten minutes late will arrive. Spark takes you at your word. It tracks the maximum event time it has seen, subtracts your ten minutes, and treats anything older than that as settled. Windows that end before the watermark are closed: their result is emitted, and their state is freed. That is what makes streaming aggregation possible at all, and it is also what finally makes append mode legal on an aggregate, because a closed window genuinely cannot change. But the promise has a price, and you should know it before you make it. Anything that arrives later than your watermark is dropped. Silently. Not errored, not quarantined — dropped. So the watermark is a real trade-off and you have to choose a number. Too short and you lose genuine data. Too long and you are holding state for hours and you are nearly back where you started. The practical approach is to measure the actual distribution of lateness in your data and set the watermark to cover the great majority of it — then accept and document that the tail is lost. Next: what all that state actually is.',
}
