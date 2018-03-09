import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import { Cell } from 'styled-css-grid';

import ValueCell from '../ValueCell';
import { VALUE } from '../constants';

configure({ adapter: new Adapter() });

describe('<ValueCell />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot with default area', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ValueCell>{children}</ValueCell>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });

    it('should match snapshot with configured area', () => {
      // Arrange
      const children = <div>test</div>;
      const area = 'area';

      // Act
      const renderedComponent = shallow(<ValueCell area={area}>{children}</ValueCell>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<ValueCell>{children}</ValueCell>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });

    it('should use default area when not passed', () => {
      // Arrange
      const children = <div>test</div>;
      const expectedComponent = <Cell area={VALUE}>{children}</Cell>;

      // Act
      const renderedComponent = shallow(<ValueCell>{children}</ValueCell>);

      // Assert
      expect(renderedComponent.contains(expectedComponent)).toEqual(true);
    });

    it('should use passed area when passed', () => {
      // Arrange
      const children = <div>test</div>;
      const area = 'area';
      const expectedComponent = <Cell area={area}>{children}</Cell>;

      // Act
      const renderedComponent = shallow(<ValueCell area={area}>{children}</ValueCell>);

      // Assert
      expect(renderedComponent.contains(expectedComponent)).toEqual(true);
    });
  });
});