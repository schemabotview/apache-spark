import type { Section } from '../types'

export const dependencies: Section = {
  id: 'dependencies',
  title: 'Narrow and wide dependencies',
  scene: 'narrow-vs-wide',
  focus: 'cut',
  slide: `## Narrow and wide dependencies

The single most useful distinction in Spark. It decides what is fast, what is slow, and where every stage boundary falls.

### Narrow — each child partition reads **one** parent
- \`filter\`, \`select\`, \`map\`, \`union\` — the work stays on the machine holding the data
- Nothing crosses the network. Many narrow steps **fuse** into one pass over the rows
- A lost partition is recomputed from **one** parent

### Wide — each child partition reads **every** parent
- \`groupBy\`, \`join\`, \`distinct\`, \`repartition\` — rows must be regrouped by key
- That regrouping is **the shuffle**: write to disk, send over the network, read back
- A lost partition may need **all** the parents recomputed

### The rule that falls out of it
- **Only a wide dependency cuts a stage.** Count the wide steps and you have counted the stages`,
  narration:
    'This is the most useful distinction in Spark, and it is worth slowing down for. Every transformation you write creates a new dataset from an existing one, and the question is: to build one partition of the result, how many partitions of the input do you need to look at? There are only two answers. The first is narrow. A narrow dependency means each child partition reads exactly one parent partition. Look at the left of the board: three straight lines down, one to one. Filter is narrow — to filter partition zero, you only need partition zero. Select is narrow, map is narrow, union is narrow. And this has a wonderful consequence: the work can happen right where the data already is. Nothing crosses the network. Better still, several narrow operations in a row can be fused together, so instead of three passes over your rows you get one pass that does all three things. And if a partition is lost, Spark recomputes it from one parent — cheap. The second answer is wide. A wide dependency means each child partition reads from every parent partition. Look at the right of the board: every line crosses every other line. Why would that happen? Because you asked for something keyed. A groupBy by country needs all the rows for France together in one place — but rows for France are scattered across every partition, so every partition has to contribute. Joins are wide. Distinct is wide. Repartition is obviously wide. And that regrouping has a name: it is the shuffle. In a shuffle, every task writes its output to local disk sorted by destination, then that data is sent across the network, then the receiving tasks read it back in. Write, send, read — it is the most expensive thing Spark does, by a wide margin, and essentially every performance problem in chapter six is a shuffle problem. The recovery cost is worse too: lose a partition after a shuffle and you may need all of the parents recomputed to rebuild it. And now the rule that falls out of all this, which is the reason we needed the distinction at all. Only a wide dependency cuts a stage. Narrow work keeps flowing inside the current stage; a wide dependency forces Spark to stop, materialise everything, move it, and begin again. So you can read your own code, count the wide operations, and you have counted your stages. Let us watch Spark do exactly that.',
}
