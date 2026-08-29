import type { Scene } from '../../render-engine'

// §4 evo-hadoop2 — YARN broke Hadoop 1's bottleneck apart. A cluster-wide ResourceManager owns the
// machines and grants containers; a per-job ApplicationMaster owns each application's lifecycle;
// NodeManagers launch and watch the containers on each node. Because resources are now decoupled
// from compute, the cluster is no longer MapReduce-only — many engines can run on it (the door
// Spark walked through). Drawn as the RM fanning to AM + NodeManagers, with the payoff beneath.
export const hadoop2: Scene = {
  id: 'evo-hadoop2',
  padding: 0.16,
  nodes: [
    {
      id: 'yarn',
      label: 'Hadoop 2 · YARN · 2013',
      pattern: 'group',
      sub: 'free the scheduler',
      children: [
        { id: 'rm', label: 'ResourceManager', pattern: 'network', icon: 'workflow', sub: 'owns the cluster' },
        { id: 'am', label: 'ApplicationMaster', pattern: 'network', sub: 'one per job · requests containers' },
        { id: 'nm', label: 'NodeManagers', pattern: 'external', icon: 'server', sub: 'launch & watch containers' },
      ],
      edges: [
        { source: 'rm', target: 'am' },
        { source: 'rm', target: 'nm' },
      ],
    },
    { id: 'win', label: 'compute ⟂ resource management', pattern: 'storage', icon: 'layers', sub: 'many engines — not just MapReduce' },
  ],
  edges: [{ source: 'yarn', target: 'win' }],
}
