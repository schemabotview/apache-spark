# CLAUDE.md — apache-spark (lean operational pointers)

> **Status: CHAPTERS 1–3 OF 8 AUTHORED, 2026-10-07.** 25 of 71 sections · **24 scenes** (ch2 §1 and
> §2 share one) · **0 wavs** (narration written, Colab pass pending). `npm run build`,
> `tsc --noEmit` and `npm run check` all clean, and all 25 routes were rendered and verified at
> 1920×1080 — 0 clipping, 0 page errors.
> Not yet a git repo with a remote: `schemabotview/apache-spark` does not exist (404, verified
> 2026-10-07) and nothing is pushed or deployed.

The **Apache Spark** concept app of GraphL. Workspace-wide invariants and the content model live in
the workspace [`CLAUDE.md`](../CLAUDE.md) — read that first; this file is Spark-specific.

## What this is

A standalone concept app: its own scenes + courses. The render engine is the **`@graphlearning/flow`**
package (repo `schemabotview/ui-flow`) and the app shell is **`@graphlearning/shell`** (repo
`schemabotview/ui-shell`) — both pinned by version (`flow@^1.2.0`, `shell@^0.8.0`), so an engine
change never lands here until this repo upgrades and re-verifies.

Each **section** = `(scene, slide, narration)`; the left scene is a react-flow diagram or a code
snippet, the right slide is markdown. One section = one slide = one video segment.

## Course arc (8)

`foundations · architecture · programming · engineering · internals · performance · streaming ·
production` — the eight chapters of [`COURSE-PLAN.md`](./COURSE-PLAN.md), played in syllabus order.
**71 sections in total** (7 + 9 × 7), which would make this the largest content repo in the
workspace (`sql`, the current largest, has 46).

| course | chapter | § | what it covers |
| --- | --- | --- | --- |
| `foundations` ✅ | 1 | 7 | scale-up vs scale-out, partitioning, data locality, MapReduce's limits, why Spark exists |
| `architecture` ✅ | 2 | 9 | driver / executors / cluster managers, jobs → stages → tasks, narrow vs wide, lazy evaluation |
| `programming` ✅ | 3 | 9 | RDDs and lineage, DataFrames and schemas, Spark SQL, the file formats |
| `engineering` | 4 | 9 | schema evolution, data quality, joins, window functions, complex types, UDF trade-offs |
| `internals` | 5 | 9 | logical → physical plans, Catalyst, Tungsten, whole-stage codegen, shuffle, reading `explain()` |
| `performance` | 6 | 9 | partition sizing, join strategies, skew, caching, pushdown, AQE, the Spark UI |
| `streaming` | 7 | 9 | Structured Streaming, event vs processing time, watermarks, state, checkpointing |
| `production` | 8 | 9 | deployment, capacity planning, observability, failure modes, Delta/Iceberg/Hudi, the capstone |

`production` ends in the capstone — an end-to-end system that weaves in every prior chapter, the same
shape `sql`'s and `python`'s last course takes.

## `foundations` — the chapter as written

One **argument** in seven steps, not seven topics. Each section depends on the one before it, so this
is the only chapter in the course whose sections cannot be reordered or watched out of sequence:

1. `data-intensive` — one machine's three **numbered** ceilings (disk 8 TB / RAM 64 GB / I/O 2 GB/s
   = capacity, memory, throughput), and a bigger machine raising all three while removing none.
   The numbers are load-bearing, not decoration: "the disk is the size it is" is forgettable, and
   "10 TB at 2 GB/s is 80+ minutes just to read it once" is an argument a reader can check. The
   scene deliberately **stops at the wall** — more machines is §2's reveal and must not be spent here
2. `scale-out` — the fork, drawn as **two parallel columns read downward** rather than two pictures
   collapsing into one shared table: a fork drawn as a fork keeps the comparison in the reader's
   hands. Rows align across the columns and share an icon per row (gauge, receipt), so the pairing
   is visible without row labels. The cost row carries it — `$$$ → $$$$$` against `$ + $ + $ + $`
   shows super-linear vs additive as a SHAPE, where a sentence saying "super-linear" asks for trust
3. `storage-and-compute` — blocks, replication, and the rule the field turns on: send the
   computation to the data
4. `partitioning` — **the load-bearing section.** partition → task → slot → width, and locality as a
   ladder (`PROCESS_LOCAL` … `ANY`). "Partition" is the word every later chapter spends
