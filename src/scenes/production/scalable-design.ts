import type { Scene } from '@graphlearning/flow'

// §7 scalable-design — the medallion layering, drawn as a flow because that is what it is, with the
// property that actually distinguishes each layer underneath it. People adopt bronze/silver/gold as
// vocabulary without the discipline; the discipline is that bronze is IMMUTABLE and never edited,
// which is what makes every downstream mistake recoverable by replay.
//
// The band below is the four properties that decide whether a platform of these survives contact
// with a second team. They are all chapter 4 §9's argument, scaled up from one job to a system.
export const scalableDesign: Scene = {
  id: 'scalable-design',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'layers',
      label: 'The layering almost every lakehouse converges on',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      align: 'start',
      children: [
        { id: 'l-bronze', variant: 'tile', label: 'Bronze — raw', pattern: 'storage', icon: 'database', sub: 'exactly as it arrived, APPEND ONLY' },
        { id: 'l-silver', variant: 'tile', label: 'Silver — cleaned', pattern: 'service', icon: 'wrench', sub: 'typed, deduplicated, conformed' },
        { id: 'l-gold', variant: 'tile', label: 'Gold — modelled', pattern: 'network', icon: 'barchart', sub: 'aggregates the business asks for' },
      ],
    },
    {
      id: 'props',
      label: 'What makes a platform of these survive a second team',
      pattern: 'group',
      icon: 'none',
      cols: 4,
      children: [
        { id: 'p-replay', label: 'Replayable', variant: 'tile', pattern: 'service', icon: 'history', sub: 'bronze is never edited' },
        { id: 'p-idem', label: 'Idempotent', variant: 'tile', pattern: 'service', icon: 'repeat', sub: 'overwrite the partition' },
        { id: 'p-contract', label: 'Contracted', variant: 'tile', pattern: 'network', icon: 'scroll', sub: 'schemas are promises' },
        { id: 'p-obs', label: 'Observable', variant: 'tile', pattern: 'storage', icon: 'gauge', sub: 'counts at every hop' },
      ],
    },
    { id: 'why', label: 'Why bronze is immutable', pattern: 'storage', icon: 'lock', sub: 'every later mistake is recoverable by replay' },
  ],
  edges: [
    { source: 'layers', target: 'props', label: 'each layer is a table with a contract, not a step inside one enormous job' },
    { source: 'props', target: 'why' },
  ],
}
