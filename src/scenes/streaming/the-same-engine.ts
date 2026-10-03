import type { Scene } from '@graphlearning/flow'

export const theSameEngine: Scene = {
  id: 'str-same-engine',
  padding: 0.13,
  flow: 'LR',
  nodes: [
    {
      id: 'batch',
      framed: true,
      label: 'Batch',
      pattern: 'network',
      icon: 'filecode',
      sub: 'spark.read · df.groupBy(…).count() · df.write',
    },
    {
      id: 'stream',
      framed: true,
      label: 'Streaming',
      pattern: 'network',
      icon: 'gauge',
      sub: 'spark.readStream · the SAME line · df.writeStream',
    },
    {
      id: 'shared',
      label: 'Everything between the first line and the last is identical',
      pattern: 'service',
      sub: 'same parser, same analyzer, same Catalyst rules, same Tungsten codegen, same shuffle',
      cols: 3,
      children: [
        { id: 's-cat', icon: 'gears', label: 'Catalyst', pattern: 'service', sub: 'the same optimizer' },
        { id: 's-tun', icon: 'code', label: 'Tungsten', pattern: 'service', sub: 'the same generated code' },
        { id: 's-shuf', icon: 'swap', label: 'the same shuffle', pattern: 'service', sub: 'and the same skew problems' },
      ],
    },
  ],
  edges: [
    { source: 'batch', target: 'shared' },
    { source: 'stream', target: 'shared' },
  ],
}
