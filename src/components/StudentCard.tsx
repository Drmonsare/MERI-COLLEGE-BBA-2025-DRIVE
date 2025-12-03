import React from 'react'
import { motion } from 'framer-motion'
import { Heart, Mail, User } from 'lucide-react'
import { Student } from '../types/student'
import { getInitials, getAvatarColor } from '../utils/searchHelpers'

interface StudentCardProps {
  student: Student
  onToggleFavourite?: (enrollment: string) => void
  highlightText?: string
}

export const StudentCard: React.FC<StudentCardProps> = ({ 
  student, 
  onToggleFavourite,
  highlightText 
}) => {
  const avatarColor = getAvatarColor(student.name)
  const initials = getInitials(student.name)

  const highlightedName = highlightText
    ? student.name.replace(
        new RegExp(`(${highlightText})`, 'gi'),
        '<mark class="bg-yellow-200">$1</mark>'
      )
    : student.name

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-card-hover transition-all duration-200 print-friendly"
    >
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <div className={`flex-shrink-0 h-14 w-14 rounded-full ${avatarColor} flex items-center justify-center text-white font-bold text-lg`}>
          {initials}
        </div>

        {/* Student Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 
                className="text-base font-semibold text-gray-900 truncate"
                dangerouslySetInnerHTML={{ __html: highlightedName }}
              />
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Enrollment:</span> {student.enrollment}
              </p>
            </div>

            {/* Favourite Button */}
            {onToggleFavourite && (
              <button
                onClick={() => onToggleFavourite(student.enrollment)}
                className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors no-print"
                aria-label={student.favourite ? 'Remove from favourites' : 'Add to favourites'}
              >
                <Heart 
                  className={`h-5 w-5 ${
                    student.favourite 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-400'
                  }`}
                />
              </button>
            )}
          </div>

          {/* Badges */}
          <div className="mt-3 flex items-center space-x-2 flex-wrap gap-2">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                student.shift === 'Shift-1'
                  ? 'bg-shift1-light text-shift1-dark'
                  : 'bg-shift2-light text-shift2-dark'
              }`}
            >
              {student.shift}
            </span>
          </div>

          {/* Quick Actions */}
          <div className="mt-3 flex items-center space-x-3 no-print">
            <button className="flex items-center space-x-1 text-xs text-primary-600 hover:text-primary-700 transition-colors">
              <User className="h-3.5 w-3.5" />
              <span>Profile</span>
            </button>
            <button className="flex items-center space-x-1 text-xs text-primary-600 hover:text-primary-700 transition-colors">
              <Mail className="h-3.5 w-3.5" />
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
