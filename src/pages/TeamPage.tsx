import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Team } from '../types/Team'

const TeamPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()

  const [team, setTeam] = useState<Team | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/teams/${id}`, {
          headers: {
            'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_KEY,
          },
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()
        setTeam(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
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
    </div>
  )
}

export default TeamPage
