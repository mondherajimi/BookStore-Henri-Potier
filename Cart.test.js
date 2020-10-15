import React from 'react';
import { shallow } from 'enzyme'
import Cart from './Cart'

describe('<Cart />', () => {

  const cart = {
    "c8fabf68-8374-48fe-a7ea-a00ccd07afff": {
      "title": "Henri Potier à l'école des sorciers",
      "price": 35,
      "amount": 2,
    }
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<Cart cart={cart} />)
  })
})
