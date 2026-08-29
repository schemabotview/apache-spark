import type { Section } from '../types'

export const unification: Section = {
  id: 'unification',
  title: 'One engine, pick your altitude',
  scene: 'api-stack',
  slide: `## One engine, pick your altitude

Step back to the whole stack — and see that every path down leads to the **same core**.

### Pick your altitude
- **SQL / DataFrame / Dataset** — declarative & optimized; the default for almost everything
- **RDD** — drop down for full control when you truly need it; you own the tuning
- Either way it compiles through **Catalyst → Tungsten → RDDs**, on the cluster from last course

### The workloads on top
- **Structured Streaming** — the same DataFrame API, over unbounded data
- **MLlib** — machine-learning pipelines on DataFrames
- **GraphX / GraphFrames** — graph analytics on the same core
- One engine beneath them all — batch · SQL · ML · streaming · graph

### The one idea to keep
- Write for **clarity**, let the engine optimize — drop low only when it earns it`,
  narration:
    'Let’s step back to the whole stack and pull it together. The one idea to carry out of this course is that Spark gives you a choice of altitude, and every altitude lands in the same place. Up top you have the structured APIs — SQL, DataFrame, and Dataset — which are declarative and optimized, and which should be your default for almost everything you write. Below them, if you truly need it, you can drop down to raw RDDs for full, low-level control — but then the tuning is yours to own. And it doesn’t matter which you pick: it all compiles through Catalyst and Tungsten, down to RDDs running on the cluster we took apart in the last course. Resting on top of that foundation are the workloads — and now you can see why they’re drawn up there. Structured Streaming is the very same DataFrame API pointed at unbounded, live data. MLlib builds machine-learning pipelines on DataFrames. GraphX and GraphFrames do graph analytics on the same core. They all lean on the one engine underneath — one engine for batch, SQL, machine learning, streaming, and graphs. So the practical takeaway is simple: write for clarity at the highest level that expresses your intent, and let the engine do the optimizing; only drop lower when it genuinely earns its keep. That’s the layered API — the layers you write against, and the single core they all compile down to. And from here, the natural next step is to take this exact stack to data that never stops arriving: that’s Structured Streaming, and it’s where we go next.',
}
