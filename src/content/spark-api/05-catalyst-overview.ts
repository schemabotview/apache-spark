import type { Section } from '../types'

export const catalystOverview: Section = {
  id: 'catalyst-overview',
  title: 'Catalyst: how a query compiles',
  scene: 'catalyst',
  slide: `## Catalyst: how a query compiles

Every structured query — DataFrame, Dataset, or SQL — takes the **same trip** through Catalyst before it runs.

### From query to a logical plan
- Your query becomes an **unresolved logical plan** — the shape, with names not yet bound
- **Analysis** resolves names & types against the **catalog** → an *analyzed* plan
- **Logical optimization** applies rules → a leaner *optimized* plan

### From logic to physical execution
- **Physical planning** turns it into several candidate **physical plans**
- A **cost model** scores each and keeps the cheapest — the **selected plan**
- **Whole-stage codegen** (Tungsten) compiles it into **RDDs** that run on the cluster

### Why one pipeline matters
- DataFrame, Dataset, and SQL all converge here — **same optimizer, same speed**
- You get the optimization *for free*, just by writing structured code`,
  narration:
    'Let’s step off the stack and into the engine itself, because Catalyst is where the magic actually happens. The key thing to hold onto is that every structured query takes exactly the same trip through here — it doesn’t matter whether you wrote a DataFrame, a Dataset, or a line of SQL; they all converge into this one pipeline. It runs in two halves. The first half is all about logic. Your query first becomes an unresolved logical plan — it captures the shape of what you asked for, but the names aren’t bound yet; Spark doesn’t yet know that “users” is a real table or that a column exists. So it runs analysis, checking those names and types against the catalog — Spark’s directory of tables, columns, and their types — and that produces an analyzed plan. Then logical optimization kicks in, applying a whole library of rewrite rules — pushing filters down, pruning unused columns, folding constants — to turn it into a leaner optimized plan. That finishes the logical half: we now know exactly what to compute. The second half decides how. Physical planning takes that optimized plan and generates several candidate physical plans — different concrete strategies, like different join algorithms. A cost model then estimates each one and keeps the cheapest, giving the selected plan. And finally, whole-stage code generation — that’s Tungsten — compiles the chosen plan straight down into JVM bytecode that runs as RDDs on the cluster. The payoff of this whole machine is that you get it for free: DataFrame, Dataset, and SQL all flow through the same optimizer and reach the same speed, just because you wrote structured code. So there are two halves here — plan the logic, then choose and compile the physical — and we’ll walk each one in turn, starting with the logical.',
}
