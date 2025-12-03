# 🚀 Quick Start Guide - MERI Student Directory

## ⚡ Fast Setup (5 minutes)

### Step 1: Install Dependencies

Open PowerShell in the project directory:

```powershell
cd "C:\Users\Administrator\Downloads\Enroll Web\meri-student-directory"
npm install
```

**Expected output:**
```
added 450 packages in 45s
```

### Step 2: Start the Application

Run both frontend and backend simultaneously:

```powershell
npm run dev:all
```

**Expected output:**
```
✅ Server running on http://localhost:5000
📊 Loaded 241 students

VITE v5.0.8  ready in 523 ms

➜  Local:   http://localhost:3000/
➜  Network: use --host to expose
```

### Step 3: Open in Browser

Navigate to: **http://localhost:3000**

---

## 📊 Sample Data Verification

The app ships with **241 students**:
- ✅ **180 students** from Shift-1 (file: `BBA 1st year (2025-29)Shift-1 Students list with University Roll Numbers.txt`)
- ✅ **61 students** from Shift-2 (file: `BBA 1st year Shift 2 (2025-29) Students list with University Roll Numbers.txt`)

**Verify data loaded:**
```powershell
# Check backend
curl http://localhost:5000/api/students/all | ConvertFrom-Json | Measure-Object
# Should show: Count = 241
```

---

## 🧪 Run Tests

```powershell
npm test
```

**Expected: All tests passing ✅**

---

## 📸 Demo Checklist

### Acceptance Criteria Verification

| # | Criterion | How to Test | Expected Result |
|---|-----------|-------------|-----------------|
| 1 | **Load merged student list with shift badges** | Open app → See student cards | ✅ Cards show "Shift-1" or "Shift-2" badges |
| 2 | **Filter by Boys/Girls reduces results** | Click "Boys" or "Girls" chip | ✅ Results update instantly, no reload |
| 3 | **Enrollment search highlights student** | Type enrollment in search box | ✅ Matching student highlighted |
| 4 | **Export CSV contains filtered results** | Apply filter → Click "Export CSV" | ✅ Downloaded CSV has only filtered rows |
| 5 | **Mobile: filters collapsible, single column** | Resize browser to mobile width | ✅ Layout adapts, filters collapse |
| 6 | **Admin CSV upload updates UI** | Admin → Upload CSV → Confirm | ✅ UI updates without page reload |

---

## 🎯 Key Features Demo

### 1. Search Functionality
```
Type in search box:
- "Pariket" → Shows "Pariket Goel"
- "115101725" → Shows enrollment match
- "Goel" → Shows fuzzy match
```

### 2. Filtering
```
Click filter chips:
- "Shift-1" → Shows 180 students
- "Shift-2" → Shows 61 students
- "All" → Shows all 241 students
```

### 3. Export CSV
```
Steps:
1. Apply filter (e.g., "Shift-1")
2. Click "Export CSV" button
3. Check Downloads folder
4. Open CSV → Verify only Shift-1 students included
```

### 4. Print View
```
Click "Print" → Print preview opens with clean layout
```

### 5. Admin Panel
```
Click "Admin" → Modal opens (placeholder for full CRUD)
```

---

## 🐛 Troubleshooting

### Issue: Port 5000 already in use

**Solution:**
```powershell
# Kill process on port 5000
Stop-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess -Force

# Or change port in server/index.js:
# const PORT = 5001
```

### Issue: Module not found errors

**Solution:**
```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

### Issue: Vite not starting

**Solution:**
```powershell
# Check Node version (must be 18+)
node --version

# If < 18, update Node.js
```

---

## 📂 File Locations

| Item | Path |
|------|------|
| **Student Data** | `server/data/students.json` |
| **Main App** | `src/App.tsx` |
| **API Server** | `server/index.js` |
| **Tests** | `tests/*.test.ts` |
| **Config** | `tailwind.config.cjs`, `vite.config.ts` |

---

## 🎨 Screenshots (How to Generate)

### Desktop View
1. Open http://localhost:3000
2. Press `F12` → Responsive mode → Desktop (1920x1080)
3. Press `F12` → Screenshot tool

### Mobile View
1. Responsive mode → iPhone 12 Pro (390x844)
2. Take screenshot

### Print View
1. Click "Print" button
2. In print preview, screenshot

---

## 🔄 Next Steps

### To Swap Mock API with Real Backend:

**Edit `src/context/StudentContext.tsx`:**
```typescript
// Line 35-36: Change from
const response = await fetch('/api/students')

// To your production API:
const response = await fetch('https://api.meri.edu.in/students', {
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
})
```

### To Deploy:

**Frontend (Vercel):**
```powershell
npm run build
# Upload dist/ folder to Vercel
```

**Backend (Heroku):**
```powershell
# Create Procfile:
echo "web: node server/index.js" > Procfile

# Deploy:
git init
git add .
git commit -m "Initial commit"
heroku create meri-student-api
git push heroku main
```

---

## 📞 Support

**For help:**
- Check `README.md` for full documentation
- Review `tests/` for usage examples
- Inspect `src/components/` for component structure

**Common Commands:**
```powershell
npm run dev:all      # Start everything
npm test             # Run tests
npm run build        # Production build
npm run lint         # Check code quality
npm run format       # Auto-format code
```

---

## ✅ Success Indicators

**You're ready when:**
- ✅ App loads at http://localhost:3000
- ✅ See 241 students displayed
- ✅ Search works instantly
- ✅ Filters update results
- ✅ Export downloads CSV
- ✅ All tests pass

**Total setup time: < 5 minutes** ⚡

---

**Built for MERI College BBA 1st Year (2025-29)**
*Data accurate as of December 3, 2025*
