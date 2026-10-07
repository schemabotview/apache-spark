import type { Section } from '../types'

export const partitionSizingSection: Section = {
  id: 'partition-sizing',
  title: 'Partition sizing and parallelism',
  scene: 'partition-sizing',
  focus: 'trap',
  slide: `## Partition sizing and parallelism

Chapter 2 counted tasks and waves. This is the other question: how **big** should each partition be?

### Three numbers worth knowing
- **~128 MB** per partition — the block size everything downstream assumes
- **2–3 × total cores** in partition count, so a slow task is absorbed by a later wave
- **Seconds, not milliseconds** per task. Under ~100 ms, scheduling costs more than the work

### \`repartition\` and \`coalesce\` are not interchangeable
- \`repartition(n)\` — a **full shuffle**. Any \`n\`, up or down, and the result is evenly sized
- \`coalesce(n)\` — **no shuffle**. Down only, by merging neighbours, and sizes come out uneven

### The trap in \`coalesce\`
- It has no shuffle to hide behind, so it reaches **backward**`,
  narration:
    'Chapter two taught you to count: partitions become tasks, tasks run in slots, and tasks run in waves. This chapter is about making a slow job fast, and we start with the other half of the partition question. Not how many are running, but how big each one should be. There are three numbers worth carrying, and none of them is a setting you type. They are consequences you steer toward. The first is size: aim for roughly a hundred and twenty-eight megabytes of data per partition. That is the same number as chapter four\'s file size guidance, and for the same reason — it is the block size the whole ecosystem is tuned around. Much larger and a task starts spilling to disk or running out of memory; much smaller and you are paying scheduling overhead for work that takes no time. The second is count: aim for roughly two to three times your total number of cores. Not one times, which people assume. The reason is that tasks are not all the same length, and if you have exactly one wave, then one slow task leaves every other core idle until it finishes. With two or three waves, a fast slot simply picks up the next task, and the unevenness gets absorbed. The third is duration: your tasks should take seconds, not milliseconds. If the task summary in the UI shows a median of thirty milliseconds, you have too many partitions, and most of your job is Spark scheduling rather than Spark computing. Now, the two tools for changing the count, and the difference between them is the thing people get wrong in code rather than in config. Repartition does a full shuffle. You can go up or down to any number, and because it redistributes rows, the resulting partitions are evenly sized. It costs you a shuffle, with everything chapter five described. Coalesce does no shuffle at all. It works by merging neighbouring partitions together on the machines where they already are, which means two things: it can only go down, and the resulting sizes are whatever that merging happened to produce, which is often uneven. It is nearly free, which makes it the right tool just before a write when you want fewer output files. And here is the trap, which is worth knowing before it costs you an afternoon. Because coalesce has no shuffle to hide behind, it reaches backward. If you write coalesce of one before a write, you have not just made one output file — you have told Spark that the entire chain of stages feeding that write can only use one task. Your hundred-core cluster now runs single-threaded. If you need one output file and the computation is expensive, use repartition of one instead, and pay the shuffle, so the work before it stays parallel. Next: the shuffle itself.',
}
