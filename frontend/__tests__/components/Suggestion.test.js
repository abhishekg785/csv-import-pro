import * as React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Suggestion from '../../src/components/Suggestion'

configure({ adapter: new Adapter() })

describe('Suggestion', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<Suggestion />);
    expect(wrapper).toMatchSnapshot();
  })
})
