import type { Scene } from '../render-engine'
import { evolutionScenes } from './evolution'
import { sparkArchitectureScenes } from './spark-architecture'
import { sparkApiScenes } from './spark-api'
import { sparkStreamingScenes } from './spark-streaming'
import { capstoneScenes } from './capstone'

// Scene registry. Sections reference scenes by id; scenes are grouped by course (one folder each,
// mirroring src/content). One scene per section — no shared map. Ids are globally unique across
// courses, so the flat lookup below is unambiguous. Courses are added here as they're authored
// (slice by slice): evolution · spark-architecture · spark-api · spark-streaming · capstone.
const ALL: Scene[] = [
  ...evolutionScenes,
  ...sparkArchitectureScenes,
  ...sparkApiScenes,
  ...sparkStreamingScenes,
  ...capstoneScenes,
]

export const SCENES: Record<string, Scene> = Object.fromEntries(ALL.map((s) => [s.id, s]))

export function getScene(id: string): Scene | undefined {
  return SCENES[id]
}
