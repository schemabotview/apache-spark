import type { Scene } from '@graphlearning/flow'
import { deploymentShapes } from './deployment-shapes'
import { capacity } from './capacity'
import { yarnK8s } from './yarn-k8s'
import { observability } from './observability'
import { failureModes } from './failure-modes'
import { tableFormats } from './table-formats'
import { scalableDesign } from './scalable-design'
import { antiPatterns } from './anti-patterns'
import { capstone } from './capstone'

// Scenes for the `production` course — the last chapter, and the one that closes loops rather than
// opening them. §6 finally solves the two problems chapter 4 named and left open (schema drift that
// breaks readers, and the small-file problem). §8 is the course's greatest-hits table and the only
// scene whose CONTENT cites chapter numbers — because it is a page to come back to, and each row
// should send you to where the reasoning lives.
//
// `capstone` (§9) is deliberately the mirror of chapter 2 §1. That one drew the RUNTIME topology —
// one application, its driver, its executors — in the banded grammar borrowed from ui-flow's
// `spark-topology` fixture. This draws the SYSTEM topology in the same grammar: the platform those
// applications live inside. Every band cites the chapters it is made of, so a band the reader
// cannot place is a chapter to go back to.
export const productionScenes: Scene[] = [
  deploymentShapes,
  capacity,
  yarnK8s,
  observability,
  failureModes,
  tableFormats,
  scalableDesign,
  antiPatterns,
  capstone,
]
