import type { Section } from '../types'

export const stateAndCheckpoints: Section = {
  id: 'state-and-checkpoints',
  title: 'State, checkpoints & exactly-once',
  scene: 'stream-durability',
  slide: `## State, checkpoints & exactly-once

Streaming keeps **state** between triggers — and **checkpointing** is what makes that state survive a crash, giving **exactly-once**.

### The state store
- Aggregations, joins and dedup keep **running state** across triggers, per key
- Held on the executors, backed by the checkpoint (RocksDB, or in-JVM)

### Checkpointing
- Every trigger, Spark durably records **source offsets + state** to the checkpoint location
- On restart it reloads them and **resumes exactly** — no rows lost, none double-counted

### End-to-end exactly-once
- Replayable source + checkpointed state + **idempotent / transactional sink** = exactly-once
- Point the query at a stable \`checkpointLocation\` — that directory *is* the query’s identity

This is the guarantee that lets you run a streaming query for months and trust its numbers.`,
  narration:
    'We’re back on the full model now, at the layer holding the whole thing up: durability. We’ve seen that streaming keeps state — a windowed count, the running side of a join, the set of keys seen for deduplication — and that this state lives across triggers, per key, on the executors. The question is what happens when an executor, or the whole job, crashes with all that state in memory. The answer is checkpointing. On every single trigger, before it commits, Spark durably writes two things to a checkpoint location you configure: the source offsets it has processed, and the current contents of the state store. Because both are saved together, atomically, a restart is clean — Spark reads back the last committed offsets and the matching state, and resumes from exactly that point. Nothing is skipped, because the offsets tell it where it was; nothing is double-counted, because the state it restores already reflects everything up to those offsets. Now put that together with the two things we saw earlier. The source is replayable, so Spark can re-read any data after the last checkpoint. The state is checkpointed, so the running totals survive. And if the sink is idempotent or transactional, re-writing a replayed batch doesn’t duplicate anything downstream. Those three properties together are what deliver end-to-end exactly-once — genuinely exactly-once, not just at-least-once. One very practical note: that checkpoint directory effectively is your query’s identity. Keep pointing a query at the same stable checkpointLocation and it continues where it left off; change or delete it and Spark thinks it’s a brand-new query starting from scratch. This is the machinery that lets you leave a streaming job running for months and still trust every number it produces.',
}
