import type { Course } from '../types'
import { overview } from './01-overview'
import { theDriver } from './02-the-driver'
import { deployModes } from './03-deploy-modes'
import { clusterManagerSection } from './04-cluster-manager'
import { executorsSection } from './05-executors'
import { jobDecomposes } from './06-job-decomposes'
import { shuffleBoundary } from './07-shuffle-boundary'
import { tasksToSlots } from './08-tasks-to-slots'
import { memoryCaching } from './09-memory-caching'
import { lifecycle } from './10-lifecycle'

// spark-architecture — "How a Spark job runs": the runtime anatomy of Spark. Opens on the whole
// machine (overview), walks it band by band (driver · deploy modes · cluster manager · executors),
// details the job → stage → task decomposition and the shuffle, then closes on one job traced end
// to end (lifecycle). The two whole-machine bookends share the `arch-topology` spine; each band
// deep-dive rides its own focused scene.
//
// COMPLETE — the full runtime anatomy, overview → lifecycle: the whole machine, the three processes
// band by band (driver · deploy modes · cluster manager · executors), the job → stage → task
// decomposition and the shuffle, the tasks-onto-slots hand-off, executor memory & caching, and a
// closing end-to-end trace. Two whole-machine bookends (overview, lifecycle) + tasks-to-slots share
// the arch-topology spine; each band deep-dive rides its own focused scene.
export const sparkArchitecture: Course = {
  id: 'spark-architecture',
  title: 'How a Spark job runs',
  sections: [
    overview,
    theDriver,
    deployModes,
    clusterManagerSection,
    executorsSection,
    jobDecomposes,
    shuffleBoundary,
    tasksToSlots,
    memoryCaching,
    lifecycle,
  ],
}
