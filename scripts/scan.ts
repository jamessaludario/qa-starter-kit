/**
 * scan.ts — prints the filled-in scan prompt for your AI agent.
 *
 * Usage: npm run scan
 *
 * This reads .env values and injects them into prompts/01-scan-pages.md,
 * then prints the result so you can copy-paste it into your agent.
 */
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const promptPath = path.resolve(__dirname, '../prompts/01-scan-pages.md')

if (!fs.existsSync(promptPath)) {
  console.error('❌  prompts/01-scan-pages.md not found')
  process.exit(1)
}

const baseUrl   = process.env.BASE_URL   ?? '<BASE_URL not set — check .env>'
const appName   = process.env.APP_NAME   ?? '<APP_NAME not set>'
const appRoles  = process.env.APP_ROLES  ?? 'guest,user,admin'
const appDesc   = process.env.APP_DESCRIPTION ?? ''

const promptContent = fs.readFileSync(promptPath, 'utf-8')

const filled = promptContent
  .replace(/<BASE_URL>/g, baseUrl)
  .replace(/<APP_NAME>/g, appName)
  .replace(/<APP_ROLES>/g, appRoles)
  .replace(/<APP_DESCRIPTION>/g, appDesc)

console.log('\n' + '═'.repeat(60))
console.log('  SCAN PROMPT — copy everything below and paste into your agent')
console.log('═'.repeat(60) + '\n')
console.log(filled)
console.log('\n' + '═'.repeat(60))
console.log(`  App URL: ${baseUrl}`)
console.log(`  Roles:   ${appRoles}`)
console.log('═'.repeat(60) + '\n')
