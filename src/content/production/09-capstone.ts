import type { Section } from '../types'

export const capstoneSection: Section = {
  id: 'capstone',
  title: 'Capstone',
  scene: 'capstone',
  slide: `## Capstone

One system, built from all eight chapters. Every band on the left is something you have already been taught.

### The brief
- Orders arrive as a Kafka stream and as a daily file drop
- It must survive a rerun, a bad deploy, and a node dying mid-shuffle

### What each decision costs you
- **Ingest** — streaming for the stream, \`availableNow\` for the files · *ch7 §4*
- **Bronze** raw and append-only, so a bad transform is replayable · *ch8 §7*
- **Silver** with a declared schema and a quarantine path · *ch4 §1, §2*
- **Gold** partitioned by the column people filter on · *ch4 §8*

### You can now defend every one of those
- Which was the point. Not that you know Spark's API — that you can say **why**`,
  narration:
    'Last section of the course. Look at the board, because it is deliberately the mirror of the very first diagram in chapter two. That one showed the runtime topology: one application, its driver, its executors, the manager that handed them out. This shows the system those applications live inside, drawn in exactly the same grammar — and every band on it is something you have already been taught. Here is the brief. Orders arrive two ways: as a continuous Kafka stream, and as a daily file drop from a partner who has not modernised. Analysts need hourly revenue by country. A data science team needs a feature table. And the whole thing has to survive a rerun, a bad deploy, and a node dying mid-shuffle. Walk the bands. Ingest: the Kafka stream is a Structured Streaming query with a checkpoint on durable storage and a watermark on anything stateful — chapter seven. The daily files are the same code with an availableNow trigger on a schedule, which gives you incremental processing without a permanently running cluster — chapter seven, section four. The lakehouse: a table format, so you get ACID writes, compaction and schema evolution — section six of this chapter — laid out bronze, silver, gold. Bronze is raw and append-only, which is what makes everything after it replayable. Silver applies the declared schema from chapter four and splits bad rows into quarantine rather than dropping them. Gold is partitioned by the column people actually filter on — chapter four, section eight — and written with overwrite scoped to the partition being rebuilt, so a rerun reproduces rather than doubles. Compute: a job cluster per run — section one of this chapter — sized by the arithmetic from section two and then checked against a sample. AQE on, because chapter six section seven showed that the planner\'s statistics are a guess and real sizes are better. Event log on, because section four of this chapter said you cannot enable it after the failure. And serving: the gold tables, read by dashboards, by ad-hoc SQL, and by the feature store. Which is the reason the rest of it exists, and worth remembering when you are deep in a shuffle configuration. Now, the thing I actually want you to take from all of this. You could have built something shaped like that diagram after chapter three, by copying a reference architecture. What is different now is that you can defend every single box on it. Why a job cluster and not a shared one. Why bronze is immutable. Why that column and not another one for partitioning. Why AQE matters, and what it is compensating for. Why the watermark is ten minutes and what you are giving up by choosing that number. That was the goal from the very first section, when we asked why Spark exists before asking how to use it. Not that you would know the API — the API is documented and it changes. But that when something is slow, or wrong, or expensive, you would be able to form a hypothesis, find the evidence, and explain your answer to somebody else. That is the whole course. Go and build something.',
}
