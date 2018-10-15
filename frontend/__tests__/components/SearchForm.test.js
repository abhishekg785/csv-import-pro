import * as React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import SearchForm from '../../src/components/SearchForm'

configure({ adapter: new Adapter() })

describe('SearchForm', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<SearchForm />);
    expect(wrapper).toMatchSnapshot();
  })
})
