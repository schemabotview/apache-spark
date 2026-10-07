import type { Section } from '../types'

export const dataLayout: Section = {
  id: 'data-layout',
  title: 'Partitioned datasets and layout',
  scene: 'layout-on-disk',
  focus: 'small',
  slide: `## Partitioned datasets and layout

How you write decides how fast every future read is — the cheapest performance decision you'll make, and the hardest to undo.

### \`partitionBy\` is a directory layout, not an index
- It writes \`country=UK/\`, \`country=FR/\` — one folder per distinct value
- A later filter on \`country\` opens one folder and skips the rest: **partition pruning**
- So it only helps on a column people actually filter by

### Choosing the column
- **Low cardinality only** — one directory per distinct value, permanently
- Never partition by an id or raw timestamp; that is a folder per row

### File size is the other half
- Aim for roughly **128 MB** files — the block size everything downstream assumes`,
  narration:
    'This section is about the decision that gives you the most performance for the least effort anywhere in this course, and it is made at write time. The reason it matters so much is that you write a dataset once and read it a thousand times, so a choice that makes every read faster compounds in a way that tuning a single job never does. It is also the hardest to undo, because undoing it means rewriting everything. The central idea is this: partitionBy is a directory layout, not an index. When you write with partitionBy country, Spark does not build any kind of index structure. It creates a folder called country equals UK, another called country equals FR, another for DE, and writes the matching rows into each — exactly as you see on the board. The value is encoded in the folder name, and it is not stored in the files at all, because it does not need to be. Now see what that gives you for free. When somebody later reads this dataset with a filter on country equals FR, Spark looks at the directory names, opens that one folder, and never touches the others. It does not read them and discard the rows; it never opens the files. That is partition pruning, and on a dataset partitioned sensibly it is the difference between a two-minute job and a two-second one. But notice what it implies, because this is where people go wrong: it only helps on a column people actually filter by. Partitioning by a column nobody filters on gives you all of the cost and none of the benefit. So choose the column by asking how this data will be queried, not by what seems natural. Which brings us to the rule that saves people from the classic disaster: low cardinality only. One directory per distinct value, permanently. Country is fine — a couple of hundred at most. Customer id is catastrophic: you get a folder per customer, each containing one tiny file, and every subsequent read pays metadata cost on millions of objects before reading a byte. Raw timestamps are the same mistake in a different hat, which is why date partitioning is conventionally year, then month, then day as separate levels rather than a full timestamp. And file size is the other half of the decision, often forgotten. Aim for files of roughly a hundred and twenty-eight megabytes — the block size everything downstream is tuned around. Many tiny files are the single most common performance complaint in data lakes, and they are almost always caused by over-partitioning or by a streaming job writing every micro-batch. Last section: making all of this something a colleague can maintain.',
}
