import type { Section } from '../types'

export const tune: Section = {
  id: 'tune',
  title: 'Run · Observe & tune',
  scene: 'cap-tune',
  slide: `## Run · Observe & tune

With it running, open the **Spark UI**, turn on **AQE**, **cache** the reused dimension, and fix a **skewed** key.

### What’s happening
- **AQE** (Spark 3+) coalesces shuffle partitions and re-plans joins **at runtime**
- **Skew-join** handling splits a hot key so one giant task can’t stall the stage
- \`cache()\` the product dim — read every batch; the **Spark UI** shows the win

**Exercises:** AQE · skew · caching · Spark UI (performance & tuning; \`architecture\` memory)`,
  narration:
    'A pipeline that runs is not the same as a pipeline that runs well, so the final step is to observe and tune — and this fills the one big gap the four courses left open. Your first move is always the same: open the Spark UI and look at the stages. It shows you which stages are slow, where the shuffles are, and whether any task is taking far longer than its peers — the classic sign of skew. Then you reach for a few high-leverage fixes. The biggest is Adaptive Query Execution, AQE, introduced in Spark 3: with one flag, Spark stops trusting its compile-time plan blindly and instead re-optimizes at runtime using the actual data it sees — it coalesces too-many-tiny shuffle partitions down to a sensible number, and it can even switch a join strategy on the fly once it knows the real sizes. Turn on its skew-join handling and Spark will detect a hot key — say one wildly popular product — and split that oversized partition so a single straggler task can’t hold up the whole stage. And a simple, classic win: the product dimension is read on every batch run, so we cache it in memory, and the Spark UI’s storage tab confirms the reuse. This is the discipline the concept courses set you up for — the shuffle, the stages, the memory model — all now visible and tunable in the UI. Our Lambda pipeline is complete, deployed, and fast. Let’s step back and see the whole thing.',
}