5. `mapreduce` — the model taken seriously first, then the disk round-trip that is its contract, and
   the four workloads it refuses for that one reason
6. `why-spark` — four design decisions answering §5's four refusals, in the same order
7. `the-ecosystem` — Core plus the four libraries, what Spark deliberately does not own, and the
   handoff into chapter 2

Two scenes carry engine capabilities the rest of the chapter leans on: `cluster-storage` is built on
genuine **nesting** (a cluster contains machines, a machine contains blocks — containment, not flow,
and three nodes × two blocks is the smallest drawing where replication is visibly correct), and
`spark-answer` is the chapter's only **code card**, used as evidence for a claim about line count
that no diagram could make. Two scenes (§4, §5) use **table** nodes, which is what keeps the real
locality level names unabbreviated — a table node is exempt from the leaf-card text budget.

`focus` is set on exactly three sections (§3 `ship-code`, §4 `ch-part`, §6 `an-mem`) — the ones with
a single card as their thesis. Everywhere else the whole board is the point.

### Known, not a defect

Routes with table nodes (ch1 §4–§5; ch2 §5, §8, §9) log a React *"Each child in a list should have a
unique key"* warning in dev. It is the published engine's: `ui-flow/src/TableNode.tsx:47` defines
`cell()` returning a keyless `<div>` and calls it inside `chars.map()` at line 108. Dev-only, no
effect on the render, and it fires in every repo using the `headers`/`values` table form — the fix
belongs in `ui-flow`.

## `architecture` — the chapter as written

The promise is narrow and testable: by §9 a reader can take a program they have never seen and
predict its **jobs** (count the actions), its **stages** (count the wide dependencies, add one) and
its **tasks** (the partition count) before running it.

1. `the-application` — the runtime **topology**, on the `spark-topology` fixture's grammar: three
   banded columns, `01 Driver · control plane → 02 Cluster manager → 03 Worker nodes`, over a
   storage row. Bands are driver/manager/workers rather than the fixture's sources/driver/workers
   because this is a chapter about the execution model, so the control plane is the subject and the
   data plane becomes the row underneath. **No back edge**: the fixture's dashed executor→driver
   reads well when driver and workers are adjacent, but here the manager sits between them and the
   edge lands on top of two of its cards. §2 step 3 carries that claim in words instead
2. `driver-and-executors` — **shares §1's scene**, differing only by `focus: 'w1'`, which lights the
   worker machine. The cast is identical, so one canonical board shown twice under different
   narration deepens it rather than replacing it. The worker holds TWO executors precisely so this
   section can ride it: *worker ≠ executor, and one machine holds several* is then a picture rather
   than a sentence. `focus` is load-bearing here, not decoration — a section is a video segment, and
   without it §1 and §2 would be the same frame twice in a row
3. `sparksession` — code card. `getOrCreate` returning the *existing* session and silently ignoring
   your new `.config(...)` is the most common "my setting did nothing" bug, so it gets the airtime
4. `jobs-stages-tasks` — **nested scopes, not three steps**, so it is drawn as containment. Stage 0
   has four tasks and stage 1 has three, which makes the counting rule visible: the task count
   belongs to each *stage*, not to the job
5. `parallel-execution` — the arithmetic, with real numbers: 3 × 4 = 12 slots, 200 partitions = 200
   tasks = **17 waves**, and a final wave of 8 tasks leaving 4 slots idle
6. `dependencies` — **the chapter's best scene.** See below
7. `the-dag` — the BUILD (calls → lineage → DAG → stages), where §4 showed the result. The *acyclic*
   card is load-bearing, not pedantry: it is what makes lineage replay terminate
8. `lazy-evaluation` — the reveal (see the order note in `src/content/architecture/index.ts`)
9. `deployment-modes` — the four schedulers, and `--deploy-mode` deciding whether closing your laptop
   kills the job

### Nested edges — the capability this chapter added

Chapter 1 never needed them. `collectEdges` in the engine flattens **every** `edges` array in a scene
into one list *without scoping `source`/`target`* — a node's own `edges` only changes the default
`dir`. So an edge may name any node at **any depth**, which is what makes §6 possible.

§6 draws its dependencies **partition to partition**, not container to container, and that is the
whole scene: narrow is three straight lines down, wide is nine lines crossing. The first draft drew
one arrow per column and asserted the difference in a label — the difference has to be *seen*. The
tangle on the right is literally what crossing the network looks like.

§4 uses the same mechanism more modestly: the shuffle boundary is declared on the `job` container,
between its own two stages.

