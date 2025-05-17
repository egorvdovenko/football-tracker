import React from 'react'
import { Link } from 'react-router'
import { useFavorites } from '~/context/FavoritesContext'
import MatchCard from '~/components/MatchCard'
import { Match } from '~/types/Match'
import { useFetchResource } from '~/hooks/useFetchResource'

const HomePage: React.FC = () => {
  const { state: favorites } = useFavorites()
  const { 
    data, loading, error 
  } = useFetchResource<{ matches: Match[] }>('/api/matches?status=SCHEDULED')
  const matches = data?.matches ?? []

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
  if (!matches.length) {
    return <p className="p-6 text-center text-gray-500">No upcoming matches.</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Upcoming Matches
      </h1>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Favorite Teams
      </h2>
      {favorites.teams.length > 0 ? (
        <ul className="list-disc list-inside mb-8">
          {favorites.teams.map(team => (
            <li key={team.id}>
              <Link to={`/teams/${team.id}`}>{team.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600 mb-8">No favorite teams yet.</p>
      )}
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