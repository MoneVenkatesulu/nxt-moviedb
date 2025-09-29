import {useLocation} from 'react-router-dom'

import {statusConstants, useFetchMovies} from '../../hooks/useFetchMovies'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import MovieCard from '../MovieCard'
import NoMoviesView from '../NoMoviesView'

import './index.css'

const MoviesListPage = ({movieCategory}) => {
  const {apiResponse, fetchMovies} = useFetchMovies(movieCategory)
  const location = useLocation()

  const pageHeading = () => {
    switch (location.pathname) {
      case '/':
        return 'Popular'
      case '/top-rated':
        return 'Top Rated'
      case '/upcoming':
        return 'Upcoming'
      default:
        return null
    }
  }

  const successView = () =>
    apiResponse.data.results.length === 0 ? (
      <NoMoviesView />
    ) : (
      <div className="movie-list-container responsive-padding">
        <h2 className="movie-page-heading">Movie List</h2>

        <ul className="movie-list">
          {apiResponse.data.results.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      </div>
    )

  switch (apiResponse.status) {
    case statusConstants.inProgress:
      return <LoadingView />
    case statusConstants.success:
      return successView()
    case statusConstants.failure:
      return <FailureView reFetch={fetchMovies} />
    default:
      return null
  }
}

export default MoviesListPage
