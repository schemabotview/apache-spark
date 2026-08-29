import type { Scene } from '../../render-engine'

// arch-deploy — the focused DEPLOY-MODE band. The one choice that decides where the driver PROCESS
// physically lives — picked with `spark-submit --deploy-mode`. The whole point is visual and it's
// framed against the rest of the machine: the cluster manager + executors are ALWAYS inside the
// cluster; the only thing that moves is the DRIVER. In CLIENT mode the driver sits OUTSIDE the
// cluster, on the submit host (your laptop / an edge node) reaching in — great for interactive
// work, but if that host drops the job dies. In CLUSTER mode the driver sits INSIDE the cluster,
// launched by the manager alongside the executors — survives your laptop closing, built for
// production. The rest of the machine is collapsed to one "Manager + Executors" node so the
// contrast reads at a glance: driver outside the Cluster boundary vs inside it.
export const deploy: Scene = {
  id: 'arch-deploy',
  padding: 0.15,
  flow: 'LR',
  nodes: [
    { id: 'submit', label: 'spark-submit --deploy-mode', pattern: 'network', icon: 'terminal', sub: 'client | cluster' },
    {
      id: 'client',
      label: 'client mode',
      pattern: 'group',
      sub: 'driver outside · interactive · host drops → job dies',
      flow: 'LR',
      children: [
        {
          id: 'cl-host', label: 'Submit host', pattern: 'external', icon: 'monitor', sub: 'your laptop / edge node',
          children: [{ id: 'cl-driver', label: 'Driver', pattern: 'network', icon: 'terminal', sub: 'runs here' }],
        },
        {
          id: 'cl-cluster', label: 'Cluster', pattern: 'service', icon: 'boxes', sub: 'manager + executors',
          children: [{ id: 'cl-rest', label: 'Manager + Executors', pattern: 'service', icon: 'server', sub: 'inside the cluster' }],
        },
      ],
      edges: [{ source: 'cl-host', target: 'cl-cluster' }],
    },
    {
      id: 'cluster',
      label: 'cluster mode',
      pattern: 'group',
      sub: 'driver inside · production · survives laptop close',
      children: [
        {
          id: 'cx-cluster', label: 'Cluster', pattern: 'service', icon: 'boxes', sub: 'manager launches the driver too',
          flow: 'LR',
          children: [
            { id: 'cx-driver', label: 'Driver', pattern: 'network', icon: 'terminal', sub: 'runs here' },
            { id: 'cx-rest', label: 'Manager + Executors', pattern: 'service', icon: 'server', sub: 'alongside it' },
          ],
          edges: [{ source: 'cx-driver', target: 'cx-rest' }],
        },
      ],
    },
  ],
  edges: [
    { source: 'submit', target: 'client' },
    { source: 'submit', target: 'cluster' },
  ],
}
