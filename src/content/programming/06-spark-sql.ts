import type { Section } from '../types'

export const sparkSql: Section = {
  id: 'spark-sql',
  title: 'Spark SQL and temporary views',
  scene: 'sql-same-plan',
  focus: 'plan',
  slide: `## Spark SQL and temporary views

Register a DataFrame under a name and you can query it with SQL. The important part is what happens next: **nothing different**.

### Giving a DataFrame a name
- \`df.createOrReplaceTempView("orders")\` — then \`spark.sql("SELECT ... FROM orders")\`
- A view **copies nothing and stores nothing**. It is a name bound to a plan
- Temp views live and die with the SparkSession

### The two spellings produce one plan
- The DataFrame API and the SQL string are parsed into the **same logical plan**
- Catalyst optimises them identically. There is no speed argument between them

### So choose by reader
- **The API composes** — build queries in loops, pass them around, unit-test the pieces
- **SQL is universal** — an analyst reads it on day one without learning your framework`,
  narration:
    'If you know SQL, you already know most of this section — and the point I want to land is not that Spark supports SQL, but something stronger about what that support actually is. You start by giving a DataFrame a name: create or replace temp view, orders. Now you can write spark dot sql, select star from orders, and get results. Two things about that view. It copies nothing and it stores nothing — it is purely a name bound to a plan, so registering a view on a hundred-terabyte DataFrame is instant and free. And temp views are scoped to your SparkSession; they live and die with it, and they are not visible to anyone else. Now the claim this section exists for. Look at the two programs on the board. On the left, the DataFrame API: filter, then groupBy, then agg with a sum. On the right, SQL: select country, sum of total, from orders, where total is over one hundred, group by country. These are not two similar approaches with different trade-offs. They are parsed into the same logical plan, handed to the same optimiser, and executed by the same engine. Catalyst cannot tell you which one you wrote. There is no performance difference, because after parsing there is no difference at all. That matters more than it sounds, because people argue about this. It means the choice between the DataFrame API and SQL is entirely a question about who is reading the code, and never about speed. So pick on those grounds. The API composes: it is ordinary Python or Scala, so you can build a query up in a loop, pass half of one into a function, write unit tests against the pieces, and construct queries conditionally. Doing any of that with SQL means string concatenation, which gets ugly fast. SQL, meanwhile, is universal. An analyst who has never seen Spark can read a select statement on their first day and know exactly what it does. On a team where the data people are not all engineers, that is worth a great deal. Most real codebases use both, and because they compile to the same plan, mixing them costs nothing. Which raises the obvious question — so when does anyone use an RDD?',
}
