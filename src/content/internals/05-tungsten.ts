import type { Section } from '../types'

export const tungsten: Section = {
  id: 'tungsten',
  title: 'The Tungsten engine',
  scene: 'tungsten-rows',
  focus: 'why',
  slide: `## The Tungsten engine

Chapter 3 said DataFrames use "compact columnar buffers instead of JVM objects". This is what that actually means.

### A JVM object is mostly not your data
- A row of one int and one short string carries object headers, a pointer, a \`String\` object and a \`char[]\`
- Most of the memory is bookkeeping, and every one of those objects is something the **GC must trace**

### A Tungsten row is a flat binary record
- A null bitmap, then the values, laid out end to end in one \`byte[]\` — often **off-heap**
- The GC sees one array, not five objects. On billions of rows that is the difference

### Why it ends up faster
- Less memory per row, so more rows fit in cache and in the executor
- Fields sit next to each other, so a scan walks memory in order instead of chasing pointers`,
  narration:
    'This section explains a claim from chapter three that I made and then walked past: that DataFrames store data in compact columnar buffers rather than JVM objects. Here is what that actually means, because the gap is bigger than it sounds. Take the smallest interesting row: one integer and one short string. In ordinary JVM terms that is an object. That object has a header — twelve to sixteen bytes of bookkeeping the JVM needs for every object. It has a field for the integer. And it has a pointer to a String object, which is somewhere else in memory, which itself has a header, and which holds a pointer to a character array, which has its own header. So storing an int and a few characters has cost you several objects, two levels of pointer chasing, and considerably more bytes of overhead than data. Now multiply that by a billion rows. Two things go wrong. The obvious one is memory: you are spending most of your heap on headers and pointers, so you fit far fewer rows than you should. The less obvious one, and often the worse one, is the garbage collector. The GC has to trace every one of those objects to decide what is still alive. Billions of small objects is close to the worst case for a generational collector, and this is why early Spark jobs spent so much time in GC pauses. Tungsten\'s answer is to stop using JVM objects for data entirely. A Tungsten row is a flat binary record: a small bitmap saying which fields are null, then the values laid out end to end, in one byte array. Often that array is off-heap, allocated outside the JVM\'s managed memory altogether. The garbage collector sees one array, not five objects — and if it is off-heap, it does not see it at all. Spark manages that memory itself, explicitly, the way a C program would. Three things fall out of this. Less memory per row, so more data fits in the same executor. Almost no GC pressure from your data. And the one people forget: because the fields are laid out contiguously, scanning rows walks memory in order rather than chasing pointers around the heap, which is dramatically friendlier to the CPU cache. Modern CPUs are enormously faster at sequential access than at random access, and the layout is what lets Spark take advantage of that. Which sets up the next piece, because having the data in a good layout only pays if the code reading it is tight too.',
}
