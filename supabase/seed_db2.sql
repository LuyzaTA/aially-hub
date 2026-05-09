-- ============================================================
-- IBM Db2 LUW — Release & Version Intelligence Seed
-- Source: IBM Documentation & Support pages
-- Run in Supabase SQL Editor after creating the db2_releases table
-- ============================================================

INSERT INTO db2_releases (version, release_type, title, summary, release_date, url, features, platforms) VALUES

-- ── Db2 11.5 GA ──────────────────────────────────────────────────────────────
(
  '11.5',
  'release',
  'IBM Db2 11.5 General Availability',
  'Major release introducing native REST API, enhanced JSON support, in-database machine learning, and improved BLU Acceleration. Db2 11.5 is the current Long-Term Support (LTS) version.',
  '2019-06-27',
  'https://www.ibm.com/docs/en/db2/11.5',
  ARRAY[
    'Native REST API (db2rest)',
    'Enhanced JSON document store',
    'In-database machine learning (Db2 ML)',
    'BLU Acceleration improvements',
    'Oracle compatibility enhancements',
    'Hybrid Transactional/Analytical Processing (HTAP)',
    'Row and Column Access Control (RCAC)',
    'Time Travel Query',
    'pureScale enhancements'
  ],
  ARRAY['Linux', 'Windows', 'AIX', 'Solaris']
),

-- ── Fix Pack 9 ────────────────────────────────────────────────────────────────
(
  '11.5.9',
  'fixpack',
  'IBM Db2 11.5 Fix Pack 9',
  'Fix Pack 9 delivers stability improvements, security patches, and enhancements to the REST API and Db2 Warehouse features. Includes fixes for HADR, pureScale, and BLU Acceleration.',
  '2023-11-16',
  'https://www.ibm.com/support/pages/db2-linux-unix-and-windows-fix-pack-central',
  ARRAY[
    'Security vulnerability fixes (CVE patches)',
    'HADR stability improvements',
    'REST API performance enhancements',
    'BLU Acceleration query optimiser fixes',
    'pureScale reliability updates',
    'Db2 Warehouse improvements'
  ],
  ARRAY['Linux', 'Windows', 'AIX']
),

-- ── Fix Pack 10 ───────────────────────────────────────────────────────────────
(
  '11.5.10',
  'fixpack',
  'IBM Db2 11.5 Fix Pack 10',
  'Fix Pack 10 is the latest generally available fix pack for Db2 11.5. Delivers critical security patches, performance improvements for large workloads, and enhanced cloud integration capabilities.',
  '2024-05-23',
  'https://www.ibm.com/support/pages/db2-linux-unix-and-windows-fix-pack-central',
  ARRAY[
    'Critical security patches (CVE-2024 series)',
    'Improved query performance for columnar workloads',
    'Enhanced Db2 REST Service stability',
    'Cloud integration improvements (AWS, Azure, IBM Cloud)',
    'HADR failover time reduction',
    'Memory management optimisations',
    'JSON indexing improvements'
  ],
  ARRAY['Linux', 'Windows', 'AIX']
),

-- ── End of Support announcement ───────────────────────────────────────────────
(
  '11.1',
  'announcement',
  'IBM Db2 11.1 End of Support',
  'IBM Db2 11.1 reached End of Support on April 30, 2023. Customers are advised to migrate to Db2 11.5 to continue receiving security patches, fix packs, and technical support.',
  '2023-04-30',
  'https://www.ibm.com/support/pages/lifecycle/search?q=Db2',
  ARRAY[
    'No new fix packs after April 2023',
    'No security patches after EOS date',
    'Migration to 11.5 recommended',
    'IBM migration tools available'
  ],
  ARRAY['Linux', 'Windows', 'AIX']
),

-- ── Security Advisory 2024 ────────────────────────────────────────────────────
(
  '11.5',
  'security',
  'IBM Db2 Security Bulletin — Privilege Escalation (2024)',
  'IBM published security bulletins for Db2 11.5 addressing privilege escalation vulnerabilities. Fix Pack 10 or later is required to remediate. All production environments should upgrade immediately.',
  '2024-03-12',
  'https://www.ibm.com/support/pages/security-bulletin-vulnerabilities-affect-ibm-db2',
  ARRAY[
    'CVE-2023-47158 — Privilege escalation via local OS',
    'CVE-2023-50312 — Information disclosure vulnerability',
    'Remediation: upgrade to FP9 or FP10',
    'Applies to all platforms'
  ],
  ARRAY['Linux', 'Windows', 'AIX', 'Solaris']
)

ON CONFLICT (url) DO UPDATE SET
  summary      = EXCLUDED.summary,
  features     = EXCLUDED.features,
  release_date = EXCLUDED.release_date;
