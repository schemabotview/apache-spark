import type { Section } from '../types'

export const failureModesSection: Section = {
  id: 'failure-modes',
  title: 'Failure modes',
  scene: 'failure-modes',
  focus: 'spec',
  slide: `## Failure modes

The useful frame is a line: things Spark handles without telling you, and things that end your application.

### Handled, silently
- A **task throws** — retried, up to \`spark.task.maxFailures\` (4 by default)
- An **executor dies** — its tasks rerun elsewhere, recomputed from lineage
- **Shuffle files lost with it** — the producing stage reruns to regenerate them
- A node is just **slow** — speculation launches a duplicate task and takes whichever finishes

### Fatal
- **The driver dies.** It held the plan, the schedule and the progress, and nothing recovers it
- A task that fails **4 times** — Spark concludes it is your code, not bad luck

### Speculation is not free
- It is duplicate work by design, and a non-idempotent sink will be written twice`,
  narration:
    'Spark is genuinely good at recovering from failure, and the useful way to hold this is as a line with two sides: things it handles without telling you, and things that end your application. People worry about the first list and get surprised by the second. On the handled side. A task throws an exception: Spark retries it, by default up to four attempts, possibly on a different executor. Transient failures — a flaky network read, a momentary resource problem — simply disappear, and you never hear about them. An executor dies entirely: Spark notices, and reruns that executor\'s tasks elsewhere. It can do this because of lineage, from chapter three — every partition knows how it was derived, so it can be recomputed from its parents. This is the payoff of a design decision made in chapter one. If that executor held shuffle files, the stage that produced them reruns to regenerate them, which is more expensive but still automatic. And a node that is not failing but is merely slow — a degraded disk, a noisy neighbour — is handled by speculative execution: Spark notices a task running far longer than its peers, launches a duplicate on another executor, and takes whichever finishes first. Now the other side. The driver dies, and that is the end. Everything in chapter two said the driver holds no data, and that is true — but it holds the plan, the schedule, the state of every task, and the progress of the whole application. Nothing recovers it. That is the real argument for cluster deploy mode from chapter two section nine: in client mode your driver is on a laptop that can close. A task that fails four times also ends the job, and that is deliberate — after four attempts Spark concludes this is your code, not bad luck, and stops rather than retrying forever. And the driver running out of memory, which is almost always collect on something real, from chapter three. One honest caveat about speculation, because people turn it on as a blanket setting. It is duplicate work by design — you are deliberately computing the same partition twice and discarding one result. If your sink is not idempotent, both copies may write. Never enable speculation on a job whose output cannot tolerate being written twice. Next: the thing that makes a pile of Parquet into a table.',
}
