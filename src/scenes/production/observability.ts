import type { Scene } from '@graphlearning/flow'

// §4 observability — three layers, separated by WHEN you can use them, which is the distinction
// people lack. The Spark UI is gone the moment the application ends, and that is the single most
// common reason a production failure cannot be diagnosed: nobody enabled the event log, so there is
// nothing left to look at.
//
// The code card is a real test rather than a description of testing, because chapter 4 §9 already
// argued for pure transforms and this is the payoff: three lines, no cluster, no fixtures.
export const observability: Scene = {
  id: 'observability',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'layers',
      label: 'Three layers, and what separates them is WHEN you can use them',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'o-ui', label: 'Spark UI', variant: 'tile', pattern: 'service', icon: 'monitor', sub: 'while it runs — then gone' },
        { id: 'o-hist', label: 'History server', variant: 'tile', pattern: 'storage', icon: 'history', sub: 'after, from the event log' },
        { id: 'o-metrics', label: 'Metrics sink', variant: 'tile', pattern: 'network', icon: 'gauge', sub: 'continuously, across runs' },
      ],
    },
    {
      id: 'test',
      kind: 'code',
      hug: true,
      filename: 'test_transform.py',
      label: [
        '# chapter 4 said keep transforms pure. This is the payoff.',
        'def test_big_orders(spark):',
        '    df = spark.createDataFrame(',
        '        [(1, 50), (2, 5000)], "id int, total int")',
        '    assert big_orders(df, 100).count() == 1',
        '',
        '# no cluster, no fixture files, no mocks, runs in a second',
      ].join('\n'),
    },
    { id: 'log', label: 'Turn the event log ON', pattern: 'warn', icon: 'scroll', sub: 'or a failed run leaves nothing to read' },
  ],
  edges: [
    { source: 'layers', target: 'test', label: 'and test the logic as ordinary functions, so the cluster is never your unit-test harness' },
    { source: 'test', target: 'log' },
  ],
}
