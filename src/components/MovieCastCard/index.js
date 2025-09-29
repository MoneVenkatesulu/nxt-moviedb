import './index.css'

const MovieCastCard = ({person}) => {
  const {profile_path: img, character, name} = person

  const fullImgPath = `https://image.tmdb.org/t/p/w500${img}`

  return (
    <li className="movie-cast-card">
      <img src={fullImgPath} alt={name} className="movie-cast-img" />
      <p className="movie-cast-name">{name}</p>
      <p>In & As</p>
      <p className="movie-cast-name">{character}</p>
    </li>
  )
}

export default MovieCastCard
