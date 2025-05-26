import React from 'react'
import { useParams } from 'react-router'
import { usePlayerById } from '~/entities/player'

export const PlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: player, isLoading, error } = usePlayerById(id)

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

  if (!player) {
    return <p className="p-6 text-center text-gray-500">Player not found.</p>
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-4">{player.name}</h1>
      <div className="border border-gray-200 shadow-md rounded-lg bg-white p-6 space-y-4">
        <p className="text-lg text-gray-700">
          <strong className="font-semibold">Position:</strong> {player.position}
        </p>
        <p className="text-lg text-gray-700">
          <strong className="font-semibold">Nationality:</strong> {player.nationality}
        </p>
        <p className="text-lg text-gray-700">
          <strong className="font-semibold">Date of Birth:</strong> {new Date(player.dateOfBirth).toLocaleDateString()}
        </p>
        {player.shirtNumber && (
          <p className="text-lg text-gray-700">
            <strong className="font-semibold">Shirt Number:</strong> {player.shirtNumber}
          </p>
        )}
      </div>
    </div>
  )
}
