'use client'

import { useState, useCallback, useEffect } from 'react'
import Display from './Display'
import ButtonGrid from './ButtonGrid'

export type CalculatorState = {
  displayValue: string
  previousValue: string | null
  operator: string | null
  waitingForOperand: boolean
  expression: string
  hasError: boolean
}

const initialState: CalculatorState = {
  displayValue: '0',
  previousValue: null,
  operator: null,
  waitingForOperand: false,
  expression: '',
  hasError: false,
}

export default function Calculator() {
  const [state, setState] = useState<CalculatorState>(initialState)
  const [history, setHistory] = useState<string[]>([])

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '×':
        return a * b
      case '÷':
        if (b === 0) throw new Error('Division by zero')
        return a / b
      case '%':
        return a % b
      default:
        return b
    }
  }

  const formatNumber = (num: number): string => {
    if (!isFinite(num)) return 'Error'
    const str = num.toString()
    if (str.includes('e')) return str
    const parts = str.split('.')
    if (parts[0].length > 12) return num.toExponential(6)
    return str.length > 15 ? parseFloat(num.toPrecision(12)).toString() : str
  }

  const handleDigit = useCallback((digit: string) => {
    setState((prev) => {
      if (prev.hasError) return prev
      if (prev.waitingForOperand) {
        return {
          ...prev,
          displayValue: digit,
          waitingForOperand: false,
        }
      }
      const newValue =
        prev.displayValue === '0' ? digit : prev.displayValue + digit
      if (newValue.replace('.', '').replace('-', '').length > 15) return prev
      return { ...prev, displayValue: newValue }
    })
  }, [])

  const handleDecimal = useCallback(() => {
    setState((prev) => {
      if (prev.hasError) return prev
      if (prev.waitingForOperand) {
        return { ...prev, displayValue: '0.', waitingForOperand: false }
      }
      if (prev.displayValue.includes('.')) return prev
      return { ...prev, displayValue: prev.displayValue + '.' }
    })
  }, [])

  const handleOperator = useCallback((op: string) => {
    setState((prev) => {
      if (prev.hasError) return prev
      const current = parseFloat(prev.displayValue)

      if (prev.operator && !prev.waitingForOperand) {
        try {
          const result = calculate(
            parseFloat(prev.previousValue!),
            current,
            prev.operator
          )
          const formatted = formatNumber(result)
          const expr = `${prev.expression} ${prev.displayValue} ${op}`
          return {
            ...prev,
            displayValue: formatted,
            previousValue: formatted,
            operator: op,
            waitingForOperand: true,
            expression: expr,
            hasError: false,
          }
        } catch {
          return {
            ...prev,
            displayValue: 'Error',
            hasError: true,
            expression: '',
          }
        }
      }

      return {
        ...prev,
        previousValue: prev.displayValue,
        operator: op,
        waitingForOperand: true,
        expression: `${prev.displayValue} ${op}`,
      }
    })
  }, [])

  const handleEquals = useCallback(() => {
    setState((prev) => {
      if (!prev.operator || !prev.previousValue || prev.hasError) return prev
      const current = parseFloat(prev.displayValue)
      try {
        const result = calculate(
          parseFloat(prev.previousValue),
          current,
          prev.operator
        )
        const formatted = formatNumber(result)
        const fullExpr = `${prev.expression} ${prev.displayValue} =`
        setHistory((h) => [fullExpr + ' ' + formatted, ...h].slice(0, 10))
        return {
          ...initialState,
          displayValue: formatted,
          expression: fullExpr,
        }
      } catch {
        return {
          ...prev,
          displayValue: 'Error',
          hasError: true,
          expression: '',
        }
      }
    })
  }, [])

  const handleClear = useCallback(() => {
    setState(initialState)
  }, [])

  const handleClearEntry = useCallback(() => {
    setState((prev) => ({
      ...prev,
      displayValue: '0',
      hasError: false,
    }))
  }, [])

  const handleToggleSign = useCallback(() => {
    setState((prev) => {
      if (prev.hasError || prev.displayValue === '0') return prev
      const toggled = prev.displayValue.startsWith('-')
        ? prev.displayValue.slice(1)
        : '-' + prev.displayValue
      return { ...prev, displayValue: toggled }
    })
  }, [])

  const handlePercentage = useCallback(() => {
    setState((prev) => {
      if (prev.hasError) return prev
      const value = parseFloat(prev.displayValue)
      const result = prev.previousValue
        ? (parseFloat(prev.previousValue) * value) / 100
        : value / 100
      return { ...prev, displayValue: formatNumber(result) }
    })
  }, [])

  const handleBackspace = useCallback(() => {
    setState((prev) => {
      if (prev.hasError || prev.waitingForOperand) return prev
      const newVal =
        prev.displayValue.length > 1
          ? prev.displayValue.slice(0, -1)
          : '0'
      return { ...prev, displayValue: newVal }
    })
  }, [])

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleDigit(e.key)
      else if (e.key === '.') handleDecimal()
      else if (e.key === '+') handleOperator('+')
      else if (e.key === '-') handleOperator('-')
      else if (e.key === '*') handleOperator('×')
      else if (e.key === '/') {
        e.preventDefault()
        handleOperator('÷')
      } else if (e.key === '%') handlePercentage()
      else if (e.key === 'Enter' || e.key === '=') handleEquals()
      else if (e.key === 'Backspace') handleBackspace()
      else if (e.key === 'Escape') handleClear()
      else if (e.key === 'Delete') handleClearEntry()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleDigit, handleDecimal, handleOperator, handlePercentage, handleEquals, handleBackspace, handleClear, handleClearEntry])

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start justify-center">
      <div
        className="w-80 bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-700"
        style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}
      >
        <Display
          value={state.displayValue}
          expression={state.expression}
          hasError={state.hasError}
        />
        <ButtonGrid
          onDigit={handleDigit}
          onDecimal={handleDecimal}
          onOperator={handleOperator}
          onEquals={handleEquals}
          onClear={handleClear}
          onClearEntry={handleClearEntry}
          onToggleSign={handleToggleSign}
          onPercentage={handlePercentage}
          onBackspace={handleBackspace}
          activeOperator={state.operator}
          waitingForOperand={state.waitingForOperand}
        />
      </div>

      {history.length > 0 && (
        <div className="w-72 bg-slate-900 rounded-3xl shadow-2xl border border-slate-700 p-4">
          <h2 className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-3">
            History
          </h2>
          <ul className="space-y-2 max-h-80 overflow-y-auto">
            {history.map((item, idx) => (
              <li
                key={idx}
                className="text-slate-300 text-sm bg-slate-800 rounded-xl px-3 py-2 break-all"
              >
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={() => setHistory([])}
            className="mt-3 w-full text-xs text-slate-500 hover:text-red-400 transition-colors"
          >
            Clear History
          </button>
        </div>
      )}
    </div>
  )
}
