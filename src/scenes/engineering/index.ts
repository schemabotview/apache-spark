import type { Scene } from '@graphlearning/flow'
import { schemaDrift } from './schema-drift'
import { badRows } from './bad-rows'
import { whereTheFilterGoes } from './where-the-filter-goes'
import { joinSemantics } from './join-semantics'
import { windowAnatomy } from './window-anatomy'
import { nestedData } from './nested-data'
import { udfCost } from './udf-cost'
import { layoutOnDisk } from './layout-on-disk'
import { maintainable } from './maintainable'

// Scenes for the `engineering` course — the chapter a reader comes BACK to, so six of the nine carry
// a reference TABLE (evolution safety, read modes, join semantics, the UDF ladder, layout rules) and
// seven carry a code card. That ratio is the chapter: it is the one about messy reality, and messy
// reality is mostly lookup.
//
// `window-anatomy` uses a table in DATA mode to carry the teaching — a real five-row result set with
// a running total beside it. No diagram of boxes can show the thing that actually separates a window
// from a groupBy, which is that the row count is unchanged.
//
// `layout-on-disk` is the chapter's NESTING scene: a dataset contains partition directories and a
// directory contains files. `partitionBy` is a directory layout rather than an index, and seeing the
// folder names is what makes partition pruning obvious.
//
// `udf-cost` draws the serialisation boundary as a left-to-right CROSSING, because "per row" only
// becomes visceral when you can see the row leaving the JVM and coming back.
export const engineeringScenes: Scene[] = [
  schemaDrift,
  badRows,
  whereTheFilterGoes,
  joinSemantics,
  windowAnatomy,
  nestedData,
  udfCost,
  layoutOnDisk,
  maintainable,
]
