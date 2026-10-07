import type { Section } from '../types'

export const joins: Section = {
  id: 'joins',
  title: 'Joins and join semantics',
  scene: 'join-semantics',
  focus: 'multiply',
  slide: `## Joins and join semantics

The operation most likely to silently change your row count — in either direction.

### The four everyone knows
- \`inner\` — rows matching on both sides · \`left\` — all of the left, right nulled
- \`right\` — the mirror · \`full outer\` — everything, either side nulled

### The two that replace a slower pattern
- \`left_semi\` — left rows that **have** a match. Left columns only, never duplicates
- \`left_anti\` — left rows with **no** match: the clean "not in this list"
- Both beat \`join\` + \`dropDuplicates\`, and beat collecting a list for \`isin\`

### What actually goes wrong
- Duplicate keys on **both** sides multiply: 2 left × 3 right = **6 rows**, silently
- Nulls never match, so an inner join drops them without saying so`,
  narration:
    'Joins. This is the operation most likely to silently change your row count, and it can go in either direction, which is what makes it dangerous. Four of them you already know. Inner keeps rows that match on both sides. Left keeps all of the left side, filling the right side\'s columns with null where there was no match. Right is the mirror image. Full outer keeps everything from both, nulling whichever side is absent. Fine. Now the two that most people have never used and should. A left semi join keeps left rows that HAVE a match on the right — but it returns only the LEFT side\'s columns. It is a filter that happens to use another table. And a left anti join is the opposite: left rows with NO match, again left columns only. That is the clean way to express give me the orders that are not in the blocklist. Why do these matter? Because people write them badly. The usual substitute for a semi join is a regular inner join followed by dropDuplicates, which is more expensive and can still be wrong. The usual substitute for an anti join is collecting a list of ids into the driver and using isin, which breaks the moment that list is big. Semi and anti do the job directly, and crucially neither can ever duplicate a row — which brings us to the thing that actually goes wrong. A join multiplies. If a key appears twice on the left and three times on the right, you get six output rows for that key. Not an error, not a warning — just six rows where you expected one, and a revenue figure that is now six times too high for that customer. This is the single most common cause of a pipeline producing numbers that are wrong rather than missing, and it is much harder to notice than a crash. So before you join, know whether your key is unique on at least one side, and if you do not know, check — a groupBy and a count on the key takes thirty seconds and has saved a great many people. And one last trap, which follows from the three-valued logic we met in the last section: nulls never match anything, including other nulls. So an inner join on a nullable key silently drops every row where that key is null. If those rows mattered, you need to handle them before you join. Next, the operation that keeps your rows instead of collapsing them.',
}
