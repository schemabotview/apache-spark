import type { Section } from '../types'

export const theEngine: Section = {
  id: 'the-engine',
  title: 'The engine: Catalyst & Tungsten',
  scene: 'api-engine',
  slide: `## The engine: Catalyst & Tungsten

Between what you *declare* and what actually *runs* sits the engine — it turns your query into an **optimized plan**, then into **fast code**.

### Catalyst — the query optimizer
- Turns your query into a **logical plan** — a tree of *what* to do — then optimizes it
- Applies **rules** — filter pushdown, column pruning, constant folding — to cut wasted work
- Picks the cheapest **physical plan** — the concrete *how* to run it

### Tungsten — the execution backend
- Compiles the chosen plan into tight **JVM bytecode** — *whole-stage code generation*
- Works in **off-heap**, binary memory — no boxed objects, cache-friendly
- Emits the physical work as **RDDs** — back down to the core we started from

**The payoff:** you say *what*, the engine works out *how* — one engine serving **DataFrame, Dataset, and SQL** identically, often beating hand-written RDD code.`,
  narration:
    'So how does a declarative query actually become work the cluster can run? That’s the job of the engine sitting in the middle of the stack, and it does it in two moves. The first move belongs to Catalyst, the query optimizer. It takes your structured query and turns it into a logical plan — a tree describing what you want, not yet how to get it — and then it rewrites that tree using a library of rules: pushing filters down so you read less data, pruning columns you never reference, folding constants, and so on, all to strip out wasted work. From there it weighs the options and picks the cheapest physical plan — the concrete how, like which join algorithm or which scan to use. The second move belongs to Tungsten, the execution backend. It takes that chosen plan and compiles it down into tight JVM bytecode — an idea called whole-stage code generation — and it runs on off-heap, binary memory rather than boxed Java objects, which is far friendlier to the CPU cache. What it emits is ordinary RDDs, running on the cluster — the very core we started this course at. The payoff of all this is the whole point of the structured APIs: you say what you want, the engine figures out how, and it routinely beats code you’d hand-write against RDDs yourself — and it does this identically whether you came in through a DataFrame, a Dataset, or SQL. Plan, then compile — those two moves are worth watching in motion, so let’s leave the stack for a moment and open the engine up.',
}
