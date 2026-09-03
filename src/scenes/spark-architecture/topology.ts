import type { Scene } from '../../render-engine'

// arch-topology — the ANCHOR diagram for the whole Apache Spark concept, and the SPINE of the
// spark-architecture course. It deliberately conforms to the canonical cluster-mode picture from the
// Spark docs (cluster-overview) — the one the audience has already seen — so the first frame lands on
// structure they half-remember instead of asking them to learn a new drawing:
//
//     Driver Program ⊃ SparkContext          Worker Node ⊃ Executor ⊃ { Cache, Task, Task }
//
//   Driver ↔ Cluster Manager     "I need N executors"   — the driver asks; it owns no machines
//   Cluster Manager ↔ Workers    "launches executor"    — the manager's ONLY job is allocation
//   Driver ↔ Workers             "tasks ↓ · results ↑"  — the direct link: once executors exist the
//                                                         driver drives them itself, NOT through the
//                                                         manager. This is the whole point of the
//                                                         canonical diagram's curved edges, and
//                                                         01-overview narrates it verbatim.
//
// Every link is bidirectional, as the canonical draws them: the driver receives heartbeats and
// results back, the manager reports what it granted.
//
// CONTAINMENT IS THE TEACHING. Tasks and the cache live INSIDE the executor (an executor is a JVM;
// its cores become task slots and its heap holds the cache) — they are not peers of it. Two worker
// nodes, as the canonical draws, not three.
//
// Drawn TOP-DOWN — driver → cluster manager → the two workers side by side — because the scene pane
// is tall and squarish; the canonical is drawn left-right, but ORIENTATION is the one thing that is
// ours. What must match is the containment and the edges.
//
// Kept deliberately thin: the driver's DAG/Task schedulers, the pluggable managers (YARN/K8s/Mesos)
// and the memory split each belong to their own deep-dive scene (arch-driver, arch-cluster-manager,
// arch-memory), which are ZOOMS of this anchor and must reuse its vocabulary and colour roles.
//
// Shared by the two whole-machine bookends — `overview` (opening tour) and `lifecycle` (closer) —
// plus `tasks-to-slots`. Palette follows evolution's role mapping: `network` = the coordinator brain
// (driver), `service` = the manager and the executor, `group` = a worker node, `storage` = cache.
const worker = (n: number) => ({
  id: `w${n}`,
  label: 'Worker Node',
  pattern: 'group' as const,
  children: [
    {
      id: `w${n}-exec`,
      label: 'Executor',
      pattern: 'service' as const,
      icon: 'box',
      sub: 'JVM · long-lived',
      children: [
        { id: `w${n}-cache`, label: 'Cache', pattern: 'storage' as const, icon: 'memory', sub: 'in-memory' },
        { id: `w${n}-t1`, label: 'Task', pattern: 'service' as const, icon: 'gears', sub: 'one slot' },
        // { id: `w${n}-t2`, label: 'Task', pattern: 'service' as const, icon: 'gears', sub: 'one slot' },
      ],
    },
  ],
})

export const topology: Scene = {
  id: 'arch-topology',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    {
      id: 'driver',
      label: 'Driver Program',
      pattern: 'network',
      icon: 'terminal',
      sub: 'your program · plans and coordinates',
      children: [
        { id: 'sparkcontext', label: 'SparkContext', pattern: 'network', icon: 'terminal', sub: 'the entry point' },
      ],
    },
    {
      id: 'cm',
      label: 'Cluster Manager',
      pattern: 'service',
      icon: 'workflow',
      sub: 'owns the machines',
    },
    worker(1),
    worker(2),
  ],
  edges: [
    { source: 'driver', target: 'cm', label: 'I need N executors', bidirectional: true },
    { source: 'cm', target: 'w1', label: 'launches executor', bidirectional: true },
    { source: 'cm', target: 'w2', bidirectional: true },
    { source: 'driver', target: 'w1', label: 'tasks ↓ · results ↑', bidirectional: true },
    { source: 'driver', target: 'w2', bidirectional: true },
  ],
}
