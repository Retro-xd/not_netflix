const BASE_URL = 'https://api.themoviedb.org/3'

export interface Movie {
  id: number
  title: string
  poster_path: string | null
  release_date: string
  overview: string
  vote_average: number
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return []

  const url = `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`
    }
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error('Failed to fetch movies')
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error('Error searching movies:', error)
    return []
  }
}