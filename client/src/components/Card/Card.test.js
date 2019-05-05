import React from 'react'
import { shallow } from 'enzyme'
import Card from './index'

test('renders without crashing', () => {
  console.log(shallow(<Card />))
})
