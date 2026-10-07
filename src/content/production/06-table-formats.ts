import type { Section } from '../types'

export const tableFormatsSection: Section = {
  id: 'table-formats',
  title: 'Table formats',
  scene: 'table-formats',
  focus: 'pick',
  slide: `## Table formats

Chapter 4 named two problems and left them open. This is where both get solved — and it is still Parquet underneath.

### A table format is files **plus a log**
- The data is the same Parquet directory you already had
- Alongside it sits a transaction log recording which files belong to the table at each version
- That log is the entire trick. Nothing about the storage engine changes

### What the log buys you
- **Schema enforcement and evolution** — chapter 4 §1's drift problem, solved
- **Compaction** (\`OPTIMIZE\`) — chapter 4 §8's small-file problem, solved
- **ACID writes** — a reader never sees a half-finished job
- **Time travel** and **MERGE** — read the table as of Tuesday; upsert, which plain Parquet cannot

### Delta, Iceberg or Hudi
- Choose on which engines must read it and what your platform already supports, not on features`,
  narration:
    'Chapter four named two problems and deliberately left them open. The first was schema evolution: a rename or a dropped column breaks every reader of your old files, and plain Parquet has no mechanism to manage that. The second was the small-file problem: write often enough and you accumulate millions of tiny files that cost more in metadata than they save. Both are solved by a table format, and the reason this section is in the production chapter rather than back with the file formats is that a table format is an operational decision, not a serialisation one. Here is the whole idea, and it is simpler than the branding suggests. A table format is your Parquet files, plus a log. Look at the board: the data directory is unchanged — the same part files you already had, in the same columnar format, readable by the same engines. Alongside it sits a transaction log, a sequence of small files, each recording a change: these files were added to the table, these were removed, the schema is now this. That log is the entire trick. Nothing about the storage engine changed. What does that buy? Schema enforcement and evolution, because the log records the schema at every version, so a writer that violates it is rejected and a compatible change is recorded rather than guessed. Compaction, usually called OPTIMIZE, which rewrites many small files into few large ones and atomically swaps them in via the log — chapter four\'s small-file problem, fixed. ACID writes, because a reader consults the log to find out which files are in the table, and a half-finished job has not committed its log entry, so its files are simply invisible. No more partial reads of a failed job. Time travel, because the log has every version: read the table as of version one, or as of last Tuesday, which turns out to be enormously useful for debugging and for reproducible model training. And MERGE — upserts and deletes — which plain Parquet genuinely cannot do, and which is what you need for change-data-capture and for GDPR deletion. As for which one: Delta, Iceberg and Hudi all implement the same core idea with different trade-offs. Choose on which engines must read your tables and what your platform already supports, not on a feature comparison, because the features converge every release and the integration story does not. Next: putting these together into something more than one job.',
}
