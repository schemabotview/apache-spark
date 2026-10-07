import type { Scene } from '@graphlearning/flow'

// §8 layout-on-disk — genuine NESTING, because the claim IS containment: a dataset holds partition
// directories and a directory holds files. Drawing it as a flow would say "next", which is wrong —
// and the whole point is that `partitionBy` is a DIRECTORY LAYOUT, not an index. Seeing the folder
// names makes partition pruning obvious: a filter on country reads one folder and skips the others.
//
// The warn card is the cost nobody is warned about until it has already happened. Partitioning on a
// high-cardinality column does not fail; it produces a directory per value and a tiny file inside
// each, and then every later read pays metadata cost on millions of files.
export const layoutOnDisk: Scene = {
  id: 'layout-on-disk',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'dataset',
      label: 'orders/ — written with partitionBy("country")',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      align: 'start',
      children: [
        {
          id: 'd-uk',
          label: 'country=UK',
          pattern: 'storage',
          icon: 'folder',
          cols: 2,
          children: [
            { id: 'uk-1', label: 'part-0', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'uk-2', label: 'part-1', variant: 'chip', pattern: 'storage', icon: 'none' },
          ],
        },
        {
          id: 'd-fr',
          label: 'country=FR',
          pattern: 'storage',
          icon: 'folder',
          cols: 2,
          children: [
            { id: 'fr-1', label: 'part-0', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'fr-2', label: 'part-1', variant: 'chip', pattern: 'storage', icon: 'none' },
          ],
        },
        {
          id: 'd-de',
          label: 'country=DE',
          pattern: 'storage',
          icon: 'folder',
          cols: 2,
          children: [
            { id: 'de-1', label: 'part-0', variant: 'chip', pattern: 'storage', icon: 'none' },
            { id: 'de-2', label: 'part-1', variant: 'chip', pattern: 'storage', icon: 'none' },
          ],
        },
      ],
    },
    {
      id: 'rules',
      kind: 'table',
      label: 'Choosing the partition column',
      sub: 'it is a directory layout, not an index — that is the whole intuition',
      pattern: 'service',
      headers: ['Rule', 'Why'],
      values: [
        ['Partition on what people FILTER by', 'a filter then reads one folder, not all'],
        ['Low cardinality only', 'one directory per distinct value, forever'],
        ['Aim for ~128 MB files', 'the block size everything else assumes'],
        ['Never partition by id or timestamp', 'a folder per row is the usual disaster'],
      ],
    },
    { id: 'small', label: 'The small-file problem', pattern: 'warn', icon: 'skull', sub: 'a million folders, a KB in each' },
  ],
  edges: [
    { source: 'dataset', target: 'rules', label: 'filter on country and Spark never opens the other folders — partition pruning' },
    { source: 'rules', target: 'small' },
  ],
}
