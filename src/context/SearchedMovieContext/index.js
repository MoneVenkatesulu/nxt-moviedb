import React from 'react'

const SearchedMovieContext = React.createContext({
  searchedMovie: '',
  updateSearchedMovie: () => {},
})

export default SearchedMovieContext
