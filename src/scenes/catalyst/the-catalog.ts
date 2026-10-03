import type { Scene } from '@graphlearning/flow'

export const theCatalog: Scene = {
  id: 'cat-catalog',
  padding: 0.13,
  flow: 'LR',
  nodes: [
    {
      id: 'catalog',
      label: 'The catalog',
      pattern: 'service',
      icon: 'scroll',
      sub: 'the only thing that knows what a name means',
      cols: 1,
      children: [
        { id: 'c-tables', icon: 'table', label: 'tables and views', pattern: 'network', sub: 'name → location and format' },
        { id: 'c-schema', icon: 'braces', label: 'columns and types', pattern: 'network', sub: 'dest is a string, cnt is a bigint' },
        { id: 'c-fns', icon: 'sigma', label: 'functions', pattern: 'network', sub: 'built-ins, and your UDFs' },
        { id: 'c-stats', icon: 'barchart', label: 'statistics', pattern: 'network', sub: 'row counts and sizes, IF computed' },
      ],
    },
    {
      id: 'sources',
      label: 'Where it comes from',
      pattern: 'network',
      sub: 'a session always has one — in-memory by default, and a shared metastore when tables outlive the session',
      cols: 2,
      children: [
        { id: 's-session', icon: 'terminal', label: 'the session', pattern: 'network', sub: 'temp views, createOrReplaceTempView' },
        { id: 's-meta', icon: 'warehouse', label: 'an external metastore', pattern: 'network', sub: 'Hive, Glue, Unity — shared, durable' },
      ],
    },
    {
      id: 'stats',
      framed: true,
      label: 'Statistics are OPTIONAL',
      pattern: 'warn',
      sub: 'no ANALYZE TABLE → the optimizer is guessing sizes',
    },
  ],
  edges: [
    { source: 'catalog', target: 'sources', label: 'backed by' },
    { source: 'catalog', target: 'stats' },
  ],
}
