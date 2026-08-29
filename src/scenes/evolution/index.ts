import type { Scene } from '../../render-engine'
import { overview } from './overview'
import { problem } from './problem'
import { hadoop1 } from './hadoop1'
import { hadoop2 } from './hadoop2'
import { spark1 } from './spark1'
import { spark2 } from './spark2'

// The evolution course's scenes — one per section, in syllabus order: the overview timeline, then
// the five eras (the problem · Hadoop 1 · Hadoop 2/YARN · Spark 1 · Spark 2).
export const evolutionScenes: Scene[] = [overview, problem, hadoop1, hadoop2, spark1, spark2]
