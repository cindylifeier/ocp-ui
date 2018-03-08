import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import StyledFieldGroupGrid from '../StyledFieldGroupGrid';
import { SYSTEM, VALUE } from '../constants';

configure({ adapter: new Adapter() });

describe('<StyledFieldGroupGrid />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<StyledFieldGroupGrid>{children}</StyledFieldGroupGrid>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<StyledFieldGroupGrid>{children}</StyledFieldGroupGrid>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should be grid', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<StyledFieldGroupGrid>{children}</StyledFieldGroupGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('display', 'grid');
    });

    it('should have default styles', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<StyledFieldGroupGrid>{children}</StyledFieldGroupGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr');
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', `"${SYSTEM}"    "${VALUE}"`);
    });

    it('should have styles in min-width: 768px', () => {
      // Arrange
      const children = <div>test</div>;
      const media = '(min-width: 768px)';

      // Act
      const renderedComponent = shallow(<StyledFieldGroupGrid>{children}</StyledFieldGroupGrid>);

      // Assert
      expect(renderedComponent).toHaveStyleRule('grid-template-columns', '1fr 2fr', { media });
      expect(renderedComponent).toHaveStyleRule('grid-template-areas', `"${SYSTEM} ${VALUE}"`, { media });
    });
  });
});
