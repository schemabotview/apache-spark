import type { Scene } from '../../render-engine'

// §2 evo-problem — the problem Spark was built for. Data outgrew a single machine, so the only
// affordable path was to SCALE OUT across commodity boxes — and a cluster demands two things at
// once: a distributed STORAGE layer (one filesystem over many disks) and a distributed COMPUTE
// model (move the compute to the data). Big data fans out to those two demands — the pairing
// Hadoop set out to build.
export const problem: Scene = {
  id: 'evo-problem',
  padding: 0.2,
  nodes: [
    { id: 'bigdata', label: 'Big data', pattern: 'external', icon: 'database', sub: 'data > one machine · scale out' },
    { id: 'storage', label: 'Distributed storage', pattern: 'storage', icon: 'database', sub: 'one filesystem over many disks' },
    { id: 'compute', label: 'Distributed compute', pattern: 'service', icon: 'gears', sub: 'move the compute to the data' },
  ],
  edges: [
    { source: 'bigdata', target: 'storage' },
    { source: 'bigdata', target: 'compute' },
  ],
}
