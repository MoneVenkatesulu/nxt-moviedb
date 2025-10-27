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
  const [totalPages, setTotalPages] = useState(1)

  const updateSearchedMovie = name => setSearchedMovie(name)

  const changePage = num => setCurrentPage(num)

  const updateTotalPages = pages => setTotalPages(pages)

  return (
    <div className="app-container">
      <SearchedMovieContext.Provider
        value={{
          searchedMovie,
          updateSearchedMovie,
          currentPage,
          changePage,
          totalPages,
          updateTotalPages,
        }}
      >
        <Header />

        <Switch>
          <Route
            exact
            path="/"
            render={() => <MoviesListPage type="popular" />}
          />
          <Route
            exact
            path="/top-rated"
            render={() => <MoviesListPage type="top_rated" />}
          />
          <Route
            exact
            path="/upcoming"
            render={() => <MoviesListPage type="upcoming" />}
          />
          <Route
            exact
            path="/search"
            render={() => <MoviesListPage type="search" />}
          />
          <Route exact path="/movie/:id" component={MovieDetails} />
        </Switch>
      </SearchedMovieContext.Provider>
    </div>
  )
}

export default App
