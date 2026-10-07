import type { Section } from '../types'

export const scalableDesignSection: Section = {
  id: 'scalable-design',
  title: 'Designing scalable systems',
  scene: 'scalable-design',
  focus: 'why',
  slide: `## Designing scalable systems

One job is a function. A platform is a set of tables with contracts between them.

### The layering nearly everyone converges on
- **Bronze** — raw, exactly as it arrived, **append only**
- **Silver** — typed, deduplicated, conformed, quarantine split off
- **Gold** — modelled and aggregated, partitioned for how it is actually queried

### Why bronze is immutable
- It is not tidiness. It is that every mistake downstream becomes **recoverable by replay**
- Bad transform shipped on Tuesday? Fix it, rebuild silver and gold from bronze. Nothing is lost
- The moment you edit bronze, that guarantee is gone

### Four properties that survive a second team
- **Replayable** · **idempotent** · **contracted** (a schema is a promise) · **observable** (counts at every hop)`,
  narration:
    'A single job is a function. A platform is a set of tables with contracts between them, and the difference is what this section is about. Nearly every organisation that builds a lakehouse converges on the same three layers, often called bronze, silver and gold, and the names matter less than the discipline. Bronze is raw: exactly what arrived, in the shape it arrived, with nothing fixed. Append only. Silver is cleaned: typed properly, deduplicated, conformed to a schema, with bad records quarantined rather than dropped — chapter four, essentially. Gold is modelled: the aggregates and dimensional tables the business actually queries, partitioned by whatever people filter on. Many teams adopt that vocabulary without the discipline underneath it, so let me be clear about the one rule that makes it work: bronze is immutable. You never edit it, never fix it, never clean it in place. That is not tidiness. It is the property that makes every mistake downstream recoverable. Think about what it gives you. You ship a bad transform on Tuesday. On Thursday somebody notices the numbers are wrong. If bronze is intact, the fix is: correct the transform, rebuild silver and gold from bronze, done — because bronze still holds everything that ever arrived, exactly as it arrived. If you had cleaned the data on the way into bronze, that original is gone, and your recovery depends on whether the source system still has it, which for a Kafka topic with a seven-day retention it very likely does not. One rule, and it converts a class of permanent data loss into an afternoon\'s reprocessing. Then four properties that decide whether a platform survives contact with a second team. Replayable, which is the bronze rule. Idempotent, from chapter four: each job overwrites the partition it owns, so a rerun reproduces rather than duplicates. Contracted: the schema of each table is a promise to its consumers, versioned and evolved additively, as in section six. And observable: row counts at every hop, in and out and quarantined, so a silent ninety percent drop is caught by a dashboard rather than by a customer. None of these is exotic. All of them are much easier to put in on day one than to retrofit in year two. Next: the mistakes.',
}
