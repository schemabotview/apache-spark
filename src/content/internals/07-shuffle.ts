import type { Section } from '../types'

export const shuffle: Section = {
  id: 'shuffle',
  title: 'Shuffle mechanics',
  scene: 'shuffle-mechanics',
  focus: 'count',
  slide: `## Shuffle mechanics

Chapter 2 defined a shuffle as "every child reads every parent". This is the machinery, and it is not what people picture.

### It goes through disk
- Each map task sorts its output **by destination** and writes it to **local disk** — one file, one block per reducer
- Each reduce task then **fetches** its own block from every one of those files
- Write, fetch, read. A shuffle is not a network transfer; it is disk, then network, then disk

### The number that explains the cost
- M map tasks × R reducers = **M × R fetches**. At 200 × 200 that is 40,000 of them

### What this makes obvious
- Reducing data **before** the shuffle is worth far more than tuning anything after it
- Chapter 3's "combine before you shuffle" is this picture, from the other end`,
  narration:
    'Chapter two defined a shuffle as the pattern where every child partition reads from every parent partition, and that definition was enough to reason about stages. Now we need the machinery, because what actually happens is not what most people picture. People imagine a shuffle as data flying over the network from one set of tasks to another. It goes through disk first. Here is the real sequence. On the map side — the tasks producing data — each task takes its output rows and works out, for each one, which reducer it belongs to, by hashing the key. It sorts its output by that destination and writes it to local disk, as a single file containing a contiguous block for each reducer, plus a small index saying where each block starts. Note where that file goes: the executor\'s local disk, not the distributed filesystem, and not memory. It is deliberately not replicated, which is exactly why losing an executor mid-shuffle is expensive — those files are gone and the map tasks must be rerun. Then on the reduce side, each reduce task reaches out to every machine that ran a map task and fetches its own block from each of those files. Reduce task zero asks every map output for its block zero. So the full sequence is: write to disk, fetch over the network, read from disk. Three I/O operations, two of them on disk, for every row that moves. Now the number that explains the cost, and it is the one worth carrying. If you have M map tasks and R reduce tasks, there are M times R block fetches. With the Spark default of two hundred shuffle partitions on both sides, that is forty thousand separate fetch requests for one shuffle. Each is small, each has overhead, and all of them have to succeed. This is why the shuffle is not only where jobs are slow, but where they fail — fetch failures, timeouts, and out-of-memory errors cluster here more than anywhere else. And this picture makes the advice from earlier chapters concrete rather than abstract. Combine before you shuffle, from chapter three: every row your partial aggregate removes is a row that is never written to disk, never fetched, never read. Filter early, from chapter four: same thing. Reducing data before a shuffle is worth far more than any tuning you do after one, and now you can see exactly why. Next: how to find the shuffle in a plan.',
}
