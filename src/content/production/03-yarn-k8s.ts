import type { Section } from '../types'

export const yarnK8sSection: Section = {
  id: 'yarn-k8s',
  title: 'YARN and Kubernetes',
  scene: 'yarn-k8s',
  focus: 'caveat',
  slide: `## YARN and Kubernetes

Two differences matter enough to change how you configure a job. The rest is operational taste.

### What an executor is
- **YARN** — a container inside a NodeManager, on a cluster that already exists for Hadoop
- **Kubernetes** — a pod the scheduler places, in an image you built and pinned

### What happens to shuffle files when one dies
- **YARN** has an external shuffle service: files outlive the executor that wrote them
- **Kubernetes** does not, by default. You need **shuffle tracking**, or losing an executor loses its shuffle output and reruns the producing stage

### Dynamic allocation
- Scale executors up when tasks are queued, down when they idle. It is what makes sharing affordable
- The caveat is the same one: releasing an idle executor can bin shuffle data other tasks still need`,
  narration:
    'YARN and Kubernetes. You can find feature matrices comparing these anywhere, and most of what is on them will not affect how you write or configure a job. Two differences will. The first is what an executor actually is. On YARN, an executor is a container inside a NodeManager, on a cluster that already exists because your organisation runs Hadoop. You inherit that cluster\'s Java version, its libraries, and its queue configuration. On Kubernetes, an executor is a pod, scheduled like anything else in your cluster, running an image that you built and pinned. That is a real advantage for reproducibility: the environment your job runs in is a thing you version, rather than a property of the machines you were given. The second difference is the one that bites, and it is about shuffle files. Remember from chapter five that a shuffle writes files to the executor\'s local disk, and that reduce tasks fetch from them. Now ask what happens when that executor goes away. On YARN there is an external shuffle service: a long-running process on each node that serves shuffle files on behalf of executors. So an executor can exit and its shuffle output survives, which means losing an executor is cheap. Kubernetes has no equivalent by default. When a pod goes, its shuffle files go with it, and Spark has to rerun the stage that produced them. Which matters a great deal for dynamic allocation. Dynamic allocation is what makes a shared cluster affordable: Spark adds executors when tasks are queued and releases them when they go idle, so you are not paying for a fixed cluster that is busy twice a day. But on Kubernetes, releasing an idle executor might be throwing away shuffle data that later tasks still need — and then the job has to recompute the stage that produced it, which can easily cost more than the executor you saved. The fix is to enable shuffle tracking, which tells Spark not to release an executor that still holds shuffle files other stages might read. If you run Spark on Kubernetes with dynamic allocation and have not turned that on, you have a job that occasionally and inexplicably takes three times as long, and nothing in the logs says why. Next: being able to see what is happening.',
}
