import {Link, useLocation, useHistory} from 'react-router-dom'
import {useState} from 'react'
import './index.css'

const Header = () => {
  const location = useLocation()
  const history = useHistory()
  const [userSearch, setUserSearch] = useState('')
  const pathName = location.pathname

  const onTabChange = () => {
    setUserSearch('')
  }

  const onClickSearchIcon = () => {
    if (userSearch.trim() === '') return

    const encodedQuery = encodeURIComponent(userSearch)
    history.push(`/search?query=${encodedQuery}&page=1`)
  }

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
              onClick={onTabChange}
              className="header-link-item"
              style={{
                fontWeight: pathName === '/' ? 'bold' : 'normal',
                color: pathName === '/' ? '#00bb00' : '#00ff00',
              }}
            >
              Popular
            </Link>
          </li>
          <li>
            <Link
              to="/top-rated"
              onClick={onTabChange}
              className="header-link-item"
              style={{
                fontWeight: pathName === '/top-rated' ? 'bold' : 'normal',
                color: pathName === '/top-rated' ? '#00bb00' : '#00ff00',
              }}
            >
              Top Rated
            </Link>
          </li>
          <li>
            <Link
              to="/upcoming"
              onClick={onTabChange}
              className="header-link-item"
              style={{
                fontWeight: pathName === '/upcoming' ? 'bold' : 'normal',
                color: pathName === '/upcoming' ? '#00bb00' : '#00ff00',
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
        />
        <button
          type="button"
          className="search-btn"
          onClick={onClickSearchIcon}
        >
          Search
        </button>
      </div>
    </nav>
  )
}

export default Header
