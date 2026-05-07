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
| Reading & Writing Data | `07-reading-writing-data.ipynb` | `07-reading-writing-data.wav` |
| Core Transformations | `08-core-transformations.ipynb` | `08-core-transformations.wav` |
| Aggregations & Window Functions | `09-aggregations-window-functions.ipynb` | `09-aggregations-window-functions.wav` |
| Spark SQL & Temporary Views | `10-spark-sql-temporary-views.ipynb` | `10-spark-sql-temporary-views.wav` |
| SQL Functions & UDFs | `11-sql-functions-udfs.ipynb` | `11-sql-functions-udfs.wav` |
| Partitioning, Shuffles & Catalyst | `12-partitioning-shuffles-catalyst.ipynb` | `partitioning-shuffles--catalyst.wav` |
| Caching & Persistence | `13-caching-persistence.ipynb` | `caching--persistence.wav` |
| Broadcast Joins & Data Skew | `14-broadcast-joins-data-skew.ipynb` | `broadcast-joins--data-skew.wav` |
| Structured Streaming Fundamentals | `15-structured-streaming-fundamentals.ipynb` | `structured-streaming-fundamentals.wav` |
| Sources, Sinks & Watermarking | `16-sources-sinks-watermarking.ipynb` | `sources-sinks--watermarking.wav` |
| Stateful Stream Processing | `17-stateful-stream-processing.ipynb` | `stateful-stream-processing.wav` |
| What is Delta Lake? | `18-what-is-delta-lake.ipynb` | `what-is-delta-lake.wav` |
| ACID & Time Travel | `19-acid-time-travel.ipynb` | `acid--time-travel.wav` |
| Delta Operations & Optimization | `20-delta-operations-optimization.ipynb` | `delta-operations--optimization.wav` |
| Databricks Certified Spark Developer Exam Guide | _(planned)_ | `databricks-certified-spark-developer-exam-guide.wav` |

## Miscellaneous

| Topic | Notebook | Audio |
|---|---|---|
| MLlib & Spark ML Pipelines | `21-mllib-spark-ml-pipelines.ipynb` | `mllib--spark-ml-pipelines.wav` |
| Pandas API on Spark | `22-pandas-api-on-spark.ipynb` | `22-pandas-api-on-spark.wav` |
