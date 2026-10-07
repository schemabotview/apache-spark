import type { Section } from '../types'

export const resourcesSection: Section = {
  id: 'resources',
  title: 'Memory, cores and executors',
  scene: 'resources',
  focus: 'killed',
  slide: `## Memory, cores and executors

Two settings people get wrong in opposite directions, and one that gets containers killed.

### The heap is not what the cluster reserved
- \`spark.executor.memory\` sets the **JVM heap**
- \`spark.executor.memoryOverhead\` sits **outside** it — off-heap buffers, shuffle, Python workers
- The cluster manager kills on the **total**. "Killed by YARN" is usually overhead, not your heap

### Inside the heap
- A **unified pool** holds execution and storage memory, borrowing from each other as needed
- The rest is user memory: your objects, UDF state, anything you allocate yourself

### Cores per executor
- **1 core each** — no contention, but a JVM per core and no shared broadcast
- **~5 cores each** — the usual sweet spot. Start here
- **32 cores each** — shares cache and broadcasts well, but GC pauses grow and HDFS throughput falls`,
  narration:
    'This section is about the settings people get wrong in opposite directions, and one that gets containers killed with a confusing error. Start with memory, because there is a structure here that is not obvious and it causes a specific failure. When you set spark dot executor dot memory, you are setting the JVM heap size. That is not what the cluster manager reserves. The manager reserves the heap plus an overhead — spark dot executor dot memoryOverhead, which defaults to about ten percent — and that overhead is where several things live that are not on the heap at all: off-heap buffers, the network stack\'s shuffle buffers, any off-heap Tungsten memory from chapter five, and critically, Python worker processes if you are using PySpark with UDFs. Now here is the failure. The cluster manager kills a container based on its total memory usage, heap plus everything else. So you can have plenty of heap free and still be killed, because the overhead region overflowed. The error you get says something like killed by YARN for exceeding memory limits, and the instinct is to raise executor memory — which does not help, because that is not the part that overflowed. If you are running Python UDFs and getting killed, raise the overhead, not the heap. Inside the heap, the structure is simpler than it used to be. There is a unified pool shared between execution memory — shuffles, sorts, joins, aggregations — and storage memory, which is your cached data. They borrow from each other: if you are not caching anything, execution can use the whole pool, and if you cache heavily, it takes space that execution then has to spill without. That unification is why caching too much makes unrelated operations spill, which is the connection back to section four. The rest of the heap is user memory: your own objects, UDF state, anything you allocate. Then cores per executor, where there is a genuine trade-off and a known sweet spot. One core per executor means no contention and no shared anything — but you get a separate JVM for every core, each with its own overhead, and a broadcast variable has to be copied into every one of them. At the other extreme, thirty-two cores in one executor shares memory and broadcasts beautifully, but you now have a very large heap, and large heaps mean long garbage collection pauses that stop all thirty-two threads at once. There is also a well-known effect where HDFS client throughput falls off above roughly five concurrent threads. Which is where the conventional answer comes from: around five cores per executor is the usual sweet spot, and unless you have a specific reason, start there. Last section: putting all of this into a method.',
}
