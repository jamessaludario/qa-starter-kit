import fs from 'fs-extra'
import path from 'path'
import { execSync } from 'child_process'
import * as dotenv from 'dotenv'
import * as readline from 'readline'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

async function ask(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function scaffold(): Promise<void> {
  console.log('\n╔══════════════════════════════════════════╗')
  console.log('║    QA Automation Starter Kit Setup       ║')
  console.log('╚══════════════════════════════════════════╝\n')
  console.log('This will create a NEW project folder outside the starter kit.')
  console.log('The starter kit itself will not be modified.\n')

  // ── Gather info ──────────────────────────────────────────────────────────

  const appName = (
    await ask('Your app name (e.g. my-app): ') ||
    process.env.PROJECT_NAME ||
    'my-app'
  )
  const appUrl = (
    await ask('Your app URL (e.g. https://my-app.com): ') ||
    process.env.BASE_URL ||
    ''
  )
  const appDesc = (
    await ask('Describe your app in one sentence: ') ||
    process.env.APP_DESCRIPTION ||
    ''
  )
  const appRoles = (
    await ask('User roles, comma-separated (e.g. guest,user,admin): ') ||
    process.env.APP_ROLES ||
    'guest,user,admin'
  )
  const agent = (
    await ask('Your AI agent (claude-code/cursor/copilot/windsurf/antigravity/other): ') ||
    process.env.PREFERRED_AGENT ||
    'other'
  )

  // ── Resolve paths ────────────────────────────────────────────────────────

  const projectName = `${appName.toLowerCase().replace(/\s+/g, '-')}-tests`
  const kitRoot     = path.resolve(__dirname, '..')
  const targetDir   = path.resolve(kitRoot, '..', projectName)

  if (fs.existsSync(targetDir)) {
    console.error(`\n❌  Folder already exists: ${targetDir}`)
    console.error('    Delete it or choose a different app name.\n')
    process.exit(1)
  }

  console.log(`\n📁  Creating project at: ${targetDir}\n`)

  // ── Copy template/ ───────────────────────────────────────────────────────

  const templateDir = path.join(kitRoot, 'template')
  await fs.copy(templateDir, targetDir)
  console.log('✅  Template files copied')

  // ── Copy agent-specific config ───────────────────────────────────────────

  const agentConfigMap: Record<string, string> = {
    'claude-code':  '.claude',
    'cursor':       '.cursor',
    'copilot':      '.github',
    'windsurf':     '.windsurf',
    'antigravity':  '.antigravity',
  }

  const agentKey = Object.keys(agentConfigMap).find(k =>
    agent.toLowerCase().includes(k)
  ) ?? null

  if (agentKey) {
    const agentSrc  = path.join(kitRoot, agentConfigMap[agentKey]!)
    const agentDest = path.join(targetDir, agentConfigMap[agentKey]!)
    if (fs.existsSync(agentSrc)) {
      await fs.copy(agentSrc, agentDest)
      console.log(`🤖  Copied ${agentKey} config (${agentConfigMap[agentKey]})`)
    }
  } else {
    console.log('ℹ️   No agent-specific config copied (agent not recognized)')
    console.log('    Prompts in prompts/ work with any agent.')
  }

  // ── Copy prompts/ ────────────────────────────────────────────────────────

  await fs.copy(
    path.join(kitRoot, 'prompts'),
    path.join(targetDir, 'prompts')
  )
  console.log('📋  Prompts copied')

  // ── Copy docs/ ───────────────────────────────────────────────────────────

  await fs.copy(
    path.join(kitRoot, 'docs'),
    path.join(targetDir, 'docs')
  )
  console.log('📚  Docs copied')

  // ── Write .env ───────────────────────────────────────────────────────────

  const envContent = [
    '# ════════════════════════════════════════════════════',
    '# QA Automation Configuration',
    '# ════════════════════════════════════════════════════',
    '',
    '# ── Your App ─────────────────────────────────────────────',
    `BASE_URL=${appUrl}`,
    'ADMIN_BASE_URL=',
    '',
    '# ── App Details ───────────────────────────────────────────',
    `APP_NAME=${appName}`,
    `APP_DESCRIPTION=${appDesc}`,
    `APP_ROLES=${appRoles}`,
    '',
    '# ── App Source Code (optional) ────────────────────────────',
    'APP_REPO_PATH=',
    '',
    '# ── Test Accounts ─────────────────────────────────────────',
    'USER_EMAIL=',
    'ADMIN_EMAIL=',
    '',
    '# ── Auth Sessions (auto-generated) ────────────────────────',
    'AUTH_USER_STATE=auth/user-state.json',
    'AUTH_ADMIN_STATE=auth/admin-state.json',
  ].join('\n')

  fs.writeFileSync(path.join(targetDir, '.env'), envContent + '\n')
  console.log('🔑  .env created with your values')

  // ── Update package.json name ─────────────────────────────────────────────

  const pkgPath = path.join(targetDir, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')) as Record<string, unknown>
  pkg.name = projectName
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

  // ── Create gitignored runtime folders ────────────────────────────────────

  const runtimeFolders = [
    'auth', 'page-maps', 'snapshots', 'code-context', 'test-results',
  ]
  for (const dir of runtimeFolders) {
    const dirPath = path.join(targetDir, dir)
    fs.mkdirSync(dirPath, { recursive: true })
    fs.writeFileSync(path.join(dirPath, '.gitkeep'), '')
  }

  // ── Init git ─────────────────────────────────────────────────────────────

  execSync('git init', { cwd: targetDir, stdio: 'pipe' })
  execSync('git add .', { cwd: targetDir, stdio: 'pipe' })
  execSync(
    'git commit -m "chore: initial scaffold from qa-starter-kit"',
    { cwd: targetDir, stdio: 'pipe' }
  )
  console.log('🗂️   Git repo initialized with initial commit')

  // ── Print next steps ──────────────────────────────────────────────────────

  console.log('\n╔══════════════════════════════════════════╗')
  console.log('║  ✅  Project created successfully!       ║')
  console.log('╚══════════════════════════════════════════╝\n')
  console.log('═══════════════════════════════════════════')
  console.log('  NEXT STEPS:')
  console.log('═══════════════════════════════════════════\n')
  console.log(`  1.  cd ../${projectName}`)
  console.log('  2.  npm install')
  console.log('  3.  npx playwright install')

  if (agentKey === 'claude-code') {
    console.log('  4.  claude .')
  } else if (agentKey === 'cursor') {
    console.log('  4.  cursor .')
  } else if (agentKey === 'copilot') {
    console.log('  4.  code .')
  } else if (agentKey === 'windsurf') {
    console.log('  4.  Open Windsurf and open the project folder')
  } else {
    console.log('  4.  Open the project folder in your AI agent')
  }

  console.log('  5.  Open prompts/00-quick-start.md')
  console.log('  6.  Copy its contents and paste into your agent')
  console.log('  7.  npm test\n')
  console.log('  ℹ️   Your app URL has been saved to .env')
  console.log('  ℹ️   The starter kit was NOT modified.\n')
}

scaffold().catch(err => {
  console.error('\n❌  Scaffold failed:', err)
  process.exit(1)
})