### Scene sharing

`application-shape` is the repo's first shared scene, and the pattern generalises: when two sections
have the same cast, give them one board and separate them with `focus`. Containers render focus too
(`ContainerNode.tsx` — 3px border, tinted fill, glow), so a whole band can be lit, not just a leaf.
The constraint to respect is that **the shared board must carry every claim both sections make** —
§1's worker was drawn with one executor until §2 moved onto it, and a single executor quietly says
"worker" and "executor" are the same word.

### A second repo-local fix to the guard

Pointing §2 at the shared scene made `npm run check` report `scene 'application-shape' not found`.
The guard was wrong, not the section: it identified a scene by the **first** `id:` in the file, and a
scene assembled from extracted `SceneNode` consts — the style `ui-flow`'s own study fixtures use, and
now `application-shape` — declares those nodes *above* the `Scene`, so it matched `'driver'`. It now
searches from the `: Scene =` declaration onward. Worth porting: any repo adopting the fixture style
will hit this, and the symptom points at the section rather than the guard.

### A layout trap worth remembering

§5 originally drew 12 slot tiles abreast. Everything passed — `tsc`, `check`, `build` — and the
rendered frame was still wrong: a very wide scene makes `fitView` shrink the *whole* board, and the
table carrying the actual content became unreadable. Each executor now lays its four slots out 2×2.
**No guard can catch this**; only looking at the route can. It is the clearest example in the repo of
why the rendered frame is the bar.

## Read `ui-flow/dev/fixtures/` before authoring

**This repo's chapter 1 and most of chapter 2 were authored without opening it. That was a mistake.**
The harness (`cd ../ui-flow && npm run dev`, :5175) serves one fixture per engine capability, and
`dev/fixtures/studies/spark-topology.ts` is *the engine author's own reference drawing of the Spark
runtime* — 200 lines of commented rationale about this exact subject.

What was missed by not reading it, all of it present in the pinned `flow@1.2.0`:

| | what it does | where it was needed |
| --- | --- | --- |
| `icon: 'none'` | suppress a container's default glyph | every band in every scene carries a meaningless grey cube |
| `align: 'start'` + `stretch` | rule sibling bands to one top and one bottom edge | the *actual* mechanism for the column alignment in ch1 §2 and ch2 §6 — both were hand-balanced instead |
| `variant: 'chip'` | a counted token, not a 210×96 card | ch2 §4 tasks, §5 slots — oversized cards saying one word |
| `badge: '01'` | a number on a band | any ordered band sequence |
| `route: 'step'` | orthogonal routing | long cross-row edges, where a bezier sweeps diagonally |
| `bidirectional` / `dir` | edge direction control | read/write channels, and back edges |
| vendor icons | `s3`, `adls`, … | see the icon note below |

§1 `application-shape` is built on that fixture's grammar, reduced for section scale: the fixture is a
poster for `?full=1` at 50 nodes, while a section scene renders in half a 1920×1080 frame beside a
slide.

**The sweep is done — all 15 scenes carry these now.** What it changed:

- **`icon: 'none'` on all 22 `pattern: 'group'` containers.** Every one was drawing a grey cube that
  meant nothing. A group container is a HEADING; it is not a thing with a glyph. Removing it also
  made each container narrower, so several boards scaled UP noticeably (`scale-out` went from a
  956px to a 1092px viewport, `dependencies` 1596 → 1601 with far more inside it).
- **50 leaves became chips, 32 stayed tiles.** The rule that settled it: a chip is for a COUNTED
  token — tasks, slots, partitions, blocks, commodity nodes — where what the reader takes from the
  row is *how many*, read without reading words. A tile is for a DESCRIBED thing, which is anything
  carrying a `sub`, plus a vendor logo. `scale-out` now uses both on purpose: scale-up's three are
  described (more cores, more RAM), scale-out's four are interchangeable tokens, and that asymmetry
  *is* the difference between the two strategies.
- **`align: 'start'` + `stretch` on the two column forks** (ch1 §2 `fork`, ch2 §6 `compare`). Both
  were previously kept level by hand-balancing each card's `sub` until the rows happened to line up —
  a hack that silently breaks the next time anyone edits a word.

One knock-on worth recording: chips made `dependencies` compact enough that the board scaled up, and
the larger type meant its nine shuffle edges now cut through the inner containers' headings. The fix
was to move the operation names up to each column's `sub` and shorten the inner labels to
`Parents` / `Children` — less text in the edges' way. **Only the rendered frame shows this.**

