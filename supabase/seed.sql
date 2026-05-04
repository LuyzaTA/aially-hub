-- ============================================================
-- AI Intel Hub — Seed Data  (run AFTER schema.sql)
-- Supabase SQL Editor: https://supabase.com/dashboard/project/dmrvrkhzuhrqsnozgncs/sql
-- ============================================================

-- ============================================================
-- STARTUPS  (with country)
-- ============================================================
INSERT INTO startups (name, tagline, description, website, founded_year, stage, funding_amount, category, country, tags, is_trending) VALUES

-- European AI labs
('Mistral AI',      'Open and efficient frontier models',
 'French AI lab building high-performance open-weight LLMs. European challenger to OpenAI.',
 'https://mistral.ai', 2023, 'series-b', '€1.1B raised', 'LLM', 'France',
 ARRAY['LLM', 'Open Source', 'EU'], true),

('Aleph Alpha',     'Sovereign AI for Europe',
 'German AI research company focused on explainable LLMs for European enterprises and governments.',
 'https://aleph-alpha.com', 2019, 'series-b', '€500M raised', 'LLM', 'Germany',
 ARRAY['LLM', 'Explainable AI', 'EU'], false),

-- NL-based companies
('Weaviate',        'Open-source AI-native vector database',
 'Vector database built for GenAI — stores, searches, and queries embeddings at scale. Founded in Amsterdam.',
 'https://weaviate.io', 2019, 'series-b', '$50M raised', 'Vector DB', 'Netherlands',
 ARRAY['Vector DB', 'RAG', 'NL'], true),

('Xomnia',          'AI & Data engineering consultancy',
 'Amsterdam-based AI and data engineering firm building production ML systems for Dutch enterprises.',
 'https://xomnia.com', 2014, 'seed', NULL, 'Consultancy', 'Netherlands',
 ARRAY['Data Eng', 'ML', 'NL'], false),

-- US AI infrastructure
('Together AI',     'Serverless AI inference & fine-tuning',
 'Cloud platform for running open-source LLMs with fast inference and fine-tuning APIs.',
 'https://together.ai', 2022, 'series-a', '$102M raised', 'AI Infra', 'USA',
 ARRAY['LLM', 'Inference', 'API'], true),

('Modal Labs',      'Serverless GPU cloud for ML workloads',
 'Run Python functions on cloud GPUs with zero infrastructure setup. Popular with ML teams.',
 'https://modal.com', 2021, 'series-b', '$67M raised', 'MLOps', 'USA',
 ARRAY['GPU', 'Serverless', 'MLOps'], true),

('MotherDuck',      'Serverless DuckDB in the cloud',
 'Managed cloud DuckDB that scales analytical queries without a traditional data warehouse.',
 'https://motherduck.com', 2022, 'series-b', '$100M raised', 'Data Warehouse', 'USA',
 ARRAY['DuckDB', 'Analytics', 'SQL'], false),

('Cohere',          'Enterprise NLP & RAG APIs',
 'Language AI for enterprise: command models, embeddings, and RAG for production use cases.',
 'https://cohere.com', 2019, 'series-d', '$270M raised', 'LLM', 'Canada',
 ARRAY['LLM', 'Enterprise', 'RAG'], false),

('Weights & Biases','MLOps experiment tracking platform',
 'The leading ML experiment tracking and model registry used by 1M+ engineers globally.',
 'https://wandb.ai', 2018, 'series-c', '$135M raised', 'MLOps', 'USA',
 ARRAY['MLOps', 'Tracking', 'ML'], false),

('Anyscale',        'Managed Ray for distributed ML',
 'Managed platform for Ray — the most popular framework for scalable Python ML workloads.',
 'https://anyscale.com', 2019, 'series-c', '$100M raised', 'ML Infra', 'USA',
 ARRAY['Ray', 'Distributed', 'ML'], false),

