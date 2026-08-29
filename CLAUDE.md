# CLAUDE.md — apache-spark (lean operational pointers)

The **Apache Spark** concept app of GraphL. Workspace-wide invariants, content model, and working
agreement live in the workspace [`CLAUDE.md`](../CLAUDE.md) — read that first; this file is
Spark-specific.

## What this is

A standalone concept app: its own scenes + courses + a bundled render-engine (`src/render-engine`).
Each **section** = `(scene, slide, narration)`; the left scene is a react-flow diagram or a code
snippet, the right slide is markdown. One section = one slide = one video segment.

## Course arc (5)

`evolution · spark-architecture · spark-api · spark-streaming · capstone`. Played in syllabus order;
`→` past a course's last section rolls into the next.

## Layout

```
src/render-engine/   layout + renderer (import from the barrel index, never deep paths)
src/scenes/          scenes + registry (a scene can be shared across sections)
src/content/         courses → sections + registry
src/section/         scene-left / slide-right composited view (responsive)
src/App.tsx          hash router: section (whole-scene) view · scene (individual) view
scripts/             record-course · record-reels · thumb · gen-descriptions · colab · audio-manifest
public/audio/<course>/   narration wavs
```

## Build & verify

- `npm install` → `npm run dev`; `npm run build` must stay clean.
- No test runner. Bar for a change: **build clean + visually correct** at the relevant route.
- Adding a scene: define in `src/scenes/`, register in `src/scenes/index.ts`.
- Adding content: add a `Section` under `src/content/<course>/`, list it in that folder's `index.ts`.

## Working agreement

Owner drives, **one reviewed slice at a time**: propose → approve → build → verify in-app → stop.
Before authoring a course/scene, deliver an **ASCII sketch** of the scene for approval first.
