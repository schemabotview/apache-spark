import type { Scene } from '@graphlearning/flow'
import { partitionSizing } from './partition-sizing'
import { shuffleTuning } from './shuffle-tuning'
import { joinStrategies } from './join-strategies'
import { caching } from './caching'
import { skew } from './skew'
import { pushdown } from './pushdown'
import { aqe } from './aqe'
import { resources } from './resources'
import { sparkUi } from './spark-ui'

// Scenes for the `performance` course — the chapter whose deliverable is a METHOD rather than a set
// of facts, so §9 is symptom-first and every row of its table points back at the section that
// explains the cause.
//
// `skew` is the repo's first EVOLUTION node. Skew is a DISTRIBUTION, and a distribution drawn as
// cards is a list of numbers the reader has to compare in their head; drawn as columns it is one
// glance — five stubs and a 48-million-row tower. The row is monochrome but for `pattern: 'warn'`
// on the one partition the section is about, which is the engine's documented way to single one out.
//
// `resources` is the nesting scene: the heap sits INSIDE the container the cluster manager reserves,
// and memoryOverhead sits outside the heap. People size the inner number and get killed on the
// outer one, and only containment makes that visible.
export const performanceScenes: Scene[] = [
  partitionSizing,
  shuffleTuning,
  joinStrategies,
  caching,
  skew,
  pushdown,
  aqe,
  resources,
  sparkUi,
]
