import type { Section } from '../types'

export const whySpark: Section = {
  id: 'why-spark',
  title: 'What Spark actually changed',
  scene: 'spark-answer',
  focus: 'an-mem',
  slide: `## What Spark actually changed

Four design decisions — one per MapReduce refusal, in the same order.

### Keep data in memory between steps
- Ten passes over a cached dataset read it from disk **once**, not ten times

### Plan the whole computation, not one step
- You describe the *result*; Spark builds a **DAG** of the job before running any of it
- Seeing the whole picture lets it fuse steps and skip work nobody asked for

### Recover by lineage, not replication
- Memory is volatile, and replicating it in RAM would cost back all the speed
- Spark records *how each partition was derived*, so a lost one is **recomputed**
- The clever decision: this is what made in-memory **safe**

### One engine, not four
- SQL, streaming, ML and graphs are **libraries over the same core** — so they compose`,
  narration:
    'So Spark arrives with four design decisions, and the clean way to learn them is as four replies to the four complaints we just made, in the same order. The first and most famous: keep data in memory between steps. If the next step can read its input from RAM instead of from the filesystem, then the iterative case stops paying for disk on every pass. Ten passes over a dataset you have cached read it from disk once. This is where the early benchmark numbers came from, and it is the headline — but on its own it would not have been enough. The second: plan the whole computation rather than one step at a time. In MapReduce you submit a job, it finishes, you submit the next. In Spark you describe the result you want, and Spark builds a complete graph — a DAG, a directed acyclic graph — of every step, before it executes any of them. Because it can see the whole thing, it can make decisions no single-job system could: fusing several operations so a record is touched once, reordering filters to happen earlier, and skipping work whose output nobody ever asked for. Chapter five is entirely about what it does with that picture. The third decision is the clever one, and it is the one people skip. Memory is volatile. If you are keeping intermediate results in RAM across a thousand machines, then a machine dying loses real work — and the obvious fix, replicating everything in memory, would cost you most of the speed you just bought. Spark does something better. It does not store the data redundantly; it records how each partition was DERIVED — which dataset it came from and which operations produced it. That record is called lineage. When a partition is lost, Spark looks at the lineage and recomputes just that partition from its parent. Nothing else is affected, nothing was replicated, and that is what made keeping things in memory a safe idea rather than a reckless one. Fourth: one engine instead of four. Before Spark you would run one system for batch SQL, another for streaming, another for machine learning, each with its own cluster, its own operations and its own idea of a dataset. Spark made SQL, Structured Streaming, MLlib and GraphX libraries over a single core, so they share the same optimizer, the same scheduler, the same shuffle — and they compose, inside one program. And look at the code beside this. That is a complete distributed word count: read, split, group, count, write. The same program in MapReduce is roughly sixty lines of Java. Expressiveness was the fourth complaint, and that is the answer to it. Let us see what that one engine is actually made of.',
}
