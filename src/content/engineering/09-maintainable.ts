import type { Section } from '../types'

export const maintainablePipelines: Section = {
  id: 'maintainable',
  title: 'Pipelines that survive',
  scene: 'maintainable',
  slide: `## Pipelines that survive

Everything so far was about making a job correct. This is about making one somebody can safely rerun at 3am.

### Make a transform a function
- \`DataFrame -> DataFrame\`, with no reads, no writes and no clock inside
- Which makes it testable in three lines with \`createDataFrame\` — no cluster, no files
- Keep I/O at the **edges**: read at the top, write at the bottom, pure in between

### Idempotence is the property that matters
- Rerunning yesterday must reproduce yesterday, not double it
- \`mode("overwrite")\` scoped to the partition being rebuilt gives you that for free

### The rest
- **Config, not literals** — paths, dates and thresholds passed in
- **Log row counts** — in, out, quarantined`,
  narration:
    'Everything so far in this chapter has been about making a job correct. This last section is about making one that somebody else can safely rerun at three in the morning without reading it first, because that is the actual test of production code. Start with structure, and there is one idea that carries most of the weight: make your transformations functions that take a DataFrame and return a DataFrame. Look at the code. That function reads nothing, writes nothing, and asks the clock for nothing. It takes a DataFrame and a threshold and gives you back a new DataFrame. And look at what that buys you underneath: a test, in three lines, using createDataFrame with two literal rows. No cluster, no fixture files, no mocking, and it runs in a second. You simply cannot write that test against a four-hundred-line script that reads from S3 at the top and writes to S3 at the bottom with the logic tangled in between. So keep input and output at the edges — read at the top, write at the bottom, and keep everything in between pure. Next, the property that matters more than any other in production: idempotence. Rerunning yesterday\'s job must produce yesterday\'s result, not two copies of it. Jobs get rerun constantly — a transient failure, a late-arriving file, someone backfilling a week. If a rerun doubles your data, every one of those becomes an incident. The way you get idempotence almost for free is to make each run overwrite the partition it is responsible for, rather than appending. Write with overwrite mode scoped to the day you are rebuilding, and a rerun simply replaces that day. Append without a deduplication key is how a table quietly grows duplicates for months. Then two smaller things that matter more than they sound. Configuration, not literals: paths, dates and thresholds come in as parameters, never typed into the middle of a transform. The moment a date is hardcoded, backfilling means editing code. And log your row counts — how many came in, how many went out, how many were quarantined. A pipeline that silently dropped ninety percent of its input should not need a customer to discover it. And that closes chapter four. You can now take messy, nested, partly broken real data and build a transformation that is correct, that handles what is wrong with the input deliberately rather than by accident, and that someone else can test and rerun. What you still cannot do is explain why Spark executed it the way it did. We have been promising Catalyst since chapter three. Chapter five finally opens it.',
}
