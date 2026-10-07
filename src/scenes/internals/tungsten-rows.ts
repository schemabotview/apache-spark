import type { Scene } from '@graphlearning/flow'

// §5 tungsten-rows — the fork grammar, because the whole section is a comparison of two memory
// layouts and the difference is a RATIO a reader should feel. The chips on each side are the actual
// bytes: a JVM object spends most of itself on header and pointers, a Tungsten row is the values
// and a small null bitmap. Counting the chips is the argument.
//
// Chapter 3 §4 claimed "compact columnar buffers instead of JVM objects" and moved on. This is the
// cash-out, and it is also why Spark can hold more data in the same memory than a tuned JVM program
// doing the same work by hand.
export const tungstenRows: Scene = {
  id: 'tungsten-rows',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'fork',
      label: 'The same row, twice — one int and one short string',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      align: 'start',
      stretch: true,
      children: [
        {
          id: 'jvm',
          label: 'A JVM object',
          sub: 'most of it is not your data',
          pattern: 'warn',
          icon: 'box',
          cols: 1,
          children: [
            {
              id: 'jvm-bytes',
              label: 'What is in memory',
              pattern: 'group',
              icon: 'none',
              cols: 3,
              children: [
                { id: 'j1', label: 'header', variant: 'chip', pattern: 'warn', icon: 'none' },
                { id: 'j2', label: 'header', variant: 'chip', pattern: 'warn', icon: 'none' },
                { id: 'j3', label: 'pointer', variant: 'chip', pattern: 'warn', icon: 'none' },
                { id: 'j4', label: 'int', variant: 'chip', pattern: 'storage', icon: 'none' },
                { id: 'j5', label: 'String obj', variant: 'chip', pattern: 'warn', icon: 'none' },
                { id: 'j6', label: 'char[]', variant: 'chip', pattern: 'storage', icon: 'none' },
              ],
            },
            { id: 'jvm-gc', label: 'And the GC walks it', pattern: 'warn', icon: 'trash', sub: 'every object is a reference to trace' },
          ],
        },
        {
          id: 'tung',
          label: 'A Tungsten row',
          sub: 'a flat binary record, off-heap',
          pattern: 'service',
          icon: 'memory',
          cols: 1,
          children: [
            {
              id: 'tung-bytes',
              label: 'What is in memory',
              pattern: 'group',
              icon: 'none',
              cols: 3,
              children: [
                { id: 't1', label: 'null bits', variant: 'chip', pattern: 'service', icon: 'none' },
                { id: 't2', label: 'int', variant: 'chip', pattern: 'storage', icon: 'none' },
                { id: 't3', label: 'bytes', variant: 'chip', pattern: 'storage', icon: 'none' },
              ],
            },
            { id: 'tung-gc', label: 'The GC never sees it', pattern: 'service', icon: 'circlecheck', sub: 'one byte array, not N objects' },
          ],
        },
      ],
    },
    { id: 'why', label: 'Why it is faster', pattern: 'storage', icon: 'zap', sub: 'less memory, no GC, cache-friendly' },
  ],
  edges: [{ source: 'fork', target: 'why', label: 'and the fields sit next to each other, so a scan walks memory in order' }],
}
