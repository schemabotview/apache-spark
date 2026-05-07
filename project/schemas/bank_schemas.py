"""Canonical (silver-layer) schemas for the bank domain.

These match the data model in `data/02-data-model.ipynb`. Bronze reads raw
files with looser types (often all StringType) and silver casts to these.
"""
from pyspark.sql.types import (
    BooleanType,
    DateType,
    DecimalType,
    IntegerType,
    StringType,
    StructField,
    StructType,
    TimestampType,
)

MONEY = DecimalType(18, 2)
RATE = DecimalType(5, 2)


customers_schema = StructType([
    StructField("customer_id",   StringType(),    nullable=False),
    StructField("full_name",     StringType()),
    StructField("email",         StringType()),
    StructField("phone",         StringType()),
    StructField("date_of_birth", DateType()),
    StructField("gender",        StringType()),
    StructField("city",          StringType()),
    StructField("state",         StringType()),
    StructField("country",       StringType()),
    StructField("created_at",    TimestampType()),
])

card_accounts_schema = StructType([
    StructField("card_id",      StringType(),    nullable=False),
    StructField("customer_id",  StringType(),    nullable=False),
    StructField("card_type",    StringType()),
    StructField("credit_limit", MONEY),
    StructField("status",       StringType()),
    StructField("issued_at",    TimestampType()),
])

card_transactions_schema = StructType([
    StructField("transaction_id",    StringType(),    nullable=False),
    StructField("card_id",           StringType(),    nullable=False),
    StructField("customer_id",       StringType(),    nullable=False),
    StructField("merchant_name",     StringType()),
    StructField("merchant_category", StringType()),
    StructField("amount",            MONEY,           nullable=False),
    StructField("currency",          StringType()),
    StructField("transaction_at",    TimestampType(), nullable=False),
    StructField("status",            StringType()),
    StructField("is_flagged",        BooleanType()),
])

loan_accounts_schema = StructType([
    StructField("loan_id",          StringType(),    nullable=False),
    StructField("customer_id",      StringType(),    nullable=False),
    StructField("loan_type",        StringType()),
    StructField("principal_amount", MONEY),
    StructField("interest_rate",    RATE),
    StructField("tenure_months",    IntegerType()),
    StructField("disbursed_at",     TimestampType()),
    StructField("status",           StringType()),
])

loan_repayments_schema = StructType([
    StructField("repayment_id", StringType(),    nullable=False),
    StructField("loan_id",      StringType(),    nullable=False),
    StructField("customer_id",  StringType(),    nullable=False),
    StructField("due_date",     DateType(),      nullable=False),
    StructField("paid_date",    DateType()),
    StructField("due_amount",   MONEY,           nullable=False),
    StructField("paid_amount",  MONEY),
    StructField("status",       StringType()),
])

bank_accounts_schema = StructType([
    StructField("account_id",    StringType(),    nullable=False),
    StructField("customer_id",   StringType(),    nullable=False),
    StructField("account_type",  StringType()),
    StructField("balance",       MONEY),
    StructField("interest_rate", RATE),
    StructField("opened_at",     TimestampType()),
    StructField("status",        StringType()),
])

account_transactions_schema = StructType([
    StructField("txn_id",        StringType(),    nullable=False),
    StructField("account_id",    StringType(),    nullable=False),
    StructField("customer_id",   StringType(),    nullable=False),
    StructField("txn_type",      StringType()),
    StructField("amount",        MONEY,           nullable=False),
    StructField("balance_after", MONEY),
    StructField("txn_at",        TimestampType(), nullable=False),
])

payments_schema = StructType([
    StructField("payment_id",          StringType(),    nullable=False),
    StructField("sender_account_id",   StringType(),    nullable=False),
    StructField("receiver_account_id", StringType(),    nullable=False),
    StructField("sender_customer_id",  StringType(),    nullable=False),
    StructField("payment_mode",        StringType()),
    StructField("amount",              MONEY,           nullable=False),
    StructField("currency",            StringType()),
    StructField("initiated_at",        TimestampType(), nullable=False),
    StructField("settled_at",          TimestampType()),
    StructField("status",              StringType()),
    StructField("failure_reason",      StringType()),
])


SILVER_SCHEMAS = {
    "customers":            customers_schema,
    "card_accounts":        card_accounts_schema,
    "card_transactions":    card_transactions_schema,
    "loan_accounts":        loan_accounts_schema,
    "loan_repayments":      loan_repayments_schema,
    "bank_accounts":        bank_accounts_schema,
    "account_transactions": account_transactions_schema,
    "payments":             payments_schema,
}

PRIMARY_KEYS = {
    "customers":            "customer_id",
    "card_accounts":        "card_id",
    "card_transactions":    "transaction_id",
    "loan_accounts":        "loan_id",
    "loan_repayments":      "repayment_id",
    "bank_accounts":        "account_id",
    "account_transactions": "txn_id",
    "payments":             "payment_id",
}
