import { useQuery } from '@tanstack/react-query'
import { Match } from '../model/Match'

export function useScheduledMatches() {
  return useQuery<{ matches: Match[] }>({
    queryKey: ['matches', 'scheduled'],
    queryFn: async () => {
      const response = await fetch('/api/matches?status=SCHEDULED', {
        headers: {
          'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_KEY,
        },
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      return response.json()
    },
  })
}