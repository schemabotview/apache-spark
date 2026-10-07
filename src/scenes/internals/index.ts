import type { Scene } from '@graphlearning/flow'
import { whatVsHow } from './what-vs-how'
import { catalystPhases } from './catalyst-phases'
import { logicalRules } from './logical-rules'
import { physicalChoice } from './physical-choice'
import { tungstenRows } from './tungsten-rows'
import { codegen } from './codegen'
import { shuffleMechanics } from './shuffle-mechanics'
import { exchange } from './exchange'
import { readingExplain } from './reading-explain'

// Scenes for the `internals` course — the chapter four earlier chapters have been promising, and the
// one where the subject matter is literally TEXT. Five of the nine carry a code card holding real
// plan output rather than a drawing of one, because the skill this chapter sells is reading plans,
// and you cannot practise that against a diagram.
//
// §1 and §9 bookend it with the same query: §1 shows the logical and physical plans side by side and
// asks what happened in between; §9 annotates the physical plan with the answers. Everything between
// them is one of those annotations.
//
// `tungsten-rows` and `shuffle-mechanics` are the two that had to be drawn rather than printed —
// a memory layout and a disk-and-fetch fan-out are both shapes, and chips make them countable.
export const internalsScenes: Scene[] = [
  whatVsHow,
  catalystPhases,
  logicalRules,
  physicalChoice,
  tungstenRows,
  codegen,
  shuffleMechanics,
  exchange,
  readingExplain,
]
