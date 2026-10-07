import type { Scene } from '@graphlearning/flow'

// §1 what-vs-how — the chapter opens on the distinction everything else hangs off, and the only
// honest way to make it is to show the SAME query in both forms. Two code cards STACKED, which is
// chapter 3 §6's lesson: a vertical pair is taller than it is wide, fitView binds on height, and the
// text comes out large enough to actually read. Side by side they would be unreadable, and a reader
// who cannot read both plans has been shown nothing.
//
// The two outputs are deliberately the same query. Every difference between them is Catalyst, and
// the rest of the chapter is an explanation of one of those differences.
export const whatVsHow: Scene = {
  id: 'what-vs-how',
  padding: 0.1,
  flow: 'TB',
  nodes: [
    {
      id: 'both',
      label: 'One query, two plans — and everything between them is Catalyst',
      pattern: 'group',
      icon: 'none',
      cols: 1,
      align: 'start',
      children: [
        {
          id: 'logical',
          kind: 'code',
          hug: true,
          filename: 'logical plan — WHAT you asked for',
          label: [
            'Aggregate [country], [sum(total) AS rev]',
            '+- Filter (total > 100)',
            '   +- Relation [order_id, country, total] parquet',
          ].join('\n'),
        },
        {
          id: 'physical',
          kind: 'code',
          hug: true,
          filename: 'physical plan — HOW Spark will do it',
          label: [
            '*(2) HashAggregate [country], [sum(total)]',
            '+- Exchange hashpartitioning(country, 200)',
            '   +- *(1) HashAggregate [country], [partial_sum(total)]',
            '      +- *(1) ColumnarToRow',
            '         +- FileScan parquet [country,total]',
            '            PushedFilters: [GreaterThan(total,100)]',
          ].join('\n'),
        },
      ],
    },
    { id: 'gap', label: 'Three lines became six', pattern: 'service', icon: 'brain', sub: 'and none of it was your idea' },
  ],
  edges: [
    { source: 'both', target: 'gap', label: 'the filter moved INTO the scan, and the aggregate split in two' },
  ],
}
