/**
 * Type-safe environment variable helpers.
 * Throws a clear error if a required variable is missing.
 */

export function requireEnv(key: string): string {
  const value = process.env[key]
  if (!value) {
    throw new Error(
      `Required environment variable "${key}" is not set.\n` +
      `Check your .env file. Run: cp .env.example .env`
    )
  }
  return value
}

export function optionalEnv(key: string, defaultValue = ''): string {
  return process.env[key] ?? defaultValue
}

// ── Typed accessors ────────────────────────────────────────────────────────

export const ENV = {
  BASE_URL:          () => requireEnv('BASE_URL'),
  ADMIN_BASE_URL:    () => optionalEnv('ADMIN_BASE_URL'),
  APP_NAME:          () => optionalEnv('APP_NAME', 'App'),
  APP_DESCRIPTION:   () => optionalEnv('APP_DESCRIPTION'),
  APP_ROLES:         () => optionalEnv('APP_ROLES', 'guest').split(',').map(r => r.trim()),
  APP_REPO_PATH:     () => optionalEnv('APP_REPO_PATH'),
  USER_EMAIL:        () => optionalEnv('USER_EMAIL'),
  ADMIN_EMAIL:       () => optionalEnv('ADMIN_EMAIL'),
  AUTH_USER_STATE:   () => optionalEnv('AUTH_USER_STATE', 'auth/user-state.json'),
  AUTH_ADMIN_STATE:  () => optionalEnv('AUTH_ADMIN_STATE', 'auth/admin-state.json'),
}
