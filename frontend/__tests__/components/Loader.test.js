import * as React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import CircularLoader from '../../src/components/CircularLoader'

configure({ adapter: new Adapter() })

describe('CircularLoader', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<CircularLoader />);
    expect(wrapper).toMatchSnapshot();
  })
})
