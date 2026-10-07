import type { Section } from '../types'

export const joinStrategiesSection: Section = {
  id: 'join-strategies',
  title: 'Join strategies',
  scene: 'join-strategies',
  focus: 'care',
  slide: `## Join strategies

Chapter 5 explained how Spark chooses. This is how to make it choose better — the highest-leverage change available.

### Broadcast is the only one without a shuffle
- One side is copied to every executor; the big side never moves
- Spark picks it automatically under \`autoBroadcastJoinThreshold\` — **10 MB** by default

### Making it happen
- \`F.broadcast(small)\` tells Spark what the statistics did not know
- Or raise the threshold. A filtered dimension table is often broadcastable when the raw one is not

### What to watch
- Broadcasting collects the side **into the driver** first, then ships it
- Too big and the **driver** dies, not the executors — a confusing failure if you don't expect it`,
  narration:
    'Joins are where the largest single performance win in Spark usually lives, and the reason is simple: one of the strategies does not shuffle at all. Chapter five explained how Spark chooses between broadcast hash, sort-merge, and shuffle hash. This section is about making it choose better. Start with why broadcast matters so much. In a broadcast hash join, Spark takes the smaller side, collects it, and sends a complete copy to every executor. Then every task joins its own partition of the big side against that local copy. The big dataset — the one that is expensive to move — never moves at all. There is no shuffle, no sort, no stage boundary. Compared to a sort-merge join, which shuffles and sorts both sides, it is not a small improvement; it is often an order of magnitude. Spark will choose it automatically when it estimates one side is below the auto broadcast join threshold, which defaults to ten megabytes. Ten megabytes is very conservative by modern standards — executors routinely have tens of gigabytes — and raising it is one of the most effective single changes available. So there are two ways to get a broadcast when you are not getting one. The first is the hint: wrap the small side in the broadcast function, and you are telling Spark something its statistics did not know. This matters more than it sounds, because the classic case is a dimension table that is large on disk but tiny after a filter — the statistics describe the table, not your filtered version of it, so Spark plans a sort-merge join for data that would have fitted in memory easily. The second is to raise the threshold globally, if your executors have the room. Now the thing to watch for, because broadcast has a real failure mode and it is confusing the first time. To broadcast a dataset, Spark first collects it into the driver, and then ships it out. So if you broadcast something too large, the process that dies is the driver, not the executors — and the error you get will not obviously say the words too big to broadcast. If a job started failing on the driver shortly after someone added a broadcast hint, that is your answer. One more option worth knowing about for the case where the same join runs every day: bucketing. If you write both tables with bucketBy on the join key, into the same number of buckets, then the data is already co-located by key on disk and the join needs no shuffle at all, permanently. It costs you at write time and it only pays if the join is a regular fixture, but when it fits, it is the most complete fix available. Next: caching, which is the tool people reach for when they should be doing one of these.',
}
