import type { Section } from '../types'

export const hadoop2: Section = {
  id: 'hadoop-2',
  title: 'Hadoop 2: YARN splits the bottleneck',
  scene: 'evo-hadoop2',
  slide: `## Hadoop 2 · YARN · 2013

YARN split resource management out from the compute.

### The problem it fixes
- Hadoop 1's **JobTracker** was overloaded — scheduling *and* resources in one process
- It was **MapReduce-only** — no other engine could use the cluster

### YARN's pieces
- **ResourceManager** — one master that owns the cluster's resources
- **ApplicationMaster** — one per job; owns its lifecycle, requests containers
- **NodeManagers** — launch and watch containers on each node

### Why it mattered
- Compute is finally **decoupled** from resource management
- The cluster runs **many engines** — no longer MapReduce-only

That open door is what let a new engine — Spark — move in.`,
  narration:
    'Hadoop 2 broke that bottleneck apart with a new layer called YARN. The whole problem with Hadoop 1 was that its single JobTracker was overloaded — it handled both scheduling and resource management — and it locked the cluster to MapReduce alone. YARN split that job up: a cluster-wide ResourceManager now owns the machines, a per-application ApplicationMaster owns each job’s lifecycle and requests the containers it needs, and NodeManagers launch and watch those containers on each node. Because resource management is finally decoupled from the compute, the cluster is no longer married to MapReduce — any engine can ask for resources and run on it. And that open door is exactly what let a new engine, Spark, move in.',
}
