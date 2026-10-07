import type { Section } from '../types'

export const schemaEvolution: Section = {
  id: 'schema-evolution',
  title: 'Schema design and evolution',
  scene: 'schema-drift',
  focus: 'rule',
  slide: `## Schema design and evolution

Chapter 3 said *declare the schema*. This is what happens when what you declared stops matching what arrives.

### Declare it, in code, in version control
- A \`StructType\` is reviewable, diffable, and fails **loudly** when reality moves
- \`inferSchema\` reads the whole file to guess — and guesses differently next week

### \`nullable\` is not decoration
- A **nullable** column can be added later: old files read it back as null
- A **required** one cannot — old rows have nothing to put there

### Safe, and not safe
- **Safe** — add a nullable column · widen a type (\`int\` → \`long\`)
- **Breaks every reader of the old files** — rename · drop · narrow · add a required column
- A rename is a drop plus an add: add the new column, backfill, retire the old one`,
  narration:
    'Chapter three gave you the APIs. This chapter is about what happens when you point them at real data, which is messy, and at real production, where things change without asking you. We start with the schema, because chapter three told you to declare it and did not tell you what to do when the thing you declared stops matching what arrives. First, why declare at all. A StructType written in your code is a file in version control: someone can review it, you can diff it, and when the incoming data stops matching it, the job fails loudly at the read instead of producing quietly wrong numbers three steps later. Compare that to inferSchema, which reads the whole file to guess the types and may guess differently next week when a column that happened to contain only digits picks up its first letter. Now the important field, and it is the one people skim past: nullable. Look at the third argument in each StructField on the board. That boolean is not decoration — it is the entire schema evolution story. A nullable column can be added to your schema later, and every file written before it existed will still read, with null in that position. A required column cannot, because those old rows have nothing to put there, and the read fails. So here is the practical matrix. Safe changes: adding a nullable column, and widening a type — int to long, for instance — because every value that fit the old type still fits the new one. Breaking changes: adding a required column; narrowing a type, because old values might not fit; dropping a column, because anything selecting it now fails; and renaming a column. That last one surprises people, so be clear about it: to a reader of your old files, a rename is a drop plus an add. The old name vanishes and a new one appears, and both halves of that are breaking. The discipline that follows is simple and it is worth adopting before you need it. Treat your schema as additive only. When you genuinely need a rename, add the new column alongside the old one, backfill it, move the readers across, and retire the old column much later. Now, a schema that matches is not the same as data that is correct — so let us talk about the rows that do not parse at all.',
}
