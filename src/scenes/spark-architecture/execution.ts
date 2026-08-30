import type { Scene } from '../../render-engine'

// arch-execution — the second shared scene of the course (job-decomposes + shuffle-boundary). Where
// arch-topology shows WHO runs a job, this shows HOW a job is broken down: an ACTION on your code
// compiles to one JOB, the DAG scheduler cuts it into STAGES at each shuffle, and every stage fans
// out into TASKS — one per partition. Our job has a single shuffle, so it splits into two stages:
// Stage 0 does the narrow map/filter work (4 partitions → 4 tasks), the shuffle redistributes, and
// Stage 1 finishes the aggregation (2 shuffle partitions → 2 tasks). The SHUFFLE bar is a `warn`
// node so it carries the "most expensive boundary" emphasis the shuffle-boundary section leans on;
// that section's narrow-vs-wide detail rides its slide, not a scene change (both sections share this
// one solid scene). No code-card renderer in this engine — the code line is a plain filecode node.
export const execution: Scene = {
  id: 'arch-execution',
  padding: 0.15,
  flow: 'TB',
  nodes: [
    // Label kept short + broken at the chain dot: a leaf card is a fixed 210px and won't wrap an
    // unbreakable token, so the full `df.filter(…).groupBy(…).count()` spilled past the border. The
    // space lets it wrap to two lines; `filter` lives on the slide, `groupBy` stays because it is
    // what earns the SHUFFLE below.
    { id: 'code', label: 'df.groupBy(…) .count()', pattern: 'network', icon: 'filecode', sub: 'an action → one job' },
    {
      id: 'job',
      label: 'Job',
      pattern: 'group',
      sub: 'one action → one job → stages → tasks',
      children: [
        {
          id: 'stage-0', label: 'Stage 0', pattern: 'service', sub: 'narrow · map/filter · one task per partition',
          cols: 2,
          children: [
            { id: 's0-t1', label: 'task', pattern: 'external', sub: 'part 0' },
            { id: 's0-t2', label: 'task', pattern: 'external', sub: 'part 1' },
            { id: 's0-t3', label: 'task', pattern: 'external', sub: 'part 2' },
            { id: 's0-t4', label: 'task', pattern: 'external', sub: 'part 3' },
          ],
        },
        { id: 'shuffle', label: 'SHUFFLE', pattern: 'warn', icon: 'router', sub: 'redistribute · stage boundary' },
        {
          id: 'stage-1', label: 'Stage 1', pattern: 'service', sub: 'after shuffle · one task per shuffle partition',
          cols: 2,
          children: [
            { id: 's1-t1', label: 'task', pattern: 'external', sub: 'part 0' },
            { id: 's1-t2', label: 'task', pattern: 'external', sub: 'part 1' },
          ],
        },
      ],
      edges: [
        { source: 'stage-0', target: 'shuffle' },
        { source: 'shuffle', target: 'stage-1' },
      ],
    },
  ],
  edges: [{ source: 'code', target: 'job', label: 'submits' }],
}
