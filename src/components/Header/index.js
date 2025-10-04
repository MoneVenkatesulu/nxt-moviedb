import {Link, useLocation} from 'react-router-dom'
import {useState, useContext} from 'react'

import SearchedMovieContext from '../../context/SearchedMovieContext'

import './index.css'

const Header = () => {
  const location = useLocation()
  const [userSearch, setUserSearch] = useState('')
  const {updateSearchedMovie} = useContext(SearchedMovieContext)
  const pathName = location.pathname

  return (
    <nav className="nav-contianer responsive-padding">
      <div className="header-title-link-container">
        <Link to="/" className="app-title-link">
          <h1 className="app-title">movieDB</h1>
        </Link>

        <ul className="header-link-container">
          <li>
            <Link
              to="/"
              className="header-link-item"
              style={{
                fontWeight: `${pathName === '/' ? 'bold' : 'normal'}`,
                color: `${pathName === '/' ? '#00bb00' : '#00ff00'}`,
              }}
            >
              Popular
            </Link>
          </li>
          <li>
            <Link
              to="/top-rated"
              className="header-link-item"
              style={{
                fontWeight: `${pathName === '/top-rated' ? 'bold' : 'normal'}`,
                color: `${pathName === '/top-rated' ? '#00bb00' : '#00ff00'}`,
              }}
            >
              Top Rated
            </Link>
          </li>
          <li>
            <Link
              to="/upcoming"
              className="header-link-item"
              style={{
                fontWeight: `${pathName === '/upcoming' ? 'bold' : 'normal'}`,
                color: `${pathName === '/upcoming' ? '#00bb00' : '#00ff00'}`,
              }}
            >
              Upcoming
            </Link>
          </li>
        </ul>
      </div>

      <div className="searchbar-container">
        <input
          type="text"
          placeholder="Movie Name"
          className="searchbar"
          value={userSearch}
          onChange={e => setUserSearch(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && updateSearchedMovie(userSearch)}
        />
        <Link to="/searched-movies">
          <button
            type="button"
            onClick={() => updateSearchedMovie(userSearch)}
            className="search-btn"
          >
            Search
          </button>
        </Link>
      </div>
    </nav>
  )
}
export default Header
