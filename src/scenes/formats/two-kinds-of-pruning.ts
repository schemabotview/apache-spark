import type { Scene } from '@graphlearning/flow'

export const twoKindsOfPruning: Scene = {
  id: 'fmt-two-prunings',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'ladder',
      label: 'Four things the reader gets to skip, coarsest first',
      pattern: 'network',
      sub: 'each rung is cheaper than the one below it, because it is decided with less information read',
      children: [
        { id: 'p-dir', icon: 'folder', label: '1 · whole directories', pattern: 'service', sub: 'partition pruning — from the path alone' },
        { id: 'p-file', icon: 'file', label: '2 · whole files', pattern: 'service', sub: 'from the footer, without reading data' },
        { id: 'p-group', icon: 'layers', label: '3 · row groups', pattern: 'network', sub: 'from min/max in the footer' },
        { id: 'p-page', icon: 'scroll', label: '4 · pages', pattern: 'network', sub: 'from the page index, if present' },
      ],
      edges: [
        { source: 'p-dir', target: 'p-file' },
        { source: 'p-file', target: 'p-group' },
        { source: 'p-group', target: 'p-page' },
      ],
    },
    {
      id: 'left',
      framed: true,
      label: 'And only then, what is left',
      pattern: 'warn',
      icon: 'funnel',
      sub: 'the filter finally runs on rows — on whatever survived all four',
    },
  ],
  edges: [{ source: 'ladder', target: 'left' }],
}
