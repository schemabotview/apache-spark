import type { Scene } from '../../render-engine'
import { streamingModel } from './streaming-model'
import { streamSources } from './stream-sources'
import { streamTrigger } from './stream-trigger'
import { streamResult } from './stream-result'
import { streamSinks } from './stream-sinks'
import { eventTime } from './event-time'
import { streamDurability } from './stream-durability'

// The spark-streaming course's scenes. `streaming-model` is the shared spine (the dataflow) — the
// focused band scenes (stream-sources · stream-trigger · stream-result · stream-sinks ·
// stream-durability) and the shared `event-time` scene are added as each sub-slice is authored.
export const sparkStreamingScenes: Scene[] = [streamingModel, streamSources, streamTrigger, streamResult, streamSinks, eventTime, streamDurability]
