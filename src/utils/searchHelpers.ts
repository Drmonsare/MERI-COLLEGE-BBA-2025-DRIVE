import { Student } from '../types/student'

export const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>')
}

export const fuzzyMatch = (text: string, query: string): boolean => {
  if (!query) return true
  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()
  
  // Exact match
  if (lowerText.includes(lowerQuery)) return true
  
  // Fuzzy match - all query chars appear in order
  let queryIndex = 0
  for (let i = 0; i < lowerText.length && queryIndex < lowerQuery.length; i++) {
    if (lowerText[i] === lowerQuery[queryIndex]) {
      queryIndex++
    }
  }
  return queryIndex === lowerQuery.length
}

export const searchStudents = (students: Student[], query: string): Student[] => {
  if (!query.trim()) return students
  
  return students.filter((student) => {
    return (
      fuzzyMatch(student.name, query) ||
      fuzzyMatch(student.enrollment, query)
    )
  })
}

export const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export const getAvatarColor = (name: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-teal-500',
    'bg-orange-500',
    'bg-cyan-500',
    'bg-rose-500',
  ]
  
  const charCode = name.charCodeAt(0) + (name.charCodeAt(name.length - 1) || 0)
  return colors[charCode % colors.length]
}
