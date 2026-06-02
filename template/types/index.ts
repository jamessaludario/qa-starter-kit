/**
 * Shared TypeScript types for the QA test suite.
 */

/** User roles as defined in .env APP_ROLES */
export type UserRole = 'guest' | 'user' | 'admin'

/** A page map entry — output of the scan prompt */
export interface PageMap {
  url: string
  title: string
  role: UserRole
  timestamp: string
  elements: {
    headings: string[]
    links: Array<{ text: string; href: string }>
    buttons: Array<{ text: string; selector: string }>
    forms: Array<{ id: string; fields: string[] }>
    images: Array<{ alt: string; src: string }>
  }
  authRequired: boolean
  notes: string
}

/** Summary of all scanned pages */
export interface ScanSummary {
  scannedAt: string
  totalPages: number
  byRole: Record<UserRole, string[]>
  authRequiredPages: string[]
  errors: string[]
}
