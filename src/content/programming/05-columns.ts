import type { Section } from '../types'

export const columns: Section = {
  id: 'columns',
  title: 'Columns, expressions, functions',
  scene: 'columns-and-functions',
  focus: 'why',
  slide: `## Columns, expressions, functions

\`df.total > 100\` does not return \`True\`. It returns a **Column** — an unevaluated expression the engine will compile.

### Columns are descriptions, not values
- \`F.col("total")\` names a column; arithmetic and comparison on it build an **expression tree**
- That tree is exactly what Catalyst reads — which is why it can rewrite your filter
- \`.alias("gross")\` names the result; without it you get the expression as the column name

### Five shelves of built-ins, all imported as \`F\`
- **String** \`upper\` \`trim\` \`split\` · **Math** \`round\` \`abs\` · **Date** \`year\` \`datediff\`
- **Aggregate** \`sum\` \`avg\` \`countDistinct\` · **Conditional** \`when\` \`coalesce\` \`isNull\`

### Always reach for \`F\` first
- A built-in is optimisable and runs inside the JVM
- A Python **UDF** is a black box: Catalyst cannot see in, and every row crosses into Python and back`,
  narration:
    'Now the piece of the DataFrame API that confuses almost everyone the first time. If you type df dot total, greater than one hundred, into a Python shell, you might expect True or False. You do not get either. You get a Column object — an unevaluated expression. And once you see why, a lot of the API stops being strange. A Column is a description of a computation, not a value. F dot col of total names a column. Doing arithmetic on it, or comparing it, does not compute anything; it builds up an expression tree. Multiply a column by one point two and you get a bigger expression tree, not a number. And that tree is precisely what Catalyst reads. This is the mechanism behind everything in the last section: your filter is inspectable because it is a data structure describing a comparison, rather than a compiled function that merely answers when called. One small practical note: when you build a derived column, alias it. Without an alias, Spark names the output column after the expression that produced it, and you end up with a column genuinely called something like total multiplied by one point two. Then there are the built-in functions, which you import as F by near-universal convention. There are several hundred of them, and memorising the list is not the goal — knowing which shelf to look on is. There are five. String functions: upper, lower, trim, split, regular expressions. Math: round, abs, floor, and so on. Date and time: year, month, datediff, date add — and there are a lot of these, because dates are genuinely hard. Aggregates: sum, avg, count, countDistinct, min, max. And conditionals: when and otherwise for case logic, coalesce for defaults, isNull for missing data. Which brings me to the one rule that matters here: always look for a built-in before you write your own function. If you write a Python user-defined function, Spark cannot see inside it. It becomes a black box in the middle of your optimised plan, Catalyst cannot reorder around it, and every row has to cross out of the JVM into Python and back again — exactly the cost we just escaped. A built-in does the same job, stays in the JVM, and remains fully optimisable. Chapter four looks at when a UDF is genuinely worth that price. Next: the same queries, written as SQL.',
}
