import type { Scene } from '@graphlearning/flow'

// §3 yarn-k8s — the comparison people actually need is not a feature matrix, it is the two things
// that behave differently in a way you will notice: how executors come and go, and what happens to
// shuffle files when one dies. Everything else is operational taste.
//
// Dynamic allocation gets its own card because it is the setting that makes a shared cluster
// affordable and the one whose k8s caveat bites — without a shuffle service or shuffle tracking,
// releasing an idle executor throws away shuffle files other tasks still need.
export const yarnK8s: Scene = {
  id: 'yarn-k8s',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'compare',
      kind: 'table',
      label: 'The two differences you will actually notice',
      sub: 'the rest is operational taste — these two change how you configure the job',
      pattern: 'service',
      headers: ['', 'YARN', 'Kubernetes'],
      values: [
        ['An executor is', 'a container in a NodeManager', 'a pod the scheduler places'],
        ['Shuffle files survive loss', 'yes — external shuffle service', 'only with shuffle tracking'],
        ['Isolation', 'shared, JVM-era assumptions', 'a real container per executor'],
        ['Images', 'whatever the cluster has', 'yours, pinned, reproducible'],
        ['Fits with', 'an existing Hadoop estate', 'everything else you deploy'],
      ],
    },
    {
      id: 'dynamic',
      label: 'Dynamic allocation — what makes a shared cluster affordable',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'd-up', label: 'Scales up', variant: 'tile', pattern: 'service', icon: 'sortarrows', sub: 'when tasks are queued' },
        { id: 'd-down', label: 'Scales down', variant: 'tile', pattern: 'service', icon: 'funnel', sub: 'when executors idle' },
        { id: 'd-keep', label: 'Keeps shuffle files', variant: 'tile', pattern: 'warn', icon: 'harddrive', sub: 'or it must not release' },
      ],
    },
    { id: 'caveat', label: 'The k8s caveat', pattern: 'warn', icon: 'skull', sub: 'releasing an executor can bin live shuffle data' },
  ],
  edges: [
    { source: 'compare', target: 'dynamic' },
    { source: 'dynamic', target: 'caveat', label: 'enable shuffle tracking, or a scale-down mid-stage costs you the whole stage' },
  ],
}
