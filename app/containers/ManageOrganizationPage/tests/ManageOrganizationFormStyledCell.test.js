import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import ManageOrganizationFormStyledCell from '../ManageOrganizationFormStyledCell';

configure({ adapter: new Adapter() });

describe('<ManageOrganizationFormStyledCell />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageOrganizationFormStyledCell>{children}</ManageOrganizationFormStyledCell>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageOrganizationFormStyledCell>{children}</ManageOrganizationFormStyledCell>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should have border-radius and font-size', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ManageOrganizationFormStyledCell>{children}</ManageOrganizationFormStyledCell>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('border-radius', '5px');
      expect(renderedComponent).toHaveStyleRule('font-size', '100%');
    });
  });
});
