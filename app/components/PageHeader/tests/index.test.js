import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import { Divider } from 'material-ui';

import PageHeader from '../index';
import PageHeaderWrapper from '../PageHeaderWrapper';

configure({ adapter: new Adapter() });

describe('<PageHeader />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<PageHeader>{children}</PageHeader>);

      // Arrange
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should contain children', () => {
      // Arrange
      const children = <div>test</div>;

      // Act
      const renderedComponent = shallow(<PageHeader>{children}</PageHeader>);

      // Arrange
      expect(renderedComponent.contains(children)).toEqual(true);
    });

    it('should contain <PageHeaderWrapper>{children}</PageHeaderWrapper>', () => {
      // Arrange
      const children = <div>test</div>;
      const expected = (<PageHeaderWrapper>{children}</PageHeaderWrapper>);

      // Act
      const renderedComponent = shallow(<PageHeader>{children}</PageHeader>);

      // Arrange
      expect(renderedComponent.contains(expected)).toEqual(true);
    });

    it('should contain <Divider />', () => {
      // Arrange
      const children = <div>test</div>;
      const expected = (<Divider />);

      // Act
      const renderedComponent = shallow(<PageHeader>{children}</PageHeader>);

      // Arrange
      expect(renderedComponent.contains(expected)).toEqual(true);
    });
  });
});
