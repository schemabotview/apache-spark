import type { Course } from '../types'
import { overview } from './01-overview'
import { rddFoundation } from './02-rdd-foundation'
import { structuredApis } from './03-structured-apis'
import { theEngine } from './04-the-engine'
import { catalystOverview } from './05-catalyst-overview'
import { catalystLogical } from './06-catalyst-logical'
import { tungstenPhysical } from './07-tungsten-physical'
import { unification } from './08-unification'

// spark-api — "The layers you write against": Spark's API as a stack of altitudes. Opens on the
// whole stack (overview), climbs band by band (RDD core · structured APIs · the engine), detours
// into the Catalyst compile-down pipeline (overview · logical · physical), then closes by stepping
// back to the whole stack — pick your altitude, everything compiles down to the same core
// (unification). The two whole-stack bookends share the `api-stack` spine; the three catalyst
// sections share the `catalyst` pipeline scene; each band deep-dive rides its own focused scene.
//
// COMPLETE — the full altitude stack, overview → unification: the whole stack, the RDD core, the
// structured APIs, the engine (Catalyst → Tungsten), the Catalyst compile-down pipeline (overview ·
// logical · physical), and a closing step back to the whole stack. Two whole-stack bookends
// (overview, unification) share the api-stack spine; the three catalyst sections share the catalyst
// pipeline scene; each band deep-dive (rdd · structured · engine) rides its own focused scene.
export const sparkApi: Course = {
  id: 'spark-api',
  title: 'The layers you write against',
  sections: [
    overview,
    rddFoundation,
    structuredApis,
    theEngine,
    catalystOverview,
    catalystLogical,
    tungstenPhysical,
    unification,
  ],
}
