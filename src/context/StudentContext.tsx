import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Student } from '../types/student'

interface StudentContextType {
  students: Student[]
  loading: boolean
  error: string | null
  addStudent: (student: Student) => void
  updateStudent: (enrollment: string, student: Partial<Student>) => void
  deleteStudent: (enrollment: string) => void
  bulkUpload: (students: Student[]) => void
  toggleFavourite: (enrollment: string) => void
  refreshStudents: () => Promise<void>
}

const StudentContext = createContext<StudentContextType | undefined>(undefined)

export const useStudents = () => {
  const context = useContext(StudentContext)
  if (!context) {
    throw new Error('useStudents must be used within StudentProvider')
  }
  return context
}

interface StudentProviderProps {
  children: ReactNode
}

export const StudentProvider: React.FC<StudentProviderProps> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStudents = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await fetch('/api/students/all')
      if (!response.ok) throw new Error('Failed to fetch students')
      const data = await response.json()
      
      // Load favourites from localStorage
      const favourites = JSON.parse(localStorage.getItem('favourites') || '[]')
      const studentsWithFavourites = data.map((student: Student) => ({
        ...student,
        favourite: favourites.includes(student.enrollment),
      }))
      
      setStudents(studentsWithFavourites)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  const addStudent = (student: Student) => {
    setStudents((prev) => [...prev, student])
  }

  const updateStudent = (enrollment: string, updates: Partial<Student>) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.enrollment === enrollment ? { ...student, ...updates } : student
      )
    )
  }

  const deleteStudent = (enrollment: string) => {
    setStudents((prev) => prev.filter((student) => student.enrollment !== enrollment))
  }

  const bulkUpload = (newStudents: Student[]) => {
    setStudents(newStudents)
  }

  const toggleFavourite = (enrollment: string) => {
    setStudents((prev) =>
      prev.map((student) => {
        if (student.enrollment === enrollment) {
          const newFavourite = !student.favourite
          
          // Update localStorage
          const favourites = JSON.parse(localStorage.getItem('favourites') || '[]')
          if (newFavourite) {
            favourites.push(enrollment)
          } else {
            const index = favourites.indexOf(enrollment)
            if (index > -1) favourites.splice(index, 1)
          }
          localStorage.setItem('favourites', JSON.stringify(favourites))
          
          return { ...student, favourite: newFavourite }
        }
        return student
      })
    )
  }

  const refreshStudents = async () => {
    await fetchStudents()
  }

  return (
    <StudentContext.Provider
      value={{
        students,
        loading,
        error,
        addStudent,
        updateStudent,
        deleteStudent,
        bulkUpload,
        toggleFavourite,
        refreshStudents,
      }}
    >
      {children}
    </StudentContext.Provider>
  )
}
