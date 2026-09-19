import { evolution } from './evolution'
import { sparkArchitecture } from './spark-architecture'
import { sparkApi } from './spark-api'
import { sparkStreaming } from './spark-streaming'
import { capstone } from './capstone'
import type { Course, Section } from './types'

// The course catalog, in syllabus order. → past a course's last section rolls into the next course's
// first. Courses are added here as they're authored (slice by slice): evolution ·
// spark-architecture · spark-api · spark-streaming · capstone.
export const COURSES: Record<string, Course> = {
  [evolution.id]: evolution,
  [sparkArchitecture.id]: sparkArchitecture,
  [sparkApi.id]: sparkApi,
  [sparkStreaming.id]: sparkStreaming,
  [capstone.id]: capstone,
}

export type { Course, Section }

// slugOf / allSections are the shell's — the slug rule (`<courseId>-<sectionId>`) is part of the
// route contract the recorder drives, so it cannot be a per-repo decision. Re-exported here because
// this module is what the app and the scripts already import them from.
export { slugOf, allSections } from '@graphlearning/shell'

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}
