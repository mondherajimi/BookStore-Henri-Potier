import './BooksFilter.css'

import React from 'react'
import PropTypes from 'prop-types'

function BooksFilter({ filterRef, handleFilter }) {
  return (
    <form className="BooksFilter  mbs" onSubmit={(event) => event.preventDefault()}>
      <label className="visually-hidden" htmlFor="BooksFilter__filter">
        Filtrer les livres :
      </label>
      <input
        className="BooksFilter__filter"
        onChange={handleFilter}
        id="BooksFilter__filter"
        name="BooksFilter__filter"
        ref={filterRef}
        type="text"
      />

    </form>
  )
}

BooksFilter.propTypes = {
  filterRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  handleFilter: PropTypes.func.isRequired,
}

export default BooksFilter
