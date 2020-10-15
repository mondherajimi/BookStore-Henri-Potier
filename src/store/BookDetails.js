import './BookDetails.css'

import React, { Component } from 'react'

class BookDetails extends Component {
	
 render() {
  return (
          <aside className="BookDetails  item-fluid  pas">
    <article className="Book  media  mbm">
        <div className="h6-like">{this.props.bookDetails.synopsis}...<br /><br />
		<span className="BookDetails__link">Acheter pour lire la suite</span>
		</div>
    </article>
		<div className="u-txt-center  mts">
		  <button className="BookDetails__close" type="button" onClick={this.props.changeApp}>X</button>
		</div>
	  </aside>
  )
}

}

export default BookDetails
