import { foundations } from './foundations'
import { architecture } from './architecture'
import type { Course, Section } from './types'

// The course catalog, in syllabus order. → past a course's last section rolls into the next course's
// first. Courses are added here as they are authored, one chapter at a time.
//
// The arc COURSE-PLAN.md lays out, in order — authored chapters marked:
//
//   foundations   why distributed processing exists, and why Spark exists after MapReduce   (7) ✓
//   architecture  driver / executors / cluster managers, and jobs → stages → tasks          (9) ✓
//   programming   RDDs, DataFrames and Spark SQL — the three abstractions                   (9)
//   engineering   schema, joins, windows, complex types, and pipelines that survive         (9)
//   internals     logical → physical plans, Catalyst, Tungsten, shuffle, explain()          (9)
//   performance   partitions, join strategies, skew, caching, AQE, the Spark UI             (9)
//   streaming     Structured Streaming, event time, watermarks, state, checkpointing        (9)
//   production    deployment, sizing, observability, table formats, the capstone            (9)
//
// 16 of 71 sections authored.
export const COURSES: Record<string, Course> = {
  [foundations.id]: foundations,
  [architecture.id]: architecture,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract the recorder drives, so it cannot be a per-repo decision. Re-exported here because
// this module is what the app and the scripts already import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
