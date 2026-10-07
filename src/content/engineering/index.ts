import type { Course } from '../types'
import { schemaEvolution } from './01-schema-evolution'
import { dataQuality } from './02-data-quality'
import { transforms } from './03-transforms'
import { joins } from './04-joins'
import { windows } from './05-windows'
import { complexTypes } from './06-complex-types'
import { udfs } from './07-udfs'
import { dataLayout } from './08-data-layout'
import { maintainablePipelines } from './09-maintainable'

// engineering — chapter 4, and the one about messy reality. Chapter 3 taught the APIs on clean data;
// this is what those APIs meet in production: schemas that drift, rows that do not parse, joins that
// silently multiply, nested source data, and a write layout that decides every future read.
//
// The through-line is SILENT FAILURE. Almost every section here is about something that does not
// crash: PERMISSIVE nulls a bad row and carries on (§2), a duplicate join key multiplies your
// revenue (§4), a missing window frame turns a running total into a group total (§5), `explode`
// multiplies before an aggregate (§6), over-partitioning produces a folder per row (§8). A reader
// who finishes this chapter should be suspicious of green pipelines.
//
// It is also the chapter a reader comes BACK to, which is why six of nine scenes carry a reference
// table rather than an argument.
//
// Course COMPLETE as content — 9 sections, 9 scenes, 0 wavs (narration authored, Colab pass pending).
export const engineering: Course = {
  id: 'engineering',
  title: 'Data that fights back',
  sections: [schemaEvolution, dataQuality, transforms, joins, windows, complexTypes, udfs, dataLayout, maintainablePipelines],
}
