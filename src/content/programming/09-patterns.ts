import type { Section } from '../types'

export const patterns: Section = {
  id: 'patterns',
  title: 'Putting it together',
  scene: 'etl-shape',
  slide: `## Putting it together

Almost every production job has the same five-step shape. Knowing the shape is most of knowing how to write one.

### The five steps
1. **Read** — declare the schema rather than inferring it
2. **Filter early** — the cheapest row is one you dropped before doing anything to it
3. **Clean** — nulls, casts, duplicates, while the data is as small as it will get
4. **Join and aggregate** — the wide steps, and ideally the only ones
5. **Write** — with a mode, and a partitioning someone will later filter on

### The ordering *is* the craft
- Narrow work first, the one wide step as late as you can manage
- Every row you drop in step 2 is a row the shuffle in step 4 never has to move

### Where this leaves you
- You can now write a real pipeline — next, what Spark actually does with it`,
  narration:
    'Let us finish the chapter by assembling everything into the shape a real job actually has, because almost every production pipeline you will ever write or read looks like these five steps. Step one, read — and declare your schema rather than inferring it, for the reasons we just went through. Step two, filter early. This is the step people most often get wrong by doing it last, and it is the cheapest win available: every row you drop here is a row that no later step has to process, and crucially, a row the shuffle in step four never has to move across the network. Step three, clean, while the data is as small as it is ever going to be. Drop duplicates, cast types properly, handle nulls, normalise the messy fields. Doing this after a join means cleaning rows you then throw away. Step four, join and aggregate. These are the wide steps — the shuffles — and ideally they are the only ones in your job. This is where the time goes, so having arrived here with the smallest, cleanest dataset you could manage is the whole point of steps two and three. Step five, write. Set a mode explicitly, choose Parquet, and partition by a column someone will actually filter on later. Now, look at the code on the board and notice that the ordering is not an accident — it is the craft. Narrow work first, and the one wide step as late as you can possibly manage. That single ordering principle will do more for your pipelines than any configuration setting. Two details in that code worth flagging as you go: dropDuplicates on an explicit key column rather than whole rows, because whole-row deduplication rarely means what you want; and broadcast around the smaller side of the join, which is a hint we will properly earn in chapter six, but which turns a shuffle into a local lookup when one side is small. And that closes chapter three. You can now write a genuine ETL pipeline: read with a schema, transform with columns and built-in functions, aggregate, and write efficiently. What you cannot yet do is explain why Spark ran it the way it did. We have said several times that Catalyst reorders your filters and prunes your columns and pushes work into the read. Chapter five opens that box. But first, chapter four takes the pipeline we just sketched and makes it survive contact with real, messy, production data.',
}
