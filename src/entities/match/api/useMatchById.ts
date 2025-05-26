import { useQuery } from '@tanstack/react-query'
import { Match } from '../model/Match'

export function useMatchById(id?: string) {
  return useQuery<Match>({
    queryKey: ['match', id],
    queryFn: async () => {
      if (!id) throw new Error('No match id')
      const response = await fetch(`/api/matches/${id}`, {
        headers: {
          'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_KEY,
        },
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      return response.json()
    },
    enabled: !!id,
  })
}