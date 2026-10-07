import type { Section } from '../types'

export const dataframes: Section = {
  id: 'dataframes',
  title: 'DataFrames and schemas',
  scene: 'dataframe-schema',
  slide: `## DataFrames and schemas

A DataFrame is a **schema over partitioned rows** — named columns with real types, known before a byte is read.

### What changes when the engine knows your types
- **Catalyst can optimise** — reorder filters, prune columns, push work into the read
- **Memory gets compact** — typed columnar buffers instead of JVM objects (Tungsten)
- **Python stops being slow** — your \`filter\` is an expression the JVM runs, not a Python callback

### That last one is worth sitting with
- With RDDs, Python pays to move every row out of the JVM and back for each lambda
- With DataFrames you *describe* the work, so Python and Scala run identically fast

### Still RDDs underneath
- A DataFrame compiles down to the partitions, stages and tasks of chapter 2
- You did not leave that model — you stopped hand-writing it`,
  narration:
    'So let us go up a level, to the API you will write ninety-nine percent of the time. A DataFrame is a schema over partitioned rows. Underneath, it is still a distributed collection split into partitions, exactly like an RDD. The difference is that Spark knows the shape: named columns with real types, known before a single byte is read from disk. Look at the schema on the board — order id is a bigint, country is a string, total is a decimal, placed at is a timestamp. That looks like a small, boring thing. It is the most important change in Spark\'s history, and three large consequences follow from it. The first: Catalyst can optimise your query. We will spend all of chapter five on this, but the headline is that because Spark knows what your operations mean, it can rewrite them — reorder your filters so they happen earlier, prune columns you never reference, push work down into the file read itself. With an RDD, your logic is a lambda — an opaque function Spark can only call, never inspect. There is nothing to optimise. The second: memory gets dramatically more compact. Spark stores DataFrame data in typed columnar buffers, the Tungsten format, rather than as JVM objects. A row of five fields as JVM objects carries object headers and pointers and is several times larger than the data it holds. Columnar typed storage removes all of that. The third consequence is the one that surprises Python users, and it is worth being precise about. With RDDs, Python is genuinely slow — every row has to be serialised out of the JVM into a Python process for your lambda and come back again, millions of times. With DataFrames, you are not passing a Python function at all. You are describing an operation, and that description gets compiled and executed inside the JVM. Your Python code built a plan and then stepped out of the way. So PySpark and Scala Spark run identically fast, as long as you stay in the DataFrame API. Last point, and it ties the chapter together: a DataFrame compiles down to exactly the partitions, stages and tasks from chapter two. You have not left that model. You have stopped hand-writing it.',
}
