# 📦 Installation & Setup Guide

## Prerequisites Check

Before starting, ensure you have:

```powershell
# Check Node.js version (must be 18+)
node --version
# Expected: v18.x.x or higher

# Check npm version (must be 8+)
npm --version
# Expected: 8.x.x or higher

# Check git (optional, for version control)
git --version
```

If Node.js is not installed or version is < 18:
- Download from: https://nodejs.org/ (LTS version recommended)
- Install and restart your terminal

---

## 🚀 Quick Installation (Recommended)

### Step 1: Navigate to Project
```powershell
cd "C:\Users\Administrator\Downloads\Enroll Web\meri-student-directory"
```

### Step 2: Install All Dependencies
```powershell
npm install
```

**Expected output:**
```
added 450 packages, and audited 451 packages in 45s

123 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

**Time:** ~1-2 minutes (depending on internet speed)

### Step 3: Verify Installation
```powershell
# Check if all packages installed correctly
npm list --depth=0
```

Should show major packages like:
- react@18.2.0
- typescript@5.2.2
- vite@5.0.8
- express@4.18.2

---

## ▶️ Running the Application

### Option 1: Run Everything Together (Recommended)
```powershell
npm run dev:all
```

This starts:
- ✅ Backend server on http://localhost:5000
- ✅ Frontend dev server on http://localhost:3000

**Expected output:**
```
> meri-student-directory@1.0.0 dev:all
> concurrently "npm run server" "npm run dev"

[0] 
[0] > meri-student-directory@1.0.0 server
[0] > node server/index.js
[0] 
[0] ✅ Server running on http://localhost:5000
[0] 📊 Loaded 241 students
[1] 
[1] > meri-student-directory@1.0.0 dev
[1] > vite
[1] 
[1]   VITE v5.0.8  ready in 523 ms
[1] 
[1]   ➜  Local:   http://localhost:3000/
[1]   ➜  Network: use --host to expose
```

### Option 2: Run Separately

**Terminal 1 (Backend):**
```powershell
npm run server
```

**Terminal 2 (Frontend):**
```powershell
npm run dev
```

---

## 🌐 Accessing the Application

### Frontend
Open browser and navigate to:
```
http://localhost:3000
```

You should see:
- ✅ MERI College logo
- ✅ "MERI Student Directory" header
- ✅ Student cards displayed
- ✅ Filters panel on the left

### Backend API
Test API in browser or using curl:
```powershell
# Get all students
curl http://localhost:5000/api/students/all

# Get with pagination
curl http://localhost:5000/api/students?page=1&perPage=10

# Get Shift-1 students only
curl "http://localhost:5000/api/students?shift=Shift-1"
```

---

## 🧪 Running Tests

```powershell
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm test -- --watch
```

**Expected output:**
```
 ✓ tests/searchHelpers.test.ts (15)
   ✓ searchHelpers (15)
     ✓ fuzzyMatch (6)
     ✓ searchStudents (5)
     ✓ getInitials (4)

 Test Files  1 passed (1)
      Tests  15 passed (15)
   Start at  10:30:45
   Duration  234ms
```

---

## 🏗️ Building for Production

```powershell
# Create production build
npm run build
```

**Expected output:**
```
vite v5.0.8 building for production...
✓ 234 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.30 kB
dist/assets/index-a1b2c3d4.css    12.34 kB │ gzip:  3.45 kB
dist/assets/index-e5f6g7h8.js     156.78 kB │ gzip: 52.34 kB

✓ built in 3.45s
```

**Output folder:** `dist/`

### Test Production Build Locally
```powershell
npm run preview
```

Opens production build at: http://localhost:4173

---

## 🐛 Troubleshooting Installation Issues

### Issue 1: "Cannot find module 'react'"

**Cause:** Dependencies not installed properly

**Solution:**
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Issue 2: Port 3000 or 5000 Already in Use

**Solution (Port 3000):**
```powershell
# Find and kill process on port 3000
$processId = (Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue).OwningProcess
if ($processId) { Stop-Process -Id $processId -Force }
```

**Solution (Port 5000):**
```powershell
# Find and kill process on port 5000
$processId = (Get-NetTCPConnection -LocalPort 5000 -ErrorAction SilentlyContinue).OwningProcess
if ($processId) { Stop-Process -Id $processId -Force }
```

**Alternative:** Change ports in configuration files:
- Frontend: `vite.config.ts` → Change `port: 3000` to `port: 3001`
- Backend: `server/index.js` → Change `const PORT = 5000` to `const PORT = 5001`

### Issue 3: "ERR_PNPM_LOCKFILE_VERSION_MISMATCH"

**Cause:** Using pnpm instead of npm

**Solution:**
```powershell
# Use npm instead
npm install
```

### Issue 4: Slow Installation

**Solution:**
```powershell
# Use faster npm registry
npm config set registry https://registry.npmjs.org/
npm install --verbose
```

### Issue 5: TypeScript Errors in IDE

**Cause:** VS Code not recognizing types

**Solution:**
```powershell
# Reload VS Code window
# Press: Ctrl+Shift+P → Type "Reload Window" → Enter

