import type { Scene } from '@graphlearning/flow'
import { applicationShape } from './application-shape'
import { sessionLifecycle } from './session-lifecycle'
import { jobStageTask } from './job-stage-task'
import { slotsAndWaves } from './slots-and-waves'
import { narrowVsWide } from './narrow-vs-wide'
import { dagConstruction } from './dag-construction'
import { lazyAndActions } from './lazy-and-actions'
import { deploymentModes } from './deployment-modes'

// Scenes for the `architecture` course — EIGHT scenes for nine sections. §1 and §2 share
// `application-shape`: same cast, same board, different narration, and §2 sets `focus: 'w1'` so the
// two sections are not the same video frame twice. This is the first shared scene in the repo, and
// it is what `Scene` being content-agnostic is for.
//
// This chapter leans on NESTED EDGES, which chapter 1 never needed: `job-stage-task` declares the
// shuffle boundary between its own two stages, and `narrow-vs-wide` draws the dependency inside each
// of its two columns. That is what lets a container express a relationship among its children instead
// of only its own position in the outer flow.
//
// Three CODE cards (§3 session, §7 the four lines Spark plans, §8 the lazy sequence) — the chapter
// where Spark stops being a diagram and starts being something you type. Three TABLE nodes (§5 the
// wave arithmetic, §8 transformation vs action, §9 the four schedulers).
export const architectureScenes: Scene[] = [
  applicationShape,
  sessionLifecycle,
  jobStageTask,
  slotsAndWaves,
  narrowVsWide,
  dagConstruction,
  lazyAndActions,
  deploymentModes,
]
