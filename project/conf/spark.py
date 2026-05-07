"""Shared SparkSession factory for the bank project.

Every notebook in this project should call `get_spark()` to obtain a
Delta-enabled SparkSession with consistent configuration.
"""
from pathlib import Path

from delta import configure_spark_with_delta_pip
from pyspark.sql import SparkSession

PROJECT_ROOT = Path(__file__).resolve().parent.parent
LANDING_DIR = PROJECT_ROOT / "landing"
LAKEHOUSE_DIR = PROJECT_ROOT / "lakehouse"
BRONZE_DIR = LAKEHOUSE_DIR / "bronze"
SILVER_DIR = LAKEHOUSE_DIR / "silver"
GOLD_DIR = LAKEHOUSE_DIR / "gold"
STREAM_LANDING_DIR = LAKEHOUSE_DIR / "streaming" / "landing"
STREAM_OUTPUT_DIR = LAKEHOUSE_DIR / "streaming" / "fraud_alerts"
STREAM_CHECKPOINT_DIR = LAKEHOUSE_DIR / "streaming" / "checkpoints"


def get_spark(app_name: str = "BankProject") -> SparkSession:
    builder = (
        SparkSession.builder
        .appName(app_name)
        .master("local[*]")
        .config("spark.sql.extensions", "io.delta.sql.DeltaSparkSessionExtension")
        .config(
            "spark.sql.catalog.spark_catalog",
            "org.apache.spark.sql.delta.catalog.DeltaCatalog",
        )
        .config("spark.sql.shuffle.partitions", "4")
        .config("spark.ui.showConsoleProgress", "false")
    )
    return configure_spark_with_delta_pip(builder).getOrCreate()