('LangChain',       'Build context-aware LLM applications',
 'Open-source framework for building LLM agents, RAG pipelines, and chatbots. Largest LLM ecosystem.',
 'https://langchain.com', 2022, 'series-a', '$25M raised', 'LLM Framework', 'USA',
 ARRAY['LLM', 'Agents', 'RAG'], true),

-- Data platforms
('Databricks',      'Data + AI lakehouse platform',
 'Unified platform for data engineering, analytics, and ML — home of Apache Spark and Delta Lake.',
 'https://databricks.com', 2013, 'series-h', '$3.6B raised', 'Data Platform', 'USA',
 ARRAY['Spark', 'Lakehouse', 'ML'], false),

('dbt Labs',        'Analytics engineering platform',
 'The standard tool for data transformation in the modern data stack, used by 50k+ teams.',
 'https://getdbt.com', 2016, 'series-d', '$222M raised', 'Data Eng', 'USA',
 ARRAY['dbt', 'SQL', 'Analytics'], false),

('Qdrant',          'High-performance vector search engine',
 'Rust-based vector similarity search engine for production ML applications.',
 'https://qdrant.tech', 2021, 'series-a', '$28M raised', 'Vector DB', 'Germany',
 ARRAY['Vector DB', 'Rust', 'EU'], false)

ON CONFLICT DO NOTHING;

-- ============================================================
-- JOBS — Netherlands IT / AI / Data Engineering + DB2 LUW
-- Sources: LinkedIn NL, Glassdoor NL, Wellfound, company careers
-- ============================================================
DELETE FROM jobs WHERE source IN ('seed', 'linkedin-nl', 'glassdoor-nl', 'wellfound', 'company');

INSERT INTO jobs (title, company, location, job_type, salary_min, salary_max, currency, description, skills, apply_url, source, posted_at, is_remote, seniority) VALUES

-- ── AI / LLM Engineering ──────────────────────────────────────────────────────

('AI / LLM Engineer',
 'ING Bank',
 'Amsterdam',
 'full-time', 85000, 115000, 'EUR',
 'Build LLM-powered products for retail and commercial banking. Work on RAG pipelines, prompt engineering, and LLM evaluation inside ING''s AI Lab.',
 ARRAY['LangChain', 'Python', 'RAG', 'Azure OpenAI', 'FastAPI'],
 'https://www.ing.jobs/netherlands/vacancies', 'company',
 NOW() - INTERVAL '1 day', true, 'mid'),

('Senior LLM Engineer',
 'Booking.com',
 'Amsterdam',
 'full-time', 105000, 140000, 'EUR',
 'Drive the LLM strategy for Booking''s AI Assistant — serving 500M+ users. Own the fine-tuning, evaluation, and deployment pipelines.',
 ARRAY['PyTorch', 'LLM', 'RLHF', 'Python', 'Kubernetes'],
 'https://careers.booking.com/jobs/', 'company',
 NOW() - INTERVAL '1 day', false, 'senior'),

('AI Engineer (GenAI Products)',
 'Adyen',
 'Amsterdam',
 'full-time', 90000, 120000, 'EUR',
 'Build GenAI features into Adyen''s payment platform: fraud reasoning, merchant insights, and developer-facing AI tooling.',
 ARRAY['Python', 'OpenAI API', 'RAG', 'Kafka', 'TypeScript'],
 'https://www.adyen.com/careers', 'company',
 NOW() - INTERVAL '2 days', false, 'mid'),

-- ── Machine Learning Engineering ─────────────────────────────────────────────

('ML Engineer',
 'ASML',
 'Eindhoven',
 'full-time', 90000, 125000, 'EUR',
 'Develop ML models for predictive maintenance and process optimization for EUV lithography machines.',
 ARRAY['PyTorch', 'Python', 'MLflow', 'CUDA', 'Docker'],
 'https://www.asml.com/en/careers', 'company',
 NOW() - INTERVAL '2 days', false, 'mid'),

