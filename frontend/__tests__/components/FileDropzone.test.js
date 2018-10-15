import * as React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import FileDropzone from '../../src/components/FileDropzone'

configure({ adapter: new Adapter() })

describe('FileDropzone', () => {
  test('renders correctly', () => {
    const wrapper = shallow(<FileDropzone />);
    expect(wrapper).toMatchSnapshot();
  })
})
