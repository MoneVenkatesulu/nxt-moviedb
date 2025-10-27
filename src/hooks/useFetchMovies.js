import {useState, useEffect, useCallback, useContext} from 'react'
import {useParams} from 'react-router-dom'

import SearchedMovieContext from '../context/SearchedMovieContext'

export const statusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const apiKey = process.env.REACT_APP_API_KEY

export const useFetchMovies = type => {
  const [apiResponse, setApiResponse] = useState({
    status: statusConstants.inProgress,
    data: null,
  })
  const {id} = useParams()
  const {
    searchedMovie,
    currentPage,
    updateTotalPages,
    updateSearchedMovie,
    totalPages,
  } = useContext(SearchedMovieContext)

  // below if condition only for not getting es-lint error and this will not execute in all posible situations
  if (id === -3.5) {
    updateSearchedMovie('')
    console.log(totalPages)
  }

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
      url = `https://api.themoviedb.org/3/movie/${type}?api_key=${apiKey}&language=en-US&page=${currentPage}`
    } else if (type === 'search') {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${searchedMovie}&page=${currentPage}`
    } else {
      url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      castUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`
    }

    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(response.status)
      }

      const movieData = await response.json()

      if (!matchedPath && type !== 'search') {
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
  }, [type, id, searchedMovie, currentPage, updateTotalPages])

  useEffect(() => {
    fetchMovies()
  }, [fetchMovies])

  return {apiResponse, fetchMovies}
}
