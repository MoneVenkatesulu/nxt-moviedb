import {Link, useLocation} from 'react-router-dom'
import {useState, useContext} from 'react'

import SearchedMovieContext from '../../context/SearchedMovieContext'

import './index.css'

const Header = () => {
  const location = useLocation()
  const [userSearch, setUserSearch] = useState('')
  const {updateSearchedMovie} = useContext(SearchedMovieContext)
  const pathName = location.pathname

  const linksContainer = (
    <ul className="header-link-container">
      <li>
        <Link
          to="/"
          className="header-link-item"
          style={{fontWeight: `${pathName === '/' ? 'bold' : 'normal'}`}}
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
          }}
        >
          Upcoming
        </Link>
      </li>
    </ul>
  )

  return (
    <>
      <nav className="nav-contianer responsive-padding">
        <h1 className="app-title">movieDB</h1>

        <div className="tabs-container-sm">{linksContainer}</div>

        <div>
          <input
            type="text"
            placeholder="Movie Name"
            className="searchbar"
            value={userSearch}
            onChange={e => setUserSearch(e.target.value)}
            onKeyDown={e =>
              e.key === 'Enter' && updateSearchedMovie(userSearch)
            }
          />
          <Link to="/searched-movies">
            <button
              type="button"
              onClick={() => updateSearchedMovie(userSearch)}
            >
              Search
            </button>
          </Link>
        </div>
      </nav>

      <div className="tabs-container-mobile responsive-padding">
        {linksContainer}
      </div>
    </>
  )
}
export default Header
