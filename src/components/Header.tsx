import React from 'react'
import { FileText, Printer, Settings } from 'lucide-react'
import strings from '../i18n/strings.json'

interface HeaderProps {
  onExport: () => void
  onPrint: () => void
  onAdmin: () => void
}

export const Header: React.FC<HeaderProps> = ({ onExport, onPrint, onAdmin }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 no-print sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <img
              src="https://meri.edu.in/meri/wp-content/uploads/2023/05/Meri-Logo-Copy.webp"
              alt="MERI College Logo"
              className="h-12 w-auto"
            />
            <div className="hidden md:block border-l border-gray-300 pl-4">
              <h1 className="text-xl font-bold text-gray-900">{strings.app.title}</h1>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onExport}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              aria-label={strings.header.export}
            >
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{strings.header.export}</span>
            </button>

            <button
              onClick={onPrint}
              className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              aria-label={strings.header.print}
            >
              <Printer className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{strings.header.print}</span>
            </button>

            <button
              onClick={onAdmin}
              className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              aria-label={strings.header.admin}
            >
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">{strings.header.admin}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
