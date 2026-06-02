/**
 * Simple rate limiter to prevent hammering the app during scanning or test runs.
 *
 * Usage:
 *   const limiter = new RateLimiter({ requestsPerSecond: 2 })
 *   await limiter.wait()
 *   // ... make a request ...
 */
export class RateLimiter {
  private readonly minIntervalMs: number
  private lastRequestTime = 0

  constructor({ requestsPerSecond }: { requestsPerSecond: number }) {
    this.minIntervalMs = 1000 / requestsPerSecond
  }

  async wait(): Promise<void> {
    const now = Date.now()
    const elapsed = now - this.lastRequestTime
    const waitTime = Math.max(0, this.minIntervalMs - elapsed)

    if (waitTime > 0) {
      await new Promise<void>(resolve => setTimeout(resolve, waitTime))
    }

    this.lastRequestTime = Date.now()
  }
}
