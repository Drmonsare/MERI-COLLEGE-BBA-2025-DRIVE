# 🏗️ Architecture & Design Document

## Project Overview

**MERI Student Directory** is a production-ready, full-stack web application for browsing and managing college student records with advanced filtering, search, and data export capabilities.

---

## 🎯 Design Principles

1. **Responsive-First**: Mobile → Tablet → Desktop
2. **Accessibility**: WCAG 2.1 AA compliant
3. **Performance**: < 3s initial load, < 100ms filter response
4. **Maintainability**: Modular components, TypeScript strict mode
5. **Scalability**: Designed for 500+ students, expandable to 10,000+

---

## 🏛️ Architecture Layers

```
┌─────────────────────────────────────────────┐
│         Presentation Layer (React)          │
│  ┌───────────┐  ┌──────────┐  ┌─────────┐  │
│  │ Components│  │  Hooks   │  │ Context │  │
│  └───────────┘  └──────────┘  └─────────┘  │
└─────────────────────────────────────────────┘
                    ↕ HTTP
┌─────────────────────────────────────────────┐
│          API Layer (Express)                │
│  ┌───────────┐  ┌──────────┐  ┌─────────┐  │
│  │  Routes   │  │ Middleware│  │ Validators│ │
│  └───────────┘  └──────────┘  └─────────┘  │
└─────────────────────────────────────────────┘
                    ↕ File I/O
┌─────────────────────────────────────────────┐
│         Data Layer (JSON)                   │
│          students.json (241 records)        │
└─────────────────────────────────────────────┘
```

---

## 📦 Component Hierarchy

```
App.tsx
├── Header
│   ├── Logo
│   ├── ExportButton
│   ├── PrintButton
│   └── AdminButton
├── Hero
│   └── SearchBar (preview)
├── Main Content
│   ├── Filters (Sidebar)
│   │   ├── SearchInput
│   │   ├── GenderFilter
│   │   ├── ShiftFilter
│   │   ├── SortDropdown
│   │   ├── LetterChips
│   │   └── FavouritesToggle
│   ├── ActiveFilters (Chips)
│   ├── ViewToggle (Grid/Table)
│   ├── StudentGrid
│   │   └── StudentCard[]
│   │       ├── Avatar
│   │       ├── StudentInfo
│   │       ├── ShiftBadge
│   │       └── QuickActions
│   ├── TableView
│   │   └── StudentRow[]
│   └── Pagination
│       ├── PageInfo
│       ├── PageSizeSelector
│       └── NavigationButtons
└── AdminPanel (Modal)
    ├── AddStudentForm
    ├── CSVUploader
    └── EditStudentForm
```

---

## 🔄 Data Flow

### 1. Initial Load
```
User opens app
    ↓
main.tsx renders <StudentProvider>
    ↓
StudentContext.fetchStudents()
    ↓
GET /api/students
    ↓
Server reads students.json
    ↓
Response: { students: [...], total: 241 }
    ↓
Context updates state
    ↓
App.tsx re-renders with data
    ↓
StudentCards displayed
```

### 2. Search/Filter Flow
```
User types in search box
    ↓
onChange event → setSearchTerm()
    ↓
useStudentFilters hook computes filtered list
    ↓
useMemo re-runs filtering logic
    ↓
Filtered students passed to StudentGrid
    ↓
Re-render with filtered results (no API call)
```

### 3. Export Flow
```
User clicks "Export CSV"
    ↓
exportToCSV(filteredStudents)
    ↓
Generate CSV string (RFC 4180)
    ↓
Create Blob
    ↓
Trigger download via <a> element
    ↓
Browser downloads file
```

---

## 🗄️ State Management

### Global State (Context API)
```typescript
StudentContext provides:
- students: Student[]          // All students
- loading: boolean             // Loading state
- error: string | null         // Error message
- addStudent()                 // CRUD operations
- updateStudent()
- deleteStudent()
- bulkUpload()
- toggleFavourite()
```

### Local State (Component)
```typescript
App.tsx:
- showAdmin: boolean           // Modal visibility
- viewMode: 'grid' | 'table'   // View toggle

Filters:
- searchTerm: string
- genderFilter: Gender
- shiftFilter: Shift
- sortBy: SortOption
- currentPage: number
- pageSize: number
```

### Persistent State (localStorage)
```typescript
favourites: string[]           // Enrollment numbers
```

---

## 🎨 Styling System

### Tailwind Configuration
```javascript
tailwind.config.cjs
├── colors
│   ├── primary (blue scale)
│   ├── secondary (purple scale)
│   ├── shift1 (blue badges)
│   └── shift2 (pink badges)
├── fonts
│   └── sans: Inter + fallbacks
├── shadows
│   ├── card
│   ├── card-hover
│   └── elevated
└── animations
    ├── fade-in
    ├── slide-up
    └── scale-in
```

### Component Styling Patterns
```typescript
// Base card
"bg-white rounded-lg shadow-card p-6"

// Hover states
"hover:shadow-card-hover transition-shadow duration-200"

// Responsive
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// Print
"no-print"  // Hidden when printing
```

---

