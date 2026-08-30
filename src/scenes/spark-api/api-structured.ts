import type { Scene } from '../../render-engine'

// api-structured — the focused STRUCTURED-APIs band, the heart of the course. The move that changes
// everything: give your data a SCHEMA (named, typed columns) and Spark stops seeing opaque lambdas
// and starts seeing intent — which is what finally lets it optimize for you. Three front-ends, all
// the same engine wearing different faces: DataFrame (a distributed table of Rows, untyped columns
// checked at runtime, the universal API across Python/Scala/Java/R); Dataset[T] (DataFrame plus
// compile-time type safety via encoders, JVM-only — and in fact DataFrame = Dataset[Row]); Spark
// SQL (the same engine driven by ANSI SQL text over catalog tables & views). The funnel schema →
// [three faces] → one optimized plan carries the thesis: whichever you pick compiles to the same
// plan, because now Spark understands what you want.
export const apiStructured: Scene = {
  id: 'api-structured',
  padding: 0.15,
  flow: 'TB',
  nodes: [
    // Sub trimmed to two lines — the long form wrapped to four and spilled out of the 210×96 card.
    // "Spark sees intent, not lambdas" is the slide's opening line, so the scene just needs the hook.
    { id: 'schema', label: 'give your data a schema', pattern: 'network', icon: 'braces', sub: 'named, typed columns → intent' },
    {
      id: 'sa',
      label: 'Structured APIs — same engine, three faces',
      pattern: 'group',
      sub: 'declare what you want',
      cols: 3,
      children: [
        { id: 'sa-dataframe', label: 'DataFrame', pattern: 'service', icon: 'database', sub: 'table of Rows · untyped cols · Python/Scala/Java/R' },
        { id: 'sa-dataset', label: 'Dataset[T]', pattern: 'service', icon: 'layers', sub: 'typed JVM objects · encoders · JVM-only' },
        { id: 'sa-sql', label: 'Spark SQL', pattern: 'service', icon: 'terminal', sub: 'ANSI SQL text · catalog · views' },
      ],
    },
    { id: 'plan', label: 'one optimized plan', pattern: 'service', icon: 'gears', sub: 'same engine, same speed — whichever face you chose' },
  ],
  edges: [
    { source: 'schema', target: 'sa' },
    { source: 'sa', target: 'plan', label: 'all compile to' },
  ],
}
