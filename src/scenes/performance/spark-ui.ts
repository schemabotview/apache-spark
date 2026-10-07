import type { Scene } from '@graphlearning/flow'

// §9 spark-ui — the chapter's bookend and its only real deliverable: a METHOD. Everything before
// this was a technique; this is the order you apply them in when something is slow and you do not
// yet know why.
//
// The table is deliberately symptom-first, because that is the direction a reader arrives from. They
// do not come asking "how does skew work", they come asking "why is this stage taking forty minutes",
// and a reference organised by cause cannot answer that.
export const sparkUi: Scene = {
  id: 'spark-ui',
  padding: 0.11,
  flow: 'TB',
  nodes: [
    {
      id: 'method',
      label: 'The order to do it in — never start by changing a config',
      pattern: 'group',
      icon: 'none',
      cols: 4,
      children: [
        { id: 'm-stage', label: '1 · Slowest stage', variant: 'tile', pattern: 'service', icon: 'search', sub: 'sort by duration' },
        { id: 'm-tasks', label: '2 · Task summary', variant: 'tile', pattern: 'service', icon: 'gauge', sub: 'min, median, max' },
        { id: 'm-why', label: '3 · Name the cause', variant: 'tile', pattern: 'network', icon: 'brain', sub: 'from the table below' },
        { id: 'm-one', label: '4 · Change ONE thing', variant: 'tile', pattern: 'storage', icon: 'circlecheck', sub: 'then measure again' },
      ],
    },
    {
      id: 'symptoms',
      kind: 'table',
      label: 'What the numbers are telling you',
      sub: 'read it from the left — this is the direction you arrive from',
      pattern: 'service',
      headers: ['Symptom in the UI', 'Almost always'],
      values: [
        ['Max task time ≫ median', 'skew — §5'],
        ['Spill (memory) and Spill (disk) non-zero', 'partitions too large — §1'],
        ['Thousands of tiny tasks', 'too many partitions — §1, §2'],
        ['Huge Shuffle Read on one stage', 'a join that should have broadcast — §3'],
        ['Long GC time in the executor tab', 'heap too small, or caching too much — §4, §8'],
        ['A stage with no `*(n)` in its plan', 'a UDF broke codegen — §6'],
      ],
    },
    { id: 'done', label: 'Next', pattern: 'user', icon: 'waves', sub: 'the same engine, on data that never ends' },
  ],
  edges: [
    { source: 'method', target: 'symptoms', label: 'two of those four steps are looking; only the last one changes anything' },
    { source: 'symptoms', target: 'done' },
  ],
}
