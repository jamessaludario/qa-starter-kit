import { ENV } from '../helpers/env'

/**
 * ROUTES — all app URLs in one place.
 *
 * Never hardcode URLs in tests. Add routes here and import this constant.
 *
 * These are populated from .env at runtime so they work across environments.
 */

const base  = () => ENV.BASE_URL().replace(/\/$/, '')
const admin = () => (ENV.ADMIN_BASE_URL() || ENV.BASE_URL()).replace(/\/$/, '')

export const ROUTES = {
  // ── Public / Guest ────────────────────────────────────────────
  HOME:          () => `${base()}/`,
  LOGIN:         () => `${base()}/login`,
  SIGNUP:        () => `${base()}/signup`,
  FORGOT_PW:     () => `${base()}/forgot-password`,
  PRICING:       () => `${base()}/pricing`,

  // ── Authenticated User ────────────────────────────────────────
  DASHBOARD:     () => `${base()}/dashboard`,
  PROFILE:       () => `${base()}/profile`,
  SETTINGS:      () => `${base()}/settings`,

  // ── Admin ─────────────────────────────────────────────────────
  ADMIN_HOME:    () => `${admin()}/`,
  ADMIN_USERS:   () => `${admin()}/users`,
  ADMIN_SETTINGS:() => `${admin()}/settings`,
} as const
