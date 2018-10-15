import * as React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Button from '../../src/components/Button'

configure({ adapter: new Adapter() })

describe('Button', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper).toMatchSnapshot();
  })
})
