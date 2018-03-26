import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'mock-local-storage';

import { ShowingByRoleWrapper } from '../index';

configure({ adapter: new Adapter() });

describe('<ShowingByRoleWrapper />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;
      const role = 'ocpAdminRole';
      const user = { role };
      const showingForRoles = ['ocpAdminRole'];
      const props = {
        user,
        showingForRoles,
      };

      // Act
      const renderedComponent = shallow(<ShowingByRoleWrapper {...props} >{children}</ShowingByRoleWrapper>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;
      const role = 'ocpAdminRole';
      const user = { role };
      const showingForRoles = ['ocpAdminRole'];
      const props = {
        user,
        showingForRoles,
      };

      // Act
      const renderedComponent = shallow(<ShowingByRoleWrapper {...props}>{children}</ShowingByRoleWrapper>);

      // Assert
      expect(renderedComponent.contains(children)).toBeTruthy();
    });
  });
});
