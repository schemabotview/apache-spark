import type { Scene } from '../../render-engine'

// arch-cluster-manager — the focused CLUSTER-MANAGER band. The driver has a plan but no machines,
// so it asks the cluster manager — the component that actually owns the cluster's pool of CPU and
// memory. On request it grants containers and launches an executor inside each, on the worker nodes
// it hands over. The layer is PLUGGABLE: Spark doesn't care which manager sits here — Standalone
// (its own built-in), YARN (Hadoop's, the classic on-prem — the same YARN from the evolution
// course), Kubernetes (the cloud-native default), Mesos (largely legacy) — the same app runs on any,
// picked with `--master`. Framed LR so driver → manager → workers reads big; the driver and workers
// are collapsed pointers so the four managers are the visual centre.
export const clusterManager: Scene = {
  id: 'arch-cluster-manager',
  padding: 0.15,
  flow: 'TB',
  nodes: [
    { id: 'driver', label: 'Driver', pattern: 'network', icon: 'terminal', sub: 'asks for N executors' },
    {
      id: 'cm',
      label: 'Cluster Manager',
      pattern: 'service',
      icon: 'workflow',
      sub: 'owns the machines',
      children: [
        { id: 'cm-alloc', label: 'allocates resources', pattern: 'service', icon: 'workflow', sub: 'grants containers · owns CPU + memory' },
        {
          id: 'cm-mgrs',
          label: 'pluggable · same app on any (--master)',
          pattern: 'group',
          cols: 4,
          children: [
            { id: 'cm-standalone', label: 'Standalone', pattern: 'external', sub: 'built-in' },
            { id: 'cm-yarn', label: 'YARN', pattern: 'external', sub: 'Hadoop · on-prem' },
            { id: 'cm-k8s', label: 'Kubernetes', pattern: 'external', sub: 'cloud-native' },
            { id: 'cm-mesos', label: 'Mesos', pattern: 'external', sub: 'legacy' },
          ],
        },
      ],
      edges: [{ source: 'cm-alloc', target: 'cm-mgrs' }],
    },
    { id: 'workers', label: 'Worker Nodes', pattern: 'group', icon: 'server', sub: 'executors — one per granted node' },
  ],
  edges: [
    { source: 'driver', target: 'cm', label: 'I need N executors' },
    { source: 'cm', target: 'workers', label: 'launches an executor per node' },
  ],
}
