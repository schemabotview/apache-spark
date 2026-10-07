import type { Section } from '../types'

export const pushdownSection: Section = {
  id: 'pushdown',
  title: 'Pushdown and pruning',
  scene: 'pushdown',
  focus: 'blocked',
  slide: `## Pushdown and pruning

Three different optimisations that people routinely call one thing. They act at different layers and you verify each in a different place.

### The three
- **Predicate pushdown** — the filter reaches the file reader, which skips row groups by statistics
- **Partition pruning** — the filter matches directory names, so whole folders are never opened
- **Column pruning** — unreferenced columns are never read off disk at all

### Checking each one actually happened
- \`FileScan\` → \`PushedFilters\` · \`FileScan\` → \`PartitionFilters\` · \`FileScan\` → \`ReadSchema\`
- All three fail **silently**. Nothing errors; the job is just slower than it should be

### What blocks them
- A **UDF** blocks all three. Filter *before* it, never after
- A predicate on a column wrapped in a function Spark can't invert won't push either`,
  narration:
    'There are three distinct optimisations that people routinely merge into one word, and separating them is useful because they act at different layers, they need different things from you, and you check each one in a different place. The first is predicate pushdown. Your filter is pushed down to the file reader, which uses the format\'s own statistics to skip chunks of the file. A Parquet file stores minimum and maximum values for each column in each row group, so if you filter for total greater than a thousand and a row group\'s maximum is four hundred, that entire row group is skipped without being decoded. The second is partition pruning, and this is the one from chapter four. Your data was written with partitionBy country, so it lives in directories named country equals UK, country equals FR, and so on. A filter on country is matched against the directory names, and the folders that cannot match are never opened at all. Notice the difference from the first one: predicate pushdown reads a file and skips parts of it; partition pruning does not open the file. The third is column pruning. Spark works out which columns are actually referenced and reads only those. With a columnar format, the other columns are physically never touched. This one needs nothing from you and is always on. Now, the practically important part: all three of these fail silently. Nothing errors. Your job just does several times more I/O than it needed to, and nothing tells you. So you check them, in the physical plan, at the FileScan node. Pushed filters tells you whether your predicate reached the reader. Partition filters tells you whether directory pruning happened. Read schema tells you how many columns are actually being read. Chapter five section nine gave you that checklist; this is why it is the first thing on it. And what blocks them: a user-defined function blocks all three, which is the third time this chapter\'s predecessors have made that point from a different angle. Chapter four said a UDF costs a serialisation boundary. Chapter five said Catalyst cannot see inside it. Here is the operational consequence: if your filter is expressed through a UDF, it cannot be pushed into the scan, so you read the entire dataset and filter it in Python afterwards. Filter before the UDF, never after. The cheapest row in Spark is the one that was never read off the disk at all. Next: the thing that fixes the plans you got wrong.',
}
