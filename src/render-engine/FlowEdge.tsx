// A "flow" edge: the static line + arrow, plus a pulse of light that travels source → target so the
// path reads as live traffic (user → igw → lb → ec2 → rds). The pulse is tinted to the destination
// node's pattern colour (passed in via edge `data.pulse`), so arriving at a service lights up in
// that service's accent.
//
// THE LABEL. Edges are SVG, so a styled label can't live inside the path — react-flow's
// `EdgeLabelRenderer` is a portal that drops HTML into a div layered above the edge layer but INSIDE
// the viewport transform, so a label pans and zooms with the graph and fitView scales it with
// everything else. `getBezierPath` hands back the midpoint of the curve it just drew, which is where
// the chip is centred. The chip paints the page background behind the text so the line doesn't strike
// through the words, and wraps at a max width so a long label stacks instead of running off the pane.
//
// Capture note: the pulse is SVG <animateMotion>, i.e. motion over time. A single-frame screenshot
// freezes it at one position; the base line + arrow always render, so static capture degrades
// cleanly. Getting the motion into the composited video is a capture-pipeline concern, not here.
// The LABEL has no such caveat — it is static DOM inside the normal viewport transform, so it
// screenshots exactly like a node card, and being HTML text it stays crisp at the 4K capture size.

import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react'

export function FlowEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  markerStart,
  style,
  label,
  data,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  })
  const d = data as { pulse?: string; bidirectional?: boolean } | undefined
  const pulse = d?.pulse ?? '#7dd3fc'

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} markerStart={markerStart} style={style} />
      <circle r={4.5} fill={pulse} opacity={0.9} filter="url(#flow-pulse-glow)">
        <animateMotion dur="2.4s" repeatCount="indefinite" path={edgePath} rotate="auto" />
      </circle>
      {/* A two-way edge gets a second pulse travelling the other way (end → start). */}
      {d?.bidirectional && (
        <circle r={4.5} fill={pulse} opacity={0.9} filter="url(#flow-pulse-glow)">
          <animateMotion
            dur="2.4s"
            repeatCount="indefinite"
            path={edgePath}
            rotate="auto"
            keyPoints="1;0"
            keyTimes="0;1"
            calcMode="linear"
          />
        </circle>
      )}
      {/* Centred on the curve's midpoint. 13px matches a node card's `sub` line, so an edge reads as
          annotation on the diagram rather than competing with the cards' 18px labels. */}
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              maxWidth: 200,
              padding: '3px 8px',
              borderRadius: 6,
              background: '#1a1d23', // --bg: hides the line behind the text
              color: '#aeb6c4',
              fontSize: 13,
              fontWeight: 500,
              lineHeight: 1.25,
              textAlign: 'center',
              pointerEvents: 'none', // annotation only — never swallow a click meant for a node
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  )
}
