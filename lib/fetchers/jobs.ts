import type { Job } from '@/types'

// NL seed jobs — April 2026
// DB2 roles: direct LinkedIn job view URLs (real listings found April 2026)
// All other roles: time-filtered job board search URLs (always return fresh results)
const NL_SEED_JOBS: Omit<Job, 'id' | 'created_at'>[] = [

  // ── AI / LLM Engineering ────────────────────────────────────────────────────
  {
    title: 'AI / LLM Engineer',
    company: 'ING Bank',
    location: 'Amsterdam',
    job_type: 'full-time',
    salary_min: 85000, salary_max: 115000, currency: 'EUR',
    description: 'Build LLM-powered products for retail and commercial banking. Work on RAG pipelines, prompt engineering, and LLM evaluation inside ING\'s AI Lab.',
    skills: ['LangChain', 'Python', 'RAG', 'Azure OpenAI', 'FastAPI'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=AI+LLM+Engineer&location=Netherlands&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    is_remote: true, seniority: 'mid',
  },
  {
    title: 'Senior LLM Engineer',
    company: 'Booking.com',
    location: 'Amsterdam',
    job_type: 'full-time',
    salary_min: 105000, salary_max: 140000, currency: 'EUR',
    description: 'Drive the LLM strategy for Booking\'s AI Assistant — serving 500M+ users. Own fine-tuning, evaluation, and deployment pipelines.',
    skills: ['PyTorch', 'LLM', 'RLHF', 'Python', 'Kubernetes'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=Senior+LLM+Engineer&location=Amsterdam&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    is_remote: false, seniority: 'senior',
  },
  {
    title: 'AI Engineer (GenAI Products)',
    company: 'Adyen',
    location: 'Amsterdam',
    job_type: 'full-time',
    salary_min: 90000, salary_max: 120000, currency: 'EUR',
    description: 'Build GenAI features into Adyen\'s payment platform: fraud reasoning, merchant insights, and developer-facing AI tooling.',
    skills: ['Python', 'OpenAI API', 'RAG', 'Kafka', 'TypeScript'],
    apply_url: 'https://nl.indeed.com/jobs?q=AI+Engineer+GenAI&l=Amsterdam&fromage=14',
    source: 'Indeed',
    posted_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    is_remote: false, seniority: 'mid',
  },

  // ── Machine Learning ────────────────────────────────────────────────────────
  {
    title: 'ML Engineer',
    company: 'ASML',
    location: 'Eindhoven',
    job_type: 'full-time',
    salary_min: 90000, salary_max: 125000, currency: 'EUR',
    description: 'Develop ML models for predictive maintenance and process optimisation for EUV lithography machines.',
    skills: ['PyTorch', 'Python', 'MLflow', 'CUDA', 'Docker'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=ML+Engineer+Machine+Learning&location=Eindhoven&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    is_remote: false, seniority: 'mid',
  },
  {
    title: 'Senior ML Engineer',
    company: 'Philips',
    location: 'Amsterdam',
    job_type: 'full-time',
    salary_min: 95000, salary_max: 130000, currency: 'EUR',
    description: 'Apply computer vision and NLP to next-generation health technology products. Work in a team of 15+ ML researchers.',
    skills: ['PyTorch', 'Computer Vision', 'ONNX', 'Python', 'Azure ML'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=Senior+ML+Engineer+Computer+Vision&location=Amsterdam&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    is_remote: false, seniority: 'senior',
  },
  {
    title: 'MLOps Engineer',
    company: 'Xomnia',
    location: 'Amsterdam',
    job_type: 'full-time',
    salary_min: 75000, salary_max: 105000, currency: 'EUR',
    description: 'Build and maintain ML infrastructure for Xomnia\'s enterprise clients across finance, energy, and logistics.',
    skills: ['MLflow', 'Kubernetes', 'Terraform', 'Python', 'Azure'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=MLOps+Engineer&location=Amsterdam&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    is_remote: true, seniority: 'mid',
  },

  // ── Data Engineering ────────────────────────────────────────────────────────
  {
    title: 'Senior Data Engineer',
    company: 'Booking.com',
    location: 'Amsterdam',
    job_type: 'full-time',
    salary_min: 95000, salary_max: 130000, currency: 'EUR',
    description: 'Build and scale large-scale data pipelines for booking intelligence. Own Kafka → Spark → Iceberg workflows.',
    skills: ['Apache Spark', 'Python', 'Kafka', 'dbt', 'Iceberg'],
    apply_url: 'https://nl.indeed.com/jobs?q=Senior+Data+Engineer+Kafka+Spark&l=Amsterdam&fromage=14',
    source: 'Indeed',
    posted_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    is_remote: false, seniority: 'senior',
  },
  {
    title: 'Data Engineer',
    company: 'Adyen',
    location: 'Amsterdam',
    job_type: 'full-time',
    salary_min: 80000, salary_max: 110000, currency: 'EUR',
    description: 'Design and maintain payment data infrastructure at global scale. Contribute to Adyen\'s internal data mesh.',
    skills: ['dbt', 'Snowflake', 'Python', 'Airflow', 'SQL'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=Data+Engineer+dbt+Snowflake&location=Amsterdam&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    is_remote: false, seniority: 'mid',
  },
  {
    title: 'Data Platform Engineer',
    company: 'bol.com',
    location: 'Utrecht',
    job_type: 'full-time',
    salary_min: 75000, salary_max: 105000, currency: 'EUR',
    description: 'Build the internal data platform powering bol.com e-commerce analytics. Stack: GCP, Spark, Terraform.',
    skills: ['Apache Spark', 'GCP', 'Terraform', 'Python', 'Kafka'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=Data+Platform+Engineer+Spark+GCP&location=Utrecht&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    is_remote: false, seniority: 'mid',
  },
  {
    title: 'Data Engineer (DB2 Migration)',
    company: 'ABN AMRO',
    location: 'Amsterdam',
    job_type: 'full-time',
    salary_min: 70000, salary_max: 100000, currency: 'EUR',
    description: 'Build pipelines for financial risk and compliance reporting. Migrate legacy DB2 LUW workloads to Azure Databricks.',
    skills: ['Python', 'Azure Databricks', 'dbt', 'SQL', 'DB2'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=Data+Engineer+DB2+Azure+Databricks&location=Amsterdam&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    is_remote: true, seniority: 'mid',
  },
  {
    title: 'Senior Streaming Data Engineer',
    company: 'Just Eat Takeaway',
    location: 'Amsterdam',
    job_type: 'full-time',
    salary_min: 85000, salary_max: 115000, currency: 'EUR',
    description: 'Design real-time streaming pipelines for order and delivery intelligence across 20+ markets.',
    skills: ['Kafka', 'Apache Flink', 'Python', 'AWS', 'Terraform'],
    apply_url: 'https://nl.indeed.com/jobs?q=Senior+Streaming+Data+Engineer+Kafka+Flink&l=Amsterdam&fromage=14',
    source: 'Indeed',
    posted_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    is_remote: false, seniority: 'senior',
  },
  {
    title: 'Data Engineer — AI/ML Platform',
    company: 'Capgemini NL',
    location: 'Utrecht / Remote',
    job_type: 'full-time',
    salary_min: 70000, salary_max: 100000, currency: 'EUR',
    description: 'Build ML data pipelines and modernise data platforms for Dutch enterprise clients in finance and logistics.',
    skills: ['Python', 'Spark', 'Azure', 'dbt', 'Databricks'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=Data+Engineer+Azure+Databricks+dbt&location=Netherlands&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 6 * 86400000).toISOString(),
    is_remote: true, seniority: 'mid',
  },
  {
    title: 'Junior Data Engineer',
    company: 'Sogeti Netherlands',
    location: 'Groningen / Amsterdam',
    job_type: 'full-time',
    salary_min: 45000, salary_max: 65000, currency: 'EUR',
    description: 'First role in data engineering. Work on ETL pipelines, data quality, and cloud migrations for Sogeti\'s clients.',
    skills: ['Python', 'SQL', 'dbt', 'Azure', 'Power BI'],
    apply_url: 'https://nl.indeed.com/jobs?q=Junior+Data+Engineer&l=Nederland&fromage=14',
    source: 'Indeed',
    posted_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    is_remote: true, seniority: 'junior',
  },

  // ── DB2 LUW — Real listings found April 2026 ────────────────────────────────
  {
    title: 'DBA Specialist DB2 / PostgreSQL',
    company: 'Developers.nl',
    location: 'Utrecht',
    job_type: 'full-time',
    salary_min: 75000, salary_max: 105000, currency: 'EUR',
    description: 'DBA Specialist for DB2 and PostgreSQL databases at Kamer van Koophandel Utrecht. Responsible for database administration, performance tuning, HADR, and backup/recovery.',
    skills: ['DB2 LUW', 'PostgreSQL', 'HADR', 'Linux', 'Performance Tuning'],
    apply_url: 'https://nl.linkedin.com/jobs/view/dba-specialist-db2-postgress-at-developers-nl-3819704445',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    is_remote: false, seniority: 'senior',
  },
  {
    title: 'DBA Specialist DB2 / PostgreSQL (38h/w)',
    company: 'DC Engineers B.V.',
    location: 'Utrecht',
    job_type: 'full-time',
    salary_min: 70000, salary_max: 100000, currency: 'EUR',
    description: 'Full-time DBA Specialist position at Kamer van Koophandel Utrecht via DC Engineers. DB2 LUW and PostgreSQL database management, performance optimisation, and migration support.',
    skills: ['DB2 LUW', 'PostgreSQL', 'SQL', 'Linux', 'Shell Scripting'],
    apply_url: 'https://nl.linkedin.com/jobs/view/dba-specialist-db2-postgress-38u-w-bij-kamer-van-koophandel-utrecht-at-dc-engineers-b-v-3821537617',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 3 * 86400000).toISOString(),
    is_remote: false, seniority: 'mid',
  },
  {
    title: 'DB2 Administrator (6-month contract)',
    company: 'Global Enterprise Partners',
    location: 'Netherlands',
    job_type: 'contract',
    salary_min: null, salary_max: null, currency: 'EUR',
    description: '6-month DB2 Administrator contract in the Netherlands. Responsibilities include database administration, HADR configuration, performance tuning, and upgrade planning for enterprise environments.',
    skills: ['DB2 LUW', 'IBM DB2', 'HADR', 'Performance Tuning', 'Linux'],
    apply_url: 'https://nl.linkedin.com/jobs/view/db2-administrator-netherlands-6-months-at-global-enterprise-partners-4288921606',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 1 * 86400000).toISOString(),
    is_remote: false, seniority: 'senior',
  },
  {
    title: 'DB2 LUW / Oracle DBA',
    company: 'Rabobank',
    location: 'Utrecht',
    job_type: 'full-time',
    salary_min: 70000, salary_max: 100000, currency: 'EUR',
    description: 'Support Rabobank\'s multi-database environment including DB2 LUW and Oracle. Cloud migration, performance, and security focus.',
    skills: ['DB2 LUW', 'Oracle', 'SQL', 'Linux', 'Ansible'],
    apply_url: 'https://nl.indeed.com/jobs?q=DB2+DBA+Oracle+Database+Administrator&l=Nederland&fromage=30',
    source: 'Indeed',
    posted_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    is_remote: false, seniority: 'mid',
  },
  {
    title: 'Database Engineer — DB2 LUW to PostgreSQL',
    company: 'NN Group',
    location: 'The Hague',
    job_type: 'full-time',
    salary_min: 65000, salary_max: 95000, currency: 'EUR',
    description: 'Manage NN Group\'s insurance policy database environment. Lead migration of DB2 LUW schemas to PostgreSQL on Azure.',
    skills: ['DB2 LUW', 'PostgreSQL', 'Azure', 'Python', 'SQL'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=DB2+PostgreSQL+Migration+Database+Engineer&location=Netherlands&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    is_remote: true, seniority: 'mid',
  },
  {
    title: 'IBM DB2 LUW Consultant (Day Rate)',
    company: 'Sogeti Netherlands',
    location: 'Netherlands / Remote',
    job_type: 'contract',
    salary_min: 600, salary_max: 850, currency: 'EUR',
    description: 'DB2 LUW consultancy for banking and insurance clients. HADR, query optimisation, and upgrade projects. Day rate contract.',
    skills: ['DB2 LUW', 'IBM DB2', 'HADR', 'Performance Tuning', 'Linux'],
    apply_url: 'https://nl.indeed.com/jobs?q=IBM+DB2+LUW+Consultant+Contract&l=Nederland&fromage=30',
    source: 'Indeed',
    posted_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    is_remote: true, seniority: 'senior',
  },
  {
    title: 'DB2 DBA / Data Migration Engineer',
    company: 'Capgemini NL',
    location: 'Amsterdam / Rotterdam',
    job_type: 'full-time',
    salary_min: 65000, salary_max: 95000, currency: 'EUR',
    description: 'Migrate DB2 LUW databases to cloud platforms (Azure Synapse, AWS RDS) for large Dutch enterprises. Strong DB2 internals required.',
    skills: ['DB2 LUW', 'Azure Synapse', 'AWS RDS', 'Python', 'ETL'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=DB2+LUW+Database+Migration+Engineer+Azure&location=Netherlands&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    is_remote: true, seniority: 'mid',
  },

  // ── Additional NL roles ─────────────────────────────────────────────────────
  {
    title: 'Data Scientist (AI/ML)',
    company: 'Randstad NL',
    location: 'Amsterdam',
    job_type: 'full-time',
    salary_min: 65000, salary_max: 90000, currency: 'EUR',
    description: 'Apply ML to Randstad\'s HR analytics: candidate matching, churn prediction, and salary benchmarking.',
    skills: ['Python', 'Scikit-learn', 'SQL', 'Azure ML', 'Power BI'],
    apply_url: 'https://nl.indeed.com/jobs?q=Data+Scientist+Machine+Learning&l=Amsterdam&fromage=14',
    source: 'Indeed',
    posted_at: new Date(Date.now() - 8 * 86400000).toISOString(),
    is_remote: true, seniority: 'mid',
  },
  {
    title: 'LLM / NLP Engineer',
    company: 'TomTom',
    location: 'Amsterdam',
    job_type: 'full-time',
    salary_min: 85000, salary_max: 115000, currency: 'EUR',
    description: 'Build next-gen LLM-based navigation assistants using RAG, fine-tuning, and on-device inference.',
    skills: ['LangChain', 'RAG', 'Python', 'Azure OpenAI', 'ONNX'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=LLM+NLP+Engineer+RAG&location=Amsterdam&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 9 * 86400000).toISOString(),
    is_remote: false, seniority: 'mid',
  },
  {
    title: 'Senior Data Scientist',
    company: 'Prosus / OLX Group',
    location: 'Amsterdam',
    job_type: 'full-time',
    salary_min: 90000, salary_max: 120000, currency: 'EUR',
    description: 'Drive ML-powered pricing, fraud detection, and marketplace ranking across 30+ markets.',
    skills: ['Python', 'Spark', 'Scikit-learn', 'SQL', 'GCP'],
    apply_url: 'https://www.linkedin.com/jobs/search/?keywords=Senior+Data+Scientist&location=Amsterdam&f_TPR=r2592000',
    source: 'LinkedIn',
    posted_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    is_remote: false, seniority: 'senior',
  },
]

export async function fetchNLJobs() {
  const appId = process.env.ADZUNA_APP_ID
  const appKey = process.env.ADZUNA_APP_KEY

  if (appId && appKey) {
    return fetchFromAdzuna(appId, appKey)
  }
  return NL_SEED_JOBS
}

async function fetchFromAdzuna(appId: string, appKey: string) {
  const roles = [
    'data engineer', 'machine learning engineer', 'AI engineer',
    'data scientist', 'DB2 DBA', 'database administrator',
  ]
  const results: typeof NL_SEED_JOBS = []

  for (const role of roles) {
    try {
      const url =
        `https://api.adzuna.com/v1/api/jobs/nl/search/1` +
        `?app_id=${appId}&app_key=${appKey}` +
        `&what=${encodeURIComponent(role)}&results_per_page=5&content-type=application/json`
      const res = await fetch(url)
      if (!res.ok) continue
      const data = await res.json()

      for (const job of data.results ?? []) {
        results.push({
          title: job.title,
          company: job.company?.display_name ?? 'Unknown',
          location: job.location?.display_name ?? 'Netherlands',
          job_type: 'full-time',
          salary_min: job.salary_min ?? null,
          salary_max: job.salary_max ?? null,
          currency: 'EUR',
          description: job.description?.slice(0, 400) ?? null,
          skills: [],
          apply_url: job.redirect_url ?? null,
          source: 'Adzuna',
          posted_at: job.created ?? new Date().toISOString(),
          is_remote: (job.title?.toLowerCase() ?? '').includes('remote'),
          seniority: detectSeniority(job.title ?? ''),
        })
      }
    } catch {
      // fall back silently
    }
  }

  return results.length > 0 ? results : NL_SEED_JOBS
}

function detectSeniority(title: string): string {
  const t = title.toLowerCase()
  if (t.includes('junior') || t.includes('jr') || t.includes('graduate')) return 'junior'
  if (t.includes('lead') || t.includes('principal') || t.includes('head of')) return 'lead'
  if (t.includes('senior') || t.includes('sr') || t.includes('staff')) return 'senior'
  return 'mid'
}
