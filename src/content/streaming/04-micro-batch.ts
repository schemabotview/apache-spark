import type { Section } from '../types'

export const microBatch: Section = {
  id: 'micro-batch',
  title: 'Micro-batch and triggers',
  scene: 'triggers',
  focus: 'avail',
  slide: `## Micro-batch and triggers

A correction first, because it changes how you reason about everything else.

### Structured Streaming is micro-batch
- Not row-at-a-time. It is a **fast loop**: read new offsets, plan a job, run it, commit
- Which means every stage, shuffle and plan from chapters 2 and 5 is still exactly what happens

### Four triggers
- **default** — next batch as soon as the last finishes. Lowest latency, cluster always warm
- **\`processingTime("1 minute")\`** — a batch on a fixed clock. Predictable cost
- **\`availableNow\`** — drain everything waiting, then **stop**

### \`availableNow\` deserves more attention than it gets
- Streaming code, run on a schedule, keeping its checkpoint between runs
- You get incremental processing with no duplicate-handling to write yourself`,
  narration:
    'I want to correct a misconception before going further, because it changes how you reason about everything else in this chapter. Structured Streaming is not row-at-a-time. It is micro-batch. The engine runs a loop: look at the sources and see what new offsets are available; build and optimise a plan for that slice of data; run it as an ordinary Spark job with stages and tasks; write the output; commit the offsets; go round again. That is it. And that means every single thing from chapters two and five is still exactly what is happening. There are partitions and tasks. There are stages separated by shuffles. Catalyst builds a logical plan and optimises it. There is a physical plan you can read with explain and all four questions from chapter five still apply. A streaming query is not a mysterious new mode; it is your batch job, in a while loop, with bookkeeping. The trigger controls only how often that loop goes round, and there are four. The default is: start the next batch as soon as the previous one finishes. That gives you the lowest latency the micro-batch model can offer, and it keeps your cluster permanently busy, which is also what it costs. Processing time with an interval — say one minute — runs a batch on a fixed clock. If a batch finishes early, the engine waits. This gives you predictable load and predictable cost, and for most pipelines it is the sensible choice: nobody actually needs sub-second latency on a dashboard that a human reads. Available now is the one I want to draw attention to, because it is underrated and many people have never used it. It processes everything currently available, in as many batches as that takes, and then stops the query. Think about what that gives you: you write streaming code, with a checkpoint, and you schedule it hourly. It picks up exactly where it left off, processes the new data, and exits. You get incremental processing — no reprocessing, no duplicate handling, no watermark-your-own-offsets logic — with the cost profile of a batch job. For a great many pipelines that is strictly better than either a true stream or a hand-rolled incremental batch. And fourth, continuous processing: a genuinely different execution mode with around one millisecond latency. It is experimental, it supports a small subset of operations, and after several years it has not become the default. Unless you know you need single-digit millisecond latency, you do not want it. Next: the problem that makes streaming genuinely hard.',
}
