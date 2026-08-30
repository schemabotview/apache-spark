import type { Section } from '../types'

export const structuredApis: Section = {
  id: 'structured-apis',
  title: 'The Structured APIs',
  scene: 'api-structured',
  slide: `## The Structured APIs

One layer up: give your data a **schema**, and Spark can finally *see* — and optimize — what you’re doing.

### DataFrame — the workhorse
- A **table of Rows** with a named **schema** — like a SQL or pandas table
- **Untyped** columns — names and types checked at *runtime*
- The universal API — same in **Python, Scala, Java, R**

### Dataset[T] — DataFrame with types
- DataFrame **plus compile-time type safety** — \`Dataset[Person]\`, not rows
- **Encoders** map JVM objects ↔ Spark’s compact internal format
- **JVM-only** (Scala / Java); in fact \`DataFrame = Dataset[Row]\`

### Spark SQL — the same engine, as text
- The **same engine**, driven by **ANSI SQL** strings instead of code
- Query **tables & views** in the **catalog**

All three compile to the **same optimized plan** — because now Spark sees your *intent*.`,
  narration:
    'Now we climb up from that RDD floor to the layer you actually write against — the structured APIs — and this is the heart of the whole course. The move that changes everything is simple: you give your data a schema — named columns with types. The moment you do that, Spark stops seeing opaque lambdas and starts seeing intent, which is what finally lets it optimize your work for you. There are three ways in, and they’re all the same engine wearing different faces. The first and most common is the DataFrame: think of it as a distributed table of rows with a named schema, much like a SQL table or a pandas DataFrame. Its columns are untyped, meaning the names and types are checked at runtime rather than by the compiler, and it’s the universal API — it looks the same whether you write Python, Scala, Java, or R. The second is the Dataset, which is a DataFrame plus compile-time type safety: instead of generic rows you get typed objects, a Dataset of Person, so the compiler catches your mistakes before the job ever runs. Spark uses things called encoders to translate those JVM objects to and from its own compact internal format. The catch is that Datasets are JVM-only — Scala and Java — and in fact, under the hood, a DataFrame is just a Dataset of Row, the untyped special case. The third face is Spark SQL: the very same engine, but driven by plain ANSI SQL text instead of code. You register tables and views in a catalog and query them with ordinary SQL, and you can freely mix SQL and DataFrame calls in one program. So there are three front-ends here, but only one shared truth underneath: whichever you pick, it compiles down to the exact same optimized plan — because now, at last, Spark understands what you’re trying to do. And that plan is built by the engine sitting just below, which is where we go next.',
}
