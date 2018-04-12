import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import { MuiThemeProvider } from 'material-ui';
import NavigationMenu from '@material-ui/icons/Menu';

import StyledIconButton from '../index';

configure({ adapter: new Adapter() });

describe('<StyledIconButton />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Act
      const renderedComponent = shallow(<StyledIconButton><NavigationMenu /></StyledIconButton>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('style tests', () => {
    it('should have material-ui props for styling', () => {
      // Arrange
      const expectedProps = {
        style: { position: 'relative' },
        iconStyle: {
          width: '100%',
          height: 26,
          position: 'absolute',
          top: '0',
          right: '0',
        },
      };

      // Act
      const renderedComponent = shallow(<StyledIconButton><NavigationMenu /></StyledIconButton>);

      // Assert
      expect(renderedComponent.props().style).toEqual(expectedProps.style);
      expect(renderedComponent.props().iconStyle).toEqual(expectedProps.iconStyle);
    });

    it('should have styles from styled-components for svg descendant', () => {
      // Act
      const renderedComponent = mount(
        <MuiThemeProvider><StyledIconButton><NavigationMenu /></StyledIconButton></MuiThemeProvider>);

      // Assert
      expect(renderedComponent.find(StyledIconButton)).toHaveStyleRule('fill', 'rgb(51, 51, 51) !important', {
        modifier: ' svg',
      });
      expect(renderedComponent.find(StyledIconButton)).toHaveStyleRule('transition', 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', {
        modifier: ' svg',
      });
    });

    it('should have styles from styled-components for svg descendant in hover state', () => {
      // Act
      const renderedComponent = mount(
        <MuiThemeProvider><StyledIconButton><NavigationMenu /></StyledIconButton></MuiThemeProvider>);

      // Assert
      expect(renderedComponent.find(StyledIconButton)).toHaveStyleRule('fill', '#26a69a !important', {
        modifier: ':hover svg',
      });
    });
  });
});
