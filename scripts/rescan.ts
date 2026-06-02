/**
 * rescan.ts — prints the filled-in rescan prompt for your AI agent.
 *
 * Usage: npm run rescan
 *
 * Use this after your app has changed to update page maps and fix broken tests.
 */
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const promptPath = path.resolve(__dirname, '../prompts/08-rescan.md')

if (!fs.existsSync(promptPath)) {
  console.error('❌  prompts/08-rescan.md not found')
  process.exit(1)
}

const baseUrl  = process.env.BASE_URL ?? '<BASE_URL not set — check .env>'
const appName  = process.env.APP_NAME ?? '<APP_NAME not set>'
const appRoles = process.env.APP_ROLES ?? 'guest,user,admin'

const promptContent = fs.readFileSync(promptPath, 'utf-8')

const filled = promptContent
  .replace(/<BASE_URL>/g, baseUrl)
  .replace(/<APP_NAME>/g, appName)
  .replace(/<APP_ROLES>/g, appRoles)

console.log('\n' + '═'.repeat(60))
console.log('  RESCAN PROMPT — copy everything below and paste into your agent')
console.log('═'.repeat(60) + '\n')
console.log(filled)
console.log('\n' + '═'.repeat(60))
console.log(`  App URL: ${baseUrl}`)
console.log('═'.repeat(60) + '\n')
