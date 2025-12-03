import { Student } from '../types/student'

export const exportToCSV = (students: Student[], filename: string = 'students.csv'): void => {
  // RFC 4180 compliant CSV export
  const escapeField = (field: string): string => {
    if (field.includes(',') || field.includes('"') || field.includes('\n')) {
      return `"${field.replace(/"/g, '""')}"`
    }
    return field
  }

  const headers = ['Enrollment No.', 'Name', 'Gender', 'Shift']
  const rows = students.map((student) => [
    escapeField(student.enrollment),
    escapeField(student.name),
    escapeField(student.gender),
    escapeField(student.shift),
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\r\n')

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)
  
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const printStudents = (): void => {
  window.print()
}