('Senior ML Engineer',
 'Philips',
 'Amsterdam',
 'full-time', 95000, 130000, 'EUR',
 'Apply computer vision and NLP to next-generation health technology products. Work in a team of 15+ ML researchers.',
 ARRAY['PyTorch', 'Computer Vision', 'ONNX', 'Python', 'Azure ML'],
 'https://www.careers.philips.com', 'company',
 NOW() - INTERVAL '3 days', false, 'senior'),

('MLOps Engineer',
 'Xomnia',
 'Amsterdam',
 'full-time', 75000, 105000, 'EUR',
 'Build and maintain ML infrastructure for Xomnia''s enterprise clients across finance, energy, and logistics.',
 ARRAY['MLflow', 'Kubernetes', 'Terraform', 'Python', 'Azure'],
 'https://xomnia.com/careers/', 'company',
 NOW() - INTERVAL '3 days', true, 'mid'),

-- ── Data Engineering ──────────────────────────────────────────────────────────

('Senior Data Engineer',
 'Booking.com',
 'Amsterdam',
 'full-time', 95000, 130000, 'EUR',
 'Build and scale large-scale data pipelines for booking intelligence. Own critical Kafka → Spark → Iceberg workflows.',
 ARRAY['Apache Spark', 'Python', 'Kafka', 'dbt', 'Iceberg'],
 'https://careers.booking.com/jobs/', 'company',
 NOW() - INTERVAL '1 day', false, 'senior'),

('Data Engineer',
 'Adyen',
 'Amsterdam',
 'full-time', 80000, 110000, 'EUR',
 'Design and maintain payment data infrastructure at global scale. Contribute to Adyen''s internal data mesh.',
 ARRAY['dbt', 'Snowflake', 'Python', 'Airflow', 'SQL'],
 'https://www.adyen.com/careers', 'company',
 NOW() - INTERVAL '2 days', false, 'mid'),

('Data Platform Engineer',
 'bol.com',
 'Utrecht',
 'full-time', 75000, 105000, 'EUR',
 'Build the internal data platform powering bol.com e-commerce analytics. Stack: GCP, Spark, and Terraform.',
 ARRAY['Apache Spark', 'GCP', 'Terraform', 'Python', 'Kafka'],
 'https://careers.bol.com', 'company',
 NOW() - INTERVAL '4 days', false, 'mid'),

('Data Engineer',
 'ABN AMRO',
 'Amsterdam',
 'full-time', 70000, 100000, 'EUR',
 'Build data pipelines for financial risk and compliance reporting. Migrate legacy DB2 workloads to Azure Databricks.',
 ARRAY['Python', 'Azure Databricks', 'dbt', 'SQL', 'DB2'],
 'https://www.werkenbijabnamro.nl/en/vacancies', 'company',
 NOW() - INTERVAL '4 days', true, 'mid'),

('Platform Data Engineer (Remote)',
 'Elastic',
 'Amsterdam / Remote',
 'full-time', 85000, 115000, 'EUR',
 'Build observability data pipelines with Elasticsearch and OpenTelemetry. Full remote within the EU.',
 ARRAY['Elasticsearch', 'Python', 'Kafka', 'OpenTelemetry', 'Logstash'],
 'https://www.elastic.co/careers', 'company',
 NOW() - INTERVAL '5 days', true, 'mid'),

('Senior Streaming Data Engineer',
 'Just Eat Takeaway',
 'Amsterdam',
 'full-time', 85000, 115000, 'EUR',
 'Design real-time streaming pipelines for order and delivery intelligence across 20+ markets.',
 ARRAY['Kafka', 'Apache Flink', 'Python', 'AWS', 'Terraform'],
 'https://careers.justeattakeaway.com', 'company',
 NOW() - INTERVAL '6 days', false, 'senior'),

('Data Engineer — AI/ML Platform',
 'Capgemini NL',
 'Utrecht / Remote',
 'full-time', 70000, 100000, 'EUR',
 'Join Capgemini''s Data & AI practice: build ML data pipelines and modernise data platforms for Dutch enterprise clients.',
 ARRAY['Python', 'Spark', 'Azure', 'dbt', 'Databricks'],
 'https://www.capgemini.com/nl-nl/carriere/', 'company',
 NOW() - INTERVAL '6 days', true, 'mid'),

