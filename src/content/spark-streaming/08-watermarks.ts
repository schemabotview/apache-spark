import type { Section } from '../types'

export const watermarks: Section = {
  id: 'watermarks',
  title: 'Watermarks: bounding late data',
  scene: 'event-time',
  slide: `## Watermarks: bounding late data

A **watermark** is Spark’s moving guess at *“we’ve probably seen everything up to here”* — it lets a window finalize and frees its state.

### How it’s set
- **Watermark = max event time seen − a threshold** you choose (e.g. “10 minutes late”)
- It only moves **forward**, as newer events raise the max

### What it does
- A window whose end is **older than the watermark** is **finalized and evicted** from state
- An event **later than the watermark** is **too late** — dropped, not counted

### The trade-off you’re choosing
- A **bigger** threshold tolerates later data but holds **more state, longer**
- A **smaller** one frees state fast but drops more stragglers — you pick the balance

Watermarks are what make unbounded, stateful streaming actually **bounded** in memory.`,
  narration:
    'The watermark is Spark’s answer to “when is a window done?”, and it’s a beautifully simple idea. As events flow in, Spark keeps track of the largest event-time it has seen so far. The watermark is just that maximum, minus a threshold you choose — a grace period for lateness. If you set the threshold to ten minutes, you’re telling Spark: I’m willing to wait up to ten minutes for stragglers; once the newest data I’ve seen is from ten-fifteen, I’ll assume everything up to ten-oh-five has now arrived. Critically, the watermark only ever moves forward — a late event can’t drag it backward — so it’s a monotonic, ratcheting sense of time’s progress. That single line then does two jobs. First, any window whose end is now older than the watermark is considered complete: Spark finalizes it, emits its result, and — this is the important part — evicts its state, freeing the memory it was holding. Second, any brand-new event that arrives with a timestamp older than the watermark is simply too late; it’s dropped and not counted, because its window has already been closed and forgotten. And that framing exposes the real decision you’re making. A larger threshold is more forgiving of late data, but it forces Spark to keep every open window in state for longer, using more memory. A smaller threshold reclaims memory quickly but throws away more stragglers. You’re choosing where to sit on that accuracy-versus-memory trade-off. And that’s the deeper reason watermarks exist at all: without them, an unbounded stream of events would mean an unbounded pile of never-closing windows in state. The watermark is precisely what keeps stateful streaming bounded in memory — which brings us right to state and how it survives failure.',
}
