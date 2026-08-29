import type { Scene } from '../../render-engine'

// stream-sources — the focused SOURCES band. A source is what appends rows to the input table.
// Spark ships four: Kafka (the replayable, partitioned workhorse for production), files (a directory
// Spark watches — each new file arrives as a batch), socket (a raw TCP text stream — demos only, not
// fault-tolerant), and rate (a synthetic N-rows/sec source for benchmarks). The property that ties
// the real ones together is the OFFSET — a marker of how far Spark has read; it records offsets in
// the checkpoint each trigger, so after a crash it resumes from exactly there, nothing lost. That
// replayability (offsets → checkpoint → resume) is why Kafka/files are fault-tolerant and socket
// isn't — and it's the input half of the exactly-once guarantee.
export const streamSources: Scene = {
  id: 'stream-sources',
  padding: 0.15,
  flow: 'LR',
  nodes: [
    {
      id: 'sources',
      label: 'Sources — append rows to the input table',
      pattern: 'storage',
      icon: 'database',
      sub: 'where the rows come from',
      children: [
        { id: 'src-kafka', label: 'Kafka', pattern: 'external', icon: 'waves', sub: 'production · replayable' },
        { id: 'src-files', label: 'files', pattern: 'external', icon: 'scroll', sub: 'dir watch · each file a batch' },
        { id: 'src-socket', label: 'socket', pattern: 'external', icon: 'router', sub: 'TCP · demo · not fault-tolerant' },
        { id: 'src-rate', label: 'rate', pattern: 'external', icon: 'clock', sub: 'synthetic · benchmarks' },
      ],
    },
    {
      id: 'offsets-band',
      label: 'Offsets = replayable progress',
      pattern: 'group',
      sub: 'survive a crash, lose no rows',
      flow: 'TB',
      children: [
        { id: 'offsets', label: 'offsets', pattern: 'service', icon: 'tag', sub: 'how far it has read' },
        { id: 'checkpoint', label: 'checkpoint', pattern: 'storage', icon: 'database', sub: 'offsets recorded each trigger' },
        { id: 'resume', label: 'resume after crash', pattern: 'service', icon: 'repeat', sub: 'restart from last offset · no rows lost' },
      ],
      edges: [
        { source: 'offsets', target: 'checkpoint' },
        { source: 'checkpoint', target: 'resume' },
      ],
    },
  ],
  edges: [{ source: 'sources', target: 'offsets-band', label: 'each exposes offsets' }],
}