('Junior Data Engineer',
 'Sogeti Netherlands',
 'Groningen / Amsterdam',
 'full-time', 45000, 65000, 'EUR',
 'First role in data engineering. Work on ETL pipelines, data quality, and cloud migrations for Sogeti''s enterprise clients.',
 ARRAY['Python', 'SQL', 'dbt', 'Azure', 'Power BI'],
 'https://www.sogeti.nl/werken-bij/vacatures/', 'company',
 NOW() - INTERVAL '7 days', true, 'junior'),

-- ── DB2 LUW — Database Administration ────────────────────────────────────────

('IBM DB2 LUW DBA',
 'ABN AMRO',
 'Amsterdam',
 'full-time', 75000, 105000, 'EUR',
 'Manage and optimise ABN AMRO''s IBM DB2 LUW environment supporting core banking and compliance workloads. Performance tuning, HADR, and backup/recovery.',
 ARRAY['DB2 LUW', 'IBM DB2', 'HADR', 'Linux', 'Shell Scripting'],
 'https://www.werkenbijabnamro.nl/en/vacancies', 'company',
 NOW() - INTERVAL '2 days', false, 'senior'),

('Senior DB2 LUW Database Administrator',
 'ING Bank',
 'Amsterdam',
 'full-time', 80000, 110000, 'EUR',
 'Own DB2 LUW database administration for ING''s core transaction systems. Responsible for upgrade planning, replication, and DBA automation.',
 ARRAY['DB2 LUW', 'IBM DB2', 'REPLICATION', 'AIX', 'Bash'],
 'https://www.ing.jobs/netherlands/vacancies', 'company',
 NOW() - INTERVAL '3 days', false, 'senior'),

('DB2 LUW / Oracle DBA',
 'Rabobank',
 'Utrecht',
 'full-time', 70000, 100000, 'EUR',
 'Support Rabobank''s multi-database environment including DB2 LUW and Oracle. Work on cloud migrations, performance, and security.',
 ARRAY['DB2 LUW', 'Oracle', 'SQL', 'Linux', 'Ansible'],
 'https://www.rabobank.com/en/careers/', 'company',
 NOW() - INTERVAL '4 days', false, 'mid'),

('Database Engineer — DB2 LUW / PostgreSQL',
 'NN Group',
 'The Hague',
 'full-time', 65000, 95000, 'EUR',
 'Manage NN Group''s insurance policy database environment. Migrate legacy DB2 LUW schemas to PostgreSQL on Azure.',
 ARRAY['DB2 LUW', 'PostgreSQL', 'Azure', 'Python', 'SQL'],
 'https://www.nn-group.com/careers', 'company',
 NOW() - INTERVAL '5 days', true, 'mid'),

('IBM DB2 LUW Consultant (Remote)',
 'Sogeti Netherlands',
 'Netherlands / Remote',
 'contract', 600, 850, 'EUR',
 'DB2 LUW consultancy for Sogeti clients in banking and insurance. Day rate contract. HADR, query optimisation, and upgrade projects.',
 ARRAY['DB2 LUW', 'IBM DB2', 'HADR', 'Performance Tuning', 'Linux'],
 'https://www.sogeti.nl/werken-bij/vacatures/', 'company',
 NOW() - INTERVAL '5 days', true, 'senior'),

('DB2 DBA / Data Migration Engineer',
 'Capgemini NL',
 'Amsterdam / Rotterdam',
 'full-time', 65000, 95000, 'EUR',
 'Capgemini''s data migration practice: migrate DB2 LUW databases to cloud platforms (Azure Synapse, AWS RDS). Strong DB2 internals required.',
 ARRAY['DB2 LUW', 'Azure Synapse', 'AWS RDS', 'Python', 'ETL'],
 'https://www.capgemini.com/nl-nl/carriere/', 'company',
 NOW() - INTERVAL '7 days', true, 'mid'),

