import type { Scene } from '@graphlearning/flow'

export const wholeStageCodegen: Scene = {
  id: 'tun-codegen',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'idea',
      framed: true,
      label: 'Compile, don’t interpret',
      pattern: 'service',
      icon: 'zap',
      sub: 'Java source is generated for the stage, then compiled',
    },
    {
      id: 'result',
      label: 'What the generated method looks like',
      pattern: 'network',
      sub: 'one loop, with the filter and the projection inlined into it — the operators no longer exist as objects',
      cols: 1,
      children: [
        { id: 'g-loop', icon: 'repeat', label: 'while (scan.hasNext())', pattern: 'network', sub: 'one loop for the whole stage' },
        { id: 'g-inline', icon: 'funnel', label: 'if (country == "IN")', pattern: 'network', sub: 'the Filter, inlined' },
        { id: 'g-emit', icon: 'table', label: 'emit(dest, cnt)', pattern: 'network', sub: 'the Project, inlined' },
      ],
    },
    {
      id: 'why',
      label: 'Why this is faster than the sum of its parts',
      pattern: 'service',
      sub: 'a hand-written loop is what the JIT compiler is best at, and this is now a hand-written loop',
      cols: 3,
      children: [
        { id: 'w-calls', icon: 'ban', label: 'no virtual calls', pattern: 'service', sub: 'nothing left to dispatch' },
        { id: 'w-rows', icon: 'cpu', label: 'no intermediate rows', pattern: 'service', sub: 'values stay in CPU registers' },
        { id: 'w-jit', icon: 'zap', label: 'the JIT can optimize it', pattern: 'service', sub: 'unroll, vectorise, inline' },
      ],
    },
  ],
  edges: [
    { source: 'idea', target: 'result' },
    { source: 'result', target: 'why' },
  ],
}
