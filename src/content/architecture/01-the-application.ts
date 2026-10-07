import type { Section } from '../types'

export const theApplication: Section = {
  id: 'the-application',
  title: 'What a Spark application is',
  scene: 'application-shape',
  slide: `## What a Spark application is

Not a library call that returns. A Spark application is a **distributed program**: one driver process plus a set of executor processes, all alive for as long as it runs.

### The two kinds of process
- **Driver** — runs *your* code, holds the plan, decides what work exists and who does it
- **Executors** — JVM processes out on the cluster that run **tasks** and hold **cached data**
- One driver, many executors — and the **cluster manager** is a third party, not part of Spark

### The application is the unit
- You ask the **cluster manager** for an application, not a job — held for its whole lifetime
- It starts, runs however many jobs you trigger, and stops. Then the executors go away

### Why this matters immediately
- A job being slow and a cluster being wrongly sized are **different problems**
- Almost every tuning decision later is really a decision about this box`,
  narration:
    'Chapter one answered why Spark exists. This chapter answers how it runs, and the goal by the end is specific: you should be able to look at a program and start predicting what the cluster will actually do with it. Start with the thing people quietly get wrong. When you import Spark and call a few methods, it feels like a library — you call a function, it computes something, it returns. That is not what is happening. A Spark application is a distributed program, and it has exactly two kinds of process in it. The first is the driver. The driver runs your code — the actual Python or Scala you wrote. It holds the plan, it decides what work exists, and it decides which machine does which piece. There is exactly one driver per application. The second kind is the executors. These are separate JVM processes running out on the cluster, usually on different machines, and they do two things: they run tasks, and they hold cached data in their memory. There are many of them. Now notice something about the driver that surprises people: it does not process your data. Not a row of it. It plans, it schedules, it collects status back, but the actual work happens on the executors. If you ever find the driver doing heavy lifting, something has gone wrong — and we will see exactly what later in this chapter. The second idea is that the application is the unit. When you go to the cluster and ask for resources, you are not asking for a job. You are asking for an application, and those executors are held for its entire lifetime: it starts, it runs however many jobs you trigger inside it, and then it stops, and only then do the executors go away. That has a practical consequence worth carrying with you. A job being slow and a cluster being wrongly sized are different problems with different fixes, and almost every tuning decision you make later in this course is really a decision about the shape of this one box. So let us open it up and look at the roles inside.',
}
