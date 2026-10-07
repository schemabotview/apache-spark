import type { Section } from '../types'

export const windows: Section = {
  id: 'windows',
  title: 'Window functions',
  scene: 'window-anatomy',
  focus: 'w-frame',
  slide: `## Window functions

The thing that defeats people in SQL — almost always because they learned the syntax rather than the shape.

### A window is not a \`groupBy\`
- \`groupBy\` collapses many rows into one; a window **keeps every row** and adds a column
- Same row count in and out. That is the whole distinction

### Three parts, and the third is the one nobody sets
- \`partitionBy\` — restart the calculation per customer
- \`orderBy\` — what "running", "previous" and "rank" mean
- \`rowsBetween\` — **which rows count**. Omit it and a running total becomes a group total

### What you get for it
- Running totals · \`lag\` / \`lead\` for neighbouring rows · \`row_number\` for deduplication
- \`rank\`, \`dense_rank\` and \`row_number\` differ only on ties — pick deliberately`,
  narration:
    'Window functions are the thing that reliably defeats people in SQL, and in my experience the reason is almost always that they were taught the syntax before the shape. So let us do the shape first. A window function is not a groupBy. A groupBy collapses many rows into one: five orders for a customer become a single row with their total. A window function keeps every row and adds a column to it. Look at the result set on the board: five rows in, five rows out, and each one now carries a running total of everything up to and including itself. That is the entire distinction, and once you have it, the syntax stops being mysterious. Now the three parts. The first is partitionBy, and the word is unfortunate because it has nothing to do with the partitions of chapter two — here it means the groups the calculation restarts for. Partition by customer, and customer two\'s running total starts again at its own first row rather than continuing from customer one. You can see that on the board. The second is orderBy, which is what gives meaning to words like running, previous and rank. Without an order, a running total is not defined. The third is the frame — rowsBetween — and this is the one almost nobody sets, which is why almost nobody can explain the answer they got. The frame says which rows, relative to the current one, are included in the calculation. Unbounded preceding to current row gives you a running total. If you omit the frame entirely when you have an orderBy, you get a default that is usually what you wanted, but if you omit it without an orderBy, every row in the partition is included, and your running total is silently the group total repeated on every row. That is a very common bug and it looks plausible, which is the worst kind. What do you get for learning this? A great deal. Running totals and cumulative sums. Lag and lead, which give you the previous and next row\'s values, so you can compute a difference between consecutive events without a self-join. Rank, dense rank and row number, which differ only in how they treat ties — row number always gives distinct numbers, rank leaves gaps after a tie, dense rank does not. And row number over a window is the standard idiom for deduplication: number the rows within each key by recency and keep number one. Next, the shape of real source data.',
}
