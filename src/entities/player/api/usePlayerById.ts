import { useQuery } from '@tanstack/react-query'
import { Player } from '../model/Player'

export function usePlayerById(id?: string) {
  return useQuery<Player>({
    queryKey: ['player', id],
    queryFn: async () => {
      if (!id) throw new Error('No player id')

      const response = await fetch(`/api/persons/${id}`, {
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