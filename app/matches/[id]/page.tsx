import { Match } from '@/types/Match'
import Link from 'next/link'

export default async function TeamPage({ params }: { 
  params: { id: string } 
}) {
  const data = await fetch(`https://api.football-data.org/v4/matches/${params.id}`, {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_API_KEY!,
    },
  })
  
  const match: Match = await data.json()

  if (!match) {
    return <p className="p-6 text-center text-gray-500">Match not found.</p>
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        <Link href={`/teams/${match.homeTeam.id}`} className="text-blue-600 hover:underline">
          {match.homeTeam.name}
        </Link>
        <span className="mx-4 text-gray-500">vs</span>
        <Link href={`/teams/${match.awayTeam.id}`} className="text-blue-600 hover:underline">
          {match.awayTeam.name}
        </Link>
      </h1>
      <div className="border border-gray-200 shadow-md rounded-lg overflow-hidden bg-white p-6">
        <div className="space-y-4 text-gray-700">
          <p className="text-lg">
            <strong className="font-semibold">Date:</strong> 
            {new Date(match.utcDate).toLocaleString("ru-RU", {
              timeZone: "Europe/Moscow",
              hour12: false,
            })}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Competition:</strong> 
            {match.competition.name}
          </p>
          <p className="text-lg">
            <strong className="font-semibold">Status:</strong> 
            {match.status}
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