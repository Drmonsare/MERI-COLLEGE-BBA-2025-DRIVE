import { useState, useMemo } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Filters } from './components/Filters'
import { StudentCard } from './components/StudentCard'
import { Pagination } from './components/Pagination'
import { useStudents } from './context/StudentContext'
import { exportToCSV, printStudents } from './utils/csvExport'
import { searchStudents } from './utils/searchHelpers'
import { StudentFilters, PaginationState } from './types/student'
import strings from './i18n/strings.json'

function App() {
  const { students, loading, error, toggleFavourite } = useStudents()
  const [showAdmin, setShowAdmin] = useState(false)
  
  // Filter state
  const [filters, setFilters] = useState<StudentFilters>({
    searchTerm: '',
    gender: 'All',
    shift: 'All',
    enrollmentFilter: '',
    sortBy: 'name-asc',
    letterFilter: '',
    showFavouritesOnly: false,
  })

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: 25,
    totalItems: 0,
  })

  // Filter and sort students
  const filteredAndSortedStudents = useMemo(() => {
    let result = [...students]

    // Search filter
    if (filters.searchTerm) {
      result = searchStudents(result, filters.searchTerm)
    }

    // Shift filter
    if (filters.shift !== 'All') {
      result = result.filter(s => s.shift === filters.shift)
    }

    // Letter filter
    if (filters.letterFilter) {
      result = result.filter(s => 
        s.name.toUpperCase().startsWith(filters.letterFilter)
      )
    }

    // Favourites filter
    if (filters.showFavouritesOnly) {
      result = result.filter(s => s.favourite)
    }

    // Enrollment filter
    if (filters.enrollmentFilter) {
      result = result.filter(s => 
        s.enrollment.includes(filters.enrollmentFilter)
      )
    }

    // Sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'enrollment-asc':
          return a.enrollment.localeCompare(b.enrollment)
        case 'enrollment-desc':
          return b.enrollment.localeCompare(a.enrollment)
        case 'shift':
          return a.shift.localeCompare(b.shift)
        default:
          return 0
      }
    })

    return result
  }, [students, filters])

  // Paginated students
  const paginatedStudents = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.pageSize
    const endIndex = startIndex + pagination.pageSize
    return filteredAndSortedStudents.slice(startIndex, endIndex)
  }, [filteredAndSortedStudents, pagination.currentPage, pagination.pageSize])

  // Update total items when filtered students change
  useMemo(() => {
    setPagination(prev => ({
      ...prev,
      totalItems: filteredAndSortedStudents.length,
      currentPage: 1, // Reset to first page when filters change
    }))
  }, [filteredAndSortedStudents.length])

  const handleExport = () => {
    exportToCSV(filteredAndSortedStudents, `meri-students-${new Date().toISOString().split('T')[0]}.csv`)
  }

  const handlePrint = () => {
    printStudents()
  }

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, currentPage: page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePageSizeChange = (size: number) => {
    setPagination(prev => ({ 
      ...prev, 
      pageSize: size,
      currentPage: 1 
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{strings.messages.loading}</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">Error Loading Students</div>
          <p className="text-gray-600">{error}</p>
          <p className="text-sm text-gray-500 mt-4">Make sure the backend server is running on port 5000</p>
        </div>
      </div>
    )
  }

  if (!students || students.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No students found in the database.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onExport={handleExport} onPrint={handlePrint} onAdmin={() => setShowAdmin(true)} />
      <Hero />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Filters
              filters={filters}
              onFilterChange={setFilters}
              totalStudents={students.length}
              filteredCount={filteredAndSortedStudents.length}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats Header */}
            <div className="bg-white rounded-lg shadow-card p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-primary-600">{students.length}</p>
                  <p className="text-sm text-gray-600 mt-1">Total Students</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-shift1">{students.filter(s => s.shift === 'Shift-1').length}</p>
                  <p className="text-sm text-gray-600 mt-1">Shift-1 Students</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-shift2">{students.filter(s => s.shift === 'Shift-2').length}</p>
                  <p className="text-sm text-gray-600 mt-1">Shift-2 Students</p>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {(filters.searchTerm || filters.gender !== 'All' || filters.shift !== 'All' || filters.letterFilter) && (
              <div className="bg-white rounded-lg shadow-card p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-gray-700">Active Filters:</h4>
                  <button
                    onClick={() => setFilters({
                      searchTerm: '',
                      gender: 'All',
                      shift: 'All',
                      enrollmentFilter: '',
                      sortBy: 'name-asc',
                      letterFilter: '',
                      showFavouritesOnly: false,
                    })}
                    className="text-xs text-primary-600 hover:text-primary-700"
                  >
                    Clear All
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {filters.searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      Search: "{filters.searchTerm}"
                    </span>
                  )}
                  {filters.gender !== 'All' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      Gender: {filters.gender}
                    </span>
                  )}
                  {filters.shift !== 'All' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {filters.shift}
                    </span>
                  )}
                  {filters.letterFilter && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      Starts with: {filters.letterFilter}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Student Grid */}
            {paginatedStudents.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {paginatedStudents.map((student) => (
                    <StudentCard
                      key={student.enrollment}
                      student={student}
                      onToggleFavourite={toggleFavourite}
                      highlightText={filters.searchTerm}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {filteredAndSortedStudents.length > 10 && (
                  <Pagination
                    pagination={{
                      ...pagination,
                      totalItems: filteredAndSortedStudents.length,
                    }}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                  />
                )}
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-card p-12 text-center">
                <p className="text-lg text-gray-600">{strings.messages.noResults}</p>
                <button
                  onClick={() => setFilters({
                    searchTerm: '',
                    gender: 'All',
                    shift: 'All',
                    enrollmentFilter: '',
                    sortBy: 'name-asc',
                    letterFilter: '',
                    showFavouritesOnly: false,
                  })}
                  className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {showAdmin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">{strings.admin.title}</h3>
            <p className="text-gray-600 mb-4">Admin panel coming soon...</p>
            <button
              onClick={() => setShowAdmin(false)}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              {strings.admin.close}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
