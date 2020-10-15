import './Cart.css'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CartItem from './CartItem'
import Nav from '../main/Nav'

class Cart extends Component {

  state = {
    totalPrice: 0,
    bestOffer: 0,
  }

  componentDidMount() {
    this.calculatePrice(this.props.cart)
  }

  componentWillReceiveProps({ cart }) {
    this.calculatePrice(cart)
  }

  calculatePrice(cart) {
    /* calculate the total price */
    var totalPrice = 0
    Object.keys(cart).forEach((key) => {
      const item = cart[key]
      totalPrice += (item.amount * item.price)
    })
    this.setState({ totalPrice })

    /* calculate the best offer */
    fetch(`http://henri-potier.xebia.fr/books/${Object.keys(cart).join()}/commercialOffers`)
      .then((response) => {
        return response.json()
      })
      .then((myJson) => {
        const bestOffer = this.calculatebestOffer(totalPrice, myJson.offers)
        this.setState({ bestOffer })
      })
  }

  calculatebestOffer(price, offers) {
    const proposedOffers = []
    offers.forEach((offer) => {
      if (offer.type === 'percentage') {
        proposedOffers.push(price - (price * offer.value / 100))
      } else if (offer.type === 'minus') {
        proposedOffers.push(price - offer.value)
      }
      else if (offer.type === 'slice') {
        const slices = Math.floor(price / offer.sliceValue)
        proposedOffers.push(price - slices * offer.value)
      }
    })
    return Math.min(...proposedOffers)
  }

  render() {
    return (
      <main className="Cart  item-fluid  pas">
        <h1>Mon panier</h1>
        <Nav cartItemAmount={this.props.cartItemAmount} />
        {Object.entries(this.props.cart).length > 0 ? (
          <div>
            <ul className="Cart__list  is-unstyled">
              {Object.keys(this.props.cart).map((key) =>
                <li key={key}>
                  <CartItem item={this.props.cart[key]} />
                </li>
              )}
            </ul>
            <div className="u-txt-right">
              Total : {this.state.totalPrice}&nbsp;€
              </div>
            <div className="u-txt-center  mts">
              Prix Initial <span className="u-txt-line-through">{this.state.totalPrice}&nbsp;€</span><br />
			  <button className="Cart__buy  btn--primary">Offre Promo {this.state.bestOffer}&nbsp;€</button>
            </div>
          </div>
        ) : (
            <div>
              Votre panier est vide.<br />
            </div>
          )}
      </main>
    )
  }
}

Cart.propTypes = {
  cart: PropTypes.objectOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
}

export default Cart
