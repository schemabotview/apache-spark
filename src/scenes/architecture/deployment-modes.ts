import type { Scene } from '@graphlearning/flow'

// §9 deployment-modes — the chapter's bookend, and the one place the abstract driver/executor picture
// gets attached to things a reader will actually type. The table is the four schedulers; the band
// below is the distinction that bites, because `--deploy-mode` is the flag everyone copies without
// reading and it decides whether closing your laptop kills the job.
//
// Both halves answer the same question — WHERE does the driver run — which is why they share a scene
// rather than getting one each.
export const deploymentModes: Scene = {
  id: 'deployment-modes',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'managers',
      kind: 'table',
      label: 'Four places an application can run',
      sub: 'the code does not change — only who hands out the machines',
      pattern: 'service',
      headers: ['Mode', 'What schedules it', 'Reach for it when'],
      values: [
        ['local[*]', 'nothing — one JVM, threads', 'developing, testing, CI'],
        ['Standalone', "Spark's own manager", 'the box is dedicated to Spark'],
        ['YARN', "Hadoop's resource manager", 'there is a Hadoop estate already'],
        ['Kubernetes', 'k8s schedules executor pods', 'building something new today'],
      ],
    },
    {
      id: 'where',
      label: 'And the flag that decides where the DRIVER itself lives',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      children: [
        { id: 'client', label: 'client mode', pattern: 'warn', icon: 'monitor', sub: 'driver on YOUR machine — close the laptop, lose the job' },
        { id: 'cluster', label: 'cluster mode', pattern: 'service', icon: 'server', sub: 'driver inside the cluster — survives you' },
      ],
    },
    { id: 'next', label: 'Next', pattern: 'user', icon: 'workflow', sub: 'the abstractions you actually write' },
  ],
  edges: [
    { source: 'managers', target: 'where', label: 'every one of the four still has to put the driver somewhere' },
    { source: 'where', target: 'next' },
  ],
}
