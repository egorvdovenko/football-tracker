import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import MatchCard from '../components/MatchCard'
import { Match } from '../../types/Match'

const HomePage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    const fetchMatches = async () => {
      const response = await fetch('/api/matches?status=SCHEDULED')
      const data = await response.json()
      setMatches(data.matches)
    }

    fetchMatches()
  }, [])

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
