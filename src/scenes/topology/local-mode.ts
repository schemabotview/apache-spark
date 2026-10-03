import type { Scene } from '@graphlearning/flow'

export const localMode: Scene = {
  id: 'topology-local-mode',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'local',
      label: 'local[4] — one JVM on your laptop',
      pattern: 'service',
      sub: 'the driver and the executor are threads in the same process, and the cluster manager is skipped entirely',
      cols: 2,
      children: [
        { id: 'l-driver', icon: 'brain', label: 'driver thread', pattern: 'service', sub: 'plans and schedules' },
        { id: 'l-exec', icon: 'cpu', label: '4 executor threads', pattern: 'service', sub: 'run the tasks' },
      ],
    },
    {
      id: 'same',
      label: 'What is genuinely the same',
      pattern: 'network',
      sub: 'the reason local mode is a real test and not a toy — the code path is the code path',
      cols: 2,
      children: [
        { id: 'sm-plan', icon: 'workflow', label: 'the same optimizer', pattern: 'network', sub: 'identical plans' },
        { id: 'sm-shuffle', icon: 'harddrive', label: 'real shuffles', pattern: 'network', sub: 'to real local disk' },
      ],
    },
    {
      id: 'differs',
      label: 'What it can never show you',
      pattern: 'warn',
      sub: 'every bug in this list is a distribution bug, and local mode has no distribution',
      cols: 2,
      children: [
        { id: 'df-net', label: 'network cost', pattern: 'warn', sub: 'a shuffle here is free' },
        { id: 'df-skew', label: 'skew and failures', pattern: 'warn', sub: 'no slow node, no dead node' },
      ],
    },
  ],
  edges: [
    { source: 'local', target: 'same' },
    { source: 'same', target: 'differs' },
  ],
}
