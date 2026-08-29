import type { Course } from '../types'
import { theRoad } from './01-the-road'
import { theProblem } from './02-the-problem'
import { hadoop1 } from './03-hadoop-1'
import { hadoop2 } from './04-hadoop-2'
import { spark1 } from './05-spark-1'
import { spark2 } from './06-spark-2'

// evolution — from big data to the unified engine: the problem, Hadoop 1, Hadoop 2/YARN, and the
// two eras of Spark. Each section rides its own focused scene (see src/scenes/evolution).
export const evolution: Course = {
  id: 'evolution',
  title: 'The road to Spark',
  sections: [theRoad, theProblem, hadoop1, hadoop2, spark1, spark2],
}
