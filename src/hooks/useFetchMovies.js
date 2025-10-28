import {useState, useEffect, useCallback} from 'react'
import {useParams, useLocation} from 'react-router-dom'

export const statusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const apiKey = process.env.REACT_APP_API_KEY

const useQueryParams = () => {
  const {search} = useLocation()
  const params = new URLSearchParams(search)
  return {
    query: params.get('query') || '',
    page: parseInt(params.get('page') || '1', 10),
  }
}

export const useFetchMovies = type => {
  const [apiResponse, setApiResponse] = useState({
    status: statusConstants.inProgress,
    data: null,
  })

  const {id} = useParams()
  const {query, page} = useQueryParams()

  const fetchMovies = useCallback(async () => {
    setApiResponse({
      status: statusConstants.inProgress,
      data: null,
    })

    let url
    let castUrl
    const matchedPath =
      type === 'popular' || type === 'top_rated' || type === 'upcoming'

    if (matchedPath) {
      url = `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=${page}`
    } else if (type === 'search') {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}`
    } else {
      url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    }

    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(response.status)

      const movieData = await response.json()

      if (!matchedPath && type !== 'search') {
        const castResponse = await fetch(castUrl)
        if (!castResponse.ok) throw new Error(castResponse.status)
        const casteData = await castResponse.json()

        setApiResponse({
          status: statusConstants.success,
          data: {movieData, casteData},
        })
      } else {
        setApiResponse({
          status: statusConstants.success,
          data: movieData,
        })
      }
    } catch (e) {
      console.log(`Error status code: ${e.message}`)
      setApiResponse({
        status: statusConstants.failure,
        data: null,
      })
    }
  }, [type, id, query, page])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return {apiResponse, fetchMovies}
}
