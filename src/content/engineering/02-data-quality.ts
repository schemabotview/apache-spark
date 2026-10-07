import type { Section } from '../types'

export const dataQuality: Section = {
  id: 'data-quality',
  title: 'Nulls and malformed data',
  scene: 'bad-rows',
  focus: 'trap',
  slide: `## Nulls and malformed data

Real data arrives broken. The question is whether you notice — and the default setting makes sure you don't.

### Three things Spark can do with a row that will not parse
- \`PERMISSIVE\` — **the default**: nulls the bad fields, keeps the row, silently
- \`DROPMALFORMED\` — drops the row, also silently
- \`FAILFAST\` — kills the job on the first one

### Quarantine, don't delete
- Add \`_corrupt_record\` to your schema — it does not appear unless you declare it
- Split on it: null is good, not-null is quarantined
- A row you dropped cannot be counted, explained or replayed

### Nulls that are not errors
- \`na.fill({...})\` for defaults · \`na.drop(subset=[...])\` only where null is impossible
- \`null == null\` is **null**, not true`,
  narration:
    'Real data arrives broken. Some rows are truncated, some have a string where a number should be, some are simply not valid JSON. The question is never whether your pipeline will meet them; it is whether you will notice. And the default setting makes sure you do not. Spark gives you three modes for a row that will not parse. The default is PERMISSIVE, and here is exactly what it does: the fields it could not parse become null, and the row is kept. No warning, no count, nothing in the log. So a pipeline can run green for six months while quietly converting a parsing failure into a null, and the first person to notice is whoever asks why the revenue figures look light. The second is DROPMALFORMED, which drops the row entirely — also silently. And the third is FAILFAST, which kills the job on the very first bad row. FAILFAST is the right choice more often than people think: if any malformed row in your input is genuinely an incident, you want to know on the first one, not after you have written a day\'s worth of wrong output. But the pattern you actually want in production is quarantine, and it has one trick. Spark can give you the original text of every bad row in a column called underscore corrupt record — but only if you put that column in your schema yourself. It does not appear otherwise. Look at the code: the schema is the declared one, plus that extra string field. Then you split: rows where it is null are good and go down the main path, rows where it is not null are bad and get written somewhere you can look at them. Notice what that buys you over DROPMALFORMED. You have a count of how many failed, you have the raw text so you can see why, and you can replay them once the upstream team fixes the producer. A row you deleted can do none of those things. One caution: cache or write the split before you use both halves, because the lazy plan will otherwise read the source twice. Finally, nulls that are not errors — genuinely absent values. Use na dot fill for defaults, na dot drop with an explicit subset of columns where null is truly impossible, and coalesce for a fallback chain. And remember one piece of three-valued logic that catches everyone: null equals null is not true. It is null. Which is also why a join on a nullable key silently drops those rows, and we will come back to that shortly.',
}
