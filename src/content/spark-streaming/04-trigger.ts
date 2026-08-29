import type { Section } from '../types'

export const trigger: Section = {
  id: 'trigger',
  title: 'Triggers: how often the query runs',
  scene: 'stream-trigger',
  slide: `## Triggers: how often the query runs

The **trigger** is the clock — it decides when each incremental run fires, trading **latency** against **efficiency**.

### Micro-batch — the default
- Spark runs the query in small **batches** on a schedule — the default engine
- **Fixed interval** (say every 10s), or **as fast as possible** (next batch when the last ends)
- **AvailableNow / once** — drain all data waiting, then stop — ideal for scheduled jobs

### Continuous — low latency
- A separate engine that processes records **one at a time**, ~**1 ms** latency
- Experimental, with a limited operation set — micro-batch covers almost everything

### The trade-off
- Bigger batches = higher **throughput** but higher **latency**; smaller = the reverse

Almost everyone runs micro-batch; reach for continuous only when milliseconds truly matter.`,
  narration:
    'Now look up at the top of the picture, because something has to decide when all of this actually runs — and that’s the trigger. Think of it as the clock for your stream. By default, Spark uses a micro-batch engine: rather than truly processing one record at a time, it collects the data that has arrived and processes it in small batches, one after another. You get to control the rhythm. You can set a fixed interval — run a batch every ten seconds, say — or you can leave it unset, in which case Spark simply starts the next batch the instant the previous one finishes, going as fast as it can. There’s also a very useful availableNow, or once, trigger: it processes all the data currently waiting and then stops, which turns your streaming query into a neat scheduled job you can run every hour and shut down. Alongside micro-batch there’s a second, low-latency engine called continuous processing, which handles records individually and can push end-to-end latency down to around a millisecond. But it’s experimental, it only supports a limited set of operations, and honestly micro-batch is fast enough for the overwhelming majority of use cases. The reason there’s a choice at all is the fundamental trade-off underneath: larger batches give you higher throughput but add latency, while smaller, more frequent batches cut latency at the cost of some efficiency. The trigger is simply the dial you turn to sit where you want on that curve. In practice, almost everyone runs micro-batch and just tunes the interval — you only reach for continuous when single-digit milliseconds genuinely matter.',
}
