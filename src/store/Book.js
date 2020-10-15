import './Book.css'

import React from 'react'
import PropTypes from 'prop-types'

function Book({ book, handleAddToCart, showDetails }) {
  return (
    <article className="Book  media  mbm">
      <img className="Book__cover  media-figure  w25" src={book.cover} alt="" onClick={() => showDetails(book)} />
      <div className="Book__content  media-content  flex-container--column">
        <h2 className="h5-like">{book.title}</h2>
        <div className="Book__price">{book.price}&nbsp;€</div>
        <button type="button" onClick={() => handleAddToCart(book)}>Acheter</button>
      </div>
    </article>
  )
}

Book.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  showDetails: PropTypes.func.isRequired,
}

export default Book