-- ── Additional NL roles ──────────────────────────────────────────────────────

('Data Scientist (AI/ML)',
 'Randstad NL',
 'Amsterdam',
 'full-time', 65000, 90000, 'EUR',
 'Apply ML to Randstad''s HR analytics products: candidate matching, churn prediction, and salary benchmarking.',
 ARRAY['Python', 'Scikit-learn', 'SQL', 'Azure ML', 'Power BI'],
 'https://www.randstad.nl/vacatures/', 'company',
 NOW() - INTERVAL '8 days', true, 'mid'),

('LLM / NLP Engineer',
 'TomTom',
 'Amsterdam',
 'full-time', 85000, 115000, 'EUR',
 'Build next-generation LLM-based navigation assistants using RAG, fine-tuning, and on-device inference.',
 ARRAY['LangChain', 'RAG', 'Python', 'Azure OpenAI', 'ONNX'],
 'https://www.tomtom.com/careers', 'company',
 NOW() - INTERVAL '9 days', false, 'mid'),

('Senior Data Scientist',
 'Prosus / OLX Group',
 'Amsterdam',
 'full-time', 90000, 120000, 'EUR',
 'Drive ML-powered pricing, fraud detection, and marketplace ranking for OLX platforms across 30+ markets.',
 ARRAY['Python', 'Spark', 'Scikit-learn', 'SQL', 'GCP'],
 'https://careers.prosus.com', 'company',
 NOW() - INTERVAL '10 days', false, 'senior')

ON CONFLICT DO NOTHING;

-- ============================================================
-- ARTICLES
-- ============================================================
INSERT INTO articles (title, summary, url, source, category, tags, author, published_at, score, is_featured) VALUES

-- AI News
('Anthropic Releases Claude 4 with Enhanced Reasoning and Extended Context',
 'Anthropic unveils Claude 4, featuring dramatically improved reasoning capabilities, a 200K token context window, and computer use. Benchmark scores surpass GPT-4o on most tasks.',
 'https://www.anthropic.com/news/claude-4', 'Anthropic Blog', 'ai',
 ARRAY['Claude', 'Anthropic', 'LLM', 'Reasoning'],
 'Anthropic Team', NOW() - INTERVAL '1 day', 850, true),

('OpenAI Launches GPT-5 with Multimodal Improvements and O3-Level Reasoning',
 'OpenAI releases GPT-5, its most capable model yet — near-human performance on graduate-level reasoning and native video understanding.',
 'https://openai.com/blog/gpt-5', 'OpenAI Blog', 'ai',
 ARRAY['GPT-5', 'OpenAI', 'LLM', 'Multimodal'],
 'OpenAI Team', NOW() - INTERVAL '3 days', 1200, false),

('Google DeepMind''s Gemini 2.5 Ultra Tops All Benchmarks',
 'Gemini 2.5 Ultra sets new SOTA on MMLU, HumanEval, and MATH. Introduces native audio reasoning.',
 'https://deepmind.google/technologies/gemini/', 'Google DeepMind', 'ai',
 ARRAY['Gemini', 'Google', 'LLM', 'Benchmark'],
 'DeepMind Team', NOW() - INTERVAL '5 days', 780, false),

('Meta Releases Llama 4 as Open-Weight Model Family',
 'Meta open-sources Llama 4 (8B–400B). The 70B version rivals closed models on most benchmarks while remaining fully open.',
 'https://ai.meta.com/blog/llama-4/', 'Meta AI Blog', 'ai',
 ARRAY['Llama', 'Meta', 'Open Source', 'LLM'],
 'Meta AI Team', NOW() - INTERVAL '7 days', 920, false),

('Mistral AI Raises €600M Series B at €5.8B Valuation',
 'French AI startup Mistral AI closes €600M Series B. Funding accelerates development of frontier open-weight models in Europe.',
 'https://mistral.ai/news/series-b/', 'Mistral AI', 'startup',
 ARRAY['Mistral', 'Funding', 'EU', 'LLM'],
 'Mistral Team', NOW() - INTERVAL '2 days', 650, false),

