import type { Section } from '../types'

export const shuffleBoundary: Section = {
  id: 'shuffle-boundary',
  title: 'The shuffle: where a stage ends',
  scene: 'arch-execution',
  slide: `## The shuffle boundary

Stages break at **shuffles** — and shuffles are the most expensive thing Spark does.

### Narrow vs wide
- **Narrow** dependency — each output partition reads **one** input partition (\`map\`, \`filter\`)
- **Wide** dependency — an output partition needs **many** inputs (\`groupBy\`, \`join\`, \`sort\`)

### Why a wide dep forces a shuffle
- Related records live scattered across **every** partition
- To group them, Spark must **redistribute** data across the network — a shuffle
- That barrier is where one stage **ends** and the next **begins**

### Why it’s costly
- Data is written to disk, sent over the network, and re-read — slow
- Fewer shuffles = faster jobs — the heart of Spark tuning

So every stage boundary you see is a shuffle — and every shuffle is worth avoiding.`,
  narration:
    'Let’s look closer at that shuffle, because it’s the single most important boundary in Spark. The distinction underneath it is narrow versus wide dependencies. A narrow dependency means each output partition is built from just one input partition — a map or a filter, where every record is handled right where it already lives; that work never has to leave its partition, so it all stays in one stage. A wide dependency is the opposite: an output partition needs data from many input partitions at once. A groupBy, a join, a sort — to bring all the matching records together, Spark has to redistribute the data across the whole cluster over the network. That redistribution is the shuffle, and it’s precisely why a new stage has to start: the next stage literally cannot begin until every task of the previous one has finished feeding the shuffle. It’s also the most expensive operation Spark does — data gets written to disk, sent across the network, and read back again. So a huge part of tuning Spark comes down to one idea: every stage boundary is a shuffle, and every shuffle is worth avoiding.',
}
