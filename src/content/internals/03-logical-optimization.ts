import type { Section } from '../types'

export const logicalOpt: Section = {
  id: 'logical-optimization',
  title: 'Logical optimization',
  scene: 'logical-rules',
  focus: 'blind',
  slide: `## Logical optimization

The rule-based phase. Every one of these is work people still do by hand out of habit from systems that did not do it for them.

### The rules that matter
- **Predicate pushdown** — filters move toward the scan, and into it where the format allows
- **Column pruning** — only referenced columns are read off disk
- **Constant folding** — \`60 * 60\` is evaluated once, at plan time, not per row

### They run to a fixed point
- The rules are applied over and over until a pass changes nothing
- Because one rewrite exposes the next: folding a branch can make a column unreferenced, which then lets pruning drop it

### What stops all of it
- A **UDF**. Catalyst cannot match a pattern it cannot see inside, so nothing moves across it`,
  narration:
    'Logical optimisation is the rule-based phase, and the striking thing about the list is how much of it is work that people still do by hand, out of habit learned on systems that did not do it for them. Predicate pushdown is first because it has the biggest effect. Filters move down the tree, toward the scan — and where the file format supports it, into the scan. We saw this in section one: the filter ended up inside FileScan as a PushedFilter, which means Parquet can use its per-block statistics to skip whole chunks of the file without decoding them. The practical consequence is that writing your filter at the end of a long chain is fine. Spark will move it. You do not need to carefully order your operations for performance, which is the habit most people bring with them. Column pruning is second. Spark works out which columns are actually referenced anywhere in the plan and reads only those off disk. If you select three columns from a fifty-column Parquet file, forty-seven of them are never read. Again: you do not need to write a defensive select at the top of your pipeline. Constant folding evaluates expressions that do not depend on the data, once, at plan time. If you write sixty times sixty, Spark computes thirty-six hundred when it plans and never again. Combine filters merges adjacent filters into one. Boolean simplification collapses conditions that are always true or always false. Limit pushdown stops a scan early when there is a limit above it — which is why calling show on a huge DataFrame returns quickly instead of computing everything and then throwing it away. Now, the part that is less obvious and worth understanding. These rules are not applied once in a fixed order. They run to a fixed point: the whole set is applied repeatedly until a full pass changes nothing. The reason is that rewrites expose each other. Folding a constant can make a branch always-false; simplifying that branch can remove a reference to a column; and now pruning can drop that column from the scan. None of those steps could have happened first. Finally, the thing that stops all of it, and it is worth saying here because it lands differently from this side. A user-defined function is opaque. Catalyst matches patterns on the tree, and a UDF is a node whose contents it cannot inspect. So no filter moves across it, no column is pruned through it, and nothing is folded inside it. Chapter four told you a UDF costs you a serialisation boundary. From here you can see the other half: it is a wall your optimiser cannot see through. Next: choosing how, rather than what.',
}
