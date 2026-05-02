export function formatCurrency(value: number) {
  return value.toLocaleString('en-US', {
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
    style: 'currency',
  })
}

export function formatIntegerThousands(value: string) {
  if (!value) return ''
  if (value.length <= 3) return value
  return Number(value).toLocaleString('en-US', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  })
}

/** Digits only, plus support for k & m shorthands. */
export function normalizePriceInput(raw: string) {
  // Strip out commas, spaces, and make lowercase
  const s = raw.replace(/,/g, '').trim().toLowerCase()

  // Look for digits followed by k or m
  const m = s.match(/^(\d+)\s*([km])$/)
  if (m) {
    const d = m[1]
    if (m[2] === 'k') return d + '000' // Add 3 zeros for thousands (k)
    return d + '000000' // Add 6 zeros for millions (m)
  }

  // Otherwise just return digits only
  return s.replace(/\D/g, '')
}
