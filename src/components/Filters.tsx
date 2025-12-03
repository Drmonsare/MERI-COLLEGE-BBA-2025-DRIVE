import React, { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { StudentFilters as FilterType } from '../types/student'
import strings from '../i18n/strings.json'

interface FiltersProps {
  filters: FilterType
  onFilterChange: (filters: FilterType) => void
  totalStudents: number
  filteredCount: number
}

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export const Filters: React.FC<FiltersProps> = ({ 
  filters, 
  onFilterChange, 
  totalStudents,
  filteredCount 
}) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, searchTerm: value })
  }

  const handleShiftChange = (shift: FilterType['shift']) => {
    onFilterChange({ ...filters, shift })
  }

  const handleSortChange = (sortBy: FilterType['sortBy']) => {
    onFilterChange({ ...filters, sortBy })
  }

  const handleLetterFilter = (letter: string) => {
    onFilterChange({ 
      ...filters, 
      letterFilter: filters.letterFilter === letter ? '' : letter 
    })
  }

  const handleFavouritesToggle = () => {
    onFilterChange({ 
      ...filters, 
      showFavouritesOnly: !filters.showFavouritesOnly 
    })
  }

  const handleClearFilters = () => {
    onFilterChange({
      searchTerm: '',
      gender: 'All',
      shift: 'All',
      enrollmentFilter: '',
      sortBy: 'name-asc',
      letterFilter: '',
      showFavouritesOnly: false,
    })
  }

  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.searchTerm) count++
    if (filters.shift !== 'All') count++
    if (filters.letterFilter) count++
    if (filters.showFavouritesOnly) count++
    return count
  }, [filters])

  return (
    <div className="bg-white rounded-lg shadow-card p-4 mb-6">
      {/* Mobile Toggle */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 text-primary-600 font-medium"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
        </button>
        {activeFilterCount > 0 && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Filters Content */}
      <div className={`space-y-6 ${!isOpen ? 'hidden lg:block' : ''}`}>
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {strings.filters.search}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name or enrollment..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          Showing <span className="font-semibold text-gray-900">{filteredCount}</span> of{' '}
          <span className="font-semibold text-gray-900">{totalStudents}</span> students
        </div>

        {/* Shift Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {strings.filters.shift}
          </label>
          <div className="flex flex-wrap gap-2">
            {['All', 'Shift-1', 'Shift-2'].map((shift) => (
              <button
                key={shift}
                onClick={() => handleShiftChange(shift as FilterType['shift'])}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filters.shift === shift
                    ? shift === 'Shift-1'
                      ? 'bg-shift1 text-white'
                      : shift === 'Shift-2'
                      ? 'bg-shift2 text-white'
                      : 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {shift}
              </button>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {strings.filters.sortBy}
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleSortChange(e.target.value as FilterType['sortBy'])}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="name-asc">{strings.filters.nameAsc}</option>
            <option value="name-desc">{strings.filters.nameDesc}</option>
            <option value="enrollment-asc">{strings.filters.enrollmentAsc}</option>
            <option value="enrollment-desc">{strings.filters.enrollmentDesc}</option>
            <option value="shift">{strings.filters.shiftSort}</option>
          </select>
        </div>

        {/* Letter Quick Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Filter by First Letter
          </label>
          <div className="grid grid-cols-7 gap-1">
            {LETTERS.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterFilter(letter)}
                className={`p-2 text-xs font-medium rounded transition-colors ${
                  filters.letterFilter === letter
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Favourites Toggle */}
        <div>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.showFavouritesOnly}
              onChange={handleFavouritesToggle}
              className="w-4 h-4 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">
              {strings.filters.favourites}
            </span>
          </label>
        </div>

        {/* Clear Filters */}
        {activeFilterCount > 0 && (
          <button
            onClick={handleClearFilters}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
          >
            <X className="h-4 w-4" />
            <span>Clear All Filters</span>
          </button>
        )}
      </div>
    </div>
  )
}
