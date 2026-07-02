import { MapPin } from 'lucide-react'
import { Tag } from '@/components/ui/Badge'
import { formatSalary, formatDate } from '@/lib/utils'
import type { Job } from '@/types'

function sourceStyle(source: string): string {
  switch (source.toLowerCase()) {
    case 'linkedin':  return 'text-[#0A66C2] bg-[#0A66C2]/10 border-[#0A66C2]/25'
    case 'indeed':    return 'text-[#003A9B] bg-[#003A9B]/10 border-[#003A9B]/25'
    case 'glassdoor': return 'text-[#0CAA41] bg-[#0CAA41]/10 border-[#0CAA41]/25'
    case 'jobleads':  return 'text-violet-400 bg-violet-400/10 border-violet-400/25'
    case 'wellfound': return 'text-orange-400 bg-orange-400/10 border-orange-400/25'
    case 'adzuna':    return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/25'
    default:          return 'text-[#6B6990] bg-white/5 border-white/10'
  }
}

const seniorityStyle: Record<string, string> = {
  junior:    'text-emerald-400 bg-emerald-400/10 border-emerald-400/25',
  mid:       'text-cyan-400 bg-cyan-400/10 border-cyan-400/25',
  senior:    'text-violet-400 bg-violet-400/10 border-violet-400/25',
  lead:      'text-orange-400 bg-orange-400/10 border-orange-400/25',
  principal: 'text-pink-400 bg-pink-400/10 border-pink-400/25',
}

export function JobCard({ job }: { job: Job }) {
  const initials = job.company
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const senClass = seniorityStyle[job.seniority?.toLowerCase() ?? ''] ?? 'text-[#6B6990] bg-white/5 border-white/10'

  return (
    <div className="rounded-2xl bg-[#17153A] border border-white/[0.07] p-5 hover:border-white/[0.14] hover:bg-[#1D1B42] transition-all duration-200">

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 border border-[#6366F1]/25 flex items-center justify-center text-[#8B5CF6] font-bold text-sm flex-shrink-0">
            {initials}
          </div>
          <div>
            <div className="text-[#EEEEFF] font-semibold text-[13px] leading-tight">{job.title}</div>
            <div className="text-[#6B6990] text-[11px] mt-0.5">{job.company}</div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          {job.seniority && (
            <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border capitalize ${senClass}`}>
              {job.seniority}
            </span>
          )}
          {job.is_remote && (
            <span className="text-[10px] font-semibold text-[#22C55E] bg-[#22C55E]/10 border border-[#22C55E]/25 px-2.5 py-0.5 rounded-full">
              Remote
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 mb-3 text-[11px]">
        <span className="flex items-center gap-1 text-[#6B6990]">
          <MapPin className="w-3 h-3" />
          {job.location}
        </span>
        {(job.salary_min || job.salary_max) && (
          <span className="text-[#22C55E] font-semibold">
            {formatSalary(job.salary_min, job.salary_max, job.currency)}
          </span>
        )}
      </div>

      {job.skills && job.skills.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mb-4">
          {job.skills.slice(0, 5).map((skill) => <Tag key={skill}>{skill}</Tag>)}
        </div>
      )}

      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
        <div className="flex items-center gap-2">
          <span className="text-[#6B6990] text-[10px]">{formatDate(job.posted_at)}</span>
          {job.source && job.source !== 'seed' && (
            <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md border ${sourceStyle(job.source)}`}>
              {job.source}
            </span>
          )}
        </div>
        {job.apply_url ? (
          <a
            href={job.apply_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-semibold bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white px-4 py-1.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/20"
          >
            Apply →
          </a>
        ) : (
          <span className="text-[#6B6990] text-[11px]">Details →</span>
        )}
      </div>
    </div>
  )
}
