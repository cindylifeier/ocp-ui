import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import PageSubtitle from '../PageSubtitle';

configure({ adapter: new Adapter() });

describe('<PageSubtitle />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<PageSubtitle>{children}</PageSubtitle>);

      // Arrange
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should contain children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<PageSubtitle>{children}</PageSubtitle>);

      // Arrange
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('styling tests', () => {
    it('should have styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<PageSubtitle>{children}</PageSubtitle>);

      // Arrange
      expect(renderedComponent).toHaveStyleRule('padding-left', '0.5vw');
      expect(renderedComponent).toHaveStyleRule('margin-top', '2vh');
      expect(renderedComponent).toHaveStyleRule('margin-left', '1vw');
      expect(renderedComponent).toHaveStyleRule('margin-right', '1vw');
      expect(renderedComponent).toHaveStyleRule('font-size', '1.2rem');
      expect(renderedComponent).toHaveStyleRule('font-weight', 'bold');
      expect(renderedComponent).toHaveStyleRule('color', '#444');
      expect(renderedComponent).toHaveStyleRule('background-color', '#f2f2f2');
    });
  });
});
