import type { Scene } from '@graphlearning/flow'
import { foundationsScenes } from './foundations'
import { architectureScenes } from './architecture'
import { programmingScenes } from './programming'
import { engineeringScenes } from './engineering'
import { internalsScenes } from './internals'
import { performanceScenes } from './performance'
import { streamingScenes } from './streaming'
import { productionScenes } from './production'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). Ids are globally unique across courses, so the flat lookup below is
// unambiguous. Courses are added here as they are authored, one chapter at a time.
const ALL: Scene[] = [...foundationsScenes, ...architectureScenes, ...programmingScenes, ...engineeringScenes, ...internalsScenes, ...performanceScenes, ...streamingScenes, ...productionScenes]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
