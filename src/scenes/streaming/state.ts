import type { Scene } from '@graphlearning/flow'

// §7 state — genuine NESTING, because the claim is containment: state lives IN the executor, in a
// store, keyed. People picture state as something Spark keeps somewhere central and are then
// surprised that it is partitioned exactly like the data and that an executor dying loses its share
// (which is what the checkpoint in §8 is for).
//
// The table is the operational content: which operations keep state and what makes it grow. Every
// row of "what bounds it" is a watermark except the last, and the last one is the trap — a
// dropDuplicates without a watermark keeps every key it has ever seen, forever.
export const state: Scene = {
  id: 'state',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'where',
      label: 'State is partitioned exactly like your data — there is no central store',
      pattern: 'group',
      icon: 'none',
      cols: 2,
      align: 'start',
      children: [
        {
          id: 'e1',
          label: 'Executor',
          pattern: 'service',
          icon: 'box',
          cols: 1,
          children: [
            {
              id: 'e1-store',
              label: 'State store — the keys THIS task owns',
              pattern: 'storage',
              icon: 'database',
              cols: 3,
              children: [
                { id: 's1', label: 'FR', variant: 'chip', pattern: 'storage', icon: 'none' },
                { id: 's2', label: 'DE', variant: 'chip', pattern: 'storage', icon: 'none' },
                { id: 's3', label: 'ES', variant: 'chip', pattern: 'storage', icon: 'none' },
              ],
            },
          ],
        },
        {
          id: 'e2',
          label: 'Executor',
          pattern: 'service',
          icon: 'box',
          cols: 1,
          children: [
            {
              id: 'e2-store',
              label: 'State store — a different slice of the keys',
              pattern: 'storage',
              icon: 'database',
              cols: 3,
              children: [
                { id: 's4', label: 'US', variant: 'chip', pattern: 'storage', icon: 'none' },
                { id: 's5', label: 'IT', variant: 'chip', pattern: 'storage', icon: 'none' },
                { id: 's6', label: 'NL', variant: 'chip', pattern: 'storage', icon: 'none' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'ops',
      kind: 'table',
      label: 'What keeps state, and what stops it growing forever',
      sub: 'every bound is a watermark — except the last row, which has none',
      pattern: 'service',
      headers: ['Operation', 'Holds', 'What bounds it'],
      values: [
        ['Windowed aggregation', 'one row per open window', 'the watermark closes them'],
        ['Stream-stream join', 'both sides, until matched', 'watermarks on BOTH sides'],
        ['dropDuplicates', 'every key ever seen', 'NOTHING, unless you watermark it'],
        ['flatMapGroupsWithState', 'whatever you put there', 'your timeout — set one'],
      ],
    },
    { id: 'grow', label: 'Unbounded state kills', pattern: 'warn', icon: 'skull', sub: 'not today — next Tuesday' },
  ],
  edges: [
    { source: 'where', target: 'ops', label: 'lose an executor and you lose its slice of the state — which is what §8 exists for' },
    { source: 'ops', target: 'grow' },
  ],
}
