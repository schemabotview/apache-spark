import type { Scene } from '@graphlearning/flow'

export const jobStageTask: Scene = {
  id: 'exec-job-stage-task',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'units',
      label: 'Four units, each bounded by a different thing',
      pattern: 'service',
      sub: 'being able to name which one you are looking at is most of what reading the Spark UI is',
      cols: 4,
      children: [
        { id: 'u-job', icon: 'zap', label: 'Job', pattern: 'service', sub: 'bounded by one action' },
        { id: 'u-stage', icon: 'layers', label: 'Stage', pattern: 'service', sub: 'bounded by a shuffle' },
        { id: 'u-task', icon: 'box', label: 'Task', pattern: 'service', sub: 'bounded by one partition' },
        { id: 'u-slot', label: 'Slot', pattern: 'network', sub: 'bounded by one core' },
      ],
    },
    {
      id: 'counts',
      label: 'Which means the counts are not yours to choose',
      pattern: 'network',
      sub: 'three of these four numbers are decided for you, and knowing by what is how you change them',
      cols: 3,
      children: [
        { id: 'c-jobs', icon: 'zap', label: 'jobs = actions', pattern: 'network', sub: 'you control this directly' },
        { id: 'c-stages', icon: 'swap', label: 'stages = shuffles + 1', pattern: 'network', sub: 'count the Exchanges' },
        { id: 'c-tasks', icon: 'box', label: 'tasks = partitions', pattern: 'network', sub: 'per stage, not per job' },
      ],
    },
  ],
  edges: [{ source: 'units', target: 'counts' }],
}
