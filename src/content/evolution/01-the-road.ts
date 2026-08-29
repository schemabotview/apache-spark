import type { Section } from '../types'

export const theRoad: Section = {
  id: 'the-road',
  title: 'The road to Spark',
  scene: 'evo-overview',
  slide: `## The road to Spark

From one problem to one unified engine — **2006 → 2016**.

### The problem
- **Big data** — datasets outgrew a single machine; the only affordable path was to **scale out** across a cluster of commodity boxes

### Four leaps — each fixes the limit of the one before
- **Hadoop 1** · 2006 — *store & compute at scale*
  - HDFS blocks · MapReduce · one JobTracker
- **Hadoop 2 / YARN** · 2013 — *free the scheduler*
  - ResourceManager · ApplicationMaster · many engines
- **Spark 1** · 2014 — *bring it in-memory*
  - Driver · RDDs · DAG scheduler · 10–100× faster
- **Spark 2** · 2016 — *unify the API*
  - DataFrames · Catalyst · Tungsten · one engine for all

We'll walk it top to bottom, one era at a time.`,
  narration:
    "Before we build anything, here's the whole road at a glance. It starts with one problem — by the mid-2000s, data had outgrown any single machine, so the only affordable path was to scale out across a cluster. Then come four leaps, each fixing the limit of the one before. Hadoop 1 learned to store and compute at scale, with HDFS, MapReduce, and a single JobTracker. Hadoop 2 freed the scheduler — YARN split resource management out with a ResourceManager, per-job ApplicationMasters, and room for many engines. Spark 1 brought it all in-memory — a Driver building RDDs on a DAG scheduler, ten to a hundred times faster. And Spark 2 unified the API — DataFrames, the Catalyst optimizer, and Tungsten, one engine for batch, SQL, ML, and streaming. We'll walk it top to bottom, one era at a time.",
}
