import { useQuery } from '@tanstack/react-query'
import { Team } from '../model/Team'

export function useTeamById(id?: string) {
  return useQuery<Team>({
    queryKey: ['team', id],
    queryFn: async () => {
      if (!id) throw new Error('No team id')

      const response = await fetch(`/api/teams/${id}`, {
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