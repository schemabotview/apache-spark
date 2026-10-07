import type { Section } from '../types'

export const plans: Section = {
  id: 'plans',
  title: 'Logical and physical plans',
  scene: 'what-vs-how',
  focus: 'gap',
  slide: `## Logical and physical plans

Four chapters have been promising Catalyst. Here it is — and the way in is to look at the same query twice.

### Two plans, two questions
- The **logical plan** says *what* you asked for: filter, group, sum. No method, no machines
- The **physical plan** says *how* Spark will do it: scan, exchange, hash-aggregate

### Read the two on the left and spot the differences
- The filter is **gone** from the middle — it ended up inside \`FileScan\` as a \`PushedFilter\`
- The aggregate became **two**: a partial one before the shuffle, a final one after
- An \`Exchange\` appeared, which is the shuffle you did not write

### Everything in that gap is Catalyst
- You wrote three operations; Spark is running six, and none of the changes were your idea`,
  narration:
    'We have been promising this chapter since chapter three. Every time something optimised your query, I said Catalyst does that and we will come back to it. Here it is. And the way into it is not a diagram of an architecture; it is to look at the same query twice. Look at the two plans on the left. They are the same query: filter orders over a hundred, group by country, sum the total. The top one is the logical plan, and it says what you asked for. Three nodes: a relation at the bottom, a filter, an aggregate. That is your code, as a tree, and nothing in it mentions machines, or methods, or the shuffle. The bottom one is the physical plan, and it says how Spark is actually going to do it. Now compare them, because the differences are the whole chapter. First: the filter has vanished from the middle. Look at the bottom of the physical plan and you will find it, inside the FileScan node, as something called a PushedFilter. Spark has moved the comparison into the file reader itself, so Parquet can skip entire blocks without handing them up. Second: there is one aggregate in the logical plan and two in the physical one. Spark has split it into a partial aggregation that runs before data moves, and a final one after. That is the combine-before-you-shuffle rule from chapter three, applied automatically on your behalf. Third, and this is the one that matters most for reading plans: a node called Exchange has appeared in the middle. That is the shuffle. You did not write it; grouping by country requires it; Spark inserted it. So you wrote three operations and Spark is running six, and not one of those changes was your idea. The gap between those two plans is the optimiser, and the rest of this chapter is an explanation of each thing in it. By the end you should be able to look at a plan like the lower one and say, for every line, what it is and why it is there. Let us start with the machine that does the rewriting.',
}
