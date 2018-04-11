import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import { MuiThemeProvider } from 'material-ui';
import ContentAddCircle from '@material-ui/icons/AddCircle';

import StyledFlatButton from '../index';

configure({ adapter: new Adapter() });

describe('<StyledFlatButton />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const label = 'label';

      // Act
      const renderedComponent = shallow(<StyledFlatButton label={label} icon={<ContentAddCircle />} />);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('style tests', () => {
    it('should have color style', () => {
      // Arrange
      const label = 'label';

      // Act
      const renderedComponent = mount(<MuiThemeProvider><StyledFlatButton label={label} /></MuiThemeProvider>);

      // Assert
      expect(renderedComponent.find(StyledFlatButton)).toHaveStyleRule('color', '#366 !important');
    });

    it('should have svg styles', () => {
      // Arrange
      const label = 'label';

      // Act
      const renderedComponent = mount(<MuiThemeProvider><StyledFlatButton label={label} /></MuiThemeProvider>);

      // Assert
      expect(renderedComponent.find(StyledFlatButton)).toHaveStyleRule('fill', '#d2d2c3 !important', {
        modifier: ' svg',
      });
      expect(renderedComponent.find(StyledFlatButton)).toHaveStyleRule('transition', 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', {
        modifier: ' svg',
      });
    });

    it('should have svg styles in hover state', () => {
      // Arrange
      const label = 'label';

      // Act
      const renderedComponent = mount(<MuiThemeProvider><StyledFlatButton label={label} /></MuiThemeProvider>);

      // Assert
      expect(renderedComponent.find(StyledFlatButton)).toHaveStyleRule('fill', '#366 !important', {
        modifier: ':hover svg',
      });
    });
  });
});
