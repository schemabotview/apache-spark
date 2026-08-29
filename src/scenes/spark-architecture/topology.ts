import type { Scene } from '../../render-engine'

// arch-topology — the SPINE of the spark-architecture course: the whole machine a Spark job runs
// across, drawn solid, top to bottom. Three bands wired driver → cluster manager → workers:
//
//     DRIVER          your program — plans the work (DAG → tasks) and coordinates it
//        │  "I need N executors"
//     CLUSTER MANAGER owns the machines, launches an executor on each granted node
//        │  launches (fans to all three)
//     WORKER NODES    each hosts an executor (a JVM) with task slots + a memory cache
//
// Shared by the two whole-machine bookends — `overview` (opening tour) and `lifecycle` (closer) —
// plus `tasks-to-slots`. The per-band deep dives (driver, deploy, cluster-manager, executors,
// memory) each ride their own focused scene. The old reveal-engine drew the driver→slot dispatch
// edges only on the tasks-to-slots band; with no reveal here they're left out so the shared solid
// spine stays clean (that section's slide carries the hand-off).
//
// Palette follows evolution's role mapping: `network` = the coordinator brain (driver), `service`
// = the manager, `group` = the worker-nodes container, `storage`/memory = cache, `gears` = slots.
export const topology: Scene = {
  id: 'arch-topology',
  padding: 0.14,
  nodes: [
    {
      id: 'driver',
      label: 'Driver',
      pattern: 'network',
      icon: 'terminal',
      sub: 'your program · plans + coordinates',
      flow: 'LR',
      children: [
        { id: 'd-session', label: 'SparkSession', pattern: 'network', icon: 'terminal', sub: 'the entry point' },
        { id: 'd-dag', label: 'DAG Scheduler', pattern: 'user', icon: 'workflow', sub: 'code → stages' },
        { id: 'd-task', label: 'Task Scheduler', pattern: 'service', icon: 'gears', sub: 'stages → tasks' },
        { id: 'd-track', label: 'tracks executors', pattern: 'external', icon: 'clock', sub: 'heartbeats' },
      ],
      edges: [
        { source: 'd-session', target: 'd-dag' },
        { source: 'd-dag', target: 'd-task' },
        { source: 'd-task', target: 'd-track' },
      ],
    },
    {
      id: 'cm',
      label: 'Cluster Manager',
      pattern: 'service',
      icon: 'workflow',
      sub: 'owns the machines · launches executors',
      children: [
        { id: 'cm-alloc', label: 'allocates resources', pattern: 'service', icon: 'workflow', sub: 'grants containers to the driver' },
        {
          id: 'cm-mgrs',
          label: 'pluggable managers',
          pattern: 'group',
          sub: 'same app on any',
          cols: 4,
          children: [
            { id: 'cm-standalone', label: 'Standalone', pattern: 'external' },
            { id: 'cm-yarn', label: 'YARN', pattern: 'external' },
            { id: 'cm-k8s', label: 'Kubernetes', pattern: 'external' },
            { id: 'cm-mesos', label: 'Mesos', pattern: 'external' },
          ],
        },
      ],
      edges: [{ source: 'cm-alloc', target: 'cm-mgrs' }],
    },
    {
      id: 'workers',
      label: 'Worker Nodes',
      pattern: 'group',
      sub: 'executors run tasks · hold cached data',
      cols: 3,
      children: [
        {
          id: 'w1', label: 'Worker Node', pattern: 'group', children: [
            { id: 'w1-exec', label: 'Executor', pattern: 'service', icon: 'box', sub: 'JVM' },
            { id: 'w1-slots', label: 'slots', pattern: 'service', icon: 'gears', sub: 'cores → tasks' },
            { id: 'w1-cache', label: 'cache', pattern: 'storage', icon: 'memory', sub: 'in-memory' },
          ],
        },
        {
          id: 'w2', label: 'Worker Node', pattern: 'group', children: [
            { id: 'w2-exec', label: 'Executor', pattern: 'service', icon: 'box', sub: 'JVM' },
            { id: 'w2-slots', label: 'slots', pattern: 'service', icon: 'gears', sub: 'cores → tasks' },
            { id: 'w2-cache', label: 'cache', pattern: 'storage', icon: 'memory', sub: 'in-memory' },
          ],
        },
        {
          id: 'w3', label: 'Worker Node', pattern: 'group', children: [
            { id: 'w3-exec', label: 'Executor', pattern: 'service', icon: 'box', sub: 'JVM' },
            { id: 'w3-slots', label: 'slots', pattern: 'service', icon: 'gears', sub: 'cores → tasks' },
            { id: 'w3-cache', label: 'cache', pattern: 'storage', icon: 'memory', sub: 'in-memory' },
          ],
        },
      ],
    },
  ],
  edges: [
    { source: 'driver', target: 'cm', label: 'I need N executors' },
    { source: 'cm', target: 'workers', label: 'launches' },
  ],
}
