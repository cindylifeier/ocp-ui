import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import PatientsPageStyledGrid from '../PatientsPageStyledGrid';

configure({ adapter: new Adapter() });

describe('<PatientsPageStyledGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<PatientsPageStyledGrid>{children}</PatientsPageStyledGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<PatientsPageStyledGrid>{children}</PatientsPageStyledGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<PatientsPageStyledGrid>{children}</PatientsPageStyledGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<PatientsPageStyledGrid>{children}</PatientsPageStyledGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('color', '#444');
      expect(renderedComponent).toHaveStyleRule('width', 'auto');
      expect(renderedComponent).toHaveStyleRule('background-color', '#fff');
      expect(renderedComponent).toHaveStyleRule('margin', '0 auto');
    });
  });
});
