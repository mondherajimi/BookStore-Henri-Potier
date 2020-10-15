import React from 'react'
import PropTypes from 'prop-types'

function CartItem({ item }) {
  return (
    <div className="CartItem  flex-container">
      <span className="w80  prs">{item.title}</span>
      <span className="w20  txtright">{item.amount}&nbsp;x&nbsp;{item.price}&nbsp;€</span>
    </div>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
}

export default CartItem