## `programming` — the chapter as written

The chapter where Spark stops being a model and becomes something you type, so **six of the nine
scenes carry a code card** and four carry a table. An API chapter drawn entirely in boxes-and-arrows
would be lying about its subject.

Arc: §1–§3 RDDs → §4–§6 DataFrames and SQL → §7 "stay in the second group" → §8–§9 production shape.
Teaching RDDs first and then saying *do not use these* is deliberate: a DataFrame IS an RDD
underneath, lineage is the recovery story for both, and §3's combine-before-you-shuffle rule is
invisible from the DataFrame API precisely because the engine applies it for you.

- `combine-locally` (§3) is the chapter's best scene and the highest-payoff section in the course so
  far — `groupByKey` vs `reduceByKey` is a one-word change with an order-of-magnitude result. The
  chips carry it: **six records crossing the wire against two**, for the same answer. A reader counts
  chips and has the lesson before reading a word
- `dataframe-schema` (§4) is the repo's **first table node in SCHEMA mode** — `columns` with PK/FK
  badges rather than `headers`/`values`. A DataFrame is a schema, so it is drawn as one
- `sql-same-plan` (§6) is two code cards converging on one node, because the section's only claim is
  that the two spellings are not similar but *identical*. A comparison table would imply a difference
  worth weighing

### How big a code card renders — the actual model

Chased this across four rounds of guessing before measuring it. The rules, in order of leverage:

1. **Find out which axis binds before touching anything.** `fitView` scales a board by
   `min(paneW/boardW, paneH/boardH)`. `programming-rdds` was **height**-bound at 775×912 in a
   1114×1080 pane — so a round of shortening headers and dropping a chip column moved the rendered
   type by **0.5px**. Probe natural board size first; optimising the free axis is wasted work.
2. **`hug: true` on any code card inside a diagram.** A card is padded out to `CODE_MIN_COLS = 64`
   unless it hugs (`ui-flow/src/codeMetrics.ts:25`). §1's lines are 42 chars, so 22 columns ≈ 198px
   were reserved and drawn **empty**, and that dead width came straight off the rendered glyph.
3. **`PROSE_W = 300` is a fixed constant** (`proseMetrics.ts:34`). A prose card is *always* 300px
   wide no matter how short its label — shortening text changes only its HEIGHT. A column of them
   beside a code card therefore costs a flat 328px of board width that nothing can recover.
4. **Keep source lines well under 64 columns.** A longer line widens its card and shrinks that
   scene's type — `ui-flow`'s own CLAUDE.md states this as a house rule.

Where the chapter landed: **§9 25.1px · §6 23.5px · §3 21.6px · §1 21.3px · §5 20px.**

### Composition rules, learned the hard way on this chapter

Three things about where a code card goes, all of which only show up in the rendered frame:

- **`fitView` scales a board to whichever axis binds first.** A wide-and-short board scales to WIDTH
  and leaves the bottom half of the pane empty with everything still small. §6's two snippets side by
  side measured ~880×200 and were unreadable; **stacked** they are taller than wide, scale to HEIGHT,
  and roughly doubled. Rotating a comparison from side-by-side to stacked costs nothing and can
  double the type.
- **Give a code card a whole row where you can.** §1 ended up as two rows — code across the top,
  then the lineage chain running LEFT TO RIGHT beneath it. Both earlier attempts failed in opposite
  directions: stacked with a *vertical* chain the board was tall and height-bound; side by side the
  chain ate half the width. A horizontal chain is the only arrangement where the derivation still
  reads as a sequence and the code gets a full row to itself.
- **A fixed-width column beside the code caps it — so cut the column.** §9 originally kept the five
  steps on the left and the code on the right, which cost a flat 328px (see `PROSE_W` above) and held
  the snippet to 18.5px. The column was CUT: the same five steps are numbered 1–5 in §9's own slide,
  so the board lost no information, and the code took the whole frame at **25.1px** — the largest in
  the chapter. It also got its real spelling back (`customers`, not `custs`), because the
  abbreviations existed only to buy width. **When a scene's content IS the code, give it the board.**
- **Vary the axis across a chapter.** Nine scenes that all stack vertically read as one long
  monotonous deck. §1 code-left, §6 stacked, §9 code-right is deliberate rhythm.

### Two silent no-ops found while composing

