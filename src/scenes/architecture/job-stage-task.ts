import type { Scene } from '@graphlearning/flow'

// §4 job-stage-task — the vocabulary of the whole rest of the course, and the only honest way to draw
// it is CONTAINMENT: a job contains stages, a stage contains tasks. Three cards in a row would say
// "job, then stage, then task", which is wrong — they are not steps, they are nested scopes, and the
// Spark UI is organised by exactly this nesting.
//
// Two stages rather than one, so the shuffle boundary has something to sit between; the edge between
// them is declared INSIDE the job container, since it is a relationship among its own children.
// Stage 0 gets four tasks and stage 1 gets three to make the counting rule visible: the task count is
// not a property of the job, it is a property of each stage's partition count.
export const jobStageTask: Scene = {
  id: 'job-stage-task',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    { id: 'action', label: 'One action', pattern: 'user', icon: 'zap', sub: 'count, collect, show, write' },
    {
      id: 'job',
      label: 'One JOB — all the work that one action needs',
      pattern: 'group',
      icon: 'none',
      children: [
        {
          id: 'stage-0',
          label: 'Stage 0 — everything up to the shuffle',
          pattern: 'service',
          cols: 4,
          children: [
            { id: 't0', label: 'task', variant: 'chip', pattern: 'service', icon: 'gears' },
            { id: 't1', label: 'task', variant: 'chip', pattern: 'service', icon: 'gears' },
            { id: 't2', label: 'task', variant: 'chip', pattern: 'service', icon: 'gears' },
            { id: 't3', label: 'task', variant: 'chip', pattern: 'service', icon: 'gears' },
          ],
        },
        {
          id: 'stage-1',
          label: 'Stage 1 — everything after it',
          pattern: 'network',
          cols: 3,
          children: [
            { id: 't4', label: 'task', variant: 'chip', pattern: 'network', icon: 'gears' },
            { id: 't5', label: 'task', variant: 'chip', pattern: 'network', icon: 'gears' },
            { id: 't6', label: 'task', variant: 'chip', pattern: 'network', icon: 'gears' },
          ],
        },
      ],
      edges: [{ source: 'stage-0', target: 'stage-1', label: 'a stage ENDS at a shuffle — that is the only thing that cuts one' }],
    },
    { id: 'rule', label: 'The counting rule', pattern: 'storage', icon: 'sigma', sub: 'tasks in a stage = its partitions' },
  ],
  edges: [
    { source: 'action', target: 'job', label: 'one action = exactly one job' },
    { source: 'job', target: 'rule' },
  ],
}
