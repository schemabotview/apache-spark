import type { Scene } from '@graphlearning/flow'

export const slots: Scene = {
  id: 'exec-slots',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'waves',
      label: '200 tasks over 100 slots runs in two waves',
      pattern: 'service',
      sub: 'tasks queue; they do not run in parallel past the number of cores you actually have',
      flow: 'LR',
      children: [
        { id: 'w1', icon: 'waves', label: 'wave 1', pattern: 'service', sub: '100 tasks, every slot busy' },
        { id: 'w2', icon: 'waves', label: 'wave 2', pattern: 'service', sub: '100 tasks, every slot busy' },
      ],
    },
    {
      id: 'ragged',
      framed: true,
      label: 'And 201 tasks runs in three',
      pattern: 'warn',
      sub: 'one task and 99 idle cores, for a whole task’s duration',
    },
    {
      id: 'rule',
      label: 'The arithmetic worth doing before any tuning',
      pattern: 'network',
      sub: 'it is free, it takes ten seconds, and it is frequently the whole problem',
      cols: 2,
      children: [
        { id: 'ru-slots', icon: 'cpu', label: 'executors × cores', pattern: 'network', sub: '= every slot you will ever have' },
        { id: 'ru-parts', icon: 'layers', label: 'partitions ≈ a multiple', pattern: 'network', sub: 'of that number, 2–4× for skew' },
      ],
    },
  ],
  edges: [
    { source: 'waves', target: 'ragged' },
    { source: 'ragged', target: 'rule' },
  ],
}
