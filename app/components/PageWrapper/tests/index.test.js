import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import PageWrapper from '../index';

configure({ adapter: new Adapter() });

describe('<PageWrapper />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<PageWrapper>{children}</PageWrapper>);

      // Arrange
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should contain children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<PageWrapper>{children}</PageWrapper>);

      // Arrange
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('styling tests', () => {
    it('should have styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<PageWrapper>{children}</PageWrapper>);

      // Arrange
      expect(renderedComponent).toHaveStyleRule('background-color', 'white');
    });
  });
});
