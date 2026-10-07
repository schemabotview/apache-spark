import type { Course } from '../types'
import { plans } from './01-plans'
import { catalyst } from './02-catalyst'
import { logicalOpt } from './03-logical-optimization'
import { physicalPlanning } from './04-physical-planning'
import { tungsten } from './05-tungsten'
import { codegenSection } from './06-codegen'
import { shuffle } from './07-shuffle'
import { exchangeSection } from './08-exchange'
import { readingExplainSection } from './09-reading-explain'

// internals — chapter 5, and the one four earlier chapters kept deferring to. Every "Catalyst does
// that for you" in chapters 3 and 4 is cashed out here.
//
// The chapter is BOOKENDED on one query. §1 prints its logical and physical plans together and asks
// what happened in between; §9 annotates that same physical plan with the answers. Each of §2–§8 is
// one of those annotations — the filter that moved into the scan, the aggregate that split in two,
// the Exchange nobody wrote. A reader should finish able to open an unfamiliar plan and get four
// specific answers out of it in under a minute, which is the only testable promise worth making
// about an internals chapter.
//
// §5 and §7 are the two that had to be DRAWN rather than printed: a memory layout and a disk-and-
// fetch fan-out are both shapes, and chips make them countable. Everything else is real plan text.
//
// Course COMPLETE as content — 9 sections, 9 scenes, 0 wavs (narration authored, Colab pass pending).
export const internals: Course = {
  id: 'internals',
  title: 'What Spark does with your code',
  sections: [plans, catalyst, logicalOpt, physicalPlanning, tungsten, codegenSection, shuffle, exchangeSection, readingExplainSection],
}
