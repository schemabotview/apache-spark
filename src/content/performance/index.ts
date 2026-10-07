import type { Course } from '../types'
import { partitionSizingSection } from './01-partition-sizing'
import { shuffleOptimization } from './02-shuffle-tuning'
import { joinStrategiesSection } from './03-join-strategies'
import { cachingSection } from './04-caching'
import { skewSection } from './05-skew'
import { pushdownSection } from './06-pushdown'
import { aqeSection } from './07-aqe'
import { resourcesSection } from './08-resources'
import { sparkUiSection } from './09-spark-ui'

// performance — chapter 6, and the only chapter whose deliverable is a METHOD rather than a body of
// facts. §9 is the chapter: find the slowest stage, read its task distribution, name the cause from
// the numbers, change ONE thing. §1–§8 exist so that step three has somewhere to land, which is why
// every row of §9's symptom table points back at a section by number.
//
// It is also the chapter that collects debts. Chapter 2 §5 counted tasks and left sizing open (§1).
// Chapter 5 §7 described the shuffle and left tuning open (§2). Chapter 5 §4 explained strategy
// selection and flagged that it runs on statistics (§3, §7). Chapter 4 §8 covered write layout and
// left read-side pruning open (§6). Each of those is paid here.
//
// The anti-pattern the chapter argues against, explicitly in §9: changing three configuration
// settings at once and rerunning. That is not debugging, and when it works you have learned nothing.
//
// Course COMPLETE as content — 9 sections, 9 scenes, 0 wavs (narration authored, Colab pass pending).
export const performance: Course = {
  id: 'performance',
  title: 'Making it fast, on evidence',
  sections: [
    partitionSizingSection,
    shuffleOptimization,
    joinStrategiesSection,
    cachingSection,
    skewSection,
    pushdownSection,
    aqeSection,
    resourcesSection,
    sparkUiSection,
  ],
}
