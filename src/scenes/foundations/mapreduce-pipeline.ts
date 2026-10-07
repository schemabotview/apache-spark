import type { Scene } from '@graphlearning/flow'

// §5 mapreduce-pipeline — Spark's motivation is unreadable without this scene, so MapReduce is drawn
// sympathetically and completely before it is criticised. Five tiles, because the two on the ENDS
// are the point: a job begins and ends on disk, and that is not an implementation detail, it is the
// contract. Draw only map/shuffle/reduce and the criticism that follows has nothing to stand on.
//
// The warn card is the whole argument in two lines, and the table generalises it: each row is one of
// the four workloads the next decade of data engineering actually wanted, and the model refuses all
// four for the SAME reason.
export const mapreducePipeline: Scene = {
  id: 'mapreduce-pipeline',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'job',
      label: 'One MapReduce job — always exactly this shape',
      pattern: 'group',
      icon: 'none',
      cols: 5,
      children: [
        { id: 'mr-read', label: 'Read', variant: 'tile', pattern: 'storage', icon: 'harddrive', sub: 'from HDFS' },
        { id: 'mr-map', label: 'Map', variant: 'tile', pattern: 'service', icon: 'share', sub: 'per record' },
        { id: 'mr-shuffle', label: 'Shuffle', variant: 'tile', pattern: 'network', icon: 'swap', sub: 'group by key' },
        { id: 'mr-reduce', label: 'Reduce', variant: 'tile', pattern: 'service', icon: 'sigma', sub: 'per key' },
        { id: 'mr-write', label: 'Write', variant: 'tile', pattern: 'storage', icon: 'harddrive', sub: 'back to HDFS' },
      ],
    },
    { id: 'roundtrip', label: 'Ten passes', pattern: 'warn', sub: 'ten disk round-trips' },
    {
      id: 'limits',
      kind: 'table',
      label: 'Four things the model refuses — all for one reason',
      pattern: 'storage',
      headers: ['It struggles with', 'Because'],
      values: [
        ['Iterative algorithms', 'every pass re-reads its input from disk'],
        ['Interactive queries', 'minutes of latency, by design'],
        ['Streaming', 'the model is batch from end to end'],
        ['Anything expressive', 'two primitives, hand-chained into jobs'],
      ],
    },
  ],
  edges: [
    { source: 'job', target: 'roundtrip', label: 'a job\'s output is a FILE — the next job in the chain reads it back in' },
    { source: 'roundtrip', target: 'limits' },
  ],
}
