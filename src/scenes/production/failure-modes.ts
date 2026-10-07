import type { Scene } from '@graphlearning/flow'

// §5 failure-modes — the useful frame is not a list of failures but a LINE: on one side, things
// Spark handles without telling you; on the other, things that end your application. People worry
// about the left column and are surprised by the right one.
//
// The driver row is the one to land. Everything in chapter 2 said the driver is a coordinator that
// holds no data — which also means it holds the ONLY copy of the plan, the schedule and the
// progress, and nothing recovers it. That is the real argument for cluster deploy mode.
export const failureModes: Scene = {
  id: 'failure-modes',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'handled',
      kind: 'table',
      label: 'What Spark handles for you, silently',
      sub: 'lineage from chapter 3 is what makes every row of this possible',
      pattern: 'service',
      headers: ['Failure', 'What happens'],
      values: [
        ['A task throws', 'retried up to spark.task.maxFailures (4)'],
        ['An executor dies', 'its tasks rerun elsewhere, from lineage'],
        ['Shuffle files lost with it', 'the producing stage reruns'],
        ['One node is just slow', 'speculation launches a duplicate, first wins'],
      ],
    },
    {
      id: 'fatal',
      kind: 'table',
      label: 'What ends the application',
      sub: 'the first row is why --deploy-mode cluster matters',
      pattern: 'warn',
      headers: ['Failure', 'Why nothing saves you'],
      values: [
        ['The driver dies', 'it held the plan, the schedule and the progress'],
        ['A task fails 4 times', 'Spark assumes it is your code, not bad luck'],
        ['Out of memory on the driver', 'usually collect() — chapter 3 §2'],
      ],
    },
    { id: 'spec', label: 'Speculation is not free', pattern: 'warn', icon: 'copy', sub: 'duplicate work, and a non-idempotent write runs twice' },
  ],
  edges: [
    { source: 'handled', target: 'fatal' },
    { source: 'fatal', target: 'spec', label: 'and never enable speculation on a job whose sink cannot take a duplicate write' },
  ],
}
