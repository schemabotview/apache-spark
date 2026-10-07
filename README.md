# Apache Spark — a GraphL concept app

Eight courses that build one mental model of Apache Spark: why distributed processing exists, how a
Spark application is actually executed, the three programming abstractions, what Catalyst and
Tungsten do with your code, how to make a slow job fast on evidence rather than guesswork, how the
model extends to unbounded data, and what it takes to run all of it in production.

Live at **[graphl.in/apache-spark/](https://graphl.in/apache-spark/)** — part of the catalog at
[graphl.in](https://graphl.in).

> **Status: all 8 chapters authored** — 70 of 70 sections, 69 scenes, scenes and narration written.
> Narration audio is the only remaining content work (one Colab pass per chapter). See
> [`COURSE-PLAN.md`](./COURSE-PLAN.md) for the full 8-chapter / 70-section syllabus and
> [`CLAUDE.md`](./CLAUDE.md) for the course arc, the authoring steps and the guards.

## The model

A **section** is the atomic unit — one `(scene, slide, narration)` triple, which is also exactly one
video segment. The **left** half of the frame is the scene: a react-flow diagram *or* a code snippet.
The **right** half is the slide, written in markdown. Narration is a separate field, spoken over the
same frame.

Scenes are **declarative**. An author lists nodes, edges and nesting; the engine computes every
position and size — no `x`/`y` is ever written by hand, which is what makes a capture reproducible.

`concept ⊃ course ⊃ section`: this concept has 8 courses, each a chapter of the plan, each a handful
of sections.

## Running it

```sh
npm install
npm run dev        # http://localhost:5173
```

Routes are hash-based: `#/<course>-<section>` for a full section frame, `#/<scene>` for the diagram
on its own.

```sh
npm run build          # production build (base /apache-spark/)
npx tsc --noEmit       # typecheck
npm run check          # content budgets — card height, slide height, focus ids, narration wavs
```

All three must be clean before handing over a route. They are a floor, not proof: they pass on frames
that are visually wrong, so the rendered route is the real bar.

## What lives where

| | |
| --- | --- |
| `src/content/` | courses → sections, one file per section, plus the registry |
| `src/scenes/` | hand-authored scenes, grouped by course, plus the registry |
| `src/main.tsx` | mounts `<ConceptApp>` from `@graphlearning/shell` |
| `src/theme.css` | three brand tokens — this repo's entire design surface |
| `scripts/` | the content guard and the publishing identity |
| `public/audio/` | narration wavs, `audio/<course>/<section>.wav` |

The renderer and the app shell are **published packages**, not folders here:
[`@graphlearning/flow`](https://github.com/schemabotview/ui-flow) draws the scenes and
[`@graphlearning/shell`](https://github.com/schemabotview/ui-shell) is the router, catalog, slide
panel and narration bar. Both are pinned, so an engine change lands here only when this repo
upgrades and re-verifies.

Narration audio is generated in one Colab pass per chapter with Chatterbox — never hand-produced.

## Deploy

Pushing to `main` builds and publishes `dist/` to GitHub Pages via
[`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).