## 🔌 API Design

### RESTful Endpoints

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| `GET` | `/api/students` | Get all with filters | `name`, `enrollment`, `gender`, `shift`, `page`, `perPage` |
| `GET` | `/api/students/all` | Get all (no pagination) | - |
| `POST` | `/api/students` | Add new student | - |
| `PUT` | `/api/students/:enrollment` | Update student | - |
| `DELETE` | `/api/students/:enrollment` | Delete student | - |
| `POST` | `/api/students/bulk` | Bulk upload/replace | - |

### Request/Response Examples

**GET /api/students?shift=Shift-1&page=1&perPage=25**
```json
{
  "students": [
    {
      "enrollment": "115101725",
      "name": "Pariket Goel",
      "gender": "Unknown",
      "shift": "Shift-1",
      "favourite": false
    }
  ],
  "total": 180,
  "page": 1,
  "perPage": 25,
  "totalPages": 8
}
```

**POST /api/students**
```json
Request:
{
  "enrollment": "18215101725",
  "name": "New Student",
  "gender": "Male",
  "shift": "Shift-1"
}

Response: 201 Created
{
  "enrollment": "18215101725",
  "name": "New Student",
  "gender": "Male",
  "shift": "Shift-1",
  "favourite": false
}
```

---

## 🔍 Search & Filter Algorithm

### Fuzzy Matching Logic
```typescript
function fuzzyMatch(text: string, query: string): boolean {
  // 1. Exact substring match (fast path)
  if (text.toLowerCase().includes(query.toLowerCase())) {
    return true
  }
  
  // 2. Character-by-character fuzzy match
  // Example: "Pariket" matches "Prkt"
  let queryIndex = 0
  for (const char of text.toLowerCase()) {
    if (char === query[queryIndex].toLowerCase()) {
      queryIndex++
    }
    if (queryIndex === query.length) return true
  }
  return false
}
```

### Filter Combination
```typescript
// Filters are applied in sequence (AND logic)
let results = allStudents

if (searchTerm) {
  results = results.filter(s => 
    fuzzyMatch(s.name, searchTerm) || 
    fuzzyMatch(s.enrollment, searchTerm)
  )
}

if (genderFilter !== 'All') {
  results = results.filter(s => s.gender === genderFilter)
}

if (shiftFilter !== 'All') {
  results = results.filter(s => s.shift === shiftFilter)
}

// ... sort, paginate
```

**Performance:**
- **Best case**: O(n) for exact match
- **Worst case**: O(n * m) where m = query length
- **Typical**: < 10ms for 500 students

---

## 🔒 Security Considerations

### Input Validation
```typescript
// Server-side validation
app.post('/api/students', (req, res) => {
  const { enrollment, name } = req.body
  
  // 1. Required field validation
  if (!enrollment || !name) {
    return res.status(400).json({ error: 'Missing required fields' })
  }
  
  // 2. Type validation
  if (typeof enrollment !== 'string' || typeof name !== 'string') {
    return res.status(400).json({ error: 'Invalid types' })
  }
  
  // 3. Duplicate check
  if (students.find(s => s.enrollment === enrollment)) {
    return res.status(409).json({ error: 'Enrollment exists' })
  }
  
  // ... proceed
})
```

### XSS Prevention
```typescript
// React automatically escapes JSX content
<div>{student.name}</div>  // Safe

// Manual escaping for innerHTML
function escapeHtml(text: string): string {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}
```

### CSV Injection Prevention
```typescript
function escapeCSVField(field: string): string {
  // Escape formula injections (=, +, -, @)
  if (/^[=+\-@]/.test(field)) {
    field = "'" + field
  }
  
  // Escape quotes and commas
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`
  }
  
  return field
}
```

### CORS Configuration
```javascript
// server/index.js
const cors = require('cors')

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://meri-directory.vercel.app'
    : 'http://localhost:3000',
  credentials: true
}))
```

---

## ⚡ Performance Optimizations

### 1. Client-Side
```typescript
// useMemo for expensive computations
const filteredStudents = useMemo(() => {
  return filterAndSortStudents(students, filters)
}, [students, filters])

// React.memo for pure components
export const StudentCard = React.memo(({ student }) => {
  // ...
})

// Lazy loading for admin panel
const AdminPanel = lazy(() => import('./components/AdminPanel'))
```

### 2. Server-Side
```javascript
// In-memory caching (simple implementation)
const cache = new Map()

