import type { Section } from '../types'

export const observabilitySection: Section = {
  id: 'observability',
  title: 'Testing and observability',
  scene: 'observability',
  focus: 'log',
  slide: `## Testing and observability

Three layers, and what separates them is **when** you can use them.

### While it runs, after it ran, and across runs
- **Spark UI** — everything from chapter 6 §9. Gone the moment the application ends
- **History server** — the same UI, rebuilt from the event log. Only if you enabled it
- **Metrics sink** — counts and durations over time, so you see a trend rather than an incident

### Turn the event log on, today
- The most common reason a production failure cannot be diagnosed is that nobody did

### Testing is a design problem, not a tooling one
- Chapter 4 said keep transforms pure: \`DataFrame -> DataFrame\`, no I/O, no clock
- The payoff is on the left — three lines, \`createDataFrame\`, no cluster and no fixtures`,
  narration:
    'Observability for Spark comes in three layers, and the useful way to separate them is by when you can use them, because that is what people get wrong. Layer one is the Spark UI, and that is everything chapter six section nine taught you — stages, task distributions, shuffle metrics, the SQL tab with its plans. It is excellent. And it exists only while the application is running. The moment your job finishes or crashes, the UI is gone. Layer two is the history server, which is the same interface rebuilt afterwards from an event log that Spark writes as it runs. And here is the thing I want to be emphatic about, because it is the single most common reason a production failure cannot be diagnosed: that event log is not on by default in many setups. The job fails at three in the morning, the application exits, the UI dies with it, and there is nothing left to look at. Somebody reruns it, it works, and the incident is closed with no explanation. Turn the event log on, point it at durable storage, and run a history server. Do it before you need it, because by definition you cannot do it afterwards. Layer three is a metrics sink — Spark can push metrics to Prometheus, Graphite and others — and what that gives you that the other two do not is a trend across runs. A single job taking forty minutes tells you very little. The same job taking twenty minutes last month and forty today tells you something is wrong, and it tells you before anybody complains. That is especially true for streaming, where chapter seven\'s warning sign is batch duration creeping upward over days. Then there is testing, which is really a design problem rather than a tooling one. Chapter four argued for keeping transformations as pure functions: DataFrame in, DataFrame out, no reads, no writes, no clock. The payoff is the code on the left. Three lines: build a tiny DataFrame with createDataFrame, call the function, assert on the result. No cluster, no fixture files, no mocking framework, and it runs in about a second, which means you can have hundreds of them and run them on every commit. You cannot write that test against a four-hundred-line script that reads from S3 at the top. The testability is not a separate effort; it is a consequence of the structure. Next: what happens when things break.',
}
