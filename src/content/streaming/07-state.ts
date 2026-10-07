import type { Section } from '../types'

export const stateSection: Section = {
  id: 'state',
  title: 'Stateful operations',
  scene: 'state',
  focus: 'grow',
  slide: `## Stateful operations

State is what makes streaming hard. It is also partitioned exactly like your data — there is no central store.

### Where it lives
- Each task owns a slice of the keys and keeps their state in a local **state store**
- Lose an executor and you lose its slice — which is what the checkpoint exists for

### What keeps state, and what bounds it
- **Windowed aggregation** — one entry per open window. Bounded by the watermark
- **Stream-stream join** — both sides held until matched. Needs a watermark on **both**
- **\`flatMapGroupsWithState\`** — whatever you put there. Bounded by a timeout you must set

### The one with no bound by default
- **\`dropDuplicates\`** keeps *every key it has ever seen*, forever, unless you watermark it
- The job runs beautifully for a month and then starts failing. Watermark it on day one`,
  narration:
    'State is what makes streaming genuinely different from batch, so it is worth being concrete about what it is and where it lives. Start with where, because people usually picture it wrong. They imagine state as something Spark keeps centrally, in the driver or in some service. It is not. State is partitioned exactly like your data. Each task owns a slice of the keys — determined by the same hash partitioning from chapter five — and keeps the state for those keys in a local state store on that executor. Look at the board: one executor holding France, Germany and Spain; another holding the US, Italy and the Netherlands. There is no central store, and two consequences follow. First, state scales the way your data scales, which is good. Second, if an executor dies, its slice of state dies with it — which is exactly what checkpointing in the next section exists to solve. State is held between batches. That is the entire point of it, and also the entire cost. So the operational question is always: which operations keep state, and what stops that state growing forever? A windowed aggregation keeps one entry per open window per key. It is bounded by the watermark, which closes old windows and frees them. A stream-to-stream join keeps rows from both sides, buffered, waiting for a match that might arrive later. It needs a watermark on both sides, and I mean both — one is not enough, because either side could be the late one. A flatMapGroupsWithState keeps whatever you choose to keep, which gives you enormous power and makes bounding it entirely your responsibility; you set a timeout, and if you do not, nothing ever expires. And then there is the one with no bound at all by default, and it is the one that catches people. dropDuplicates. It works by remembering every key it has already seen, so it can recognise a repeat. Without a watermark, that means every key it has ever seen, for the entire lifetime of the query. Deduplicating on order id across a stream that does a million orders a day means the state store is holding a million new keys every day, indefinitely. The job runs fine for a month. Then the state store stops fitting in memory, the batches get slower, and then it fails. The fix is one line — put a watermark on it, so Spark knows it can forget keys older than the window in which a duplicate could plausibly appear. Do it on day one, not on day thirty. Next: what happens when that executor dies.',
}
