interface HeaderProps {
  title: string
  subtitle?: string
  badge?: string
  action?: React.ReactNode
}

export function Header({ title, subtitle, badge, action }: HeaderProps) {
  return (
    <div className="flex items-start justify-between mb-8">
      <div>
        {badge && (
          <div className="text-dim text-[10px] tracking-[0.2em] uppercase mb-2">{badge}</div>
        )}
        <h1 className="text-2xl font-light text-ink tracking-tight">{title}</h1>
        {subtitle && <p className="text-dim text-sm mt-1">{subtitle}</p>}
      </div>
      {action && <div>{action}</div>}
    </div>
  )
}
