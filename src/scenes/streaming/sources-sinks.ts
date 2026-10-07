import type { Scene } from '@graphlearning/flow'

// §3 sources-sinks — a reference table, but organised around the property that actually decides
// whether your pipeline is correct rather than around the list of connectors. A source must be
// REPLAYABLE for recovery to work at all, and a sink must be IDEMPOTENT for exactly-once to mean
// anything. Those two columns are the content; the names are just rows.
//
// The warning card is the one that costs people a weekend: end-to-end exactly-once is a property of
// the SINK, not something Spark can give you. Spark guarantees it will replay correctly; whether
// that replay duplicates your output is between you and where you are writing.
export const sourcesSinks: Scene = {
  id: 'sources-sinks',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'sources',
      kind: 'table',
      label: 'Sources — the only question that matters is whether it can be REPLAYED',
      sub: 'recovery means re-reading from a stored offset; a source that cannot do that cannot recover',
      pattern: 'storage',
      headers: ['Source', 'Replayable?', 'Notes'],
      values: [
        ['Kafka', 'yes, by offset', 'the production default'],
        ['Files on a lake', 'yes, by file list', 'watch the listing cost at scale'],
        ['Rate', 'yes — it is synthetic', 'for testing only'],
        ['Socket', 'NO', 'demos only; never production'],
      ],
    },
    {
      id: 'sinks',
      kind: 'table',
      label: 'Sinks — the only question is whether writing twice is harmless',
      pattern: 'service',
      headers: ['Sink', 'Idempotent?', 'Gives you'],
      values: [
        ['Delta / Iceberg', 'yes, transactional', 'genuine exactly-once'],
        ['Files (parquet)', 'yes, via the write log', 'exactly-once'],
        ['Kafka', 'at-least-once by default', 'dedupe downstream on a key'],
        ['foreachBatch', 'whatever you write', 'your problem entirely'],
      ],
    },
    { id: 'e2e', label: 'Exactly-once is the SINK', pattern: 'warn', icon: 'shieldcheck', sub: 'Spark replays; duplicates are yours' },
  ],
  edges: [
    { source: 'sources', target: 'sinks' },
    { source: 'sinks', target: 'e2e', label: 'Spark promises a correct replay — whether that replay duplicates output is a sink property' },
  ],
}
