import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

const RELEASES = [
  // ── Db2 12.1 ─────────────────────────────────────────────────────────
  {
    version: '12.1',
    release_type: 'release',
    title: 'IBM Db2 12.1 General Availability',
    summary:
      'Major new version released November 14, 2024 with 200+ features. Highlights include an AI-powered query optimizer (up to 3× performance improvement), native Watsonx AI SQL functions, federation to Snowflake/Oracle 23c/MongoDB, a new Starter Edition, and Apple Silicon driver support. Db2 12.1 is the current supported release.',
    release_date: '2024-11-14',
    url: 'https://www.ibm.com/docs/en/db2/12.1.x?topic=new-121',
    features: [
      'AI-powered query optimizer — up to 3× query performance improvement',
      'Watsonx AI integration — SQL Data Insights functions in-database',
      'New IBM Db2 Starter Edition',
      'Apple Silicon (M-series) driver support',
      'Federation: Snowflake, Oracle 23c, MariaDB, MongoDB, SAP',
      'Cloud object storage performance enhancements',
      'Columnar tables schema evolution support',
      'TSA-less pureScale with Pacemaker clustering',
      'End-to-end SSL for pureScale + HADR',
      'Trusted contexts via stored procedures',
      'Remote backup storage to Amazon S3',
      'Automatic history file pruning',
    ],
    platforms: ['Linux', 'Windows', 'AIX'],
  },
  // ── Db2 11.5 ─────────────────────────────────────────────────────────
  {
    version: '11.5',
    release_type: 'announcement',
    title: 'IBM Db2 11.5 End of Support — April 30, 2027',
    summary:
      'IBM announced Db2 11.5 End of Support (EOS) on April 30, 2027, coinciding with the Db2 12.1 GA release. After EOS, no new fix packs or security patches will be issued. Customers are advised to plan migration to Db2 12.1.',
    release_date: '2024-11-14',
    url: 'https://www.ibm.com/support/pages/db2-distributed-end-support-eos-dates',
    features: [
      'EOS date: April 30, 2027',
      'Fix packs and security patches continue until EOS',
      'Migration to Db2 12.1 recommended',
      'IBM migration tools and upgrade guides available',
    ],
    platforms: ['Linux', 'Windows', 'AIX', 'Solaris'],
  },
  {
    version: '11.5.10',
    release_type: 'fixpack',
    title: 'IBM Db2 11.5 Fix Pack 10',
    summary:
      'Fix Pack 10 is the latest generally available fix pack for Db2 11.5. Delivers critical security patches, performance improvements for large workloads, and enhanced cloud integration capabilities.',
    release_date: '2024-05-23',
    url: 'https://www.ibm.com/support/pages/db2-linux-unix-and-windows-fix-pack-central#fp10',
    features: [
      'Critical security patches (CVE-2024 series)',
      'Improved query performance for columnar workloads',
      'Enhanced Db2 REST Service stability',
      'Cloud integration improvements (AWS, Azure, IBM Cloud)',
      'HADR failover time reduction',
      'Memory management optimisations',
      'JSON indexing improvements',
    ],
    platforms: ['Linux', 'Windows', 'AIX'],
  },
  {
    version: '11.5.9',
    release_type: 'fixpack',
    title: 'IBM Db2 11.5 Fix Pack 9',
    summary:
      'Fix Pack 9 delivers stability improvements, security patches, and enhancements to the REST API and Db2 Warehouse features. Includes fixes for HADR, pureScale, and BLU Acceleration.',
    release_date: '2023-11-16',
    url: 'https://www.ibm.com/support/pages/db2-linux-unix-and-windows-fix-pack-central',
    features: [
      'Security vulnerability fixes (CVE patches)',
      'HADR stability improvements',
      'REST API performance enhancements',
      'BLU Acceleration query optimiser fixes',
      'pureScale reliability updates',
      'Db2 Warehouse improvements',
    ],
    platforms: ['Linux', 'Windows', 'AIX'],
  },
  {
    version: '11.5',
    release_type: 'release',
    title: 'IBM Db2 11.5 General Availability',
    summary:
      'Major release introducing native REST API, enhanced JSON support, in-database machine learning, and improved BLU Acceleration. Db2 11.5 LTS is supported until April 30, 2027.',
    release_date: '2019-06-27',
    url: 'https://www.ibm.com/docs/en/db2/11.5',
    features: [
      'Native REST API (db2rest)',
      'Enhanced JSON document store',
      'In-database machine learning (Db2 ML)',
      'BLU Acceleration improvements',
      'Oracle compatibility enhancements',
      'Hybrid Transactional/Analytical Processing (HTAP)',
      'Row and Column Access Control (RCAC)',
      'Time Travel Query',
      'pureScale enhancements',
    ],
    platforms: ['Linux', 'Windows', 'AIX', 'Solaris'],
  },
  // ── Db2 11.1 ─────────────────────────────────────────────────────────
  {
    version: '11.1',
    release_type: 'announcement',
    title: 'IBM Db2 11.1 End of Support',
    summary:
      'IBM Db2 11.1 reached End of Support on April 30, 2023. Customers are advised to migrate to Db2 11.5 or 12.1 to continue receiving security patches, fix packs, and technical support.',
    release_date: '2023-04-30',
    url: 'https://www.ibm.com/support/pages/lifecycle/search?q=Db2',
    features: [
      'No new fix packs after April 2023',
      'No security patches after EOS date',
      'Migration to Db2 11.5 or 12.1 recommended',
      'IBM migration tools available',
    ],
    platforms: ['Linux', 'Windows', 'AIX'],
  },
  // ── Security ──────────────────────────────────────────────────────────
  {
    version: '11.5',
    release_type: 'security',
    title: 'IBM Db2 Security Bulletin — Privilege Escalation (2024)',
    summary:
      'IBM published security bulletins for Db2 11.5 addressing privilege escalation vulnerabilities. Fix Pack 10 or later is required to remediate. All production environments should upgrade immediately.',
    release_date: '2024-03-12',
    url: 'https://www.ibm.com/support/pages/security-bulletin-vulnerabilities-affect-ibm-db2',
    features: [
      'CVE-2023-47158 — Privilege escalation via local OS',
      'CVE-2023-50312 — Information disclosure vulnerability',
      'Remediation: upgrade to FP9 or FP10',
      'Applies to all platforms',
    ],
    platforms: ['Linux', 'Windows', 'AIX', 'Solaris'],
  },
]

function isTableMissing(msg: string | undefined): boolean {
  if (!msg) return false
  const lower = msg.toLowerCase()
  return (
    lower.includes('does not exist') ||
    lower.includes('relation') ||
    lower.includes('undefined table') ||
    lower.includes('42p01') ||
    lower.includes('pgrst200') ||
    lower.includes('schema cache') ||
    lower.includes('could not find the table')
  )
}

export async function POST() {
  const supabase = createServiceClient()

  // Probe the table first so we can give a clear error if it hasn't been created yet.
  const { error: probeError } = await supabase
    .from('db2_releases')
    .select('id')
    .limit(1)

  if (probeError && isTableMissing(probeError.message)) {
    return NextResponse.json(
      { ok: false, tableMissing: true, error: probeError.message },
      { status: 422 },
    )
  }

  const { error, count } = await supabase
    .from('db2_releases')
    .upsert(RELEASES, { onConflict: 'url' })
    .select('id', { count: 'exact' })

  if (error) {
    return NextResponse.json(
      { ok: false, tableMissing: isTableMissing(error.message), error: error.message },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, upserted: count })
}
