import {statusConstants, useFetchMovies} from '../../hooks/useFetchMovies'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import MovieCard from '../MovieCard'
import Pagination from '../Pagination'
import NoMoviesView from '../NoMoviesView'

import './index.css'

const MoviesListPage = ({type}) => {
  const {apiResponse, fetchMovies} = useFetchMovies(type)

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

        <Pagination />
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
