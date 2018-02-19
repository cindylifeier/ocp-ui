import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import TableRowStyledGrid from '../TableRowStyledGrid';

configure({ adapter: new Adapter() });

describe('<TableRowStyledGrid />', () => {
  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowStyledGrid>{children}</TableRowStyledGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowStyledGrid>{children}</TableRowStyledGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have border-bottom', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowStyledGrid>{children}</TableRowStyledGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('border-bottom', '1px outset rgb(51, 51, 51)');
    });

    it('should have first-child styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowStyledGrid>{children}</TableRowStyledGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('background-color', '#f2f2f2', {
        modifier: ':first-child',
      });
      expect(renderedComponent).toHaveStyleRule('font-size', '20px', {
        modifier: ':first-child',
      });
    });

    it('should have nth-child styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowStyledGrid>{children}</TableRowStyledGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('background-color', '#f2f2f2', {
        modifier: ':nth-child(odd)',
      });
    });

    it('should have hover styles', () => {
      // Arrange
      const children = (<span>test</span>);

      // Act
      const renderedComponent = shallow(<TableRowStyledGrid>{children}</TableRowStyledGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('background-color', '#dce4ef', {
        modifier: ':hover',
      });
      expect(renderedComponent).toHaveStyleRule('cursor', 'pointer', {
        modifier: ':hover',
      });
    });
  });
});
