import type { Scene } from '@graphlearning/flow'

// §7 — compute, not storage. A deliberate omission is hard to see; drawing the gap is the point.
export const computeNotStorage: Scene = {
  id: 'origins-compute-not-storage',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'hadoop',
      label: 'Hadoop shipped both halves, welded together',
      pattern: 'service',
      sub: 'HDFS and MapReduce were one product — you could not sensibly take one without the other',
      flow: 'LR',
      children: [
        { id: 'h-store', label: 'HDFS', pattern: 'storage', sub: 'the storage half' },
        { id: 'h-compute', label: 'MapReduce', pattern: 'service', sub: 'the compute half' },
      ],
    },
    {
      id: 'spark',
      label: 'Spark ships only the compute half',
      pattern: 'storage',
      sub: 'it reads and writes, and owns nothing long-term — the deliberate gap where a storage system goes',
      cols: 4,
      children: [
        { id: 's-s3', icon: 'cloud', label: 'S3 · ADLS · GCS', pattern: 'storage', sub: 'object storage' },
        { id: 's-hdfs', icon: 'harddrive', label: 'HDFS', pattern: 'storage', sub: 'still supported' },
        { id: 's-db', icon: 'database', label: 'JDBC · Cassandra', pattern: 'storage', sub: 'databases' },
        { id: 's-kafka', icon: 'waves', label: 'Kafka · Kinesis', pattern: 'storage', sub: 'message buses' },
      ],
    },
    {
      id: 'buys',
      label: 'What the omission buys, and what it costs',
      pattern: 'service',
      sub: 'this one decision is why Spark outlived the Hadoop stack it was born inside',
      cols: 2,
      children: [
        { id: 'b-cloud', label: 'storage scales alone', pattern: 'service', sub: 'buy compute and storage separately' },
        { id: 'b-cost', label: 'nothing is transactional', pattern: 'warn', sub: 'no owner means no guarantees' },
      ],
    },
  ],
  edges: [
    { source: 'hadoop', target: 'spark', label: 'unweld them' },
    { source: 'spark', target: 'buys' },
  ],
}
