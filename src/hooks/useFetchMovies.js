import {useState, useEffect, useCallback, useContext} from 'react'
import {useLocation, useParams} from 'react-router-dom'

import SearchedMovieContext from '../context/SearchedMovieContext'

export const statusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

export const useFetchMovies = () => {
  const [apiResponse, setApiResponse] = useState({
    status: statusConstants.inProgress,
    data: null,
  })
  const location = useLocation()
  const {id} = useParams()
  const {searchedMovie, currentPage, updateTotalPages} = useContext(
    SearchedMovieContext,
  )

  const fetchMovies = useCallback(async () => {
    setApiResponse({
      status: statusConstants.inProgress,
      data: null,
    })

    let url
    let castUrl
    const pathName = location.pathname
    const matchedPath =
      pathName === '/' || pathName === '/top-rated' || pathName === '/upcoming'

    if (matchedPath) {
      let movieType = 'popular'
      if (pathName === '/top-rated') {
        movieType = 'top_rated'
      } else if (pathName === '/upcoming') {
        movieType = 'upcoming'
      }

      url = `https://api.themoviedb.org/3/movie/${movieType}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${currentPage}`
    } else if (pathName.startsWith('/movie/')) {
      url = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    } else if (pathName === '/searched-movies') {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchedMovie}&page=${currentPage}`
    }

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(response.status)
      }

      const movieData = await response.json()

      if (pathName.startsWith('/movie/')) {
        const castResponse = await fetch(castUrl)
        if (!castResponse.ok) {
          throw new Error(castResponse.status)
        }
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

      if (updateTotalPages && movieData.total_pages) {
        updateTotalPages(movieData.total_pages)
      }
    } catch (e) {
      console.log(`Error status code: ${e.message}`)

      setApiResponse(prevState => ({
        ...prevState,
        status: statusConstants.failure,
      }))
    }
  }, [location.pathname, id, searchedMovie, currentPage])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return {apiResponse, fetchMovies}
}
