// A compact "tile" node: icon on top, label beneath (the AWS-architecture-diagram convention). No
// box/border/fill — the AWS service icon is already a self-contained coloured tile, so extra card
// chrome would just be noise. Used for leaf services inside a container. Handles are transparent.

import { type NodeProps } from '@xyflow/react'
import { PATTERNS } from './patterns'
import { NodeIcon } from './NodeIcon'
import { NodeHandles } from './Handles'
import type { SceneNode as SceneNodeData } from './types'

export function TileNode({ data }: NodeProps) {
  const d = data as unknown as SceneNodeData & { __focus?: boolean }
  const p = PATTERNS[d.pattern] ?? PATTERNS.service
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        color: '#eef2f8',
        fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <NodeHandles />
      <NodeIcon icon={d.icon} pattern={p} size={46} />
      <div style={{ textAlign: 'center', minWidth: 0 }}>
        <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.15 }}>{d.label}</div>
        {d.sub && <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>{d.sub}</div>}
      </div>
    </div>
  )
}
