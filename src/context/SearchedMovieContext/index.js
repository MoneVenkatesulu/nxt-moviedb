import React from 'react'

const SearchedMovieContext = React.createContext({
  searchedMovie: '',
  updateSearchedMovie: () => {},
  currentPage: 1,
  changePage: () => {},
  totalPages: 1,
  updateTotalPages: () => {},
})

export default SearchedMovieContext
