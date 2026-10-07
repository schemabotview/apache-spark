import type { Course } from '../types'
import { batchVsStream } from './01-batch-vs-stream'
import { unboundedTableSection } from './02-unbounded-table'
import { sourcesSinksSection } from './03-sources-sinks'
import { microBatch } from './04-micro-batch'
import { eventTimeSection } from './05-event-time'
import { watermarksSection } from './06-watermarks'
import { stateSection } from './07-state'
import { checkpointingSection } from './08-checkpointing'
import { streamingJoinsSection } from './09-streaming-joins'

// streaming — chapter 7, and it EXTENDS the model rather than replacing it. §1 and §4 make the same
// point from two angles because it is the point: Structured Streaming is micro-batch, so every
// partition, stage, shuffle and plan from chapters 2 and 5 is still literally what happens.
//
// The chapter is organised around the three things batch never had to answer, named in §1 and then
// taken one at a time: TIME (§5, §6), STATE (§7) and RECOVERY (§3, §8). Everything else is API.
//
// The recurring warning is unbounded state, and it is deliberately repeated because its failure mode
// is delayed: a job with no watermark runs beautifully for three weeks and then starts dying, by
// which point nobody connects the failure to the code. §6 states it, §7 lists which operations have
// no bound by default (dropDuplicates is the trap), §9 requires watermarks on BOTH sides of a join.
//
// Course COMPLETE as content — 9 sections, 9 scenes, 0 wavs (narration authored, Colab pass pending).
export const streaming: Course = {
  id: 'streaming',
  title: 'Data that never stops',
  sections: [
    batchVsStream,
    unboundedTableSection,
    sourcesSinksSection,
    microBatch,
    eventTimeSection,
    watermarksSection,
    stateSection,
    checkpointingSection,
    streamingJoinsSection,
  ],
}
