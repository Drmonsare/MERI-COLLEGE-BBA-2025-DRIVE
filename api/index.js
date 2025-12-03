import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load students data
let students = [];
try {
  const dataPath = join(__dirname, '..', 'server', 'data', 'students.json');
  const data = readFileSync(dataPath, 'utf-8');
  students = JSON.parse(data);
  console.log(`📊 Loaded ${students.length} students from database`);
} catch (error) {
  console.error('❌ Error loading students:', error);
  students = [];
}

// API Routes
app.get('/api/students/all', (req, res) => {
  res.json(students);
});

app.get('/api/students', (req, res) => {
  const { page = 1, limit = 25, search = '', shift = 'All', gender = 'All' } = req.query;
  
  let filtered = [...students];
  
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(s => 
      s.name.toLowerCase().includes(searchLower) ||
      s.enrollment.includes(search)
    );
  }
  
  if (shift !== 'All') {
    filtered = filtered.filter(s => s.shift === shift);
  }
  
  if (gender !== 'All') {
    filtered = filtered.filter(s => s.gender === gender);
  }
  
  const startIndex = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = startIndex + parseInt(limit);
  const paginatedStudents = filtered.slice(startIndex, endIndex);
  
  res.json({
    students: paginatedStudents,
    total: filtered.length,
    page: parseInt(page),
    totalPages: Math.ceil(filtered.length / parseInt(limit))
  });
});

app.get('/api/students/:enrollment', (req, res) => {
  const student = students.find(s => s.enrollment === req.params.enrollment);
  if (student) {
    res.json(student);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.post('/api/students', (req, res) => {
  const newStudent = req.body;
  students.push(newStudent);
  res.status(201).json(newStudent);
});

app.put('/api/students/:enrollment', (req, res) => {
  const index = students.findIndex(s => s.enrollment === req.params.enrollment);
  if (index !== -1) {
    students[index] = { ...students[index], ...req.body };
    res.json(students[index]);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.delete('/api/students/:enrollment', (req, res) => {
  const index = students.findIndex(s => s.enrollment === req.params.enrollment);
  if (index !== -1) {
    const deleted = students.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    studentsCount: students.length,
    timestamp: new Date().toISOString()
  });
});

// Export for Vercel serverless
export default app;
