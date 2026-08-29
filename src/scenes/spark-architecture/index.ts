import type { Scene } from '../../render-engine'
import { topology } from './topology'
import { driver } from './driver'
import { deploy } from './deploy'
import { clusterManager } from './cluster-manager'
import { executors } from './executors'
import { execution } from './execution'
import { memory } from './memory'

// The spark-architecture course's scenes. `arch-topology` is the shared spine (whole machine) —
// the per-band focused scenes (driver · deploy · cluster-manager · executors · execution · memory)
// are added as each sub-slice is authored and reviewed.
export const sparkArchitectureScenes: Scene[] = [topology, driver, deploy, clusterManager, executors, execution, memory]
