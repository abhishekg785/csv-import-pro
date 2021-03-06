import * as React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import AppBar from '../../src/components/AppBar'

configure({ adapter: new Adapter() })

describe('AppBar', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<AppBar />);
    expect(wrapper).toMatchSnapshot();
  })
})
