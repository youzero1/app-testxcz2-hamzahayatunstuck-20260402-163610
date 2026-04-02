'use client'

interface DisplayProps {
  value: string
  expression: string
  hasError: boolean
}

export default function Display({ value, expression, hasError }: DisplayProps) {
  const fontSize =
    value.length > 12
      ? 'text-2xl'
      : value.length > 8
      ? 'text-3xl'
      : value.length > 5
      ? 'text-4xl'
      : 'text-5xl'

  return (
    <div className="bg-slate-800 px-6 py-5 min-h-[130px] flex flex-col items-end justify-end border-b border-slate-700">
      <div className="text-slate-400 text-sm h-5 mb-2 truncate w-full text-right">
        {expression || '\u00A0'}
      </div>
      <div
        className={`${
          hasError ? 'text-red-400' : 'text-white'
        } ${fontSize} font-light tracking-tight truncate w-full text-right transition-all duration-100`}
      >
        {value}
      </div>
    </div>
  )
}
