import MatchCard from "@/components/MatchCard"
import { Match } from "@/types/Match"
import Link from "next/link"

export default async function HomePage() {
  const data = await fetch("https://api.football-data.org/v4/matches?status=SCHEDULED", {
    headers: {
      "X-Auth-Token": process.env.FOOTBALL_API_KEY!,
    },
  })

  const { matches }: { 
    matches: Match[] 
  } = await data.json()

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
        Upcoming Matches
      </h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matches.map((match: Match) => (
          <li
            key={match.id}
            className="border border-gray-200 bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/matches/${match.id}`}>
              <MatchCard match={match} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}