import { useState, useEffect } from 'react'

interface FetchResourceResponse<T> {
  data: T | null
  loading: boolean
  error: string | null
} 

export function useFetchResource<T>(url: string): FetchResourceResponse<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchResource = async () => {
      try {
        setLoading(true)

        const response = await fetch(url, {
          headers: {
            'X-Auth-Token': import.meta.env.VITE_FOOTBALL_API_KEY,
          },
        })

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`)
        }

        const data = await response.json()

        if (isMounted) {
          setData(data)
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

    fetchResource()

    return () => {
      isMounted = false
    }
  }, [url])

  return { data, loading, error }
}
