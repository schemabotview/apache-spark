import type { Section } from '../types'

export const udfs: Section = {
  id: 'udfs',
  title: 'UDFs and what they cost',
  scene: 'udf-cost',
  focus: 'rule',
  slide: `## UDFs and what they cost

Chapter 3 said a UDF is a black box to Catalyst. That is the smaller of its two costs.

### The cost you were told about
- Catalyst cannot see inside it, so it cannot reorder, prune or push anything through

### The cost that usually dominates
- A Python UDF runs in a **separate process**, not the executor's JVM
- Every row is serialised out, converted, run, serialised back — **per row**
- On millions of rows the boundary, not your logic, is where the time goes

### The ladder, cheapest first
- A **built-in** \`F.*\` or SQL expression — no boundary, fully optimisable
- A **pandas UDF** — crosses once per *batch* via Arrow. Most of the speed back
- A **Python UDF** — last resort, and worth a comment saying why`,
  narration:
    'Sooner or later you need to do something Spark has no built-in for, and the answer is a user-defined function. Chapter three told you one reason to avoid them: a UDF is a black box to Catalyst. That is true, and it is the smaller of the two costs. Let me do the known one quickly. When you write a Python lambda inside a UDF, Spark cannot inspect it — only call it. So it cannot know the function is really a filter and push it into the read, it cannot know which columns it touches and prune the rest, and it cannot reorder anything across it. Your beautifully optimised plan has an opaque wall in the middle of it, and nothing moves through that wall. Now the cost that usually dominates in practice, and this is the one worth seeing rather than being told. Look at the board. Your Spark executor is a JVM process, and your data lives inside it in Spark\'s compact binary format. But your Python function cannot run inside a JVM. So Spark starts a separate Python process on that machine, and for every row it takes the data out of the JVM, serialises it, sends it to the Python process, your function runs, and the result is serialised and sent back and converted into the JVM\'s format again. Per row. On a hundred million rows, that boundary crossing — not your actual logic, which might be a single string comparison — is where almost all of the time goes. People benchmark a UDF, find it is forty times slower than the built-in, and assume Python is slow. Python is not the problem; the boundary is. So, the ladder, and go down it only when the rung above genuinely cannot do the job. Top rung: a built-in function from the functions module, or a Spark SQL expression. No boundary at all, fully optimisable, and the catalogue is far bigger than most people realise — check before assuming there is no built-in, because there very often is. Second rung, and this is the one many people do not know exists: a pandas UDF. It is still your Python, but it crosses the boundary once per BATCH rather than once per row, using Arrow to move a whole column of data efficiently, and your function receives a pandas Series rather than a single value. That recovers most of the speed for the same logic, and it is usually a small rewrite. Bottom rung: an ordinary Python UDF. Sometimes genuinely necessary — calling a library with no Spark equivalent, say. When you write one, leave a comment explaining why nothing above it worked, because the next person will assume you did not check. Next: how you write the data decides how fast every future read is.',
}
