import type { Section } from '../types'

export const fileFormats: Section = {
  id: 'formats',
  title: 'Reading and writing formats',
  scene: 'formats',
  focus: 'rule',
  slide: `## Reading and writing formats

One word in your \`read\` call decides more about job speed than most tuning you will ever do.

### Why Parquet wins
- **Columnar** — reading 3 columns of 50 touches 3, not 50
- **Schema embedded** — no inference pass, no guessing, no drift
- **Statistics per file** — a filter can skip whole files without opening them
- **Compressed per column**, and always splittable for parallel reads

### CSV and JSON are landing formats
- No schema, row-oriented, and nothing a filter can push into
- \`inferSchema=True\` reads the **entire file** just to guess the types — a full extra pass
- Declare a schema instead: \`spark.read.schema(ORDERS).csv(path)\`

### Writing
- Always set a **mode**, and \`partitionBy\` a column someone will later filter on`,
  narration:
    'Here is a claim that sounds like an exaggeration and is not: the file format you choose will affect your job\'s runtime more than almost any tuning you do afterwards. And you choose it by typing one word. Start with why Parquet wins, because it is four separate advantages and they compound. First, it is columnar. CSV and JSON store row by row — all of record one, then all of record two. Parquet stores column by column: every order id together, then every country. So when your query selects three columns out of fifty, Parquet reads three. A row format has to read all fifty and throw away forty-seven. On a wide table that is an order-of-magnitude difference before anything else happens. Second, the schema is embedded in the file. There is no inference, no guessing, no drift between what you expected and what arrived. Third, Parquet keeps statistics for each chunk — minimum and maximum values per column. So when you filter where placed at is after some date, Spark can read the statistics, see that an entire file holds nothing after that date, and skip the file without opening it. That is predicate pushdown, and notice it is a property of the format, not of the engine: Catalyst can only push a filter down if the file can answer it. And fourth, it compresses per column, which works far better than general compression because a column of values of one type is highly repetitive — and it stays splittable, so many tasks can read one file in parallel. CSV and JSON, by contrast, are landing formats. They are what data arrives as, and what you hand to someone who needs to open it in a spreadsheet. They carry no schema, they are row-oriented, and there is nothing a filter can push into. One specific trap: inferSchema equals True on a CSV read looks convenient and is expensive. To guess your types, Spark reads the entire file, then reads it again to actually load it. On a large input you have just doubled the job. Declare the schema instead — it is faster and it fails loudly when the data changes, which is what you want. On writing: always set a mode explicitly, because the default surprises people, and consider partitionBy on a column people will later filter on, which writes a directory per value so those filters skip whole folders. The rule to carry: land raw data as it arrives, convert once to Parquet, and read it a thousand times. Last section — putting all of it together.',
}
