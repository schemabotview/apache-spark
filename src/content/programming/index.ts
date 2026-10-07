import type { Course } from '../types'
import { rdds } from './01-rdds'
import { transformations } from './02-transformations'
import { pairRdds } from './03-pair-rdds'
import { dataframes } from './04-dataframes'
import { columns } from './05-columns'
import { sparkSql } from './06-spark-sql'
import { whichApi } from './07-which-api'
import { fileFormats } from './08-formats'
import { patterns } from './09-patterns'

// programming — chapter 3, where Spark stops being a model and becomes something you type. The arc
// is deliberately bottom-up and then immediately upward: §1–§3 are RDDs, §4–§6 are DataFrames and
// SQL, §7 tells the reader to stay in the second group, and §8–§9 make the result production-shaped.
//
// Teaching RDDs first and then saying "now do not use these" is a real choice, and it is the right
// one: a DataFrame IS an RDD underneath, lineage is the recovery story for both, and §3's
// combine-before-you-shuffle rule is invisible from the DataFrame API precisely because the engine
// applies it for you. A reader who never saw the RDD layer cannot explain any of that.
//
// §3 is the section with the highest immediate payoff in the course so far — groupByKey versus
// reduceByKey is a one-word change with an order-of-magnitude result.
//
// Course COMPLETE as content — 9 sections, 9 scenes, 0 wavs (narration authored, Colab pass pending).
export const programming: Course = {
  id: 'programming',
  title: 'The three abstractions',
  sections: [rdds, transformations, pairRdds, dataframes, columns, sparkSql, whichApi, fileFormats, patterns],
}
