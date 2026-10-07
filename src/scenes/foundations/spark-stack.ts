import type { Scene } from '@graphlearning/flow'

// §7 spark-stack — the chapter's bookend, and the only scene that shows Spark as a PRODUCT rather
// than an argument. Nesting carries the one claim that matters: the four libraries sit ON the core,
// they are not siblings of it, which is why a DataFrame and a stream and an ML pipeline all end up
// as the same stages and the same shuffle. A flat band of five would lose exactly that.
//
// The second band is everything Spark does NOT own — languages above, schedulers and storage below.
// Keeping it separate from the stack is the point: Spark is the engine in the middle, and chapter 2
// opens by asking what actually happens when one of those languages submits to one of those
// schedulers. The `next` card is that handoff.
export const sparkStack: Scene = {
  id: 'spark-stack',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'stack',
      label: 'One engine, four libraries standing on it',
      pattern: 'group',
      icon: 'none',
      children: [
        {
          id: 'libs',
          label: 'The libraries — each compiles down to the same core',
          pattern: 'group',
          icon: 'none',
          cols: 4,
          children: [
            { id: 'lb-sql', label: 'Spark SQL', variant: 'tile', pattern: 'service', icon: 'table', sub: 'DataFrames, SQL' },
            { id: 'lb-stream', label: 'Structured Streaming', variant: 'tile', pattern: 'network', icon: 'waves', sub: 'an unbounded table' },
            { id: 'lb-ml', label: 'MLlib', variant: 'tile', pattern: 'service', icon: 'brain', sub: 'pipelines at scale' },
            { id: 'lb-graph', label: 'GraphX', variant: 'tile', pattern: 'network', icon: 'share', sub: 'graph algorithms' },
          ],
        },
        { id: 'core', label: 'Spark Core', pattern: 'service', icon: 'zap', sub: 'RDDs, the scheduler, the shuffle' },
      ],
    },
    {
      id: 'around',
      label: 'What Spark does NOT own — it plugs into all of it',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'ar-lang', label: 'Languages', pattern: 'user', icon: 'code', sub: 'Python, Scala, Java, SQL, R' },
        { id: 'ar-mgr', label: 'Schedulers', pattern: 'network', icon: 'boxes', sub: 'YARN, Kubernetes, standalone' },
        { id: 'ar-store', label: 'Storage', pattern: 'storage', icon: 'database', sub: 'S3, HDFS, Delta, Iceberg' },
      ],
    },
    { id: 'next', label: 'Next', pattern: 'user', icon: 'workflow', sub: 'how one application runs' },
  ],
  edges: [
    { source: 'stack', target: 'around', label: 'one engine in the middle, borrowed from both ends' },
    { source: 'around', target: 'next' },
  ],
}
