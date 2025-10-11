import {useHistory} from 'react-router-dom'

import './index.css'

const MovieCard = ({movie}) => {
  const history = useHistory()
  const {id, title, poster_path: img, vote_average: ratings} = movie
  const fullImgPath = `https://image.tmdb.org/t/p/w500${img}`

  const onClickViewDetails = () => {
    history.push(`/movie/${id}`)
  }

  return (
    <li className="movie-card">
      <img
        src={fullImgPath}
        alt={`Movie - ${title}`}
        className="movie-card-img"
      />
      <h5 className="movie-card-title">{title}</h5>
      <p className="movie-card-ratings">
        Ratings: {Math.floor(ratings * 10) / 10} / 10
      </p>
      <button
        type="button"
        className="movie-card-view-details-btn"
        onClick={onClickViewDetails}
      >
        View Details
      </button>
    </li>
  )
}

export default MovieCard
