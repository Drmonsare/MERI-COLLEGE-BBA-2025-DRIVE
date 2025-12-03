export interface Student {
  enrollment: string
  name: string
  gender: 'Male' | 'Female' | 'Other' | 'Unknown'
  shift: 'Shift-1' | 'Shift-2'
  favourite?: boolean
}

export interface StudentFilters {
  searchTerm: string
  gender: 'All' | 'Male' | 'Female' | 'Other' | 'Unknown'
  shift: 'All' | 'Shift-1' | 'Shift-2'
  enrollmentFilter: string
  sortBy: 'name-asc' | 'name-desc' | 'enrollment-asc' | 'enrollment-desc' | 'shift'
  letterFilter: string
  showFavouritesOnly: boolean
}

export interface PaginationState {
  currentPage: number
  pageSize: number
  totalItems: number
}
