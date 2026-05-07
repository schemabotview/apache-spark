# Bank Project — End-to-End Spark Practice

A self-contained Spark project on the bank domain (see `../data/01-business-overview.ipynb` and `../data/02-data-model.ipynb`). Covers **batch ETL**, **SQL analytics**, and **structured streaming** — all on Delta Lake.

## What it builds

```
landing/                 ← raw multi-format files (CSV, JSON, Parquet)
    │
    ▼ 01-bronze-ingest
lakehouse/bronze/        ← raw-as-is + ingest metadata, Delta
    │
    ▼ 02-silver-clean
lakehouse/silver/        ← typed, deduped, schema-enforced, Delta
    │
    ▼ 03-gold-marts
lakehouse/gold/          ← customer_360, daily_transactions, loan_portfolio
    │
    ▼ 04-sql-analytics   ← SQL queries on gold

lakehouse/streaming/landing/   ← 05 producer drips JSON files
    │
    ▼ 06-stream-fraud-detect
lakehouse/streaming/fraud_alerts/  ← Delta sink with alerts
```

## Prerequisites

```bash
pip install pyspark==3.5.3 delta-spark==3.2.1
```

Java 17+ must be on the PATH.

## Run order

Run notebooks top-to-bottom. Each one is idempotent and safe to re-run.

| # | Notebook | Purpose |
|---|---|---|
| 00 | `00-generate-bank-data.ipynb` | Writes ~5k rows of raw bank data to `landing/` |
| 01 | `01-bronze-ingest.ipynb` | Raw → Bronze Delta, adds `_ingest_ts`, `_source_file` |
| 02 | `02-silver-clean.ipynb` | Bronze → Silver: enforce types, dedupe, drop bad rows |
| 03 | `03-gold-marts.ipynb` | Silver → Gold: customer_360 + daily_transactions + loan_portfolio |
| 04 | `04-sql-analytics.ipynb` | SQL queries on Gold (windows, joins, cross-vertical) |
| 05 | `05-stream-producer.ipynb` | Drips card-txn JSON files (~1/sec) to streaming landing |
| 06 | `06-stream-fraud-detect.ipynb` | readStream + watermark + velocity rule → fraud_alerts Delta |

## Streaming demo

Run **06** in one Jupyter window, then run **05** in another. The fraud-alerts Delta table will populate as the producer emits transactions. Both notebooks stop cleanly after a bounded number of micro-batches.

## Layout

```
project/
├── conf/spark.py             # SparkSession factory (Delta-enabled) + paths
├── schemas/bank_schemas.py   # Canonical silver-layer StructTypes
├── 00..06 notebooks
├── landing/                  # raw input (gitignored)
└── lakehouse/                # Delta storage (gitignored)
```
