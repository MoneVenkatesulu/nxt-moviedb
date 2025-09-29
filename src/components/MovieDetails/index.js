import {statusConstants, useFetchMovies} from '../../hooks/useFetchMovies'
import LoadingView from '../LoadingView'
import FailureView from '../FailureView'
import MovieCastCard from '../MovieCastCard'

import './index.css'

const MovieDetails = () => {
  const {apiResponse, fetchMovies} = useFetchMovies()

  const successView = () => {
    const {movieData, casteData} = apiResponse.data
    const {
      title,
      poster_path: img,
      vote_average: ratings,
      runtime,
      genres,
      release_date: releaseDate,
      overview,
    } = movieData

    const durationHours = Math.floor(runtime / 60)
    const durationMinutes = runtime % 60

    const fullImgPath = `https://image.tmdb.org/t/p/w500${img}`
    const allGenres = genres
      .reduce((acc, cur) => acc.concat(cur.name), [])
      .join(' / ')

    return (
      <div className="movie-details-container responsive-padding">
        <h2 className="movie-page-heading">Movie Details</h2>

        <div className="movie-details">
          <div className="movie-details-content">
            <h5>Title: {title}</h5>
            <p>
              <strong>Ratings: </strong>
              {Math.floor(ratings * 10) / 10} / 10
            </p>
            <p>
              <strong>Duration: </strong>
              {durationHours !== 0 && <span>{durationHours}h </span>}

              {durationMinutes !== 0 && <span>{durationMinutes}m</span>}
            </p>
            <p>
              <strong>All Genres: </strong>
              {allGenres}
            </p>
            <p>
              <strong>Realease Date: </strong>
              {releaseDate}
            </p>
            <p className="movie-details-description">
              <strong>Overview: </strong>
              {overview}
            </p>
          </div>

          <img
            src={fullImgPath}
            alt={`Movie - ${title}`}
            className="movie-details-img"
          />
        </div>

        <div>
          <h2 className="movie-page-heading">Cast</h2>
          <ul className="movie-cast-list">
            {casteData.cast.map(person => (
              <MovieCastCard key={person.cast_id} person={person} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

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

export default MovieDetails
