import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import MenuItem from 'material-ui/MenuItem';

import StyledIconButton from 'components/StyledIconButton';
import NavigationStyledIconMenu from '../NavigationStyledIconMenu';

configure({ adapter: new Adapter() });

describe('<NavigationStyledIconMenu />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const primaryText = 'primaryText';

      // Act
      const renderedComponent = shallow((
        <NavigationStyledIconMenu>
          <MenuItem primaryText={primaryText} />
        </NavigationStyledIconMenu>));

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('style tests', () => {
    it('should have material-ui props for styling', () => {
      // Arrange
      const expectedProps = {
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        targetOrigin: { horizontal: 'right', vertical: 'top' },
        iconButtonElement: (<StyledIconButton><NavigationMenu /></StyledIconButton>),
      };
      const primaryText = 'primaryText';

      // Act
      const renderedComponent = shallow((
        <NavigationStyledIconMenu>
          <MenuItem primaryText={primaryText} />
        </NavigationStyledIconMenu>));

      // Assert
      expect(renderedComponent.props().anchorOrigin).toEqual(expectedProps.anchorOrigin);
      expect(renderedComponent.props().targetOrigin).toEqual(expectedProps.targetOrigin);
      expect(renderedComponent.props().iconButtonElement).toEqual(expectedProps.iconButtonElement);
    });
  });
});
