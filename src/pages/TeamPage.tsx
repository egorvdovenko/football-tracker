import React from 'react'
import { useParams, Link } from 'react-router'
import { Team } from '~/types/Team'
import { useFavorites, FavoritesActionType } from '~/context/FavoritesContext'
import { useFetchResource } from '~/hooks/useFetchResource'

const TeamPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { state: favorites, dispatch } = useFavorites()
  const { 
    data: team, loading, error 
  } = useFetchResource<Team>(`/api/teams/${id}`)

  const isFavorite = favorites.teams.some(favoriteTeam => favoriteTeam.id === team?.id)

  const handleAddFavorite = () => {
    if (team) {
      dispatch({ 
        type: FavoritesActionType.AddFavorite, 
        payload: team 
      })
    }
  }

  const handleRemoveFavorite = () => {
    if (team) {
      dispatch({ 
        type: FavoritesActionType.RemoveFavorite, 
        payload: team.id 
      })
    }
  }

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

  if (!team) {
    return <p className="p-6 text-center text-gray-500">Team not found.</p>
  }

  return (
    <div>
      <div className="text-center mb-8">
        <img
          src={team.crest}
          alt={`${team.name} crest`}
          width={120}
          height={120}
          className="mx-auto mb-4"
        />
        <h1 className="text-3xl font-extrabold text-gray-800">{team.name}</h1>
      </div>
      <div className="border border-gray-200 shadow-md rounded-lg bg-white p-6 space-y-4">
        <p className="text-lg text-gray-700">
          <strong className="font-semibold">Founded:</strong> {team.founded}
        </p>
        <p className="text-lg text-gray-700">
          <strong className="font-semibold">Address:</strong> {team.address}
        </p>
        <p className="text-lg text-gray-700">
          <strong className="font-semibold">Website:</strong>
          <a
            href={team.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline ml-1"
          >
            {team.website}
          </a>
        </p>
        <p className="text-lg text-gray-700">
          <strong className="font-semibold">Venue:</strong> {team.venue}
        </p>
      </div>
      <div className="text-center mt-4">
        {isFavorite ? (
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleRemoveFavorite} 
          >
            Remove from Favorites
          </button>
        ) : (
          <button 
            onClick={handleAddFavorite} 
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add to Favorites
          </button>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Players</h2>
        {team.squad.length > 0 ? (
          <ul className="list-disc list-inside">
            {team.squad.map(player => (
              <li key={player.id}>
                <Link to={`/players/${player.id}`} className="text-blue-600 hover:underline">
                  {player.name}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No players available for this team.</p>
        )}
      </div>
    </div>
  )
}

export default TeamPage
