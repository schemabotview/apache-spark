import type { Section } from '../types'

export const dataIntensive: Section = {
  id: 'data-intensive',
  title: 'Why distributed at all?',
  scene: 'data-deluge',
  slide: `## Why distributed at all?

For most of computing the hard part was the **maths** — a small input, an expensive calculation. That flipped: now the maths is often trivial and the **input is enormous**.

### One machine, three hard numbers
- **Disk 8 TB** — the *capacity* wall: the dataset does not fit on it
- **RAM 64 GB** — the *memory* wall: the working set spills, so every pass hits disk
- **I/O 2 GB/s** — the *throughput* wall: 10 TB takes 80+ minutes just to read, once

### A bigger machine is a real answer, up to a point
- Every ceiling **moves**; not one of them **disappears** — it is still one box
- Near the top end the cost curve turns **super-linear**

### So
- Data grows on its own schedule — you need capacity you can **keep adding**`,
  narration:
    'Before we touch Spark, we should answer the question sitting underneath it: why do we need a cluster at all? For most of computing history, the hard part of a problem was the maths. You had a small input and an expensive calculation to run over it, and the thing you wanted more of was processing power. Somewhere along the way that flipped. Today the calculation is often almost trivial — count these events, join these two tables, average this column — and the difficult part is that the input is enormous. That shift has a name: data-intensive rather than compute-intensive, and it changes what the bottleneck is. So let us make this concrete, because the argument is much sharper with real numbers in it. Picture a serious single server: eight terabytes of disk, sixty-four gigabytes of RAM, and storage that reads at two gigabytes a second. Those are not bad numbers. But look at what each one is: it is a wall, and they are three different walls. The eight terabytes of disk is the capacity wall — if your dataset is larger than that, the conversation ends before it starts, because the data does not fit on the machine at all. The sixty-four gigabytes of RAM is the memory wall. Even when the data does fit on disk, the part you are actively working on has to live in memory, and when it does not fit there, every pass over it falls back to disk and the whole job crawls. And the two gigabytes a second is the throughput wall, which is the one people forget. Suppose you solve the first two and the data is sitting right there on local disk. Reading ten terabytes at two gigabytes a second takes over eighty minutes — and that is just to get the bytes off the platter, once, before you have done a single useful thing with them. Now, there is an honest answer to all three of those, and it is to buy a bigger machine. That genuinely works. Spend money and every one of those three numbers goes up — more disk, more RAM, faster storage. But notice exactly what that does and does not do. Each ceiling moves upward. Not one of them disappears, because it is still one box with one disk, one pool of memory, and one I/O path. And the cost of relocating them stops being linear fairly quickly; the last doubling of a machine costs far more than the first one did. Meanwhile the data is growing on a schedule that has nothing to do with your purchasing. What you actually need is capacity you can keep adding, indefinitely, without that curve turning against you. That is the whole reason distributed data processing exists. So the real question is not whether to get more capacity, but which SHAPE of more you buy — and that is a genuine fork.',
}
