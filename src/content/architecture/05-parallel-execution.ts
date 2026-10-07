import type { Section } from '../types'

export const parallelExecution: Section = {
  id: 'parallel-execution',
  title: 'Partitions and parallel execution',
  scene: 'slots-and-waves',
  focus: 'waves',
  slide: `## Partitions and parallel execution

The arithmetic nobody does, and everybody should. Do it once and "why is my job slow" starts having checkable answers.

### The division
- **3 executors × 4 cores = 12 slots.** A slot runs one task at a time
- **200 partitions → 200 tasks.** One per partition, always
- 200 tasks over 12 slots = **17 waves**, not one big parallel burst

### What that implies
- The last wave runs **8 tasks on 12 slots** — a third of the cluster idle to the end
- More executors buy nothing once you have more slots than partitions

### The shape of the mistake
- Too **few** partitions → idle cores · too **many** → overhead costs more than the work`,
  narration:
    'Here is a piece of arithmetic that almost nobody does, and that changes how you read every slow job once you have. Take a concrete cluster: three executors, four cores each. A core is a slot, and a slot runs one task at a time. So three times four is twelve slots, and twelve is the maximum number of tasks that can possibly be running at the same moment. Not a hundred, not however many machines you have — twelve. Now take the data: two hundred partitions. We know from the last section that means two hundred tasks. So two hundred tasks need to run on twelve slots. They do not all run at once. They run in waves: twelve start, and as each one finishes its slot picks up the next task waiting. Two hundred divided by twelve, rounded up, is seventeen. Seventeen waves. That single number explains an enormous amount. It tells you the stage takes roughly seventeen times the length of one task, not the length of one task. It tells you that if tasks are uneven, the slow ones dominate. And look at the last wave specifically: sixteen full waves use a hundred and ninety-two tasks, which leaves eight tasks for wave seventeen, running on twelve slots. Four slots sit completely idle while those eight finish, and the stage cannot end until they do. You paid for those four cores for the whole of that final wave. Two conclusions follow immediately, and they are the ones people get backwards. First, adding more executors buys you nothing once you have more slots than partitions — the extra slots have no tasks to run. Second, adding more partitions buys you nothing if each one is already small, because then you are paying scheduling overhead on work that takes milliseconds. So the mistake has a shape on both sides: too few partitions and your cores sit idle while one oversized partition holds up the entire stage; too many and the bookkeeping costs more than the work inside each task. Finding the middle is a real skill and chapter six is devoted to it. But none of this is tunable until you understand the one thing that decides where stages begin and end — so let us go and define it.',
}
