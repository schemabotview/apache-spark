import type { Section } from '../types'

export const clusterManagerSection: Section = {
  id: 'cluster-manager',
  title: 'The cluster manager: who owns the machines',
  scene: 'arch-cluster-manager',
  slide: `## Cluster Manager

The driver has a plan but **no machines** — the cluster manager owns them and grants them.

### What it does
- Owns the cluster’s pool of **CPU + memory** across every node
- Grants the driver **containers** — chunks of a node reserved for Spark
- **Launches an executor** inside each container it hands over

### The four you’ll meet
- **Standalone** — Spark’s own built-in manager; simplest to stand up
- **YARN** — Hadoop’s manager; the classic on-prem (the same YARN from *evolution*)
- **Kubernetes** — executors as containers; the cloud-native default
- **Mesos** — general-purpose; now largely legacy

### It’s pluggable
- You pick it at submit: \`--master yarn | k8s://… | spark://…\``,
  narration:
    'The driver has a plan but no machines of its own, so it turns to the cluster manager — the component that actually owns the cluster’s pool of CPU and memory. When the driver asks for resources, the manager grants it containers — chunks of a node reserved for Spark — and launches an executor inside each one, on the worker nodes it hands over. What makes this powerful is that Spark treats this whole layer as pluggable: it doesn’t really care which manager sits here. You’ll meet four of them. Standalone is Spark’s own built-in manager, the simplest way to get a cluster running. YARN is Hadoop’s resource manager, and for years it was the classic on-premises choice — the very same YARN we watched appear back in the evolution course. Kubernetes runs executors as containers and has become the modern, cloud-native default. And Mesos was the general-purpose option, though it’s largely legacy now. Because the layer is pluggable, the same application runs on any of them — you simply point Spark at the one you want when you submit the job, using the master setting. And once the manager has granted those resources, it launches the executors — which are where the real work finally happens.',
}