- **`cols` is ignored once a container has edges.** `depthOf` (`ui-flow/src/layout.ts:37`) ranks a
  container's children topologically when it carries any edges, and only falls back to the `cols`
  grid when `edges.length === 0`. §1 shipped `cols: 3` on a chain that could never be anything but
  vertical. No error, no warning.
- **`badge` is rendered by `ContainerNode.tsx` and nothing else.** On a leaf card it does nothing at
  all. §9 shipped five invisible badges; the numbers now live in the labels. Neither of these is
  caught by `npm run check` — a third guard rule could catch the `badge` one cheaply.

### The model is not the oracle — a worked example

§3's slide modelled 1039px against a 1078px ceiling, passed `npm run check`, and **clipped at 1096px
in the DOM**. That is the documented ±3.5% error, and it is why every route gets rendered and
measured with `panel.clientHeight` after the guard goes green. The guard catches the gross case; the
browser catches the rest.

## Authoring a chapter

1. `src/scenes/<course>/` — one scene per section + an `index.ts` exporting `<course>Scenes: Scene[]`.
2. `src/content/<course>/NN-<id>.ts` — one `Section` per file + an `index.ts` exporting the `Course`.
3. Register both: spread the scenes into `ALL` in `src/scenes/index.ts`, add the course to `COURSES`
   in `src/content/index.ts`. The slug is `<courseId>-<sectionId>` — the shell computes it.
4. Narration is the `narration` field only. **Wavs are a single Colab + Chatterbox pass at the end of
   a chapter** (`npm run gen:audio` → `public/audio/<course>/<id>.wav`), never hand-produced.
5. Guards: `npm run build` + `npx tsc --noEmit` + `npm run check`. All three pass on frames that are
   visually wrong, so the rendered route at `#/<course>-<section>` is the real bar.

## The content guard

`scripts/check-content.mjs` is **azure's copy** — the most complete of the ten in the workspace (the
five it runs: leaf-card height, unbreakable-token width, slide height, `focus` naming a real node, and
a narration wav per section once a course has its first one). The icon-key guard is deliberately
absent in every repo: the published engine minifies its registry bindings, so there is no stable
anchor to parse. An unregistered `icon:` silently falls back to the pattern glyph, so **icon names
stay honest by eye**.

**There are 277 keys, not 75.** `NodeIcon` resolves `awsIcons.ts` (68) and `azureIcons.ts` (134)
*before* `lucideIcons.ts` (75), so vendor marks like `s3` and `adls` are addressable by the same
`icon:` field — §1 uses both. Eight lucide keys (`workflow · box · gears · memory · zap · brain ·
waves · share`) were contributed by this concept's earlier copy and are already Spark-shaped.
`icon: 'none'` suppresses the glyph entirely, which is what a container acting as a HEADING wants.

The wav guard reads `public/audio/`, so that directory must exist — hence `public/audio/.gitkeep`.
Delete it once a real course directory lands there.

## Palette

`--brand` is Spark's logo orange `#e25a1c`, and it is **not a free choice**: `dbt/src/theme.css` and
`java/src/theme.css` both name it as apache-spark's hue and pick around it. The warm `--brand` is
countered by a cool `#5cc0cf` on the slide's `###`, the same inversion aws/dbt/java use.
`ui-graphl`'s `catalog.json` already ships the card at tint `#e25a1c` — so the card, the favicon, the
thumbnail gradient in `scripts/concept.json` and this file agree.

## Layout

```
src/scenes/          scenes + registry (a scene can be shared across sections)   — 2 of 8 courses
src/content/         courses → sections + registry                               — 2 of 8 courses
src/main.tsx         mounts <ConceptApp> — the whole app
src/theme.css        this repo's three brand tokens — its entire design surface
scripts/             check-content.mjs (the guard) · concept.json (publishing identity) · titles.json
public/audio/        narration wavs, audio/<course>/<section>.wav                — EMPTY
public/favicon.svg   the concept tile
```

The record / capture / thumb **tools** are `@graphlearning/shell` bins (`graphl-record`,
`graphl-shots-4k`, `graphl-thumb`, …), already wired as npm scripts; they are not in this repo.

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to Pages on every push to `main`, served
at **graphl.in/apache-spark/** (the apex domain is inherited from the org's `schemabotview.github.io`
site, so no CNAME here; the vite `base` is `/apache-spark/`). The catalog card is already live and
currently points at a dead site — this repo's first deploy is what resolves it.

**Before the first push:** the GitHub repo has to be created, and Pages set to "GitHub Actions".
