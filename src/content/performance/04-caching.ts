import type { Section } from '../types'

export const cachingSection: Section = {
  id: 'caching',
  title: 'Caching and persistence',
  scene: 'caching',
  focus: 'unpersist',
  slide: `## Caching and persistence

The most over-applied tool in Spark. Lead with the test, not the mechanism.

### The question to ask first
- Read **once**? Caching is pure cost — you pay to materialise something you use one time
- Read **twice or more**? Now it can pay for itself
- Read **in a loop**? Cache, always. This is the case the feature exists for

### \`cache()\` is not neutral — it means \`MEMORY_AND_DISK\`
- It **spills** when memory is short, which is why a cached DataFrame can get *slower*
- \`MEMORY_ONLY\` drops partitions instead and recomputes them from lineage

### And release it
- \`unpersist()\` when you're done. Cached data evicts other cached data
- Check the **Storage** tab: a cache at 60% "fraction cached" is costing you and helping nobody`,
  narration:
    'Caching is the most over-applied tool in Spark. People sprinkle dot cache through a notebook because it sounds like it must help, and quite often it makes things slower. So lead with the test rather than the mechanism. Here is the only question that matters first: how many times is this DataFrame read? Remember from chapter three that Spark is lazy and recomputes from lineage. If you build a DataFrame and then call one action on it, that lineage runs once, and caching gains you nothing — you have paid to materialise something and then used it a single time. That is pure cost. If you read it two or more times — two actions, or two branches of your pipeline that both derive from it — then caching can pay, because the second read skips the whole recomputation. And if you read it in a loop, as an iterative algorithm does, caching is not optional; it is the entire reason this feature exists, and it is what chapter one said Spark was built for. Now the mechanism, and there is a detail that explains behaviour people find mysterious. The cache method is not neutral — it is an alias for the storage level memory and disk. So when there is not enough memory to hold everything, Spark does not fail and it does not drop the data; it spills partitions to disk. Which means a cached DataFrame can be slower than an uncached one, because you are now reading from local disk and you also paid to write it there. If you see that, look at the Storage tab in the UI: it shows you the fraction actually cached in memory, and a cache sitting at sixty percent is costing you on both sides. The alternatives are worth knowing. Memory only drops partitions that do not fit rather than spilling, and recomputes them from lineage when needed — sometimes genuinely faster, because recomputing a narrow chain can be cheaper than a disk read. The serialised variants store a compact binary form, which fits more in memory but costs CPU to deserialise on every read. And disk only is for the case where recomputation is genuinely expensive, like the output of a huge join. Finally, the discipline nobody follows: unpersist when you are done. Cached data occupies the same memory pool as execution, and a cache you forgot about is evicting a cache you actually need. In a long notebook session this compounds quietly until everything is slow. Next: the single most common reason one stage takes forever.',
}