('Microsoft Azure AI Foundry: One-Click Deployment and Fine-Tuning',
 'Azure AI Foundry launches with one-click model deployment, built-in evaluation frameworks, and custom fine-tuning.',
 'https://azure.microsoft.com/en-us/products/ai-foundry', 'Microsoft Blog', 'tools',
 ARRAY['Azure', 'Microsoft', 'MLOps', 'Fine-tuning'],
 'Microsoft Team', NOW() - INTERVAL '6 days', 430, false),

('Netherlands Ranks #1 EU AI Talent Hub in 2025 — Glassdoor Report',
 'Glassdoor''s European AI talent report ranks the Netherlands #1 in the EU for AI professionals. 565+ ML jobs open, average ML Engineer salary €80k+.',
 'https://www.glassdoor.com/Job/netherlands-machine-learning-jobs-SRCH_IL.0,11_IN178_KO12,28.htm', 'Glassdoor', 'ai',
 ARRAY['Netherlands', 'Talent', 'EU', 'Salary'],
 'Glassdoor Research', NOW() - INTERVAL '4 days', 410, false),

('Cohere Releases Command R+ for Enterprise RAG',
 'Command R+ is built for retrieval-augmented generation in enterprise contexts, with improved citation accuracy and 128K context.',
 'https://cohere.com/blog/command-r-plus', 'Cohere Blog', 'ai',
 ARRAY['Cohere', 'RAG', 'Enterprise', 'LLM'],
 'Cohere Team', NOW() - INTERVAL '9 days', 380, false),

-- Data Engineering
('dbt 1.9: 40% Faster Compilation and Python Model Updates',
 'dbt Labs ships dbt 1.9 with 40% faster compilation times, improved incremental model strategies, and expanded Python support.',
 'https://docs.getdbt.com/docs/dbt-versions/core-upgrade', 'dbt Labs Blog', 'data_engineering',
 ARRAY['dbt', 'Data Eng', 'SQL', 'Python'],
 'dbt Labs', NOW() - INTERVAL '2 days', 520, false),

('Apache Spark 4.0 GA: Python-First and DataFrame v2 API',
 'Spark 4.0 GA: Python-first experience, new DataFrame v2 API, and 30% memory efficiency gains.',
 'https://spark.apache.org/news/spark-4.0.html', 'Apache Blog', 'data_engineering',
 ARRAY['Spark', 'Python', 'Apache', 'DataFrame'],
 'Apache Spark PMC', NOW() - INTERVAL '4 days', 680, false),

('Kafka 4.0: ZooKeeper Removed, KRaft Now Default',
 'Apache Kafka 4.0 ships with ZooKeeper dependency fully removed. KRaft consensus is now the default.',
 'https://kafka.apache.org/blog/kafka-4.0', 'Apache Kafka', 'data_engineering',
 ARRAY['Kafka', 'Streaming', 'Apache', 'KRaft'],
 'Kafka PMC', NOW() - INTERVAL '6 days', 590, false),

('DuckDB 1.2: 2x Query Performance and Iceberg Support',
 'DuckDB 1.2 doubles query performance on complex analytical workloads, adds Iceberg and Delta Lake extensions.',
 'https://duckdb.org/2025/04/01/duckdb-1.2.html', 'DuckDB Blog', 'data_engineering',
 ARRAY['DuckDB', 'Analytics', 'Iceberg', 'Delta Lake'],
 'DuckDB Team', NOW() - INTERVAL '8 days', 710, false),

('Databricks Opens Unity Catalog as Open Source',
 'Databricks makes Unity Catalog open source: governance, lineage, and access control across the open lakehouse.',
 'https://www.databricks.com/blog/unity-catalog-open-source', 'Databricks Blog', 'data_engineering',
 ARRAY['Databricks', 'Unity Catalog', 'Governance', 'Lakehouse'],
 'Databricks Team', NOW() - INTERVAL '10 days', 465, false),

