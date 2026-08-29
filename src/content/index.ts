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

export function getCourse(id: string): Course | undefined {
  return COURSES[id]
}

// The slug for a section is `<courseId>-<sectionId>` — section IS the unit (one slide, one
// narration), so no trailing beat index.
export function slugOf(course: Course, section: Section): string {
  return `${course.id}-${section.id}`
}

export function allSections(course: Course): { section: Section; slug: string }[] {
  return course.sections.map((section) => ({ section, slug: slugOf(course, section) }))
}
