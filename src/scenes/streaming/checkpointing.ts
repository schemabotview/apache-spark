import type { Scene } from '@graphlearning/flow'

// The three directory cards are TILES: as prose cards they measured 976px across, which pinned the
// board at scale 1.03 and left the restart table — the most operationally useful thing in the
// chapter — at 15px.
//
// §8 checkpointing — NESTING again, and for the same reason as §7: a checkpoint is a directory with
// things inside it, and knowing WHICH things is what makes the restart rules make sense rather than
// seem arbitrary. Offsets are why it can resume; state is why the resume is correct; the metadata is
// why some edits are refused.
//
// The restart table is the most operationally valuable thing in the chapter. Every row of "refused"
// is a change somebody makes on a Tuesday afternoon, restarts, and gets an error they then solve by
// deleting the checkpoint — which silently discards their state and reprocesses from scratch. Say
// what is safe BEFORE they find out the other way.
export const checkpointing: Scene = {
  id: 'checkpointing',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'dir',
      label: 'checkpointLocation/ — and it is not optional',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      align: 'start',
      children: [
        { id: 'c-offsets', variant: 'tile', label: 'offsets/', pattern: 'storage', icon: 'folder', sub: 'how far it read — why it can resume' },
        { id: 'c-state', variant: 'tile', label: 'state/', pattern: 'service', icon: 'database', sub: 'open windows — why the resume is correct' },
        { id: 'c-meta', variant: 'tile', label: 'metadata/', pattern: 'network', icon: 'scroll', sub: 'the query id and its plan' },
      ],
    },
    {
      id: 'restart',
      kind: 'table',
      label: 'What you may change and still restart on the same checkpoint',
      sub: 'a refused change is not a bug — it is Spark protecting state it can no longer interpret',
      pattern: 'service',
      headers: ['Change', 'Restart?', 'Why'],
      values: [
        ['A filter, a projection, a literal', 'fine', 'no state is shaped by it'],
        ['The sink, or its path', 'fine', 'offsets and state are unaffected'],
        ['Trigger interval', 'fine', 'it only paces the loop'],
        ['Adding or removing an aggregation', 'REFUSED', 'the stored state no longer matches'],
        ['Changing the grouping keys', 'REFUSED', 'the state is keyed by the old ones'],
        ['The source, or its topic', 'REFUSED', 'stored offsets mean nothing now'],
      ],
    },
    { id: 'wipe', label: 'Deleting it is not a fix', pattern: 'warn', icon: 'trash', sub: 'you just threw away all your state' },
  ],
  edges: [
    { source: 'dir', target: 'restart', label: 'put it on durable storage — a checkpoint on local disk survives nothing' },
    { source: 'restart', target: 'wipe', label: 'the usual response to a refused restart, and it silently reprocesses from the beginning' },
  ],
}
