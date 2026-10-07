import type { Section } from '../types'

export const complexTypes: Section = {
  id: 'complex-types',
  title: 'Dates and complex types',
  scene: 'nested-data',
  focus: 'cost',
  slide: `## Dates and complex types

Source data is nested. One of these operations is free, one multiplies your data, and they look alike.

### Struct, array, map
- A **struct** is a nested record — \`customer.city\` reaches into it
- An **array** is many values in one row — \`items\` is the usual culprit

### Only one changes your row count
- \`customer.city\` is **free** — Spark reads that field and nothing else
- \`explode(items)\` gives **one row per element**: 1 order, 8 items, 8 rows
- So filter the array *before* exploding, and aggregate *after*

### Dates
- \`to_date\` / \`to_timestamp\` with an explicit format — never the default parse
- Store UTC, convert at the edge. A timezone bug is invisible until a month boundary`,
  narration:
    'Real source data is rarely flat. It arrives from an API or a message queue as nested JSON, and Spark represents that natively rather than making you flatten it first. There are three nested types and you should be able to recognise them in a printSchema. A struct is a nested record: on the board, customer is a struct with an id and a city inside it, and you reach into it with a dot — customer dot city. An array is many values in one row: items is an array of structs, so one order row carries all of its line items inside it. And a map is key-value pairs where you do not know the keys in advance, which is how you model something like arbitrary tags. Now the thing that matters, and it is the reason this section exists. Two of these operations look alike in code and one of them is free while the other multiplies your data. Reaching into a struct is free. When you write customer dot city, Spark reads exactly that field off disk and nothing else — it is column pruning, the same mechanism from chapter three, working through the nesting. You can select one field of a deeply nested struct in a huge record and pay for only that field. Exploding an array is not free. Explode produces one output row per element of the array. An order with eight line items becomes eight rows. That is often exactly what you want — it is how you get to a line-item level table — but you have to know you have done it, because every operation after that point is running on eight times the data, and if you then join or aggregate without accounting for it, your totals are eight times too big. Two habits follow. Filter the array before you explode it, using something like filter or array contains, so you never materialise the elements you are going to discard. And do your aggregation after exploding, not before, so you are aggregating over the shape you actually meant. Finally, dates, which deserve more respect than they get. Always parse with an explicit format using to date or to timestamp — never rely on the default parse, because it is lenient in ways that will surprise you and it is locale-sensitive. Use date trunc to bucket by month or week, and datediff and add months for arithmetic rather than doing it yourself in seconds. And store everything in UTC, converting only at the edges where a human reads it. A timezone bug is completely invisible until a month boundary, and then it is a day\'s worth of rows in the wrong bucket. Next: the escape hatch, and what it costs.',
}
