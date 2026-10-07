import type { Scene } from '@graphlearning/flow'

// §6 nested-data — real source data is nested, and the single most useful fact is that a struct is
// FREE while an array is not: selecting one field of a struct is column pruning and costs nothing,
// while exploding an array multiplies your row count before anything else happens.
//
// The schema table shows real nested types because that is what a reader will see in `printSchema`
// and fail to parse. The band is the four verbs they will actually need.
export const nestedData: Scene = {
  id: 'nested-data',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'schema',
      kind: 'table',
      label: 'What a real source schema looks like',
      sub: 'a struct is a nested record; an array is many of them',
      pattern: 'storage',
      columns: [
        { name: 'order_id', type: 'bigint', key: 'PK' },
        { name: 'placed_at', type: 'timestamp' },
        { name: 'customer', type: 'struct<id:long,city:string>' },
        { name: 'items', type: 'array<struct<sku:string,qty:int>>' },
        { name: 'tags', type: 'map<string,string>' },
      ],
    },
    {
      id: 'verbs',
      label: 'Four verbs, and only one of them changes your row count',
      pattern: 'group',
      icon: 'none',
      cols: 4,
      children: [
        { id: 'v-dot', label: 'customer.city', variant: 'tile', pattern: 'service', icon: 'braces', sub: 'free — it prunes' },
        { id: 'v-explode', label: 'explode(items)', variant: 'tile', pattern: 'warn', icon: 'copy', sub: 'one row per element' },
        { id: 'v-struct', label: 'struct(...)', variant: 'tile', pattern: 'service', icon: 'package', sub: 'nest it back up' },
        { id: 'v-date', label: 'date_trunc', variant: 'tile', pattern: 'network', icon: 'calendar', sub: 'and year, datediff' },
      ],
    },
    { id: 'cost', label: 'explode multiplies', pattern: 'warn', icon: 'skull', sub: '1 order, 8 items = 8 rows' },
  ],
  edges: [
    { source: 'schema', target: 'verbs', label: 'dot into a struct and Spark reads only that field off disk' },
    { source: 'verbs', target: 'cost', label: 'aggregate AFTER exploding, or filter the array before you do' },
  ],
}
