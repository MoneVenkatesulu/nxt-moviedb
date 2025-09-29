import {Link} from 'react-router-dom'

import './index.css'

const MovieCard = ({movie}) => {
  const {id, title, poster_path: img, vote_average: ratings} = movie
  const fullImgPath = `https://image.tmdb.org/t/p/w500${img}`
  return (
    <li className="movie-card">
      <img
        src={fullImgPath}
        alt={`Movie - ${title}`}
        className="movie-card-img"
      />
      <h5>{title}</h5>
      <p>Ratings: {Math.floor(ratings * 10) / 10} / 10</p>
      <Link to={`/movie/${id}`} className="movie-card-view-details">
        <button type="button">View Details</button>
      </Link>
    </li>
  )
}

export default MovieCard