# Or restart TypeScript server
# Press: Ctrl+Shift+P → Type "TypeScript: Restart TS Server" → Enter
```

### Issue 6: "Cannot GET /"

**Cause:** Vite dev server not started

**Solution:**
```powershell
# Make sure frontend is running
npm run dev
```

### Issue 7: API Not Responding

**Cause:** Backend server not started

**Solution:**
```powershell
# Make sure backend is running
npm run server

# Verify:
curl http://localhost:5000/api/students/all
```

---

## 📁 Verify File Structure

After installation, your project should look like:

```
meri-student-directory/
├── node_modules/           ✅ (installed)
├── server/
│   ├── data/
│   │   └── students.json   ✅ (241 students)
│   └── index.js            ✅
├── src/
│   ├── components/         ✅
│   ├── context/            ✅
│   ├── types/              ✅
│   ├── utils/              ✅
│   ├── i18n/               ✅
│   ├── App.tsx             ✅
│   ├── main.tsx            ✅
│   └── index.css           ✅
├── tests/                  ✅
├── index.html              ✅
├── package.json            ✅
├── package-lock.json       ✅ (created after npm install)
├── vite.config.ts          ✅
├── tsconfig.json           ✅
├── tailwind.config.cjs     ✅
├── .eslintrc.cjs           ✅
├── .prettierrc             ✅
├── .gitignore              ✅
├── README.md               ✅
├── QUICK_START.md          ✅
├── ARCHITECTURE.md         ✅
└── PROJECT_SUMMARY.md      ✅
```

**Check command:**
```powershell
# List all important files
Get-ChildItem -Recurse -Include package.json,vite.config.ts,students.json | Select-Object FullName
```

---

## 🔄 Updating Dependencies (Future)

```powershell
# Check for outdated packages
npm outdated

# Update all dependencies to latest (use with caution)
npm update

# Update specific package
npm install react@latest

# Audit for security vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix
```

---

## 🗑️ Uninstalling / Cleaning

### Remove node_modules (Clean Slate)
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
```

### Complete Uninstall
```powershell
# Delete entire project folder
Remove-Item -Recurse -Force "C:\Users\Administrator\Downloads\Enroll Web\meri-student-directory"
```

---

## 📊 Installation Verification Checklist

After installation, verify:

| Check | Command | Expected Result |
|-------|---------|-----------------|
| ✅ Node.js installed | `node --version` | v18.x.x or higher |
| ✅ npm installed | `npm --version` | 8.x.x or higher |
| ✅ Dependencies installed | `Test-Path node_modules` | True |
| ✅ Backend runs | `npm run server` | Server on port 5000 |
| ✅ Frontend runs | `npm run dev` | Vite on port 3000 |
| ✅ Tests pass | `npm test` | All tests pass |
| ✅ Build works | `npm run build` | dist/ folder created |

**Quick verification script:**
```powershell
# Copy and paste this entire block
Write-Host "Verifying installation..." -ForegroundColor Cyan

$checks = @(
    @{ Name = "Node.js"; Command = "node --version"; Expected = "v18" },
    @{ Name = "npm"; Command = "npm --version"; Expected = "8" },
    @{ Name = "node_modules"; Command = "Test-Path node_modules"; Expected = "True" },
    @{ Name = "students.json"; Command = "Test-Path server/data/students.json"; Expected = "True" }
)

foreach ($check in $checks) {
    $result = Invoke-Expression $check.Command
    $status = if ($result -like "*$($check.Expected)*" -or $result -eq $true) { "✅ PASS" } else { "❌ FAIL" }
    Write-Host "$($check.Name): $status ($result)" -ForegroundColor $(if ($status -like "*PASS*") { "Green" } else { "Red" })
}

Write-Host "`nInstallation check complete!" -ForegroundColor Cyan
```

---

## 🎓 Next Steps After Installation

1. **Read Documentation**
   ```powershell
   # Open in browser
   start README.md
   start QUICK_START.md
   ```

2. **Start Development**
   ```powershell
   npm run dev:all
   ```

3. **Explore the Code**
   - Open `src/App.tsx` to see main component
   - Check `server/index.js` for API logic
   - Review `tests/` for test examples

4. **Customize**
   - Edit `src/i18n/strings.json` to change UI text
   - Modify `tailwind.config.cjs` to adjust colors
   - Update `server/data/students.json` to add/remove students

---

## 📞 Support

If installation fails:
1. Check Node.js version (must be 18+)
2. Try clean install: `Remove-Item -Recurse -Force node_modules; npm install`
3. Check internet connection (npm needs to download packages)
4. Review error messages carefully
5. Consult `QUICK_START.md` for troubleshooting

---

## ✅ Installation Complete!

**You're ready when you see:**
```
✅ Server running on http://localhost:5000
📊 Loaded 241 students

VITE v5.0.8  ready in 523 ms
➜  Local:   http://localhost:3000/
```

**Open http://localhost:3000 in your browser and start exploring!**

---

**Installation Guide Version:** 1.0  
**Last Updated:** December 3, 2025  
**Estimated Time:** 5 minutes
