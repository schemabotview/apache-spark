import type { Scene } from '@graphlearning/flow'
import { dataDeluge } from './data-deluge'
import { scaleUpVsOut } from './scale-up-vs-out'
import { clusterStorage } from './cluster-storage'
import { partitionsLocality } from './partitions-locality'
import { mapreducePipeline } from './mapreduce-pipeline'
import { sparkAnswer } from './spark-answer'
import { sparkStack } from './spark-stack'

// Scenes for the `foundations` course — one per section, no sharing. The chapter is an ARGUMENT, so
// each scene is one step of it and none of them is reusable elsewhere.
//
// Three carry the engine capabilities the rest of the chapter leans on. `cluster-storage` is built
// on genuine NESTING (a cluster contains machines, a machine contains blocks — containment, not
// flow). `scale-up-vs-out` is three levels deep and is the one that proves a FORK can stay a fork:
// two sibling columns, each a vertical stack, and the engine holds their rows aligned across the
// gap, so the comparison reads across without needing row labels. `spark-answer` is the chapter's
// only CODE card, used as evidence for a claim about line count that no diagram could make.
// `partitions-locality` and `mapreduce-pipeline` use TABLE nodes, which is what keeps the real
// locality level names (PROCESS_LOCAL …) on screen — a table node is exempt from the leaf-card
// text budget, so they fit unabbreviated.
export const foundationsScenes: Scene[] = [
  dataDeluge,
  scaleUpVsOut,
  clusterStorage,
  partitionsLocality,
  mapreducePipeline,
  sparkAnswer,
  sparkStack,
]
