import type { Section } from '../types'

export const antiPatternsSection: Section = {
  id: 'anti-patterns',
  title: 'Anti-patterns',
  scene: 'anti-patterns',
  focus: 'shape',
  slide: `## Anti-patterns

The greatest hits. Every one was taught earlier in this course and gets forgotten anyway.

### The list, by how often it actually happens
- \`collect()\` on a real dataset — the driver dies · **ch3 §2**
- \`inferSchema\` on every read — a full extra pass over the file · **ch3 §8**
- A Python UDF where a built-in exists — per-row boundary, no optimisation · **ch4 §7**
- \`coalesce(1)\` before a write — the whole job goes single-threaded · **ch6 §1**
- \`dropDuplicates\` with no watermark — state grows until the job dies · **ch7 §7**
- Partitioning by a high-cardinality key — a directory per row · **ch4 §8**

### They share a shape
- **None of them errors.** Every one just makes the job quietly worse
- Each hides work the engine would otherwise have done for you`,
  narration:
    'This section is the course\'s greatest hits, and I want to be honest about why it exists. Everything on this list has already been taught, with its reasoning, in an earlier chapter. And people still do all of them, including people who have been doing this for years, including me. So here they are in one place, roughly ordered by how often they actually happen. Calling collect on a real dataset. Chapter three, section two. It pulls every row into the driver, which is the one process never sized for your data, and the driver dies. Use take or show to look, write to keep. Leaving inferSchema on. Chapter three, section eight. Spark reads the entire file to guess the types, then reads it again to load it. You have doubled the read for something you could have declared in ten lines. Writing a Python UDF where a built-in exists. Chapter four, section seven. You pay a serialisation boundary per row and you put an opaque wall in the middle of Catalyst\'s plan. Check the functions module first; it is much bigger than people think. Coalesce of one before a write. Chapter six, section one. You wanted one output file and you made the entire upstream job single-threaded, because coalesce has no shuffle to hide behind and reaches backward. Use repartition of one if the computation matters. GroupByKey where reduceByKey would do. Chapter three, section three. Every raw record crosses the network instead of one partial per key. DropDuplicates with no watermark on a stream. Chapter seven, section seven. State grows forever, the job runs beautifully for a month, and then it starts dying. Caching something read once. Chapter six, section four. You paid to materialise it and used it one time. And partitioning by a high-cardinality column. Chapter four, section eight. A directory per customer, or per timestamp, and now every read pays metadata cost on millions of objects. Now, notice the shape they share, because it is the thing worth carrying rather than the list. Not one of them produces an error. Every single one runs fine, returns correct results, and is simply worse than it needed to be — sometimes by a factor of fifty. That is what makes them persistent: nothing tells you. And each one, underneath, is a case of hiding work from the engine that the engine would have done better itself. Last section: all of it, at once.',
}
