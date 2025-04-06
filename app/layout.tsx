import type { Metadata } from 'next'
import Link from 'next/link'

import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Football Tracker',
  description: 'Track your favorite football matches and teams',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800 flex flex-col min-h-screen">
        <header className="bg-blue-600 text-white">
          <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">
              <Link href="/">Football Tracker</Link>
            </h1>
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
        <main 
          className="flex-grow max-w-4xl mx-auto p-6 overflow-y-auto" 
          style={{ height: 'calc(100vh - 128px)' }}
        >
          {children}
        </main>
        <footer className="bg-gray-800 text-white">
          <div className="max-w-4xl mx-auto p-4 text-center">
            <p>&copy; {new Date().getFullYear()} Football Tracker. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}