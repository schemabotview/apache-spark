import type { Course } from '../types'
import { theApplication } from './01-the-application'
import { driverExecutors } from './02-driver-and-executors'
import { sparkSession } from './03-sparksession'
import { jobsStagesTasks } from './04-jobs-stages-tasks'
import { parallelExecution } from './05-parallel-execution'
import { dependencies } from './06-dependencies'
import { theDag } from './07-the-dag'
import { lazyEvaluation } from './08-lazy-evaluation'
import { deploymentModes } from './09-deployment-modes'

// architecture — chapter 2, and the one that turns Spark from a story into something predictable.
// The chapter's promise is narrow and testable: by §9 a reader should be able to take a program they
// have never seen and predict its jobs (count the actions), its stages (count the wide dependencies,
// add one) and its tasks (the partition count) BEFORE running it.
//
// Order note: §8 lazy-evaluation sits late, which looks wrong — laziness is logically prior to
// everything in §4–§7. It is deliberate, and it follows COURSE-PLAN.md. §4–§7 teach the reader to
// draw stages, tasks, waves and a DAG; §8 then reveals that none of it existed while those lines
// ran. Taught first, laziness is a disclaimer nobody remembers; taught here, it recontextualises
// four sections at once. §4 therefore mentions actions lightly and lets §8 deliver them.
//
// Course COMPLETE as content — 9 sections, 9 scenes, 0 wavs (narration authored, Colab pass pending).
export const architecture: Course = {
  id: 'architecture',
  title: 'How it actually runs',
  sections: [
    theApplication,
    driverExecutors,
    sparkSession,
    jobsStagesTasks,
    parallelExecution,
    dependencies,
    theDag,
    lazyEvaluation,
    deploymentModes,
  ],
}
