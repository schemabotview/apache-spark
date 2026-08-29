import type { Section } from '../types'

export const closer: Section = {
  id: 'closer',
  title: 'One API, batch and stream',
  scene: 'streaming-model',
  slide: `## One API, batch and stream

Step back: everything here is the **batch engine you already know**, made incremental — the stream really is just a table.

### What you actually changed
- \`read\` → \`readStream\`, \`write\` → \`writeStream\` + a **trigger**, an **output mode**, a **checkpoint**
- The query in the middle — your DataFrame / SQL — is **unchanged** from batch

### What Spark added underneath
- Incremental execution over an unbounded table, driven by the trigger
- **Event-time windows + watermarks** for correctness over late data
- **Checkpointed state** for fault-tolerant, exactly-once results

### Where it sits
- This is **Structured Streaming** from the API course — the same Catalyst/Tungsten core, now continuous

From the road to Spark, to how a job runs, to the layers you write, to streaming them live — that’s Apache Spark, end to end.`,
  narration:
    'Let’s pull all the way back and take in the whole picture. Here’s the punchline of the entire course: almost everything you’ve seen is the ordinary batch engine you already knew, quietly made incremental. The stream really is just a table. Look at what you actually change to go from batch to streaming: you swap read for readStream and write for writeStream, and you attach three things — a trigger to say how often, an output mode to say what to emit, and a checkpoint location to make it durable. That’s it. The query sitting in the middle — your DataFrames, your SQL, your joins and aggregations — is exactly the same code you’d run over a static dataset. What Spark quietly adds underneath is everything we walked through: it runs that query incrementally over an unbounded input table, driven by the trigger; it gives you event-time windows and watermarks so your answers stay correct even when data shows up late and out of order; and it checkpoints your progress and your state so the whole thing is fault-tolerant and exactly-once. And notice where this lands: this is the Structured Streaming box that sat on top of the stack back in the API course — the very same Catalyst and Tungsten engine, the same RDD core underneath, just pointed at data that never stops arriving. So that closes the loop on our whole journey through Spark. We traced the road that led to it, from Hadoop to the unified engine. We took apart how a single job runs across the driver, the cluster manager, and the executors. We climbed the layered API, from RDDs up through DataFrames and SQL, and watched Catalyst compile it all back down. And now we’ve taken that exact stack and set it loose on live, unbounded data. That — end to end — is Apache Spark.',
}
