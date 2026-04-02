'use client'

import CalcButton from './CalcButton'

interface ButtonGridProps {
  onDigit: (d: string) => void
  onDecimal: () => void
  onOperator: (op: string) => void
  onEquals: () => void
  onClear: () => void
  onClearEntry: () => void
  onToggleSign: () => void
  onPercentage: () => void
  onBackspace: () => void
  activeOperator: string | null
  waitingForOperand: boolean
}

export default function ButtonGrid({
  onDigit,
  onDecimal,
  onOperator,
  onEquals,
  onClear,
  onClearEntry,
  onToggleSign,
  onPercentage,
  onBackspace,
  activeOperator,
  waitingForOperand,
}: ButtonGridProps) {
  const buttons: {
    label: string
    variant: 'digit' | 'operator' | 'action' | 'equals' | 'special'
    action: () => void
    wide?: boolean
    active?: boolean
  }[] = [
    // Row 1
    { label: 'AC', variant: 'action', action: onClear },
    { label: 'CE', variant: 'action', action: onClearEntry },
    { label: '%', variant: 'action', action: onPercentage },
    { label: '÷', variant: 'operator', action: () => onOperator('÷'), active: activeOperator === '÷' && waitingForOperand },
    // Row 2
    { label: '7', variant: 'digit', action: () => onDigit('7') },
    { label: '8', variant: 'digit', action: () => onDigit('8') },
    { label: '9', variant: 'digit', action: () => onDigit('9') },
    { label: '×', variant: 'operator', action: () => onOperator('×'), active: activeOperator === '×' && waitingForOperand },
    // Row 3
    { label: '4', variant: 'digit', action: () => onDigit('4') },
    { label: '5', variant: 'digit', action: () => onDigit('5') },
    { label: '6', variant: 'digit', action: () => onDigit('6') },
    { label: '-', variant: 'operator', action: () => onOperator('-'), active: activeOperator === '-' && waitingForOperand },
    // Row 4
    { label: '1', variant: 'digit', action: () => onDigit('1') },
    { label: '2', variant: 'digit', action: () => onDigit('2') },
    { label: '3', variant: 'digit', action: () => onDigit('3') },
    { label: '+', variant: 'operator', action: () => onOperator('+'), active: activeOperator === '+' && waitingForOperand },
    // Row 5
    { label: '+/-', variant: 'special', action: onToggleSign },
    { label: '0', variant: 'digit', action: () => onDigit('0') },
    { label: '⌫', variant: 'special', action: onBackspace },
    { label: '=', variant: 'equals', action: onEquals },
    // Row 6 - decimal
    { label: '.', variant: 'digit', action: onDecimal, wide: true },
  ]

  return (
    <div className="p-4 grid grid-cols-4 gap-3">
      {buttons.map((btn, idx) => (
        <CalcButton
          key={idx}
          label={btn.label}
          variant={btn.variant}
          onClick={btn.action}
          wide={btn.wide}
          active={btn.active}
        />
      ))}
    </div>
  )
}
