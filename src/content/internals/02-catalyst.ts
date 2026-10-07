import type { Section } from '../types'

export const catalyst: Section = {
  id: 'catalyst',
  title: 'The Catalyst optimizer',
  scene: 'catalyst-phases',
  focus: 'rewrite',
  slide: `## The Catalyst optimizer

Catalyst is a **tree rewriter**. Hold that and the four phases stop being a list to memorise.

### The four phases
1. **Analysis** — resolve names and types against the catalog. \`country\` becomes a real column
2. **Logical optimization** — rule-based rewrites on the tree. Pushdown, pruning, folding
3. **Physical planning** — choose strategies, compare candidates by cost
4. **Code generation** — emit Java for the chosen plan and compile it at runtime

### Every phase takes a tree and returns a tree
- A rule is a **pattern match plus a replacement** on a subtree. Nothing more
- Which is why rules compose, why order matters less than you'd think, and why anyone can add one

### What comes out the far end
- RDDs of tasks — the partitions, stages and tasks of chapter 2`,
  narration:
    'Catalyst is Spark\'s query optimiser, and if you take one thing from this section, take this: it is a tree rewriter. Everything else follows from that. A query is a tree. Each phase of Catalyst takes a tree and gives back a different tree. And an optimisation is not a special case buried in the engine; it is a rule, and a rule is a pattern match plus a replacement. Find a Filter sitting above a Scan, replace it with a Scan that carries the filter. That is a real rule and it is about that simple. There are four phases. Phase one is analysis. The tree that comes out of the parser is unresolved: it has the name country in it, but it does not yet know whether that is a real column, or which table it belongs to, or what type it is. Analysis walks the tree, looks names up in the catalog, attaches types, and fails if something does not exist. This is why a typo in a column name fails immediately rather than after an hour of computation. Phase two is logical optimisation, which is the rule-based phase, and the next section is entirely about it. Predicate pushdown, column pruning, constant folding — dozens of rules applied to the tree. Phase three is physical planning. Now we are choosing methods: for each logical operation there may be several physical implementations, and Spark generates candidates and picks between them using a cost model. That is section four. Phase four is code generation, where the chosen physical plan is turned into actual Java source, compiled at runtime, and run. That is section six, and it is stranger and more effective than it sounds. Two things to notice about the shape of all this. The first is that because every phase is tree-in, tree-out, the phases compose cleanly and anyone can add a rule — which is how Spark picked up new optimisations for years without rewriting the engine. The second is where this comes out: the far end of phase four is RDDs of tasks. Partitions, stages, tasks, exactly as chapter two described them. You never left that model. And one more thing worth saying plainly: the DataFrame API and a SQL string are parsed into the same tree before any of this starts, which is why chapter three could tell you there is no performance difference between them. Next, the rules themselves.',
}
