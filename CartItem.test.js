import React from 'react';
import { shallow } from 'enzyme'
import CartItem from './CartItem'

describe('<CartItem />', () => {

  const item = {
    "title": "Henri Potier à l'école des sorciers",
    "price": 35,
    "amount": 2,
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<CartItem item={item} />)
  })
})
