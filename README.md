# MERI Student Directory

A modern, production-ready web application for browsing and managing college student records. Built with React, TypeScript, Tailwind CSS, and Express.

![MERI Student Directory](https://img.shields.io/badge/React-18.2-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue) ![Tailwind](https://img.shields.io/badge/TailwindCSS-3.3-blue)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Testing](#testing)
- [Importing CSV Data](#importing-csv-data)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Accessibility](#accessibility)
- [License](#license)

## ✨ Features

### Core Features
- **Responsive Design**: Mobile-first, works on desktop, tablet, and mobile
- **Advanced Search**: Full-text search with fuzzy matching and highlighting
- **Multi-Filter System**: Filter by gender, shift, enrollment, and initial letter
- **Dual View Modes**: Grid (cards) and Table views
- **Pagination**: Configurable page sizes (10/25/50) with navigation
- **Favorites**: Mark students as favorites (persisted in localStorage)
- **Export**: Export filtered results to RFC-4180 compliant CSV
- **Print**: Print-friendly view for physical records
- **Admin Panel**: Add, edit, delete students, and bulk CSV upload

### UI/UX Features
- **Illustrative Design**: Color-coded cards with auto-generated avatars
- **Animations**: Smooth transitions powered by Framer Motion
- **Accessibility**: ARIA roles, keyboard navigation, semantic HTML
- **Active Filters**: Visual chips showing applied filters
- **Real-time Updates**: Instant filtering without page reloads

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18 + TypeScript |
| **Styling** | Tailwind CSS 3 |
| **Icons** | lucide-react |
| **Animations** | Framer Motion |
| **Build Tool** | Vite |
| **Backend** | Express.js (Mock API) |
| **Testing** | Vitest + React Testing Library |
| **Linting** | ESLint + Prettier |

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** 8+
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```powershell
# Clone or extract the project
cd meri-student-directory

# Install dependencies
npm install

# Start development (runs both frontend and backend)
npm run dev:all
```

**Alternative: Run separately**

```powershell
# Terminal 1: Start backend server
npm run server

# Terminal 2: Start frontend
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api/students

## 📁 Project Structure

```
meri-student-directory/
├── public/                 # Static assets
├── server/                 # Express backend
│   ├── index.js           # API server
│   └── data/
│       └── students.json  # Student data (241 students)
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Filters.tsx
│   │   ├── StudentCard.tsx
│   │   ├── TableView.tsx
│   │   ├── Pagination.tsx
│   │   ├── ActiveFilters.tsx
│   │   ├── AdminPanel.tsx
│   │   └── ExportButton.tsx
│   ├── context/
│   │   └── StudentContext.tsx  # Global state management
│   ├── hooks/
│   │   └── useStudentFilters.ts
│   ├── types/
│   │   └── student.ts          # TypeScript definitions
│   ├── utils/
│   │   ├── csvExport.ts        # CSV export logic
│   │   ├── dataImport.ts       # CSV import logic
│   │   └── searchHelpers.ts    # Search & filter utilities
│   ├── i18n/
│   │   └── strings.json        # UI strings (i18n ready)
│   ├── App.tsx                 # Main app component
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles
├── tests/                      # Unit tests
│   ├── Filters.test.tsx
│   ├── StudentCard.test.tsx
│   └── searchHelpers.test.ts
├── package.json
├── vite.config.ts
├── tailwind.config.cjs
├── tsconfig.json
└── README.md
```

## 📖 Usage

### Searching Students

1. Use the **search bar** in the filters panel
2. Type name or enrollment number
3. Results update in real-time with **highlighted matches**

### Filtering

**By Gender:**
- Click "All", "Boys", "Girls", "Other", or "Unknown" chips

**By Shift:**
- Select "All", "Shift-1", or "Shift-2"

**By Initial Letter:**
- Click letter chips (A-Z) for quick filtering

**Exact Enrollment Lookup:**
- Enter full enrollment number to jump to specific student

### Sorting

- **Name (A→Z / Z→A)**
- **Enrollment (Low to High / High to Low)**
- **By Shift**

### Viewing Students

**Grid View (Default):**
- Illustrative cards with avatars
- Hover for elevation effect
- Quick actions: View Profile, Message, Add to Favorites

**Table View:**
- Compact tabular layout
- Sortable columns
- Better for printing

### Exporting Data

1. Apply desired filters
2. Click **"Export CSV"** in header
3. Downloads `students.csv` with **only filtered results**

### Printing

1. Click **"Print"** button
2. Print preview opens with clean layout
3. Decorative elements hidden automatically

### Admin Panel

**Add New Student:**
1. Click "Admin" → "Add New Student"
2. Fill form (enrollment, name, gender, shift)
3. Form validates required fields

**Edit Student:**
1. Click edit icon on student card
2. Modify fields
3. Click "Save"

**Delete Student:**
1. Click delete icon
2. Confirm deletion

**Bulk CSV Upload:**
1. Click "Admin" → "Upload CSV"
2. Select CSV file (must have `enrollment` and `name` columns)
3. Review errors (if any)
4. Confirm upload

## 🧪 Testing

### Run Tests

```powershell
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm test -- --watch
```

### Test Coverage

The project includes unit tests for:
- ✅ **Search functionality** (exact & fuzzy matching)
- ✅ **Filter logic** (gender, shift, enrollment)
- ✅ **CSV export** (RFC-4180 compliance)
- ✅ **Student card rendering**

### Acceptance Criteria Results

| # | Criterion | Status |
|---|-----------|--------|
| 1 | Load page displays merged student list with shift badges | ✅ PASS |
| 2 | Filtering by Boys/Girls reduces results immediately | ✅ PASS |
| 3 | Enrollment search highlights matching student | ✅ PASS |
| 4 | Export CSV contains only filtered results | ✅ PASS |
| 5 | Mobile layout: filters collapsible, single column | ✅ PASS |
| 6 | Admin CSV upload updates UI without reload | ✅ PASS |

## 📥 Importing CSV Data

### Data Source

The application ships with **241 students** merged from:
- **BBA 1st year (2025-29) Shift-1**: 180 students
- **BBA 1st year Shift-2 (2025-29)**: 61 students

All students have `gender: "Unknown"` for privacy/ethics. The admin panel allows manual updates.

### CSV Format Requirements

Your CSV must include these columns (case-insensitive):
- `enrollment` or `enrollment no` (required)
- `name` (required)
- `gender` (optional: Male/Female/Other/Unknown)
- `shift` (optional: Shift-1/Shift-2)

**Example CSV:**

```csv
Enrollment No,Name,Gender,Shift
115101725,Pariket Goel,Male,Shift-1
215101725,Kakul,Female,Shift-1
```

### Import via Admin Panel

1. Prepare CSV file following format above
2. Click **Admin** → **Upload CSV**
3. Select file
4. Review validation errors (if any)
5. Confirm import

**Validation:**
- Missing required columns → Error
- Malformed rows → Warning (skipped)
- Duplicate enrollments → Error

### Import via API

```bash
curl -X POST http://localhost:5000/api/students/bulk \
  -H "Content-Type: application/json" \
  -d @students.json
```

### Swap Mock API with Real Backend

Replace API calls in `src/context/StudentContext.tsx`:

```typescript
// Change this:
const response = await fetch('/api/students')

// To your real API:
const response = await fetch('https://your-api.com/students')
```

Update CORS settings in your backend to allow requests from your frontend domain.

## 🌐 Deployment

### Build for Production

```powershell
npm run build
```

This creates an optimized build in the `dist/` folder.

### Deploy Frontend

**Vercel / Netlify:**
1. Connect your Git repository
2. Set build command: `npm run build`
3. Set output directory: `dist`

**Static Hosting:**
```powershell
# Build and copy dist/ contents to your web server
npm run build
Copy-Item -Recurse -Force dist\* C:\inetpub\wwwroot\
```

### Deploy Backend

**Heroku / Railway:**
1. Add `Procfile`:
   ```
   web: node server/index.js
   ```
2. Set environment variable: `PORT`
3. Deploy from Git

**Docker:**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY server ./server
EXPOSE 5000
CMD ["node", "server/index.js"]
```

### Environment Variables

Create `.env` for production:

```env
VITE_API_URL=https://your-api.com
PORT=5000
NODE_ENV=production
```

## 📚 API Documentation

### Endpoints

#### `GET /api/students`

Get all students with optional filters and pagination.

**Query Parameters:**
- `name` (string): Filter by name (partial match)
- `enrollment` (string): Filter by enrollment
- `gender` (string): Filter by gender (Male/Female/Other/Unknown/All)
- `shift` (string): Filter by shift (Shift-1/Shift-2/All)
- `page` (number): Page number (default: 1)
- `perPage` (number): Items per page (default: 25)

**Response:**
```json
{
  "students": [...],
  "total": 241,
  "page": 1,
  "perPage": 25,
  "totalPages": 10
}
```

#### `POST /api/students`

Add a new student.

**Request Body:**
```json
{
  "enrollment": "18215101725",
  "name": "New Student",
  "gender": "Male",
  "shift": "Shift-1"
}
```

#### `PUT /api/students/:enrollment`

Update a student.

#### `DELETE /api/students/:enrollment`

Delete a student.

#### `POST /api/students/bulk`

Bulk upload students (replaces all data).

**Request Body:**
```json
[
  { "enrollment": "...", "name": "...", "gender": "...", "shift": "..." },
  ...
]
```

## ♿ Accessibility

### Features

- ✅ **Semantic HTML**: `<header>`, `<main>`, `<nav>`, `<section>`
- ✅ **ARIA Roles**: `role="search"`, `role="list"`, `role="button"`
- ✅ **Keyboard Navigation**: Tab, Enter, Escape, Arrow keys
- ✅ **Focus Indicators**: Visible outlines on focused elements
- ✅ **Alt Text**: All images have descriptive alt attributes
- ✅ **Color Contrast**: WCAG AA compliant (4.5:1 minimum)
- ✅ **Screen Reader Support**: Labels, descriptions, and live regions

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Navigate through interactive elements |
| `Enter` | Activate buttons/links |
| `Escape` | Close modals |
| `Arrow Keys` | Navigate pagination |
| `Ctrl+F` | Browser find (search) |

## 🎨 Style Guide

### Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary | `#0066CC` | Main actions, links |
| Secondary | `#8B5CF6` | Accents, highlights |
| Shift-1 | `#3B82F6` | Shift-1 badges |
| Shift-2 | `#EC4899` | Shift-2 badges |

### Typography

- **Font Family**: Inter (Google Fonts)
- **Headings**: 600-700 weight
- **Body**: 400 weight
- **Small Text**: 300 weight

### Icons

| Icon | Component | Usage |
|------|-----------|-------|
| `Search` | lucide-react | Search bar |
| `Filter` | lucide-react | Filter panel |
| `User` | lucide-react | Student profile |
| `FileText` | lucide-react | Export CSV |
| `Printer` | lucide-react | Print |
| `Settings` | lucide-react | Admin panel |
| `Heart` | lucide-react | Favorites |
| `Mail` | lucide-react | Message |

## 🔧 Development

### Code Formatting

```powershell
# Format all files
npm run format

# Lint code
npm run lint
```

### Environment Setup

**VSCode Extensions (recommended):**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript + JavaScript

### Adding New Features

1. **Create component** in `src/components/`
2. **Add types** in `src/types/` if needed
3. **Write tests** in `tests/`
4. **Update README** with new feature

## 📝 License

MIT License - feel free to use for educational or commercial purposes.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request


---

**Built with ❤️ for MERI College**

*Data Sources:*
- BBA 1st year (2025-29) Shift-1 Students list with University Roll Numbers
- BBA 1st year Shift-2 (2025-29) Students list with University Roll Numbers
