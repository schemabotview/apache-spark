# Apache Spark Learning Content Repo

## Role
You are an Apache Spark expert and content creator. This repo contains educational content covering Apache Spark concepts, primarily targeting the Databricks Certified Associate Developer for Apache Spark exam and general Spark/PySpark knowledge.

## Repo Structure

- `*.ipynb` — Jupyter notebooks, one per Spark topic. Each notebook contains:
  - **Markdown cells** — theory, explanations, diagrams (in text), definitions
  - **Code cells** — hands-on examples, PySpark snippets, or demos
- `generate_bank_data.ipynb` — One-time setup notebook that writes the `data/` folder (8 tables, 5 formats). Run before any topic notebook.
- `tts/` — Plain-text `.tts` files, one per topic, used as TTS source scripts
- `audio/` — Pre-generated audio files (`.wav`) for each topic, generated from `.tts` files using ChatterboxTTS on Colab GPU
- `data/` — Generated sample data (gitignored). Created by `generate_bank_data.ipynb`.

## Notebook Conventions

- Filename: `01-what-is-apache-spark.ipynb`, `02-spark-architecture.ipynb` — leading numbers control sort order
- Each notebook covers a single topic
- First cell must be a markdown cell that introduces the topic
- Use markdown cells for explanations and theory, code cells for runnable PySpark examples
- Outputs (stdout, etc.) can be included — the viewer renders them
- Notebook filenames use kebab-case and are the single source of truth for naming — `.tts` and `.wav` files use the exact same stem (e.g., `01-spark-architecture.ipynb` → `tts/01-spark-architecture.tts` → `audio/01-spark-architecture.wav`)

## Audio Generation

Audio is generated via `generate_audio_colab.ipynb` on Google Colab (T4 GPU):
1. Reads `.tts` files from `tts/`
2. Generates `.wav` files using ChatterboxTTS
3. Pushes each `.wav` to `audio/` via git commit

## Topics Covered

| Topic | Notebook | Audio |
|---|---|---|
| Fintech Bank Domain Reference | `bank-domain.ipynb` | _(no audio)_ |
| What is Apache Spark & Why Use It | `01-what-is-apache-spark.ipynb` | `01-what-is-apache-spark.wav` |
| Spark Architecture | `02-spark-architecture.ipynb` | `02-spark-architecture.wav` |
| Setting Up PySpark & Databricks | `03-setting-up-pyspark-databricks.ipynb` | `03-setting-up-pyspark-databricks.wav` |
| RDDs — The Foundation | `04-rdds-the-foundation.ipynb` | `04-rdds-the-foundation.wav` |
| DataFrames & Datasets | `05-dataframes-datasets.ipynb` | `05-dataframes-datasets.wav` |
| SparkSession & Execution Model | `06-sparksession-execution-model.ipynb` | `06-sparksession-execution-model.wav` |
| Reading & Writing Data | _(planned)_ | `reading--writing-data.wav` |
| Core Transformations | _(planned)_ | `core-transformations.wav` |
| Aggregations & Window Functions | _(planned)_ | `aggregations--window-functions.wav` |
| Spark SQL & Temporary Views | _(planned)_ | `spark-sql--temporary-views.wav` |
| SQL Functions & UDFs | _(planned)_ | `sql-functions--udfs.wav` |
| Partitioning, Shuffles & Catalyst | _(planned)_ | `partitioning-shuffles--catalyst.wav` |
| Caching & Persistence | _(planned)_ | `caching--persistence.wav` |
| Broadcast Joins & Data Skew | _(planned)_ | `broadcast-joins--data-skew.wav` |
| Structured Streaming Fundamentals | _(planned)_ | `structured-streaming-fundamentals.wav` |
| Sources, Sinks & Watermarking | _(planned)_ | `sources-sinks--watermarking.wav` |
| Stateful Stream Processing | _(planned)_ | `stateful-stream-processing.wav` |
| What is Delta Lake? | _(planned)_ | `what-is-delta-lake.wav` |
| ACID & Time Travel | _(planned)_ | `acid--time-travel.wav` |
| Delta Operations & Optimization | _(planned)_ | `delta-operations--optimization.wav` |
| MLlib & Spark ML Pipelines | _(planned)_ | `mllib--spark-ml-pipelines.wav` |
| Databricks Certified Spark Developer Exam Guide | _(planned)_ | `databricks-certified-spark-developer-exam-guide.wav` |

## Content Guidelines

- Write theory in clear, beginner-friendly language
- Use real-world analogies to explain Spark concepts
- Keep code examples practical and minimal — demonstrate the concept, not the full API
- Prefer PySpark (Python) for code examples unless Scala is more illustrative
- Each notebook should be self-contained and readable top-to-bottom
- `.tts` files should be plain prose (no markdown, no code) — they are read aloud by TTS
