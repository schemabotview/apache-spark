import type { Scene, SceneNode } from '@graphlearning/flow'

// §9 capstone — the course's last board, and deliberately the mirror of chapter 2 §1. That one was
// the RUNTIME topology: one application, driver, executors. This is the SYSTEM topology: the whole
// platform those applications live in, in the same banded grammar, so the two bookend each other.
//
// Every band cites the chapters it is made of, because that is what a capstone is for — not new
// material, but the moment the reader sees that the eight chapters were one argument. A band whose
// content they cannot place is a chapter they should go back to.
//
// Four bands and not more, and their leaves are TILES: this renders in half a 1920x1080 frame, and
// the fixture this grammar comes from is a full-window poster. With prose cards (a fixed 300px each)
// the board measured 1126px against a 1114px pane and the course's final diagram was the one being
// scaled down. The serving layer is tiles because those are named systems
// recognised by their shape, which is what a tile is for.
const ingest: SceneNode = {
  id: 'ingest',
  badge: '01',
  label: 'Ingest',
  sub: 'ch7 streaming, ch3 §8 batch',
  pattern: 'network',
  icon: 'none',
  align: 'start',
  children: [
    { id: 'in-kafka', variant: 'tile', label: 'Kafka stream', sub: 'readStream, checkpointed', pattern: 'network', icon: 'waves' },
    { id: 'in-batch', variant: 'tile', label: 'Daily files', sub: 'availableNow, hourly', pattern: 'network', icon: 'calendar' },
  ],
}

const lake: SceneNode = {
  id: 'lake',
  badge: '02',
  label: 'Lake',
  sub: 'ch8 §6 — table format, §7 — layering',
  pattern: 'storage',
  icon: 'none',
  align: 'start',
  children: [
    { id: 'lk-bronze', variant: 'tile', label: 'Bronze', sub: 'raw, append only, replayable', pattern: 'storage', icon: 'database' },
    { id: 'lk-silver', variant: 'tile', label: 'Silver', sub: 'typed, deduped, quarantined', pattern: 'storage', icon: 'wrench' },
    { id: 'lk-gold', variant: 'tile', label: 'Gold', sub: 'modelled, partitioned to query', pattern: 'storage', icon: 'barchart' },
  ],
}

const compute: SceneNode = {
  id: 'compute',
  badge: '03',
  label: 'Compute',
  sub: 'ch2 runtime, ch6 speed',
  pattern: 'service',
  icon: 'none',
  align: 'start',
  stretch: true,
  children: [
    {
      id: 'job',
      label: 'A job cluster per run',
      sub: 'ch8 §1 — starts, works, dies',
      pattern: 'service',
      icon: 'box',
      cols: 2,
      children: [
        { id: 'c-size', label: 'sized', variant: 'chip', pattern: 'service', icon: 'none' },
        { id: 'c-aqe', label: 'AQE on', variant: 'chip', pattern: 'service', icon: 'none' },
        { id: 'c-ckpt', label: 'checkpointed', variant: 'chip', pattern: 'network', icon: 'none' },
        { id: 'c-log', label: 'event log', variant: 'chip', pattern: 'network', icon: 'none' },
      ],
    },
  ],
}

export const capstone: Scene = {
  id: 'capstone',
  padding: 0.09,
  nodes: [
    {
      id: 'platform',
      label: 'One system, built from all eight chapters',
      sub: 'every band below is something you have already been taught',
      pattern: 'group',
      icon: 'none',
      flow: 'LR',
      align: 'start',
      stretch: true,
      children: [ingest, lake, compute],
      edges: [
        { source: 'ingest', target: 'lake', label: 'land raw', route: 'step' },
        { source: 'lake', target: 'compute', label: 'read, transform, write back', route: 'step' },
      ],
    },
    {
      id: 'serving',
      label: 'Serving · who reads the gold tables',
      sub: 'the reason any of the rest of it exists',
      pattern: 'user',
      icon: 'users',
      cols: 3,
      children: [
        { id: 'sv-bi', label: 'BI / dashboards', variant: 'tile', pattern: 'user', icon: 'chartpie' },
        { id: 'sv-sql', label: 'Ad-hoc SQL', variant: 'tile', pattern: 'user', icon: 'table' },
        { id: 'sv-ml', label: 'Feature store', variant: 'tile', pattern: 'user', icon: 'brain' },
      ],
    },
  ],
  align: 'start',
  stretch: true,
  edges: [{ source: 'compute', target: 'serving', label: 'ch6 §9 — and when they say it is slow, you now have a method', route: 'step' }],
}
