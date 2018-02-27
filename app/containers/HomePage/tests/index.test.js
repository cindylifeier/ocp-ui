import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'mock-local-storage';

import HomePage from '../index';

configure({ adapter: new Adapter() });

describe('<HomePage />', () => {
  describe('snapshot tests', () => {
    it('should render the page message', () => {
      // Act
      const renderedComponent = shallow(
        <HomePage />,
      );

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });
});
