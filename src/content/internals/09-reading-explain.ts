import type { Section } from '../types'

export const readingExplainSection: Section = {
  id: 'reading-explain',
  title: 'Reading a plan systematically',
  scene: 'reading-explain',
  focus: 'missing',
  slide: `## Reading a plan systematically

The skill this chapter exists to give you. A plan you have never seen should answer four questions in under a minute.

### Read it bottom-up
- The leaves are the scans; data flows **upward**. \`+-\` marks a child
- Start at \`FileScan\` and work up to the root

### The four questions, in this order
1. **\`FileScan\` → \`ReadSchema\`** — did column pruning happen, or is it reading all fifty columns?
2. **\`FileScan\` → \`PushedFilters\`** — did your filter reach the disk, or is it running after the read?
3. **Count the \`Exchange\` nodes** — how many stages, and what key is each shuffling on?
4. **The \`*(n)\` markers** — which operators got fused. A missing star is usually a UDF

### Use the better formatter
- \`df.explain("formatted")\` gives a compact tree plus per-node detail. Use it on anything real`,
  narration:
    'Let us finish by turning everything in this chapter into a procedure, because the point was never the architecture — it was to make you able to open a plan you have never seen and understand it. Start with the mechanics of reading. A physical plan is a tree printed as text, and you read it bottom-up. The leaves at the bottom are the scans, where data enters, and it flows upward to the root at the top, which produces your result. The plus-minus markers show parent-child nesting, and indentation shows depth. If you catch yourself reading from the top down, you are reading it backwards. Now the four questions, in this order, and they take about a minute. One: find the FileScan at the bottom and look at its ReadSchema. Does it list three columns or fifty? That tells you whether column pruning actually happened. If you expected a narrow read and you see every column, something in your plan — very often a UDF — stopped the pruning. Two: on the same FileScan, look for PushedFilters. Is your filter there? If it is, the format is skipping data before it is decoded, which is the cheapest filtering there is. If your filter is not pushed and is sitting as a separate Filter node above the scan, that is worth understanding: either the format cannot express it, or something is blocking it. Three: count the Exchange nodes. That gives you your stage count, and for each one, read the partitioning to understand what forced the shuffle. If there are more Exchanges than you expected, something is re-partitioning your data more than once, and that is usually fixable. Four: look at the star-number markers. They tell you which operators were fused by whole-stage codegen. Operators sharing a number ran as one compiled function. And now the thing to look for specifically: an operator with no star at all. That one fell off the fast path, and in practice the reason is nearly always a Python UDF. If a stage is slow and its operators have no stars, you have found it. One practical note before we leave. Plain explain on a real query produces a wall of text that is genuinely hard to read. Use explain with the string formatted instead: it prints a compact tree first and then a numbered detail block for each node, which is far easier to work through, and it includes the statistics Spark was using. And that closes chapter five. You can now look at a plan and say what Spark is doing and why. What you cannot do yet is make it do something better. That is next: chapter six is performance — partition sizing, join strategies, skew, caching, adaptive query execution, and reading the Spark UI when a job is slow.',
}
