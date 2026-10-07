import type { Section } from '../types'

export const theEcosystem: Section = {
  id: 'the-ecosystem',
  title: 'The stack, and where this goes',
  scene: 'spark-stack',
  slide: `## The stack, and where this goes

Spark is one engine with libraries standing on it — not a bundle of separate tools.

### Core, and the four libraries over it
- **Core** — RDDs, the DAG scheduler, memory management, the shuffle
- **Spark SQL** — DataFrames and SQL; in practice, what you will write
- **Structured Streaming** — the same API over an unbounded table
- **MLlib** — ML pipelines · **GraphX** — graph algorithms
- All four compile down to the same stages and the same shuffle

### What Spark deliberately does not own
- **Languages** · **Schedulers** (YARN, Kubernetes) · **Storage** (S3, Delta, Iceberg)
- The engine in the middle, borrowing from both ends

### Where it earns its place
- Large-scale **ETL/ELT** above all; then lake analytics, ML pipelines, streams`,
  narration:
    'Let us put Spark together as a thing you would actually install, because the shape of it tells you where everything in the rest of this course lives. At the bottom is Spark Core. Core owns the RDD — the low-level distributed collection everything is ultimately made of — along with the DAG scheduler, memory management, and the shuffle. It is the engine. Standing on top of it are four libraries, and the important word is standing: they are not siblings of the core, they are built over it. Spark SQL gives you DataFrames and actual SQL, and in practice this is what you will write almost all of the time. Structured Streaming gives you the same API over data that never ends, by treating a stream as a table with rows still arriving. MLlib gives you machine learning pipelines that run across the cluster. GraphX handles graph algorithms. Because all four compile down to the same core, they end up as the same stages and the same shuffle — which means they optimise alike, they fail alike, and they compose in one program. A single job can read a stream, join it against a table with SQL, and score it with a model. Now, what Spark deliberately does not own is just as informative. It does not own the language: you can write Python, Scala, Java, SQL or R. It does not own the cluster: YARN, Kubernetes, or its own standalone manager will schedule it. And it does not own the storage: it reads and writes S3, HDFS, ADLS, and table formats like Delta, Iceberg and Hudi. Spark is the engine in the middle, and it borrows from both ends — which is why it survived the move from on-premise Hadoop to cloud object storage that killed most of its contemporaries. As for where it actually earns its place: the overwhelming majority of real Spark in production is large-scale ETL and ELT — taking messy data in volume and turning it into clean, queryable tables. Beyond that, analytics over data lakes, feature pipelines for machine learning, and near-real-time stream processing. And that closes this chapter. You should now be able to answer the question we opened with: why does Spark exist? Because data outgrew single machines, scaling out moved partitioning, coordination and failure onto whoever wrote the code, MapReduce took that burden back but made every step round-trip through disk, and Spark kept the burden-taking while removing the round-trip — then generalised the result into one engine. What you cannot do yet is predict what Spark will DO with a program you give it. That is the next chapter: the driver, the executors, and how your code becomes jobs, stages and tasks.',
}
