import type { Section } from '../types'

export const catalystLogical: Section = {
  id: 'catalyst-logical',
  title: 'The logical plan: analyze, then optimize',
  scene: 'catalyst',
  slide: `## The logical plan: analyze, then optimize

The logical half answers **what** to compute — first make the plan *correct*, then make it *lean*.

### Analysis — make it correct
- The unresolved plan knows the *shape* but not the *meaning* — is \`users\` a real table? does \`age\` exist?
- Analysis binds every name & type against the **catalog**
- Errors surface **here** — an unknown column fails before any work runs

### Logical optimization — make it lean
- A library of **rule-based** rewrites, applied until the plan stops changing
- **Predicate pushdown** — filter as early as possible, even into the data source
- **Column pruning** — read only the columns the query actually needs
- **Constant folding** — evaluate constant expressions once, up front

### Why it’s rule-based
- These rewrites are **always safe, always cheaper** — no data needed to decide`,
  narration:
    'Let’s take the logical half first — the part that works out what to compute. It starts from that unresolved plan, which knows the shape of your query but not its meaning: it doesn’t yet know whether "users" is a real table, or whether the column "age" actually exists. So the first step is analysis. Spark walks the plan and binds every name and type against the catalog — its directory of tables, columns, and their types — producing an analyzed plan. A nice side effect is that this is where mistakes get caught: if you reference a column that doesn’t exist, it fails right here, cleanly, before a single task is scheduled. Once the plan is correct, logical optimization makes it lean. Catalyst applies a whole library of rewrite rules, over and over until the plan stops changing. The classic ones are worth knowing: predicate pushdown moves your filters as early as possible — ideally all the way down into the data source, so you never even read rows you’ll throw away; column pruning makes Spark read only the columns your query touches; and constant folding evaluates constant expressions once, up front, instead of per row. The reason all of this lives in the logical half is that these rewrites are always safe and always cheaper — Spark doesn’t need to look at your data to know they help, so it just applies them. The genuinely data-dependent decisions come later. At this point the plan is both correct and minimal — but it’s still abstract; it says what to do, not how. Turning it into real execution is the physical half, and that’s next.',
}
