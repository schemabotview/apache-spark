import type { Scene } from '../../render-engine'

// arch-driver — the focused DRIVER band of the spark-architecture course. The driver IS your
// program: you create a SparkSession (the entry point, sitting on the lower-level SparkContext),
// it builds the plan in two steps (DAG Scheduler cuts your code into stages, Task Scheduler breaks
// each stage into tasks), and it stays in charge by tracking every executor. The punchline — the
// driver owns no machines of its own, so it must ask the cluster manager — is the hand-off node
// beneath, teeing up the next section. Palette: `network` = the coordinator brain, `user` for the
// DAG (a plan/graph), `service`/gears for scheduling, `external` for the hand-off pointer.
export const driver: Scene = {
  id: 'arch-driver',
  padding: 0.15,
  nodes: [
    {
      id: 'driver',
      label: 'Driver',
      pattern: 'network',
      icon: 'terminal',
      sub: 'your program · plans + coordinates',
      children: [
        { id: 'd-session', label: 'SparkSession', pattern: 'network', icon: 'terminal', sub: 'the entry point · on SparkContext' },
        {
          id: 'd-plan',
          label: 'builds the plan',
          pattern: 'group',
          flow: 'LR',
          children: [
            { id: 'd-dag', label: 'DAG Scheduler', pattern: 'user', icon: 'workflow', sub: 'code → stages' },
            { id: 'd-task', label: 'Task Scheduler', pattern: 'service', icon: 'gears', sub: 'stages → tasks' },
          ],
          edges: [{ source: 'd-dag', target: 'd-task' }],
        },
        { id: 'd-track', label: 'tracks executors', pattern: 'service', icon: 'clock', sub: 'heartbeats · progress · results' },
      ],
      edges: [
        { source: 'd-session', target: 'd-plan' },
        { source: 'd-plan', target: 'd-track' },
      ],
    },
    { id: 'ask', label: 'asks the Cluster Manager', pattern: 'external', icon: 'workflow', sub: 'owns no machines → for those it must ask' },
  ],
  edges: [{ source: 'driver', target: 'ask' }],
}
