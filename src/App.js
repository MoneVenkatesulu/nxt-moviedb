import {Switch, Route} from 'react-router-dom'
import {useState} from 'react'

import Header from './components/Header'
import MoviesListPage from './components/MoviesListPage'
import MovieDetails from './components/MovieDetails'
import SearchedMovieContext from './context/SearchedMovieContext'

import './App.css'

const App = () => {
  const [searchedMovie, setSearchedMovie] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const updateSearchedMovie = name => setSearchedMovie(name)

  const changePage = num => setCurrentPage(num)

  return (
    <div className="app-container">
      <SearchedMovieContext.Provider
        value={{
          searchedMovie,
          updateSearchedMovie,
          currentPage,
          changePage,
        }}
      >
        <Header />

        <Switch>
          <Route exact path="/" component={MoviesListPage} />
          <Route exact path="/top-rated" component={MoviesListPage} />
          <Route exact path="/upcoming" component={MoviesListPage} />
          <Route exact path="/searched-movies" component={MoviesListPage} />
          <Route exact path="/movie/:id" component={MovieDetails} />
        </Switch>
      </SearchedMovieContext.Provider>
    </div>
  )
}

export default App
