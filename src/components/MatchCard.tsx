import React from 'react'
import { Match } from '~/types/Match'

interface MatchCardProps {
  match: Match
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-gray-700 mb-2">
        {match.homeTeam.name} <span className="text-gray-500">vs</span> {match.awayTeam.name}
      </h2>
      <p className="text-sm text-gray-600 mb-1">
        {new Date(match.utcDate).toLocaleString('ru-RU', {
          timeZone: 'Europe/Moscow',
          hour12: false,
        })}
      </p>
      <p className="text-sm text-gray-500">{match.competition.name}</p>
    </div>
  )
}

export default MatchCard
