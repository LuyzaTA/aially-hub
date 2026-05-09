import { Resend } from 'resend'
import type { Job } from '@/types'

const ALERT_TO = 'alexandre.t.luyza@gmail.com'

export async function sendDb2JobsAlert(jobs: Job[]): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return

  const resend = new Resend(apiKey)

  const rows = jobs
    .map(
      (j) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #1e1c3a;">
          <strong style="color:#eeeeff;font-size:13px;">${j.title}</strong><br/>
          <span style="color:#6b6990;font-size:12px;">${j.company} · ${j.location}</span>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #1e1c3a;white-space:nowrap;">
          <span style="color:#6b6990;font-size:12px;">${j.seniority ?? '—'}</span>
        </td>
        <td style="padding:10px 12px;border-bottom:1px solid #1e1c3a;white-space:nowrap;">
          ${
            j.apply_url
              ? `<a href="${j.apply_url}" style="background:#006699;color:#fff;padding:5px 12px;border-radius:8px;text-decoration:none;font-size:12px;font-weight:600;">Apply →</a>`
              : '<span style="color:#3d3b60;font-size:12px;">No link</span>'
          }
        </td>
      </tr>`,
    )
    .join('')

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body style="margin:0;padding:0;background:#0d0c22;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:620px;margin:40px auto;background:#100e24;border:1px solid rgba(255,255,255,0.07);border-radius:16px;overflow:hidden;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#006699,#0099cc);padding:28px 32px;">
      <div style="font-size:11px;color:rgba(255,255,255,0.7);letter-spacing:0.12em;text-transform:uppercase;margin-bottom:6px;">AIAlly Hub · DB2 LUW Alert</div>
      <div style="font-size:22px;font-weight:700;color:#fff;">${jobs.length} new DB2 position${jobs.length !== 1 ? 's' : ''} found</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.75);margin-top:4px;">Netherlands · ${new Date().toLocaleDateString('en-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
    </div>

    <!-- Table -->
    <div style="padding:0 8px 8px;">
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:#17153a;">
            <th style="padding:10px 12px;text-align:left;color:#6b6990;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">Position</th>
            <th style="padding:10px 12px;text-align:left;color:#6b6990;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">Level</th>
            <th style="padding:10px 12px;text-align:left;color:#6b6990;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;font-weight:600;">Link</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.06);">
      <a href="https://aially-hub.vercel.app/db2" style="color:#4db8ff;font-size:12px;text-decoration:none;">View full DB2 LUW page →</a>
      <p style="color:#3d3b60;font-size:11px;margin:8px 0 0;">You receive this because you configured DB2 job alerts on AIAlly Hub.</p>
    </div>

  </div>
</body>
</html>`

  await resend.emails.send({
    from: 'AIAlly Hub <onboarding@resend.dev>',
    to: ALERT_TO,
    subject: `[DB2 Alert] ${jobs.length} new position${jobs.length !== 1 ? 's' : ''} in the Netherlands`,
    html,
  })
}
