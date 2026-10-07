import type { Scene } from '@graphlearning/flow'

// §8 exchange — the payoff of §7 for someone reading a plan: the word Exchange IS the shuffle, and
// counting them counts the stages. The plan is a code card because a plan is text, and the reader
// has to practise on real output rather than on a drawing of it.
//
// The band below names the three Exchange flavours, because the partitioning spelled after the word
// tells you WHY it shuffled — and "why did this shuffle" is the question the rest of chapter 6 is
// about answering.
export const exchange: Scene = {
  id: 'exchange',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'plan',
      kind: 'code',
      hug: true,
      filename: 'physical plan — two Exchanges, so three stages',
      label: [
        '*(3) SortMergeJoin [customer_id], Inner',
        ':- *(1) Sort [customer_id ASC]',
        ':  +- Exchange hashpartitioning(customer_id, 200)   <-- 1',
        ':     +- FileScan parquet orders',
        '+- *(2) Sort [customer_id ASC]',
        '   +- Exchange hashpartitioning(customer_id, 200)   <-- 2',
        '      +- FileScan parquet customers',
      ].join('\n'),
    },
    {
      id: 'kinds',
      label: 'The partitioning after the word tells you WHY it shuffled',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'k-hash', label: 'hashpartitioning', variant: 'tile', pattern: 'network', icon: 'hash', sub: 'a join or a groupBy key' },
        { id: 'k-range', label: 'rangepartitioning', variant: 'tile', pattern: 'network', icon: 'sortarrows', sub: 'a global orderBy' },
        { id: 'k-single', label: 'SinglePartition', variant: 'tile', pattern: 'warn', icon: 'skull', sub: 'everything onto ONE task' },
      ],
    },
    { id: 'rule', label: 'Count the Exchanges', pattern: 'storage', icon: 'sigma', sub: 'that is your stage count, minus one' },
  ],
  edges: [
    { source: 'plan', target: 'kinds', label: 'chapter 2 said a shuffle cuts a stage — Exchange is where you SEE the cut' },
    { source: 'kinds', target: 'rule' },
  ],
}
