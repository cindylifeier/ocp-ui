import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'mock-local-storage';

import { GoBackButton } from '../index';

configure({ adapter: new Adapter() });

describe('<GoBackButton />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const label = 'goBackButton';
      const isDisabled = false;
      const props = {
        label,
        isDisabled,
      };

      // Act
      const renderedComponent = shallow(<GoBackButton {...props} />);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
