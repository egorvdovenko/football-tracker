import React from 'react'
import { Link } from 'react-router'
import { useScheduledMatches, Match } from '~/entities/match'
import MatchCard from './MatchCard'

export const HomePage: React.FC = () => {  
  const { data, isLoading, error } = useScheduledMatches()
  const matches: Match[] = data?.matches || []

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error instanceof Error ? error.message : String(error)}</p>
      </div>
    )
  }
  
  if (!matches.length) {
    return <p className="p-6 text-center text-gray-500">No upcoming matches.</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Upcoming Matches
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {matches.map((match: Match) => (
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
