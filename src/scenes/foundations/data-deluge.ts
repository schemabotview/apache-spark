import type { Scene } from '@graphlearning/flow'

// §1 data-deluge — the chapter opens on the PROBLEM, not on Spark, and the board is one continuous
// argument rather than a set of related bands: data pushes on a machine, the machine has exactly
// three numbered ceilings, buying a bigger one raises all three and removes none, so the wall is
// structural rather than a budget problem.
//
// The NUMBERS are the point of this scene. "The disk is the size it is" is true and forgettable;
// 8 TB / 64 GB / 2 GB/s is a thing a reader can hold a dataset up against, and §4 later asks them to
// do exactly that arithmetic with partitions. Each resource names its own wall in the `sub` rather
// than pointing at a separate label — edges anchor to NODES, so three lateral arrows out of a
// container would be a fight with the layout engine for information that fits in the card.
//
// One machine is a CONTAINER, not three sibling cards: the three limits belong to one box, and that
// containment is what makes the next beat land — a bigger box is still one box.
//
// Deliberately STOPS at the wall. The answer (more machines) is §2's whole reveal, and a node row
// here would spend it twice.
export const dataDeluge: Scene = {
  id: 'data-deluge',
  padding: 0.14,
  flow: 'TB',
  nodes: [
    { id: 'pressure', label: 'Data keeps growing', pattern: 'external', icon: 'database', sub: 'on its own schedule' },
    {
      id: 'machine',
      label: 'One machine — three resources, three hard numbers',
      pattern: 'group',
      icon: 'none',
      cols: 3,
      children: [
        { id: 'ce-disk', label: 'Disk — 8 TB', pattern: 'storage', icon: 'harddrive', sub: 'the capacity wall' },
        { id: 'ce-ram', label: 'RAM — 64 GB', pattern: 'service', icon: 'memory', sub: 'the memory wall' },
        { id: 'ce-io', label: 'I/O — 2 GB/s', pattern: 'network', icon: 'clock', sub: 'the throughput wall' },
      ],
    },
    { id: 'bigger', label: 'A bigger machine', pattern: 'service', icon: 'cpu', sub: 'same three limits, higher up' },
    { id: 'wall', label: 'The wall', pattern: 'warn', sub: 'you need capacity you can keep adding' },
  ],
  edges: [
    { source: 'pressure', target: 'machine', label: 'the dataset does not care what you bought' },
    { source: 'machine', target: 'bigger', label: 'every one of the three is a ceiling, and a large dataset is past all three' },
    { source: 'bigger', target: 'wall', label: 'each ceiling MOVES — not one of them disappears' },
  ],
}
