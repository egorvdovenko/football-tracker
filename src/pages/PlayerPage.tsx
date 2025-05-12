import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Player } from '~/types/Player'

const PlayerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const [player, setPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchPlayer = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/persons/${id}`, {
          headers: {
            'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_KEY,
          },
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        if (isMounted) {
          setPlayer(data)
        }
      } catch (err: unknown) {
        if (isMounted) {
          if (err instanceof Error) {
            setError(err.message)
          } else {
            setError('An unknown error occurred')
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchPlayer()

    return () => {
      isMounted = false
    }
  }, [id])

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

export default PlayerPage