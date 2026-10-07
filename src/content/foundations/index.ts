import type { Course } from '../types'
import { dataIntensive } from './01-data-intensive'
import { scaleOut } from './02-scale-out'
import { storageAndCompute } from './03-storage-and-compute'
import { partitioning } from './04-partitioning'
import { mapreduce } from './05-mapreduce'
import { whySpark } from './06-why-spark'
import { theEcosystem } from './07-the-ecosystem'

// foundations — chapter 1, and the only chapter with no Spark API in it at all. It is one ARGUMENT in
// seven steps: data outgrew one machine (§1), so you scale out and inherit three problems (§2),
// which means storing data across machines and sending code to it (§3), measured in partitions (§4);
// MapReduce took those problems back but made every step round-trip through disk (§5), Spark kept
// the first and removed the second (§6), and generalised the result into one engine (§7).
//
// Each section therefore depends on the one before it — this is the one chapter whose sections cannot
// be reordered or watched out of sequence. §4 is the load-bearing one: "partition" is the word every
// later chapter spends, so it is the only section with a vocabulary chain as its scene.
//
// Course COMPLETE as content — 7 sections, 7 scenes, 0 wavs (narration authored, Colab pass pending).
export const foundations: Course = {
  id: 'foundations',
  title: 'Why Spark exists',
  sections: [
    dataIntensive,
    scaleOut,
    storageAndCompute,
    partitioning,
    mapreduce,
    whySpark,
    theEcosystem,
  ],
}
