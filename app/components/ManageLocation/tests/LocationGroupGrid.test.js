import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import LocationGroupGrid from '../LocationGroupGrid';

configure({ adapter: new Adapter() });

describe('<LocationGroupGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<LocationGroupGrid>{children}</LocationGroupGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<LocationGroupGrid>{children}</LocationGroupGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<LocationGroupGrid>{children}</LocationGroupGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have default styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<LocationGroupGrid>{children}</LocationGroupGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr');
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"physicalType"    "managingLocationLogicalId"');
    });

    it('should have styles in min-width: 768px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = '(min-width: 768px)';

      // Act
      const renderedComponent = shallow(<LocationGroupGrid>{children}</LocationGroupGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr 2fr', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', '"physicalType managingLocationLogicalId"', { media });
    });
  });
});
