import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import MatchCard from '~/components/MatchCard'
import { Match } from '~/types/Match'

const HomePage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/matches?status=SCHEDULED', {
          headers: {
            'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_KEY,
          },
        })
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        setMatches(data.matches)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Upcoming Matches
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matches.map((match) => (
          <li
            key={match.id}
            className="border border-gray-200 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link to={`/matches/${match.id}`}>
              <MatchCard match={match} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage