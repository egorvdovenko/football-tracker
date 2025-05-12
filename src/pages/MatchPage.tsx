import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { Match } from '~/types/Match'

const MatchPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const [match, setMatch] = useState<Match | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchMatch = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/matches/${id}`, {
          headers: {
            'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_KEY,
          },
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        if (isMounted) {
          setMatch(data)
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

    fetchMatch()

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

  if (!match) {
    return <p className="p-6 text-center text-gray-500">Match not found.</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        <Link to={`/teams/${match.homeTeam.id}`} className="text-blue-600 hover:underline">
          {match.homeTeam.name}
        </Link>
        <span className="mx-4 text-gray-500">vs</span>
        <Link to={`/teams/${match.awayTeam.id}`} className="text-blue-600 hover:underline">
          {match.awayTeam.name}
        </Link>
      </h1>
      <div className="border border-gray-200 shadow-md rounded-lg overflow-hidden bg-white p-6">
        <div className="space-y-4 text-gray-700">
          <p className="text-lg">
            <strong className="font-semibold">Date:</strong> {
              new Date(match.utcDate).toLocaleString('ru-RU', {
                timeZone: 'Europe/Moscow',
                hour12: false,
              })
            }
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Competition:</strong> {match.competition.name}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Status:</strong> {match.status}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Score:</strong>
            <span className="ml-2">
              {match.score.fullTime.home} - {match.score.fullTime.away}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default MatchPage
