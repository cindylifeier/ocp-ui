import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import AddParticipantDialog from '../AddParticipantDialog';

configure({ adapter: new Adapter() });

describe('<AddParticipantDialog />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = (<span>test</span>);
      const props = { open: true };

      // Act
      const renderedComponent = shallow(<AddParticipantDialog {...props}>{children}</AddParticipantDialog>);

      // Assert
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should have children', () => {
      // Arrange
      const children = (<span>test</span>);
      const props = { open: true };

      // Act
      const renderedComponent = shallow(<AddParticipantDialog {...props}>{children}</AddParticipantDialog>);

      // Assert
      expect(renderedComponent.contains(children)).toEqual(true);
    });
  });

  describe('style tests', () => {
    it('should have material-ui props for styling', () => {
      // Arrange
      const children = (<span>test</span>);
      const props = { open: true };
      const expectedProps = {
        contentStyle: {
          width: '70%',
          maxWidth: 'none',
        },
      };

      // Act
      const renderedComponent = shallow(<AddParticipantDialog {...props}>{children}</AddParticipantDialog>);

      // Assert
      expect(renderedComponent.props().contentStyle).toEqual(expectedProps.contentStyle);
    });
  });
});
