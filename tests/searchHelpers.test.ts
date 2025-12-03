import { describe, it, expect } from 'vitest'
import { searchStudents, fuzzyMatch, getInitials, getAvatarColor } from '../src/utils/searchHelpers'
import { Student } from '../src/types/student'

describe('searchHelpers', () => {
  const mockStudents: Student[] = [
    { enrollment: '115101725', name: 'Pariket Goel', gender: 'Unknown', shift: 'Shift-1', favourite: false },
    { enrollment: '215101725', name: 'Kakul', gender: 'Unknown', shift: 'Shift-1', favourite: false },
    { enrollment: '315101725', name: 'Ayush Gupta', gender: 'Unknown', shift: 'Shift-1', favourite: false },
  ]

  describe('fuzzyMatch', () => {
    it('should match exact strings', () => {
      expect(fuzzyMatch('Pariket Goel', 'Pariket')).toBe(true)
      expect(fuzzyMatch('Kakul', 'Kakul')).toBe(true)
    })

    it('should match partial strings', () => {
      expect(fuzzyMatch('Ayush Gupta', 'Ayush')).toBe(true)
      expect(fuzzyMatch('Pariket Goel', 'Goel')).toBe(true)
    })

    it('should be case insensitive', () => {
      expect(fuzzyMatch('Pariket Goel', 'PARIKET')).toBe(true)
      expect(fuzzyMatch('Kakul', 'kakul')).toBe(true)
    })

    it('should match fuzzy patterns', () => {
      expect(fuzzyMatch('Pariket Goel', 'Prkt')).toBe(true)
      expect(fuzzyMatch('Ayush Gupta', 'Ayta')).toBe(true)
    })

    it('should not match unrelated strings', () => {
      expect(fuzzyMatch('Pariket Goel', 'xyz')).toBe(false)
    })

    it('should return true for empty query', () => {
      expect(fuzzyMatch('Pariket Goel', '')).toBe(true)
    })
  })

  describe('searchStudents', () => {
    it('should return all students for empty query', () => {
      const result = searchStudents(mockStudents, '')
      expect(result).toHaveLength(3)
    })

    it('should filter by name', () => {
      const result = searchStudents(mockStudents, 'Ayush')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Ayush Gupta')
    })

    it('should filter by enrollment', () => {
      const result = searchStudents(mockStudents, '115101725')
      expect(result).toHaveLength(1)
      expect(result[0].enrollment).toBe('115101725')
    })

    it('should handle fuzzy search', () => {
      const result = searchStudents(mockStudents, 'Kak')
      expect(result.length).toBeGreaterThanOrEqual(1)
    })

    it('should be case insensitive', () => {
      const result = searchStudents(mockStudents, 'KAKUL')
      expect(result).toHaveLength(1)
    })
  })

  describe('getInitials', () => {
    it('should get initials for two-word names', () => {
      expect(getInitials('Pariket Goel')).toBe('PG')
      expect(getInitials('Ayush Gupta')).toBe('AG')
    })

    it('should handle single-word names', () => {
      expect(getInitials('Kakul')).toBe('KA')
    })

    it('should handle three-word names', () => {
      expect(getInitials('Andrea Elsa Philip')).toBe('AP')
    })

    it('should handle names with extra spaces', () => {
      expect(getInitials('  Pariket   Goel  ')).toBe('PG')
    })

    it('should be uppercase', () => {
      expect(getInitials('pariket goel')).toBe('PG')
    })
  })

  describe('getAvatarColor', () => {
    it('should return consistent colors for same name', () => {
      const color1 = getAvatarColor('Pariket Goel')
      const color2 = getAvatarColor('Pariket Goel')
      expect(color1).toBe(color2)
    })

    it('should return a valid Tailwind color class', () => {
      const color = getAvatarColor('Test Name')
      expect(color).toMatch(/^bg-(blue|purple|pink|indigo|teal|orange|cyan|rose)-500$/)
    })

    it('should handle different names', () => {
      const color1 = getAvatarColor('Pariket Goel')
      const color2 = getAvatarColor('Kakul')
      // May or may not be different, but should both be valid
      expect(color1).toBeTruthy()
      expect(color2).toBeTruthy()
    })
  })
})
