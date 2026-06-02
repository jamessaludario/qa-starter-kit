/**
 * Date utility helpers for test data generation.
 */

/** Returns today's date as YYYY-MM-DD */
export function today(): string {
  return new Date().toISOString().split('T')[0]!
}

/** Returns a date N days from today as YYYY-MM-DD */
export function daysFromNow(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d.toISOString().split('T')[0]!
}

/** Returns a unique timestamp string — useful for generating unique test data */
export function uniqueTimestamp(): string {
  return Date.now().toString()
}

/** Returns a unique test email using the current timestamp */
export function uniqueEmail(prefix = 'test'): string {
  return `${prefix}+${uniqueTimestamp()}@example.com`
}
