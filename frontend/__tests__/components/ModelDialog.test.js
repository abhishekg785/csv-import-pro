import * as React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ModelDialog from '../../src/components/ModelDialog'

configure({ adapter: new Adapter() })

describe('ModelDialog', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<ModelDialog />);
    expect(wrapper).toMatchSnapshot();
  })
})
