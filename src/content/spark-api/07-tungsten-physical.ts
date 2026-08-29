import type { Section } from '../types'

export const tungstenPhysical: Section = {
  id: 'tungsten-physical',
  title: 'The physical plan: choose, then compile',
  scene: 'catalyst',
  slide: `## The physical plan: choose, then compile

The physical half answers **how** to run it — pick the cheapest strategy, then compile it to code.

### Physical planning — many candidates
- One optimized logical plan → several candidate **physical plans**
- Different concrete strategies — e.g. a **broadcast** vs a **sort-merge** join

### Cost model — pick the cheapest
- Spark estimates each candidate using **statistics** — row counts, sizes
- Keeps the lowest-cost one — the **selected plan**
- This step is **cost-based** (unlike the always-safe logical rules)

### Whole-stage codegen — Tungsten
- Rather than interpret the plan operator-by-operator, Tungsten fuses a stage into **one tight function**
- Runs on **off-heap, binary memory** — no per-row object overhead, cache-friendly
- The output is **RDDs**, run on the cluster — right where the *architecture* course began`,
  narration:
    'Now the physical half, which decides how to actually run that optimized plan. The first step is physical planning, and the key idea is that a single logical plan can be executed in more than one way. So Catalyst generates several candidate physical plans — concrete strategies that would all produce the same answer. The classic example is a join: Spark could broadcast a small table to every node and hash-join it, or it could sort both sides and merge them — same result, very different performance depending on the data. That’s why the next step, the cost model, matters. Unlike the logical rules, which were always safe, this choice genuinely depends on your data — so Spark uses statistics like row counts and table sizes to estimate the cost of each candidate, and keeps the cheapest one. That’s the selected plan. Then comes the part that makes modern Spark fast: whole-stage code generation, which is Tungsten’s job. Instead of walking the plan operator by operator, interpreting each step for every row, Tungsten fuses an entire stage into a single tight function — compiled JVM bytecode — and runs it against off-heap, binary memory rather than boxed Java objects, which keeps the CPU cache happy and cuts out per-row overhead. And what that generated code produces is ordinary RDDs, executed across the cluster — which is exactly where the architecture course began, with tasks running in executor slots. So follow the whole trip: from what you want, to how to do it, to machine code, to RDDs on the cluster — all from a single line of structured query, and routinely faster than the low-level code you’d write by hand.',
}
