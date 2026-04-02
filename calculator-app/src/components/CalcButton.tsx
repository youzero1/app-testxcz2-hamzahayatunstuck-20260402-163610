'use client'

interface CalcButtonProps {
  label: string
  variant: 'digit' | 'operator' | 'action' | 'equals' | 'special'
  onClick: () => void
  wide?: boolean
  active?: boolean
}

const variantStyles: Record<CalcButtonProps['variant'], string> = {
  digit: 'bg-slate-700 hover:bg-slate-600 text-white h-16',
  operator: 'bg-orange-500 hover:bg-orange-400 text-white h-16',
  action: 'bg-slate-600 hover:bg-slate-500 text-white h-16',
  equals: 'bg-orange-500 hover:bg-orange-400 text-white h-16',
  special: 'bg-slate-600 hover:bg-slate-500 text-slate-200 h-16',
}

export default function CalcButton({
  label,
  variant,
  onClick,
  wide,
  active,
}: CalcButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        calculator-btn
        ${variantStyles[variant]}
        ${wide ? 'col-span-4' : ''}
        ${active ? 'ring-2 ring-white ring-offset-1 ring-offset-slate-900 brightness-125' : ''}
      `}
      aria-label={label}
    >
      {label}
    </button>
  )
}
