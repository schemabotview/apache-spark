import type { Course } from '../types'
import { overview } from './01-overview'
import { unboundedTable } from './02-unbounded-table'
import { sources } from './03-sources'
import { trigger } from './04-trigger'
import { resultAndModes } from './05-result-and-modes'
import { sinks } from './06-sinks'
import { eventTimeWindows } from './07-event-time-windows'
import { watermarks } from './08-watermarks'
import { stateAndCheckpoints } from './09-state-and-checkpoints'
import { closer } from './10-closer'

// spark-streaming — "The stream is a table": Structured Streaming, the course the spark-api closer
// teed up. Opens on the whole dataflow model (overview), settles on the core insight — a stream is
// an unbounded table you run the same query over (unbounded-table), walks the pipeline band by band
// (sources · trigger · result+modes · sinks), detours into event-time windowing + watermarks, comes
// back for state & checkpoints, then closes: same API as batch, now continuous (closer). The three
// whole-model sections share the `streaming-model` spine; the two windowing sections share the
// `event-time` scene; each band deep-dive rides its own focused scene.
//
// COMPLETE — the full Structured Streaming model, overview → closer: the unbounded-table dataflow,
// the pipeline band by band (sources · trigger · result+modes · sinks), event-time windowing +
// watermarks, state & checkpoints, and a closing tie-back to the batch API. The three whole-model
// sections (overview, unbounded-table, closer) share the streaming-model spine; the two windowing
// sections share the event-time scene; each band deep-dive rides its own focused scene.
export const sparkStreaming: Course = {
  id: 'spark-streaming',
  title: 'The stream is a table',
  sections: [
    overview,
    unboundedTable,
    sources,
    trigger,
    resultAndModes,
    sinks,
    eventTimeWindows,
    watermarks,
    stateAndCheckpoints,
    closer,
  ],
}
