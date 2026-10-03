import type { Scene } from '@graphlearning/flow'

export const thePartition: Scene = {
  id: 'rdd-partition',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'split',
      label: 'One logical collection, many physical pieces',
      pattern: 'storage',
      sub: 'you write code against the whole thing; Spark runs it once per partition, in parallel',
      cols: 3,
      children: [
        { id: 'pa', icon: 'layers', label: 'partition 0', pattern: 'storage', sub: 'on host A' },
        { id: 'pb', icon: 'layers', label: 'partition 1', pattern: 'storage', sub: 'on host B' },
        { id: 'pc', icon: 'layers', label: 'partition 2', pattern: 'storage', sub: 'on host C' },
      ],
    },
    {
      id: 'ceiling',
      framed: true,
      label: 'min(partitions, slots)',
      pattern: 'warn',
      icon: 'ruler',
      sub: '1000 partitions on 4 cores is still 4 at a time',
    },
    {
      id: 'where',
      label: 'Where the count comes from',
      pattern: 'network',
      sub: 'nobody sets this once — it changes at every read and at every shuffle, and both defaults are guesses',
      cols: 3,
      children: [
        { id: 'w-read', icon: 'file', label: 'on read', pattern: 'network', sub: 'file size ÷ maxPartitionBytes (128 MB)' },
        { id: 'w-shuffle', icon: 'swap', label: 'after a shuffle', pattern: 'network', sub: 'spark.sql.shuffle.partitions (200)' },
        { id: 'w-manual', icon: 'pencil', label: 'when you say so', pattern: 'network', sub: 'repartition · coalesce' },
      ],
    },
  ],
  edges: [
    { source: 'split', target: 'ceiling' },
    { source: 'ceiling', target: 'where' },
  ],
}
