import type { Scene } from '@graphlearning/flow'

// §1 deployment-shapes — chapter 2 §9 covered WHERE the driver runs (local / standalone / YARN /
// k8s, client vs cluster). This is a different question that people conflate with it: what SHAPE of
// workload is this, because that decides the cluster's lifecycle and therefore the bill.
//
// The three are genuinely different products built from the same engine, and the column that
// matters is the last one. An interactive cluster bills while somebody is thinking; a job cluster
// bills while it works; a streaming cluster bills always. Most cost surprises are a workload of one
// shape running on a cluster of another.
export const deploymentShapes: Scene = {
  id: 'deployment-shapes',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'shapes',
      label: 'Three shapes of Spark workload — the same engine, three different products',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'sh-inter', label: 'Interactive', variant: 'tile', pattern: 'user', icon: 'monitor', sub: 'notebooks, ad-hoc, exploration' },
        { id: 'sh-batch', label: 'Scheduled batch', variant: 'tile', pattern: 'service', icon: 'calendar', sub: 'the overwhelming majority' },
        { id: 'sh-stream', label: 'Always-on streaming', variant: 'tile', pattern: 'network', icon: 'waves', sub: 'chapter 7, running forever' },
      ],
    },
    {
      id: 'compare',
      kind: 'table',
      label: 'What actually differs — and the last column is where the bill comes from',
      sub: 'most cost surprises are one shape running on a cluster meant for another',
      pattern: 'storage',
      headers: ['', 'Cluster lives', 'Sized for', 'You pay for'],
      values: [
        ['Interactive', 'hours, shared', 'the busiest user', 'thinking time too'],
        ['Scheduled batch', 'minutes, per run', 'that job alone', 'exactly the work'],
        ['Streaming', 'forever', 'peak arrival rate', 'every idle second'],
      ],
    },
    { id: 'rule', label: 'Job clusters by default', pattern: 'service', icon: 'circlecheck', sub: 'shared ones only when sharing is the point' },
  ],
  edges: [
    { source: 'shapes', target: 'compare' },
    { source: 'compare', target: 'rule', label: 'a job cluster starts, works, and dies — nothing is left running to forget about' },
  ],
}
