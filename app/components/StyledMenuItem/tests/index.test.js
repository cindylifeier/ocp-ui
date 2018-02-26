import React from 'react';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import { MuiThemeProvider } from 'material-ui';

import StyledMenuItem from '../index';


configure({ adapter: new Adapter() });

describe('<StyledMenuItem />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const primaryText = 'primaryText';

      // Act
      const renderedComponent = shallow(<StyledMenuItem primaryText={primaryText} />);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('style tests', () => {
    it('should have styles', () => {
      // Arrange
      const primaryText = 'primaryText';

      // Act
      const renderedComponent = mount((
        <MuiThemeProvider>
          <StyledMenuItem primaryText={primaryText} />
        </MuiThemeProvider>));

      // Assert
      expect(renderedComponent.find(StyledMenuItem)).toHaveStyleRule('display', 'inline-block');
    });
  });
});
