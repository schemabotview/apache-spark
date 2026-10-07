import type { Section } from '../types'

export const checkpointingSection: Section = {
  id: 'checkpointing',
  title: 'Checkpointing and recovery',
  scene: 'checkpointing',
  focus: 'wipe',
  slide: `## Checkpointing and recovery

Not optional, and not just a restart file. It is what makes a streaming query correct across failure.

### What is in it
- \`offsets/\` — how far each source was read. **Why it can resume**
- \`state/\` — open windows, join buffers, your custom state. **Why the resume is correct**
- \`metadata/\` — the query id and the shape of its plan. Why some edits get refused

### Put it on durable storage
- S3, ADLS, HDFS. A checkpoint on an executor's local disk survives nothing

### What you can change and still restart
- **Fine** — filters, projections, literals, the sink, the trigger interval
- **Refused** — adding or removing an aggregation, changing grouping keys, changing the source
- A refusal protects state Spark can no longer interpret. **Deleting the checkpoint is not a fix**`,
  narration:
    'Checkpointing is how a streaming query survives failure, and it is not optional — Spark will refuse to start a stateful query without a checkpoint location. But calling it a restart file undersells it, so let us look at what is actually in there. Three things. The offsets directory records how far each source has been read, and committed. That is why the query can resume at all: on restart it reads the last committed offset and asks Kafka, or the file source, for everything after it. The state directory holds the actual state from the last section — open windows, join buffers, your custom state — snapshotted. That is why the resume is correct rather than merely possible: without it you would resume reading at the right place but with an empty memory, and your running counts would start again from zero. And the metadata directory holds the query\'s identity and the shape of its plan, which is what makes some edits legal and others not. Two operational rules. Put the checkpoint on durable, shared storage — S3, ADLS, HDFS. A checkpoint on an executor\'s local disk survives nothing, which defeats the purpose entirely. And one query, one location: two queries sharing a checkpoint directory will corrupt each other\'s offsets, and the failure mode is confusing. Now the table that is the most practically valuable thing in this chapter, because it describes something that will happen to you. You have a streaming job running. You want to change it. Which changes let you restart on the same checkpoint, keeping your state and your position? Safe: changing a filter, adding or removing a projection, changing a literal threshold, changing the sink or its path, changing the trigger interval. None of those alter the shape of stored state. Refused: adding or removing an aggregation, changing the grouping keys, changing the source or its topic. Spark will raise an error and refuse to start. And I want to be clear that a refusal is Spark doing you a favour. The stored state is keyed and shaped according to the old query. If it let you restart with different grouping keys, it would silently interpret the old state under the new schema and produce wrong answers with no indication that anything had happened. The refusal is a guardrail. Which matters because of what people do next. The error says it cannot restart, so they delete the checkpoint directory and start again, and the job comes up. But what they have actually done is thrown away all accumulated state and all record of what was already processed, so the query reprocesses the source from the beginning and double-counts everything downstream. If you genuinely need to make a breaking change, the honest procedure is to start a new query with a new checkpoint and a planned backfill, deliberately. Last section: joins, and the habits that make all of this survivable.',
}
