import {useContext} from 'react'

import SearchedMovieContext from '../../context/SearchedMovieContext'

import './index.css'

const Pagination = () => {
  const {currentPage, changePage, totalPages} = useContext(SearchedMovieContext)

  return (
    <div className="pagination-content">
      <button
        type="button"
        data-testid="Prev button"
        className="pagination-btns"
        onClick={() => changePage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <span className="pagination-current-page" data-testid="Current Page">
        {currentPage}
      </span>

      <button
        type="button"
        data-testid="Next button"
        className="pagination-btns"
        onClick={() => changePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
