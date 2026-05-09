# Apache Spark Learning Content Repo

## Role
You are an Apache Spark expert and content creator. This repo contains educational content covering Apache Spark concepts, primarily targeting the Databricks Certified Associate Developer for Apache Spark exam and general Spark/PySpark knowledge.

See `../CLAUDE.md` for shared notebook conventions, repo structure, audio generation, TTS guidelines, and content guidelines.

## Local Setup

To run notebooks locally (Java 17+ must also be present):

```bash
pip install pyspark==3.5.3 delta-spark==3.2.1
```

All SparkSessions that use Delta must be created with `configure_spark_with_delta_pip()` so the Delta JARs are loaded at the JVM level:

```python
from delta import configure_spark_with_delta_pip
spark = configure_spark_with_delta_pip(SparkSession.builder. ...).getOrCreate()
```

`generate_bank_data.ipynb` — one-time setup that writes the `data/` folder (8 tables, 5 formats). Run before any topic notebook. `data/` is gitignored.

## Content Guidelines

- Prefer PySpark (Python) for code examples unless Scala is more illustrative
- Use real-world analogies to explain Spark concepts

## TTS Guidelines

`.tts` files are read aloud by ChatterboxTTS (typically via `generate_audio_colab.ipynb` on a T4 GPU). They must be plain spoken prose — what a teacher would say at a whiteboard.

- **Plain prose only** — no markdown, no `#` headings, no bullets, no backticks, no asterisks. Write section titles as a plain sentence ending with a full stop (e.g. `Lazy evaluation.`).
- **No raw code** — describe what code does conceptually or in pseudo-code form. Never paste code blocks. Method chains like `df.filter(...).select(...)` become "filter, then select."
- **Spell out symbols and shorthand:**
  - Operators: `//` → "floor division", `%` → "modulo", `->` → "returns", `=>` → "maps to", `===` → "strict equality", `.` (in `spark.version`) → "dot"
  - Acronyms: RAM → "ram", CPU → "see-pee-you", API → "ay-pee-eye", JVM → "java virtual machine", GC → "garbage collector", DAG → "directed acyclic graph" (spell out on first use), OLTP → "online transaction processing"
  - Hex / addresses: `0xFF` → "hex F-F", `0x0000` → "memory address zero"
  - Complexity: O(1) → "constant time", O(n) → "linear time", O(n log n) → "n log n time"
  - Versions: `3.5.3` → "three point five point three"
  - Variable names: underscores become spaces and common abbreviations get expanded — `list_a` → "list A", `left_ptr` → "left pointer", `idx` → "index", `len` → "length", `df` → "dataframe", `credit_score` → "credit score"
- **Natural spoken flow** — write as a teacher explains at a whiteboard. Use transitional phrases: "notice that", "the key insight here is", "to put it another way", "picture this".
- **Skip visual-only content** — never narrate diagrams, tables, or `.show()` outputs. Describe what the listener should picture instead.
- **Pace with paragraph breaks** — each paragraph = one idea. A blank line between paragraphs gives the TTS engine a natural pause. Aim for 2–4 sentences per paragraph.
- **Filename convention** — `.tts` filename matches the notebook stem exactly: `01-spark-foundations.ipynb` → `tts/01-spark-foundations.tts` → `audio/01-spark-foundations.wav`.

## Topics Covered

Curriculum is consolidated into 10 thematic notebooks for retention. Each notebook is self-contained, uses inline code cells (concept → tiny demo → next concept), and skips filler sections like "what's covered" and end-of-notebook summaries.

| # | Topic | Notebook | Audio | Merges (old) |
|---|---|---|---|---|
| — | Fintech Bank Domain Reference | `bank-domain.ipynb` | _(no audio)_ | — |
| 01 | Spark Foundations | `01-spark-foundations.ipynb` | `01-spark-foundations.wav` | what is Spark + architecture + setup |
| 02 | RDDs — The Foundation | `02-rdds.ipynb` | `02-rdds.wav` | RDDs |
| 03 | DataFrames & Execution Model | `03-dataframes-execution-model.ipynb` | `03-dataframes-execution-model.wav` | DataFrames/Datasets + SparkSession/execution |
| 04 | Reading & Writing Data | `04-reading-writing-data.ipynb` | `04-reading-writing-data.wav` | I/O |
| 05 | Transformations & Aggregations | `05-transformations-aggregations.ipynb` | `05-transformations-aggregations.wav` | core transformations + aggregations/windows |
| 06 | Spark SQL & UDFs | `06-spark-sql-udfs.ipynb` | `06-spark-sql-udfs.wav` | SQL/views + functions/UDFs |
| 07 | Performance & Tuning | `07-performance-tuning.ipynb` | `07-performance-tuning.wav` | partitioning/shuffles/catalyst + caching + broadcast/skew |
| 08 | Structured Streaming | `08-structured-streaming.ipynb` | `08-structured-streaming.wav` | streaming fundamentals + sources/sinks/watermarking + stateful |
| 09 | Delta Lake | `09-delta-lake.ipynb` | `09-delta-lake.wav` | intro + ACID/time travel + ops/optimization |
## Extras (optional track)

| Topic | Notebook | Audio |
|---|---|---|
| MLlib & Spark ML Pipelines | `extras/mllib-spark-ml-pipelines.ipynb` | `mllib--spark-ml-pipelines.wav` |
| Pandas API on Spark | `extras/pandas-api-on-spark.ipynb` | `22-pandas-api-on-spark.wav` |
