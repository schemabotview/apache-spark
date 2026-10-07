import type { Scene } from '@graphlearning/flow'
import { rddLineage } from './rdd-lineage'
import { opsCatalog } from './ops-catalog'
import { combineLocally } from './combine-locally'
import { dataframeSchema } from './dataframe-schema'
import { columnsAndFunctions } from './columns-and-functions'
import { sqlSamePlan } from './sql-same-plan'
import { whichApi } from './which-api'
import { formats } from './formats'
import { etlShape } from './etl-shape'

// Scenes for the `programming` course — the chapter where Spark stops being a diagram and becomes
// something you type, so SIX of the nine carry a code card and four carry a table. That ratio is the
// chapter: an API chapter whose scenes were all boxes-and-arrows would be lying about the subject.
//
// `dataframe-schema` is the repo's first TABLE NODE IN SCHEMA MODE (`columns`, with PK/FK badges,
// rather than `headers`/`values`) — a DataFrame IS a schema, so it is drawn as one.
//
// `combine-locally` is the chapter's best scene and the only one where a reader can act on it
// immediately: six chips crossing the network against two, for the same answer.
export const programmingScenes: Scene[] = [
  rddLineage,
  opsCatalog,
  combineLocally,
  dataframeSchema,
  columnsAndFunctions,
  sqlSamePlan,
  whichApi,
  formats,
  etlShape,
]
