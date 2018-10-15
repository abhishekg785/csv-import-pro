import * as React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SearchResult from '../../src/components/SearchResult'

configure({ adapter: new Adapter() })

describe('SearchResult', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<SearchResult />);
    expect(wrapper).toMatchSnapshot();
  })
})
