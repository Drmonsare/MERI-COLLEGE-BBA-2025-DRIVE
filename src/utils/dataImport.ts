import { Student } from '../types/student'

export interface CSVRow {
  enrollment: string
  name: string
  gender?: string
  shift?: string
}

export const parseCSV = (content: string): { data: CSVRow[]; errors: string[] } => {
  const lines = content.trim().split(/\r?\n/)
  const errors: string[] = []
  const data: CSVRow[] = []

  if (lines.length < 2) {
    errors.push('CSV file must have at least a header row and one data row')
    return { data, errors }
  }

  // Parse header
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase())
  const enrollmentIndex = headers.findIndex((h) => h.includes('enrollment'))
  const nameIndex = headers.findIndex((h) => h.includes('name'))
  const genderIndex = headers.findIndex((h) => h.includes('gender'))
  const shiftIndex = headers.findIndex((h) => h.includes('shift'))

  if (enrollmentIndex === -1 || nameIndex === -1) {
    errors.push('CSV must contain "Enrollment" and "Name" columns')
    return { data, errors }
  }

  // Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue

    const values = line.split(',').map((v) => v.trim())

    if (values.length < 2) {
      errors.push(`Row ${i + 1}: Insufficient columns`)
      continue
    }

    const enrollment = values[enrollmentIndex]?.trim()
    const name = values[nameIndex]?.trim()

    if (!enrollment || !name) {
      errors.push(`Row ${i + 1}: Missing enrollment or name`)
      continue
    }

    data.push({
      enrollment,
      name,
      gender: genderIndex !== -1 ? values[genderIndex]?.trim() : undefined,
      shift: shiftIndex !== -1 ? values[shiftIndex]?.trim() : undefined,
    })
  }

  return { data, errors }
}

export const csvRowsToStudents = (rows: CSVRow[]): Student[] => {
  return rows.map((row) => ({
    enrollment: row.enrollment,
    name: row.name,
    gender: (row.gender as Student['gender']) || 'Unknown',
    shift: (row.shift as Student['shift']) || 'Shift-1',
    favourite: false,
  }))
}