app.get('/api/students', (req, res) => {
  const cacheKey = JSON.stringify(req.query)
  
  if (cache.has(cacheKey)) {
    return res.json(cache.get(cacheKey))
  }
  
  const result = computeFilteredStudents(req.query)
  cache.set(cacheKey, result)
  
  setTimeout(() => cache.delete(cacheKey), 60000) // 1 min TTL
  
  res.json(result)
})
```

### 3. Bundle Optimization
```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'utils': ['framer-motion', 'lucide-react']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true // Remove console.log in production
      }
    }
  }
})
```

---

## 📊 Data Schema

### Student Object
```typescript
interface Student {
  enrollment: string      // PK, unique, format: \d{9,11}
  name: string           // Required, 1-100 chars
  gender: 'Male' | 'Female' | 'Other' | 'Unknown'
  shift: 'Shift-1' | 'Shift-2'
  favourite?: boolean    // Client-side only, default: false
}
```

### File Format (students.json)
```json
[
  {
    "enrollment": "115101725",
    "name": "Pariket Goel",
    "gender": "Unknown",
    "shift": "Shift-1",
    "favourite": false
  }
]
```

**Constraints:**
- Array of objects
- Each object must have all required fields
- No nested objects (flat structure)
- Total size: ~50KB for 241 students

---

## 🌐 Internationalization (i18n)

### String Externalization
```json
// src/i18n/strings.json
{
  "app": {
    "title": "MERI Student Directory",
    "subtitle": "Browse students by name, enrollment, shift & gender"
  },
  "filters": {
    "search": "Search by name or enrollment no.",
    "gender": "Gender",
    ...
  }
}
```

### Usage
```typescript
import strings from '../i18n/strings.json'

<h1>{strings.app.title}</h1>
<input placeholder={strings.filters.search} />
```

### Future: Multi-Language Support
```typescript
// i18n/en.json
{ "app.title": "MERI Student Directory" }

// i18n/hi.json
{ "app.title": "MERI छात्र निर्देशिका" }

// Use react-i18next for dynamic switching
```

---

## 🧪 Testing Strategy

### Unit Tests (Vitest)
```typescript
// tests/searchHelpers.test.ts
describe('fuzzyMatch', () => {
  it('matches exact strings', () => {
    expect(fuzzyMatch('Pariket Goel', 'Pariket')).toBe(true)
  })
})
```

### Component Tests (React Testing Library)
```typescript
// tests/StudentCard.test.tsx
import { render, screen } from '@testing-library/react'

test('renders student name', () => {
  render(<StudentCard student={mockStudent} />)
  expect(screen.getByText('Pariket Goel')).toBeInTheDocument()
})
```

### Integration Tests
```typescript
test('filtering updates results', async () => {
  render(<App />)
  
  const genderFilter = screen.getByRole('button', { name: 'Boys' })
  fireEvent.click(genderFilter)
  
  await waitFor(() => {
    expect(screen.queryByText('Female Student')).not.toBeInTheDocument()
  })
})
```

### E2E Tests (Future: Playwright)
```typescript
test('complete user journey', async ({ page }) => {
  await page.goto('http://localhost:3000')
  await page.fill('[placeholder="Search..."]', 'Pariket')
  await page.click('text=Export CSV')
  await expect(page.locator('text=CSV exported')).toBeVisible()
})
```

---

## 🚀 Deployment Architecture

### Development
```
Developer Machine
├── Frontend: Vite Dev Server (localhost:3000)
└── Backend: Node/Express (localhost:5000)
```

### Production
```
                    ┌──────────────┐
                    │   Cloudflare │
                    │   (CDN/DNS)  │
                    └──────┬───────┘
                           │
            ┌──────────────┴───────────────┐
            │                              │
    ┌───────▼────────┐          ┌─────────▼────────┐
    │  Vercel/Netlify│          │  Heroku/Railway  │
    │   (Frontend)   │          │   (Backend API)  │
    │  React SPA     │◄────────►│   Express.js     │
    └────────────────┘   HTTPS  └──────────────────┘
                                         │
                                 ┌───────▼────────┐
                                 │  PostgreSQL    │
                                 │  (Future DB)   │
                                 └────────────────┘
```

---

## 📈 Scalability Roadmap

### Current: 241 Students ✅
- In-memory JSON
- Client-side filtering
- No backend database

### Phase 1: 500-1,000 Students
- Keep JSON approach
- Add server-side filtering
- Implement pagination API

### Phase 2: 1,000-10,000 Students
- Migrate to PostgreSQL/MongoDB
- Add full-text search index
- Implement caching (Redis)
- Add CDN for static assets

### Phase 3: 10,000+ Students
- Database sharding
- ElasticSearch for search
- Microservices architecture
- Load balancing

---

## 🛠️ Development Workflow

```
1. Local Development
   npm run dev:all
   ↓
2. Make Changes
   Edit files → Auto-reload
   ↓
3. Run Tests
   npm test
   ↓
4. Lint & Format
   npm run lint
   npm run format
   ↓
5. Build
   npm run build
   ↓
6. Deploy
   Push to Git → Auto-deploy
```

---

## 📚 Technology Justifications

| Technology | Why Chosen |
|------------|-----------|
| **React** | Component reusability, large ecosystem, virtual DOM performance |
| **TypeScript** | Type safety, better IDE support, fewer runtime errors |
| **Tailwind CSS** | Rapid development, consistent design, small bundle size |
| **Vite** | Fast HMR, modern build tool, better DX than CRA |
| **Express** | Lightweight, flexible, perfect for mock APIs |
| **Framer Motion** | Production-ready animations, declarative API |
| **Vitest** | Fast, Vite-native, Jest-compatible API |

---

**Document Version:** 1.0  
**Last Updated:** December 3, 2025  
**Maintainer:** MERI Development Team
