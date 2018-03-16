import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'mock-local-storage';

import { Authentication } from '../index';

configure({ adapter: new Adapter() });

describe('<Authentication />', () => {
  it('should match snapshot', () => {
    // Arrange
    const isAuthenticated = true;
    const auth = {
      isAuthenticated,
    };
    const workspace = {
      workflowRole: 'Patient',
    };
    const location = '/test-location';
    const props = {
      auth,
      workspace,
      location,
    };

    // Act
    const renderedComponent = shallow(<Authentication {...props} />);

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
});
