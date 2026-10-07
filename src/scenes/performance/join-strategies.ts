import type { Scene } from '@graphlearning/flow'

// §3 join-strategies — chapter 5 §4 explained HOW Spark chooses; this is how to make it choose
// better. The table is a decision aid rather than a description, so its last column is the action.
//
// The code card is the point of the section: `broadcast()` is a hint you can give when you know
// something the statistics do not, and the threshold is the knob behind it. Both are small, and
// between them they are the single highest-leverage join change available.
export const joinStrategies: Scene = {
  id: 'join-strategies',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'pick',
      kind: 'table',
      label: 'Which strategy wins, and what to do about it',
      sub: 'broadcast is the only one with no shuffle — always ask for it first',
      pattern: 'service',
      headers: ['Strategy', 'Wins when', 'How to get it'],
      values: [
        ['Broadcast hash', 'one side fits in executor memory', 'F.broadcast(), or raise the threshold'],
        ['Sort-merge', 'both sides large', 'the default — nothing to do'],
        ['Shuffle hash', 'one side much smaller, still big', 'rarely chosen; usually leave it'],
        ['Bucketed join', 'both tables pre-bucketed on the key', 'bucketBy at WRITE time'],
      ],
    },
    {
      id: 'code',
      kind: 'code',
      hug: true,
      filename: 'joins.py',
      label: [
        '# tell Spark what the statistics did not',
        'big.join(F.broadcast(small), "customer_id")',
        '',
        '# or raise the bar — default is 10 MB',
        'spark.conf.set("spark.sql.autoBroadcastJoinThreshold",',
        '               200 * 1024 * 1024)',
      ].join('\n'),
    },
    { id: 'care', label: 'It has a ceiling', pattern: 'warn', icon: 'skull', sub: 'the driver collects it first' },
  ],
  edges: [
    { source: 'pick', target: 'code', label: 'a filtered dimension table is often broadcastable even when the raw table is not' },
    { source: 'code', target: 'care', label: 'too big and the DRIVER runs out of memory, not the executors' },
  ],
}
