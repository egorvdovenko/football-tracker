import React from 'react'
import { Link } from 'react-router'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-gray-100 text-gray-800 flex flex-col min-h-screen">
      <header className="bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <Link to="/">Football Tracker</Link>
          </h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main
        className="flex-grow w-1200 max-w-4xl mx-auto p-6 overflow-y-auto"
        style={{ height: 'calc(100vh - 128px)' }}
      >
        {children}
      </main>
      <footer className="bg-gray-800 text-white">
        <div className="max-w-4xl mx-auto p-4 text-center">
          <p>{new Date().getFullYear()} React Pet-project</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout
