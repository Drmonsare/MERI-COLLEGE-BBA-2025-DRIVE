import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 5000

// Middleware
app.use(cors())
app.use(express.json())

// Load student data
const studentsPath = path.join(__dirname, 'data', 'students.json')
let students = JSON.parse(fs.readFileSync(studentsPath, 'utf8'))

// GET /api/students - Get all students with optional filters
app.get('/api/students', (req, res) => {
  try {
    let filteredStudents = [...students]
    
    const { name, enrollment, gender, shift, page, perPage } = req.query
    
    // Apply filters
    if (name) {
      const searchTerm = name.toLowerCase()
      filteredStudents = filteredStudents.filter(s => 
        s.name.toLowerCase().includes(searchTerm)
      )
    }
    
    if (enrollment) {
      filteredStudents = filteredStudents.filter(s => 
        s.enrollment.includes(enrollment)
      )
    }
    
    if (gender && gender !== 'All') {
      filteredStudents = filteredStudents.filter(s => s.gender === gender)
    }
    
    if (shift && shift !== 'All') {
      filteredStudents = filteredStudents.filter(s => s.shift === shift)
    }
    
    // Pagination
    const pageNum = parseInt(page) || 1
    const pageSizeNum = parseInt(perPage) || 25
    const startIndex = (pageNum - 1) * pageSizeNum
    const endIndex = startIndex + pageSizeNum
    
    const paginatedStudents = filteredStudents.slice(startIndex, endIndex)
    
    res.json({
      students: paginatedStudents,
      total: filteredStudents.length,
      page: pageNum,
      perPage: pageSizeNum,
      totalPages: Math.ceil(filteredStudents.length / pageSizeNum)
    })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// For simple mode without pagination
app.get('/api/students/all', (req, res) => {
  res.json(students)
})

// POST /api/students - Add a new student
app.post('/api/students', (req, res) => {
  try {
    const newStudent = req.body
    
    // Validate required fields
    if (!newStudent.enrollment || !newStudent.name) {
      return res.status(400).json({ error: 'Enrollment and name are required' })
    }
    
    // Check if enrollment already exists
    const exists = students.find(s => s.enrollment === newStudent.enrollment)
    if (exists) {
      return res.status(409).json({ error: 'Student with this enrollment already exists' })
    }
    
    students.push(newStudent)
    fs.writeFileSync(studentsPath, JSON.stringify(students, null, 2))
    
    res.status(201).json(newStudent)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// PUT /api/students/:enrollment - Update a student
app.put('/api/students/:enrollment', (req, res) => {
  try {
    const { enrollment } = req.params
    const updates = req.body
    
    const index = students.findIndex(s => s.enrollment === enrollment)
    if (index === -1) {
      return res.status(404).json({ error: 'Student not found' })
    }
    
    students[index] = { ...students[index], ...updates }
    fs.writeFileSync(studentsPath, JSON.stringify(students, null, 2))
    
    res.json(students[index])
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// DELETE /api/students/:enrollment - Delete a student
app.delete('/api/students/:enrollment', (req, res) => {
  try {
    const { enrollment } = req.params
    
    const index = students.findIndex(s => s.enrollment === enrollment)
    if (index === -1) {
      return res.status(404).json({ error: 'Student not found' })
    }
    
    students.splice(index, 1)
    fs.writeFileSync(studentsPath, JSON.stringify(students, null, 2))
    
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

// POST /api/students/bulk - Bulk upload students
app.post('/api/students/bulk', (req, res) => {
  try {
    const newStudents = req.body
    
    if (!Array.isArray(newStudents)) {
      return res.status(400).json({ error: 'Request body must be an array' })
    }
    
    students = newStudents
    fs.writeFileSync(studentsPath, JSON.stringify(students, null, 2))
    
    res.json({ message: 'Bulk upload successful', count: students.length })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`📊 Loaded ${students.length} students`)
})
