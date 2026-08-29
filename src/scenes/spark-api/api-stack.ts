import type { Scene } from '../../render-engine'

// api-stack — the SPINE of the spark-api course ("The layers you write against"). A top-to-bottom
// STACK of altitudes: the higher a band sits, the higher-level and more declarative the thing you
// write; the lower, the closer to the physical core. The vertical read is the course's thesis —
// every structured query compiles DOWN through the engine to RDDs, the same core the
// spark-architecture course runs across.
//
//   Libraries        Structured Streaming · MLlib · GraphX   the workloads (teaser band)
//   Structured APIs  DataFrame · Dataset[T] · Spark SQL      what you write (declarative)
//   The Engine       Catalyst optimizer → Tungsten codegen   plans + compiles your query
//   RDD              resilient · partitioned · physical       the low-level core it runs on
//
// Shared by the two whole-stack bookends — overview (opener) and unification (closer). The three
// band deep-dives (rdd-foundation, structured-apis, the-engine) each ride their own focused scene;
// the engine band is unpacked in full by the sibling `catalyst` scene. The top Libraries band is a
// teaser — lit only in the bookends, never its own taught section (each is a future course). Spark
// SQL is deliberately NOT repeated up top: it IS the structured layer, not a library on the engine.
// Minimal representative edges (one wire per hop) so the tight bands don't hide wire labels.
export const apiStack: Scene = {
  id: 'api-stack',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'libs',
      label: 'Libraries — the workloads you build',
      pattern: 'group',
      sub: 'each is its own course',
      cols: 3,
      children: [
        { id: 'lib-streaming', label: 'Structured Streaming', pattern: 'external', icon: 'waves', sub: 'unbounded data' },
        { id: 'lib-mllib', label: 'MLlib', pattern: 'external', icon: 'brain', sub: 'machine learning' },
        { id: 'lib-graphx', label: 'GraphX / GraphFrames', pattern: 'external', icon: 'gitbranch', sub: 'graphs' },
      ],
    },
    {
      id: 'sa',
      label: 'Structured APIs — what you write',
      pattern: 'service',
      sub: 'declare what you want',
      cols: 3,
      children: [
        { id: 'sa-dataframe', label: 'DataFrame', pattern: 'service', icon: 'braces', sub: 'table of Rows · untyped cols' },
        { id: 'sa-dataset', label: 'Dataset[T]', pattern: 'service', icon: 'layers', sub: 'typed JVM objects' },
        { id: 'sa-sql', label: 'Spark SQL', pattern: 'service', icon: 'terminal', sub: 'SQL text · catalog · views' },
      ],
    },
    {
      id: 'eng',
      label: 'The engine — plans & compiles your query',
      pattern: 'service',
      icon: 'brain',
      sub: 'what → how',
      flow: 'LR',
      children: [
        { id: 'eng-catalyst', label: 'Catalyst', pattern: 'user', icon: 'brain', sub: 'query optimizer' },
        { id: 'eng-tungsten', label: 'Tungsten', pattern: 'storage', icon: 'memory', sub: 'codegen · off-heap' },
      ],
      edges: [{ source: 'eng-catalyst', target: 'eng-tungsten' }],
    },
    {
      id: 'rdd',
      label: 'RDD — the low-level core',
      pattern: 'storage',
      icon: 'layers',
      sub: 'everything compiles down to this',
      cols: 3,
      children: [
        { id: 'rdd-resilient', label: 'resilient', pattern: 'storage', icon: 'shieldcheck', sub: 'lineage · fault-tolerant' },
        { id: 'rdd-partitioned', label: 'partitioned', pattern: 'storage', icon: 'layers', sub: 'a distributed collection' },
        { id: 'rdd-physical', label: 'the physical layer', pattern: 'external', icon: 'server', sub: 'what everything runs on' },
      ],
    },
  ],
  edges: [
    { source: 'libs', target: 'sa' },
    { source: 'sa', target: 'eng' },
    { source: 'eng', target: 'rdd', label: 'compiles down to RDDs' },
  ],
}
