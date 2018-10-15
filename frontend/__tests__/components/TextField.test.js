import * as React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import TextField from '../../src/components/TextField'

configure({ adapter: new Adapter() })

describe('TextField', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<TextField />);
    expect(wrapper).toMatchSnapshot();
  })
})
