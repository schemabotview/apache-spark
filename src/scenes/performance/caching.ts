import type { Scene } from '@graphlearning/flow'

// §4 caching — the most over-applied tool in Spark, so the scene leads with the test rather than the
// mechanism. One read means caching is pure cost: you pay to materialise something you then use once.
//
// The storage-level table matters because `cache()` is not neutral — it is an alias for
// MEMORY_AND_DISK, and knowing that explains the behaviour people find mysterious (a cached DataFrame
// that got slower is one that spilled).
export const caching: Scene = {
  id: 'caching',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'test',
      label: 'The only question worth asking first',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 't-once', label: 'Read once?', variant: 'tile', pattern: 'warn', icon: 'ban', sub: 'caching is pure cost' },
        { id: 't-twice', label: 'Read twice or more?', variant: 'tile', pattern: 'service', icon: 'circlecheck', sub: 'now it can pay' },
        { id: 't-iter', label: 'Read in a loop?', variant: 'tile', pattern: 'service', icon: 'repeat', sub: 'cache, always' },
      ],
    },
    {
      id: 'levels',
      kind: 'table',
      label: 'cache() is not neutral — it is an alias',
      sub: 'knowing which one explains the cached DataFrame that got SLOWER',
      pattern: 'storage',
      headers: ['Level', 'What it does'],
      values: [
        ['MEMORY_AND_DISK', 'cache() means this — spills to disk when short'],
        ['MEMORY_ONLY', 'drops partitions instead of spilling; recomputes them'],
        ['MEMORY_AND_DISK_SER', 'serialised: smaller, costs CPU to read back'],
        ['DISK_ONLY', 'when recomputing is dearer than reading disk'],
      ],
    },
    { id: 'unpersist', label: 'And unpersist it', pattern: 'warn', icon: 'trash', sub: 'cached data evicts other cached data' },
  ],
  edges: [
    { source: 'test', target: 'levels', label: 'remember lineage: without a cache, every action recomputes the whole branch' },
    { source: 'levels', target: 'unpersist' },
  ],
}
