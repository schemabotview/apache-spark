import type { Scene, SceneNode } from '@graphlearning/flow'

// application-shape — the chapter's canonical board, and the one scene §1 AND §2 both render.
// Sharing is deliberate and the content model allows it ("a scene is content-agnostic and can be
// shared across sections"): the two sections have the same cast, so showing one board twice under
// different narration deepens it rather than replacing it. §2 differs by `focus: 'w1'`, which lights
// the worker machine — without that the two sections would be the SAME video frame back to back,
// and a section IS a video segment.
//
// TWO EXECUTORS in the one worker, not one. That is what lets §2 ride this board at all: its whole
// claim is that a worker is hardware, an executor is a process, and one machine holds SEVERAL.
// Drawn with a single executor the picture quietly says the two words mean the same thing. They are
// stacked rather than placed side by side to keep the band narrow — three bands in an LR row is
// already wide, and a wide scene makes fitView shrink the entire board (see §5's note).
//
// Built on the grammar of ui-flow's own
// `spark-topology` study fixture (dev/fixtures/studies/spark-topology.ts) rather than invented here.
// That fixture is the engine author's reference drawing of this exact subject, and three things in it
// are worth taking:
//
//   `icon: 'none'` on a band, so a container that is a HEADING does not carry a meaningless cube.
//   `align: 'start'` + `stretch`, which rules the bands to one top and one bottom edge — the actual
//     mechanism for column alignment, rather than hand-balancing each card's sub until it lines up.
//   `variant: 'chip'` for tasks, because what the reader must take from that row is THAT THERE ARE
//     FOUR, read without reading words. A 210×96 card per task would say far less in far more space.
//
// Reduced AND re-cut from the fixture. That one is a poster built for full window at 50 nodes; this
// renders in half a 1920×1080 frame beside a slide, so one worker is drawn rather than two.
//
// The bands are driver → cluster manager → workers, NOT the fixture's sources → driver → workers.
// This is §1 of a chapter about the execution model, so the control plane is the subject: who asks,
// who allocates, who runs. Data sources became the `storage-band` row instead — the data plane still
// has to appear, but as the thing the application reads and writes, not as a peer of the driver.
// §9 still owns WHICH manager (standalone / YARN / k8s); this band is only that one exists and what
// it is for.
//
// NO BACK EDGE here, and that is a rendering decision rather than a modelling one. The fixture draws
// executor → driver dashed, which is correct Spark and reads well when driver and workers are
// ADJACENT bands. Here the cluster manager sits between them, so the edge has to cross a band it has
// nothing to do with, and it lands on top of two of that band's cards. §2 band 01 step 3 carries the
// same claim in words, where it costs nothing. Only the rendered frame shows this; the guards pass
// either way.
const driver: SceneNode = {
  id: 'driver',
  badge: '01',
  label: 'Driver · control plane',
  sub: 'one per application, and it holds no data',
  pattern: 'network',
  icon: 'none',
  align: 'start',
  children: [
    { id: 'drv-session', label: 'SparkSession', sub: 'your code enters Spark here', pattern: 'network', icon: 'code' },
    { id: 'drv-plan', label: 'Planning', sub: 'builds and optimises the plan', pattern: 'network', icon: 'brain' },
    { id: 'drv-tasks', label: 'Task scheduling', sub: 'stages, assignment, progress', pattern: 'network', icon: 'workflow' },
  ],
}

// The band §1 exists to include. The cluster manager is the party Spark ASKS — `user`, so the row
// reads "someone else owns this" against the two bands Spark itself is — and its third card carries
// the claim people most often miss: allocating resources and scheduling tasks are different jobs done
// by different things. The manager never assigns a task; the driver never picks a machine.
const cm: SceneNode = {
  id: 'cm',
  badge: '02',
  label: 'Cluster manager',
  sub: 'owns the machines, and is not part of Spark',
  pattern: 'user',
  icon: 'none',
  align: 'start',
  children: [
    { id: 'cm-own', label: 'Owns the pool', sub: 'every machine, not just yours', pattern: 'user', icon: 'server' },
    { id: 'cm-alloc', label: 'Allocates', sub: 'finds machines with room', pattern: 'user', icon: 'boxes' },
    { id: 'cm-sep', label: 'Not the scheduler', sub: 'it never assigns a task', pattern: 'user', icon: 'circleslash' },
  ],
}

const workers: SceneNode = {
  id: 'workers',
  badge: '03',
  label: 'Worker nodes',
  sub: 'where your code actually runs',
  pattern: 'service',
  icon: 'none',
  align: 'start',
  stretch: true,
  children: [
    {
      id: 'w1',
      label: 'Worker — ONE machine',
      sub: 'hardware the manager handed over',
      pattern: 'storage',
      icon: 'server',
      cols: 1,
      children: [
        {
          id: 'w1-exec',
          label: 'Executor · JVM process',
          pattern: 'storage',
          icon: 'cpu',
          cols: 2,
          align: 'start',
          children: [
            { id: 'w1-t1', label: 'Task', variant: 'chip', pattern: 'network', icon: 'none' },
            { id: 'w1-t2', label: 'Task', variant: 'chip', pattern: 'network', icon: 'none' },
            { id: 'w1-cache', label: 'Cache / memory', variant: 'chip', pattern: 'storage', icon: 'memory' },
            { id: 'w1-disk', label: 'Local disk', variant: 'chip', pattern: 'storage', icon: 'harddrive' },
          ],
        },
        {
          id: 'w2-exec',
          label: 'Executor · JVM process',
          pattern: 'storage',
          icon: 'cpu',
          cols: 2,
          align: 'start',
          children: [
            { id: 'w2-t1', label: 'Task', variant: 'chip', pattern: 'network', icon: 'none' },
            { id: 'w2-t2', label: 'Task', variant: 'chip', pattern: 'network', icon: 'none' },
            { id: 'w2-cache', label: 'Cache / memory', variant: 'chip', pattern: 'storage', icon: 'memory' },
            { id: 'w2-disk', label: 'Local disk', variant: 'chip', pattern: 'storage', icon: 'harddrive' },
          ],
        },
      ],
    },
  ],
}

export const applicationShape: Scene = {
  id: 'application-shape',
  padding: 0.07,
  nodes: [
    {
      id: 'runtime',
      label: 'ONE Spark application',
      sub: 'a distributed program, not a library call',
      pattern: 'group',
      icon: 'none',
      flow: 'LR',
      align: 'start',
      stretch: true,
      children: [driver, cm, workers],
      edges: [
        { source: 'driver', target: 'cm', label: 'asks for resources', route: 'step' },
        { source: 'cm', target: 'workers', label: 'starts executors', route: 'step' },
      ],
    },
    {
      id: 'storage-band',
      label: 'Storage · read & write',
      sub: 'inputs, outputs and durable tables',
      pattern: 'storage',
      icon: 'database',
      cols: 4,
      children: [
        { id: 'st-hdfs', label: 'HDFS', variant: 'tile', pattern: 'storage', icon: 'harddrive' },
        { id: 'st-s3', label: 'Amazon S3', variant: 'tile', pattern: 'storage', icon: 's3' },
        { id: 'st-adls', label: 'Azure data lake', variant: 'tile', pattern: 'storage', icon: 'adls' },
        { id: 'st-formats', label: 'Table formats', variant: 'tile', pattern: 'storage', icon: 'layers' },
      ],
    },
  ],
  align: 'start',
  stretch: true,
  edges: [{ source: 'workers', target: 'storage-band', label: 'read / write', route: 'step', bidirectional: true }],
}
