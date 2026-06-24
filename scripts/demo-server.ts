import * as http from 'http'
import * as fs from 'fs'
import * as path from 'path'

const PORT = process.env.PORT || 3000

// Helper to determine the mime type (though demo is self-contained, good for robustness)
function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case '.html': return 'text/html'
    case '.js': return 'application/javascript'
    case '.css': return 'text/css'
    case '.json': return 'application/json'
    case '.png': return 'image/png'
    case '.jpg': return 'image/jpeg'
    default: return 'text/plain'
  }
}

const server = http.createServer((req, res) => {
  // Safe URL routing
  const urlPath = req.url?.split('?')[0] || '/'
  
  // Resolve base directory depending on where it is executed (root vs scaffolded)
  // Check if we are inside the template/ dir or in the scaffolded project root
  let baseDir = path.resolve(__dirname, '..')
  
  // If we are running in the root dev kit, look inside the template folder
  if (!fs.existsSync(path.join(baseDir, 'demo-app', 'index.html')) && 
      fs.existsSync(path.join(baseDir, 'template', 'demo-app', 'index.html'))) {
    baseDir = path.join(baseDir, 'template')
  }

  // If the request points to a potential static file with an extension, try to serve it.
  // Otherwise, fallback to demo-app/index.html to let the SPA client router handle it.
  const hasExtension = path.extname(urlPath) !== ''
  let targetFile = path.join(baseDir, 'demo-app', 'index.html')

  if (hasExtension) {
    targetFile = path.join(baseDir, urlPath)
  }

  fs.stat(targetFile, (err, stats) => {
    if (err || !stats.isFile()) {
      // For any routing paths (e.g. /login, /dashboard), serve the SPA main index.html
      const fallbackIndex = path.join(baseDir, 'demo-app', 'index.html')
      fs.readFile(fallbackIndex, 'utf-8', (readErr, content) => {
        if (readErr) {
          res.writeHead(500, { 'Content-Type': 'text/plain' })
          res.end('Error loading QA Demo Application Sandbox.')
          return
        }
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(content)
      })
      return
    }

    // Serve the exact requested file
    fs.readFile(targetFile, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' })
        res.end('Error reading file')
        return
      }
      res.writeHead(200, { 'Content-Type': getContentType(targetFile) })
      res.end(content)
    })
  })
})

server.listen(Number(PORT), () => {
  console.log('╔══════════════════════════════════════════════════════════╗')
  console.log(`║   🚀  QA Demo Application Sandbox started on port ${PORT}   ║`)
  console.log(`║   👉  Open http://localhost:${PORT} in your browser           ║`)
  console.log('╚══════════════════════════════════════════════════════════╝\n')
})
