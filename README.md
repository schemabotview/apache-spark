# apache-spark — GraphL concept repo

The **Apache Spark** concept app for [GraphL](https://graphl.in). One section = a left **scene**
(react-flow diagram or code snippet) + a right **slide** (markdown) + a **narration** script,
rendered responsively (4K capture · laptop web app · mobile) and captured to video.

Workspace-wide model, pipeline, and conventions: see the workspace [`README.md`](../README.md).

## The course arc (5 courses)

Played in syllabus order (`→` past the end of one rolls into the next):

| # | Course | What it covers |
|--:|--------|----------------|
| 1 | **evolution** | From big data to the unified engine: Hadoop, YARN, and the two eras of Spark. |
| 2 | **spark-architecture** | Driver, executors, stages & the shuffle: how a job runs across the cluster. |
| 3 | **spark-api** | RDD → DataFrame → SQL, and Catalyst beneath: the layers you write and how they compile down. |
| 4 | **spark-streaming** | Structured Streaming: the stream as an unbounded table, event-time windows & watermarks. |
| 5 | **capstone** | Everything end to end: a Lambda pipeline (batch + speed + serving) using every concept. |

## Layout

```
src/
  render-engine/   layout + react-flow / code-snippet renderer (folder, not a package)
  scenes/          hand-authored scenes + registry
  content/         courses → sections (one file per section) + registry
  section/         composited scene-left / slide-right view (responsive)
  App.tsx          hash router — section (whole-scene) view · scene (individual) view
scripts/
  record-course.mjs / record-reels.mjs   capture → mp4 (landscape / portrait)
  thumb.mjs / gen-descriptions.mjs        thumbnails / video descriptions
  colab_generate_audio.ipynb              Colab + Chatterbox TTS → .wav
```

## Run

```bash
npm install
npm run dev                     # open the printed URL, try #/evolution
npm run build                   # tsc + vite build (must stay clean)
npm run record evolution        # 4K video → scripts/out/evolution.mp4
npm run record:reels evolution  # portrait reels
```
