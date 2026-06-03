import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const SRC_DIR = path.join(__dirname, '../frontend/src_vite')
const APP_DIR = path.join(__dirname, '../frontend/app')

// Helper to walk dir
function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f)
    let isDirectory = fs.statSync(dirPath).isDirectory()
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f))
  })
}

// Ensure dir exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

// Convert react-router-dom imports to next
function convertCode(code) {
  let newCode = code.replace(/import\s+\{\s*([^}]*)\s*\}\s+from\s+['"]react-router-dom['"]/g, (match, imports) => {
    let nextImports = []
    let nextNavImports = []
    
    if (imports.includes('Link')) nextImports.push('Link')
    if (imports.includes('useNavigate')) nextNavImports.push('useRouter as useNavigate')
    if (imports.includes('useLocation')) nextNavImports.push('usePathname as useLocation')
    if (imports.includes('useParams')) nextNavImports.push('useParams')
    
    let result = ''
    if (nextImports.length > 0) result += `import Link from 'next/link'\n`
    if (nextNavImports.length > 0) result += `import { ${nextNavImports.join(', ')} } from 'next/navigation'\n`
    
    return result
  })

  // replace to= with href= in Link
  newCode = newCode.replace(/<Link([^>]*)\bto=/g, '<Link$1href=')
  
  // App router is server components by default, but these are client components 
  // because they use hooks. Let's add "use client" if there are hooks.
  if (/(useState|useEffect|useRef|useNavigate|useLocation|useParams|useScroll|useTransform|motion)/.test(newCode)) {
    if (!newCode.startsWith('"use client"')) {
      newCode = '"use client";\n' + newCode
    }
  }

  return newCode
}

// 1. Move components
const componentsDir = path.join(__dirname, '../frontend/components')
ensureDir(componentsDir)

const srcComponents = path.join(SRC_DIR, 'components')
if (fs.existsSync(srcComponents)) {
  walkDir(srcComponents, (filePath) => {
    if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
      let relativePath = path.relative(srcComponents, filePath)
      let destPath = path.join(componentsDir, relativePath)
      ensureDir(path.dirname(destPath))
      
      let code = fs.readFileSync(filePath, 'utf-8')
      code = convertCode(code)
      // Fix imports from '../../something' to '@/something' maybe? 
      // For now, let's keep relative or rewrite to '@/...'
      code = code.replace(/\.\.\/\.\.\//g, '@/').replace(/\.\.\//g, '@/')
      
      fs.writeFileSync(destPath, code)
    }
  })
}

// 2. Move data, hooks, store, utils, animations
const dirs = ['data', 'hooks', 'store', 'utils', 'animations']
dirs.forEach(d => {
  const srcD = path.join(SRC_DIR, d)
  const destD = path.join(__dirname, '../frontend', d)
  if (fs.existsSync(srcD)) {
    walkDir(srcD, (filePath) => {
      let relativePath = path.relative(srcD, filePath)
      let destPath = path.join(destD, relativePath)
      ensureDir(path.dirname(destPath))
      let code = fs.readFileSync(filePath, 'utf-8')
      code = convertCode(code)
      code = code.replace(/\.\.\/\.\.\//g, '@/').replace(/\.\.\//g, '@/')
      fs.writeFileSync(destPath, code)
    })
  }
})

// 3. Move Pages to app/
const pagesDir = path.join(SRC_DIR, 'pages')
if (fs.existsSync(pagesDir)) {
  const files = fs.readdirSync(pagesDir)
  files.forEach(f => {
    if (f.endsWith('.jsx')) {
      let name = f.replace('.jsx', '')
      let routePath = ''
      if (name === 'Home') routePath = '/'
      else if (name === 'DestinationDetail') routePath = '/destinations/[id]'
      else routePath = `/${name.toLowerCase()}`

      let destDir = path.join(APP_DIR, routePath)
      if (name === 'Home') destDir = APP_DIR
      if (name === 'DestinationDetail') destDir = path.join(APP_DIR, 'destinations', '[id]')

      ensureDir(destDir)
      
      let code = fs.readFileSync(path.join(pagesDir, f), 'utf-8')
      code = convertCode(code)
      code = code.replace(/\.\.\//g, '@/') // Fix imports
      
      fs.writeFileSync(path.join(destDir, 'page.jsx'), code)
    }
  })
}

console.log("Migration script complete.")