('IBM DB2 LUW 12.1: AI-Powered Query Optimisation and Cloud Parity',
 'IBM releases DB2 LUW 12.1 with AI-assisted query plan optimization, native JSON enhancements, and feature parity with Db2 on Cloud.',
 'https://www.ibm.com/docs/en/db2/12.1', 'IBM Blog', 'data_engineering',
 ARRAY['DB2 LUW', 'IBM', 'Database', 'SQL'],
 'IBM Data & AI Team', NOW() - INTERVAL '11 days', 320, false),

('Snowflake Cortex AI: SQL-Based LLM Calls Now GA',
 'Snowflake Cortex AI goes GA — enabling LLM calls, document processing, and vector search directly from Snowflake SQL.',
 'https://www.snowflake.com/en/data-cloud/cortex/', 'Snowflake Blog', 'tools',
 ARRAY['Snowflake', 'Cortex', 'AI', 'SQL'],
 'Snowflake Team', NOW() - INTERVAL '7 days', 350, false),

-- Tools
('LangChain v0.3: Simpler Agents and Native Streaming',
 'LangChain v0.3 redesigns the agent framework, 50% less boilerplate, native streaming, and built-in observability.',
 'https://blog.langchain.dev/langchain-v0.3/', 'LangChain Blog', 'tools',
 ARRAY['LangChain', 'Agents', 'LLM', 'Python'],
 'LangChain Team', NOW() - INTERVAL '3 days', 410, false),

('Hugging Face Transformers 5.0: Modular and 40% Faster',
 'Transformers 5.0 ships with modular architecture, 40% faster inference on CPU, and native GGUF quantized model support.',
 'https://huggingface.co/blog/transformers-5', 'Hugging Face Blog', 'tools',
 ARRAY['Hugging Face', 'Transformers', 'ML', 'Inference'],
 'HF Team', NOW() - INTERVAL '12 days', 380, false),

-- Research
('Scaling Laws Revisited: Small Models Match Large with RLHF',
 'DeepMind challenges compute-optimal scaling laws. Compute-efficient small models match larger ones on downstream tasks with RLHF.',
 'https://arxiv.org/abs/2504.00001', 'arXiv', 'research',
 ARRAY['Scaling Laws', 'Research', 'LLM', 'RLHF'],
 'DeepMind Research', NOW() - INTERVAL '5 days', 560, false),

('RAG vs Fine-Tuning: Stanford Benchmark Across 12 Enterprise Tasks',
 'Stanford NLP benchmarks RAG vs fine-tuning: RAG wins on knowledge freshness, fine-tuning wins on domain accuracy.',
 'https://arxiv.org/abs/2504.00002', 'Stanford NLP', 'research',
 ARRAY['RAG', 'Fine-tuning', 'Benchmark', 'LLM'],
 'Stanford NLP Group', NOW() - INTERVAL '8 days', 490, false),

-- Startup
('Weaviate Named Forrester Leader in Vector Database Market',
 'Analyst firm Forrester names Amsterdam-founded Weaviate a leader in the vector database market. Now powers AI search for 100+ enterprise clients.',
 'https://weaviate.io/blog/forrester-leader', 'Weaviate Blog', 'startup',
 ARRAY['Weaviate', 'Vector DB', 'Netherlands', 'Forrester'],
 'Weaviate Team', NOW() - INTERVAL '13 days', 270, false),

('Aleph Alpha Secures €500M for Sovereign European AI',
 'German AI lab Aleph Alpha closes a €500M round to build explainable, sovereignty-compliant LLMs for European governments and enterprises.',
 'https://aleph-alpha.com/news', 'Aleph Alpha', 'startup',
 ARRAY['Aleph Alpha', 'EU', 'Sovereign AI', 'LLM'],
 'Aleph Alpha Team', NOW() - INTERVAL '15 days', 310, false)

ON CONFLICT (url) DO NOTHING;
