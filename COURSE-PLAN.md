Chapter 1 — Foundations of Distributed Data Processing
Goal: Build the conceptual foundation required to understand why Spark exists and how distributed computation works.
1. Data-intensive computing and the need for distributed systems
2. Scale-up versus scale-out architectures
3. Distributed storage and computation
4. Partitioning, parallelism, and data locality
5. MapReduce: computational model and limitations
6. The motivation and design philosophy of Apache Spark
7. Spark ecosystem and common application domains
Outcome: You should be able to explain why Spark exists before learning how to program it.
Chapter 2 — Spark Architecture and Execution Model
Goal: Develop a rigorous mental model of a Spark application.
1. Spark application architecture
2. Driver, executors, workers, and cluster managers
3. SparkSession and application lifecycle
4. Jobs, stages, and tasks
5. Partitions and parallel execution
6. Narrow versus wide dependencies
7. DAG construction and execution
8. Lazy evaluation and actions
9. Cluster deployment modes: local, standalone, YARN, and Kubernetes
Outcome: Given a Spark program, you should begin predicting how Spark will execute it.
Chapter 3 — Spark Programming: RDDs, DataFrames, and SQL
Goal: Master Spark's principal programming abstractions.
1. RDD fundamentals and lineage
2. Transformations and actions
3. Pair RDDs, aggregations, and partitioning
4. DataFrames and schemas
5. Columns, expressions, and built-in functions
6. Spark SQL and temporary views
7. RDD versus DataFrame versus SQL
8. Reading and writing CSV, JSON, Parquet, and other formats
9. Practical data-transformation patterns
Outcome: You should be able to implement non-trivial ETL and analytical pipelines using PySpark/DataFrames and understand the role of RDDs underneath the higher-level APIs.
Chapter 4 — Data Engineering with Spark
Goal: Move from API knowledge to designing robust data pipelines.
1. Schema design and schema evolution
2. Nulls, malformed data, and data-quality handling
3. Filtering, projection, aggregation, and grouping
4. Joins and join semantics
5. Window functions
6. Dates, timestamps, arrays, structs, and complex types
7. User-defined functions and their trade-offs
8. Partitioned datasets and data layout
9. Designing maintainable ETL/ELT pipelines
Outcome: You should be capable of constructing realistic production-style data transformations rather than isolated Spark examples.
Chapter 5 — Spark Internals and Query Execution
Goal: Understand what Spark actually does with your code.
1. Logical and physical query plans
2. Catalyst optimizer architecture
3. Analysis and logical-plan optimization
4. Physical planning and strategy selection
5. Tungsten execution engine
6. Whole-stage code generation
7. Shuffle mechanics
8. Exchange operators and stage boundaries
9. Reading explain() plans systematically
Outcome: You should be able to move from “my Spark code works” to “I understand how Spark executes my code.”
Chapter 6 — Performance Engineering and Optimization
Goal: Learn to diagnose and systematically improve Spark workloads.
1. Partition sizing and parallelism
2. Shuffle optimization
3. Join strategies: broadcast, sort-merge, shuffle-hash
4. Caching, persistence, and recomputation
5. Data skew and mitigation techniques
6. Predicate pushdown, partition pruning, and column pruning
7. Adaptive Query Execution (AQE)
8. Executor memory, CPU, and resource configuration
9. Spark UI, metrics, bottleneck analysis, and troubleshooting
Outcome: Given a slow Spark job, you should be able to formulate hypotheses, gather evidence, identify bottlenecks, and optimize it rather than randomly changing configuration parameters.
Chapter 7 — Structured Streaming and Stateful Processing
Goal: Extend the Spark mental model from bounded to continuously arriving data.
1. Batch versus stream processing
2. Structured Streaming architecture
3. Sources, transformations, and sinks
4. Micro-batch and continuous processing concepts
5. Event time versus processing time
6. Windows and watermarking
7. Stateful operations
8. Checkpointing, recovery, and fault tolerance
9. Streaming joins and production design patterns
Outcome: You should understand both how to implement streaming pipelines and the distributed-systems problems that streaming introduces.
Chapter 8 — Production Spark and Expert-Level Engineering
Goal: Integrate the previous chapters into production-grade Spark engineering.
1. Spark deployment architectures
2. Resource sizing and capacity planning
3. YARN and Kubernetes deployment concepts
4. Testing, debugging, logging, and observability
5. Failure modes, retries, speculative execution, and fault tolerance
6. Data-lake architectures and table formats such as Delta/Iceberg/Hudi
7. Designing scalable Spark applications
8. Anti-patterns and production troubleshooting
9. Capstone: architecture, implementation, profiling, and optimization of an end-to-end Spark system
Outcome: You should be able to design, implement, operate, diagnose, and defend architectural decisions for a production Spark workload.
