import type { Course } from '../types'
import { thePlan } from './01-the-plan'
import { readLake } from './02-read-lake'
import { clean } from './03-clean'
import { batchAggregate } from './04-batch-aggregate'
import { partitionedWrite } from './05-partitioned-write'
import { ingest } from './06-ingest'
import { enrich } from './07-enrich'
import { window } from './08-window'
import { realTimeView } from './09-real-time-view'
import { serving } from './10-serving'
import { deploy } from './11-deploy'
import { tune } from './12-tune'
import { closer } from './13-closer'

// capstone — "Everything, end to end": one project that puts every concept from the four courses to
// work — a Lambda-architecture analytics pipeline over an e-commerce clickstream, built as a batch
// layer (nightly DataFrame job, LEFT) and a speed layer (Structured Streaming, RIGHT), merged for
// serving, then deployed and tuned on a cluster. The two bookends (the-plan, closer) ride the
// `lambda-arch` map; each of the 11 build sections shows its stage's CODE scene on the LEFT (an IDE
// code card — see scenes/capstone/code-scenes) with the prose + an "Exercises: <concept>" tag on the
// right. Practical gaps (data sources, partitioning, broadcast joins, deploy/ops, AQE) are taught
// inline here. Batch built first (LEFT), then speed (RIGHT), then serving, then run/tune.
//
// COMPLETE — all 13 sections: the-plan → BATCH (read-lake · clean · batch-aggregate ·
// partitioned-write) → SPEED (ingest · enrich · window · real-time-view) → serving → deploy → tune →
// closer. All on the one `lambda-arch` map; each build section's slide carries its stage code + an
// "Exercises: <concept>" tag. Batch built first (LEFT), then speed (RIGHT), then serving/run/tune.
export const capstone: Course = {
  id: 'capstone',
  title: 'Capstone: an end-to-end pipeline',
  sections: [
    thePlan,
    readLake,
    clean,
    batchAggregate,
    partitionedWrite,
    ingest,
    enrich,
    window,
    realTimeView,
    serving,
    deploy,
    tune,
    closer,
  ],
}
