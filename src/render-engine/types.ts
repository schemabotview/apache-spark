// The scene model. A Scene is a declarative graph; the engine computes the layout, so authors
// never hand-place nodes (that keeps a scene deterministic → screenshots are reproducible).
// A scene is content-agnostic and can be SHARED across many slugs (course-section).

export type PatternKey = 'service' | 'storage' | 'network' | 'user' | 'external' | 'group' | 'warn'

export interface SceneNode {
  id: string
  label: string
  pattern?: PatternKey // the card's colour role. Optional for a code node (which paints a neutral IDE surface); every read site falls back (PATTERNS[p] ?? …), so undefined is safe.
  sub?: string // optional second line (e.g. "PostgreSQL"); on a code node it trails as a `# …` comment line
  icon?: string // named lucide glyph key (see lucideIcons.ts); overrides the pattern's default glyph
  variant?: 'card' | 'tile' // 'card' (default): wide icon-left rectangle. 'tile': compact icon-over-label.
  // A CODE node renders as a small IDE-editor card — window chrome + a filename tab + gutter-numbered,
  // syntax-highlighted source — instead of a pattern card. `label` carries the source (newline-separated
  // lines); `filename` names the tab. Size is computed from the content (longest line × line count) and
  // fitView scales it, so it stays crisp at 4K. Ignores `pattern`/`icon`; may still sit in a flow.
  kind?: 'code'
  filename?: string // the tab label on a code node (e.g. "read.py")
  // A node with `children` is a CONTAINER: the engine lays the children out inside it and sizes the
  // box to fit them (a labelled group). Children with no edges stack vertically. Lets a scene show
  // nesting — "AWS Cloud ⊃ services", a Region ⊃ its AZs — instead of faking peers as a flow chain.
  children?: SceneNode[]
  cols?: number // for an edgeless container: wrap children into this many columns (a grid). Default 1.
  // Edges AMONG this container's children. With edges the children FLOW (longest-path) instead of
  // stacking/gridding — so a container can show a mini actor→targets fan (e.g. You → AWS). Ignored
  // (children stack/grid per `cols`) when absent. Reference child ids only.
  edges?: SceneEdge[]
  // Direction of that child flow. 'TB' (top→bottom, default) or 'LR' (left→right — actor on the left,
  // targets fanned right) are the common two; 'BT' (bottom→top) and 'RL' (right→left) are the reverses
  // — same axis, arrows pointing the other way (e.g. an OUTBOUND flow with the internet at the top).
  // Only meaningful with `edges`.
  flow?: 'TB' | 'LR' | 'BT' | 'RL'
}

export interface SceneEdge {
  source: string
  target: string
  label?: string
  // Draw an arrowhead at BOTH ends (and a pulse travelling each way) — for a genuinely two-way
  // relationship (VPC peering, a public subnet's in-and-out internet access) rather than a one-way
  // flow. Default false (single arrow, source → target).
  bidirectional?: boolean
  // Override the arrow ROUTING for this one edge (which node faces it leaves/enters), independent of
  // the container/scene flow — e.g. two side-by-side nodes in a TB flow whose edge should run 'LR'.
  // Positioning is unaffected; only the drawn arrow's handles change. Defaults to the flow direction.
  dir?: 'TB' | 'LR' | 'BT' | 'RL'
}

export interface Scene {
  id: string
  title?: string
  nodes: SceneNode[]
  edges: SceneEdge[]
  // For an edgeless scene (top-level nodes are peers): wrap them into this many columns (a grid) so a
  // wide/short layout fills a landscape pane. Default 1 (a vertical stack). Ignored when edges exist.
  cols?: number
  // Direction of the scene's top-level flow (with `edges`): 'TB' (default) · 'LR' · 'BT' (bottom→top,
  // e.g. an outbound flow with the internet drawn at the top) · 'RL'. Same as a container's `flow`.
  flow?: 'TB' | 'LR' | 'BT' | 'RL'
  // Optional fitView padding for THIS scene only — the fraction of the pane kept as margin around the
  // content (0–1, default 0.12). A sparse scene (few, large elements) otherwise fills the pane so its
  // icons/labels read bigger than a dense scene's; raise this (e.g. 0.28) to give it more air so its
  // elements match the rest of the deck. Resolution-independent: identical fraction at 1080p and 4K.
  padding?: number
}
