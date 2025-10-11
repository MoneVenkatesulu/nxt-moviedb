import React from 'react'

const SearchedMovieContext = React.createContext({
  searchedMovie: '',
  updateSearchedMovie: () => {},
  currentPage: 1,
  changePage: () => {},
})

export default SearchedMovieContext
