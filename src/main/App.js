import './App.css'

import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Cart from '../cart/Cart'
import BookDetails from '../store/BookDetails'
import Library from '../store/Library'
import BooksFilter from '../store/BooksFilter'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filteredBooks: [],
      cart: {},
	  bookDetails: {},
      cartItemAmount: 0,
    }
    this.books = []
    this.filter = React.createRef();
  }

  componentDidMount() {
    fetch('http://henri-potier.xebia.fr/books')
      .then((response) => {
        return response.json()
      })
      .then((myJson) => {
        this.books = myJson
        this.setState({ filteredBooks: myJson })
      })
  }
  
  showDetails = (book) => {
		const bookDetails = this.state.bookDetails
		bookDetails.isbn = book.isbn
		bookDetails.title = book.title
		bookDetails.cover = book.cover
		bookDetails.synopsis = book.synopsis[0]

    this.setState({ bookDetails })
	}
	
  handlePopup() {
        this.setState({bookDetails:{}});
    }

  handleAddToCart = (book) => {
    const cart = this.state.cart
	
    if (book.isbn in this.state.cart) {
      cart[book.isbn].amount += 1
    } else {
      cart[book.isbn] = {
        title: book.title,
        price: book.price,
        cover: book.cover,
        amount: 1,
      }
    }

    const cartItemAmount = this.state.cartItemAmount + 1

    this.setState({
      cart,
      cartItemAmount,
    })
	  
  }

  handleFilter = () => {
    const filter = this.filter.current.value

    var regex = RegExp(`.*${filter}.*`, 'i')

    const books = this.books.filter((book) => {
      return regex.test(book.title)
        //|| regex.test(book.synopsis.join()) /*decommenter si vous souhaitez que la recherche d'un livre se fait sur le titre et le descriptif */
    })

    this.setState({
      filteredBooks: books,
    })
  }

  render() {
    return (
      <div className="App  flex-container">
        <Switch>
          <Route exact={true} path="/" render={() =>
		  <div className="flex-container">
            <Library books={this.state.filteredBooks} handleAddToCart={this.handleAddToCart} showDetails={this.showDetails} cartItemAmount={this.state.cartItemAmount}>
              <BooksFilter filterRef={this.filter} handleFilter={this.handleFilter} />
            </Library>
			{Object.entries(this.state.bookDetails).length > 0 && <BookDetails changeApp={() => this.handlePopup()} bookDetails={this.state.bookDetails} />}
			</div>
          } />
          <Route exact={true} path="/cart" render={() =>
            <Cart cart={this.state.cart} cartItemAmount={this.state.cartItemAmount} />
          } />
          <Route render={() => <div>404 : Not found</div>} />
        </Switch>
      </div >
    )
  }
}

export default App
