import type { Course } from '../types'
import { deployment } from './01-deployment'
import { capacitySection } from './02-capacity'
import { yarnK8sSection } from './03-yarn-k8s'
import { observabilitySection } from './04-observability'
import { failureModesSection } from './05-failure-modes'
import { tableFormatsSection } from './06-table-formats'
import { scalableDesignSection } from './07-scalable-design'
import { antiPatternsSection } from './08-anti-patterns'
import { capstoneSection } from './09-capstone'

// production — chapter 8, the last, and the one that CLOSES loops rather than opening them.
//
// §6 finally solves the two problems chapter 4 named and deliberately left open: schema drift that
// breaks every reader of old files (ch4 §1), and the small-file problem (ch4 §8). §8 is the course's
// greatest-hits table and the only place whose CONTENT cites chapter numbers, because it is a page
// to come back to and each row should send the reader to where the reasoning lives.
//
// §9 is the capstone and it is the mirror of chapter 2 §1 on purpose. That scene drew the RUNTIME
// topology — one application, driver, executors — in the banded grammar borrowed from ui-flow's
// `spark-topology` fixture. This draws the SYSTEM topology in the same grammar. A reader who cannot
// place a band has found the chapter to revisit.
//
// The closing claim of the whole course, made in §9's narration: the point was never the API. It is
// that every box on that diagram can be DEFENDED — why a job cluster, why bronze is immutable, why
// that partition column, what the ten-minute watermark is giving up.
//
// Course COMPLETE as content — 9 sections, 9 scenes, 0 wavs (narration authored, Colab pass pending).
export const production: Course = {
  id: 'production',
  title: 'Running it for real',
  sections: [
    deployment,
    capacitySection,
    yarnK8sSection,
    observabilitySection,
    failureModesSection,
    tableFormatsSection,
    scalableDesignSection,
    antiPatternsSection,
    capstoneSection,
  ],
}
