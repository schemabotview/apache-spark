import type { Scene } from '@graphlearning/flow'

// §2 — ship code to data. One inversion, drawn as a before/after, because it is the whole idea.
//
// EDGE LABELS REMOVED from the two inner edges. A label pill is laid over the edge MIDPOINT, and
// on a HORIZONTAL edge its width eats the edge's length: these edges are 64px and the pills were
// 105px and 97px, so the pill covered the line and both arrowheads. The band-to-band edge keeps its
// label only because it is VERTICAL — a wide pill crosses a vertical line rather than running along
// it. The arrow direction is the whole content of this scene, so it wins over the annotation; the
// terabyte/kilobyte contrast is already in both band subs and in the slide.
//
// TWO nodes per band, not three. The same pair — "the data" and "the program" — appears in both,
// and only the ARROW changes direction. That is what an inversion is, and three nodes a side buried
// it: the eye had to compare two different shapes instead of one shape twice. The network is no
// longer a node either; it is the edge, which is where a thing that is crossed belongs, and its
// label carries the volume that makes the point (a terabyte vs kilobytes).
export const shipCodeToData: Scene = {
  id: 'origins-ship-code',
  padding: 0.13,
  flow: 'TB',
  nodes: [
    {
      id: 'old',
      label: 'The old shape — bring the data to the program',
      pattern: 'warn',
      sub: 'works until the data is bigger than the pipe: a terabyte over a gigabit link is hours before any work starts',
      flow: 'LR',
      children: [
        { id: 'o-store', icon: 'database', label: 'the data', pattern: 'storage', sub: 'all of it, in one storage array' },
        { id: 'o-cpu', icon: 'server', label: 'the program', pattern: 'service', sub: 'one big server, all the compute' },
      ],
      edges: [{ source: 'o-store', target: 'o-cpu' }],
    },
    {
      id: 'new',
      label: 'The inversion — send the program to the data',
      pattern: 'service',
      flow: 'RL',
      sub: 'the program is kilobytes and the data is terabytes, so move the small thing — GFS and MapReduce, Google, 2003–04',
      children: [
        // `boxes`, not `database`: the data is no longer one array but a block per machine, and the
        // glyph is the only place that reads before the sub line does.
        { id: 'n-code', icon: 'code', label: 'the program', pattern: 'service', sub: 'kilobytes, copied to every machine' },
        { id: 'n-data', icon: 'boxes', label: 'the data', pattern: 'storage', sub: 'blocks, spread across the machines' },
      ],
      edges: [{ source: 'n-code', target: 'n-data' }],
    },
  ],
  edges: [{ source: 'old', target: 'new', label: 'move the kilobytes, not the terabytes' }],
}
