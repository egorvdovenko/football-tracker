import Image from 'next/image'
import { Team } from '@/types/Team'

export default async function TeamPage({ params }: { 
  params: { id: string } 
}) {
  const data = await fetch(`https://api.football-data.org/v4/teams/${params.id}`, {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_API_KEY!,
    },
  })
  
  const team: Team = await data.json()

  if (!team) {
    return <p className="p-6 text-center text-gray-500">Team not found.</p>
  }

  return (
    <div>
      <div className="text-center mb-8">
        <Image 
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