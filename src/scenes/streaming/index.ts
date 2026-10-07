import type { Scene } from '@graphlearning/flow'
import { oneWord } from './one-word'
import { unboundedTable } from './unbounded-table'
import { sourcesSinks } from './sources-sinks'
import { triggers } from './triggers'
import { eventTime } from './event-time'
import { watermarks } from './watermarks'
import { state } from './state'
import { checkpointing } from './checkpointing'
import { streamingJoins } from './streaming-joins'

// Scenes for the `streaming` course — the chapter that extends the whole model rather than replacing
// it. §1 and §4 both exist to say the same thing from different angles: this is the engine you
// already know, in a loop. Everything from chapters 2 and 5 transfers intact.
//
// `event-time` is the repo's first PLOT node, and the fit is exact: the distinction between two
// clocks is a RELATIONSHIP between two numbers, which is a scatter. The dashed diagonal is the
// fiction batch systems assume; every real point sits below it, and the distance IS the delay.
// `equal: true` is load-bearing — without it the 45° line lies about the gap.
//
// §7 and §8 are both NESTING, and deliberately so: state lives inside an executor inside a store,
// and a checkpoint is a directory with named things in it. Both are facts people get wrong by
// picturing something central, and containment is what corrects that.
export const streamingScenes: Scene[] = [
  oneWord,
  unboundedTable,
  sourcesSinks,
  triggers,
  eventTime,
  watermarks,
  state,
  checkpointing,
  streamingJoins,
]
