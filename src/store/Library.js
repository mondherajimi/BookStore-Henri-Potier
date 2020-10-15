import './Library.css'
import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import Nav from '../main/Nav'

function Library({ books, handleAddToCart, showDetails, cartItemAmount, children }) {
  return (
    <main role="main" className="Library  w66  small-w100  tiny-w100  pas">
	<div className="Library__nav">
      <h1>La bibliothèque d'Henri&nbsp;Potier</h1>
      <Nav cartItemAmount={cartItemAmount} />
	  </div>
      {children}
      <ul className="is-unstyled  grid-3-small-2  has-gutter">
        {books.map((book) =>
          <li key={book.isbn}>
            <Book book={book} handleAddToCart={handleAddToCart} showDetails={showDetails} />
          </li>
        )}
      </ul>
    </main>
  )
}

Library.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      cover: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
}

export default Library
