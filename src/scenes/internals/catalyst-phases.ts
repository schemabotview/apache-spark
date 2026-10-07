import type { Scene } from '@graphlearning/flow'

// §2 catalyst-phases — the four-phase pipeline, as TILES rather than cards. Four prose cards across
// is ~1300px against a 1114px pane and would scale the board down (chapter 4 §9's lesson, learned
// the expensive way); tiles size to their own content and fit comfortably.
//
// The claim worth landing is the one in the bottom card: Catalyst is a TREE REWRITER. Every phase
// takes a tree and returns a tree, and an optimisation is a pattern match plus a replacement. That
// is why the optimiser is extensible and why its rules compose — and it is the frame that makes §3
// and §4 feel like one idea instead of two lists.
export const catalystPhases: Scene = {
  id: 'catalyst-phases',
  padding: 0.12,
  flow: 'TB',
  nodes: [
    {
      id: 'phases',
      label: 'Four phases, and every one of them turns a tree into another tree',
      pattern: 'group',
      icon: 'none',
      cols: 4,
      children: [
        { id: 'ph-analysis', label: '1 · Analysis', variant: 'tile', pattern: 'network', icon: 'scanface', sub: 'resolve names and types' },
        { id: 'ph-logical', label: '2 · Logical opt', variant: 'tile', pattern: 'service', icon: 'brain', sub: 'rule-based rewrites' },
        { id: 'ph-physical', label: '3 · Physical plan', variant: 'tile', pattern: 'service', icon: 'workflow', sub: 'pick strategies, by cost' },
        { id: 'ph-codegen', label: '4 · Codegen', variant: 'tile', pattern: 'storage', icon: 'code', sub: 'emit Java, compile it' },
      ],
    },
    {
      id: 'inout',
      label: 'What goes in and what comes out',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'io-sql', label: 'Your query', pattern: 'user', icon: 'code', sub: 'DataFrame API or SQL — same tree' },
        { id: 'io-plan', label: 'A plan tree', pattern: 'network', icon: 'gitbranch', sub: 'rewritten, phase by phase' },
        { id: 'io-rdd', label: 'RDDs of tasks', pattern: 'storage', icon: 'boxes', sub: 'chapter 2, all the way down' },
      ],
    },
    { id: 'rewrite', label: 'A rule is a rewrite', pattern: 'service', icon: 'repeat', sub: 'match a pattern, replace the subtree' },
  ],
  edges: [
    { source: 'phases', target: 'inout' },
    { source: 'inout', target: 'rewrite', label: 'which is why rules compose, and why anyone can add one' },
  ],
}
