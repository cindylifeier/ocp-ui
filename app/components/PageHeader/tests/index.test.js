import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import { Divider } from 'material-ui';

import PageHeader from '../index';
import PageTitle from '../PageTitle';
import PageSubtitle from '../PageSubtitle';

configure({ adapter: new Adapter() });

describe('<PageHeader />', () => {
  describe('snapshot tests', () => {
    it('should match snapshot', () => {
      // Arrange
      const title = <div>title</div>;
      const subtitle = <div>subtitle</div>;

      // Act
      const renderedComponent = shallow(<PageHeader title={title} subtitle={subtitle}></PageHeader>);

      // Arrange
      expect(renderedComponent).toMatchSnapshot();
    });
  });

  describe('structural tests', () => {
    it('should contain title', () => {
      // Arrange
      const title = <div>title</div>;
      const subtitle = <div>subtitle</div>;

      // Act
      const renderedComponent = shallow(<PageHeader title={title} subtitle={subtitle}></PageHeader>);

      // Arrange
      expect(renderedComponent.contains(title)).toEqual(true);
    });

    it('should contain subtitle', () => {
      // Arrange
      const title = <div>title</div>;
      const subtitle = <div>subtitle</div>;

      // Act
      const renderedComponent = shallow(<PageHeader title={title} subtitle={subtitle}></PageHeader>);

      // Arrange
      expect(renderedComponent.contains(subtitle)).toEqual(true);
    });

    it('should contain <PageTitle>{title}</PageTitle>', () => {
      // Arrange
      const title = <div>title</div>;
      const subtitle = <div>subtitle</div>;
      const expected = (<PageTitle>{title}</PageTitle>);

      // Act
      const renderedComponent = shallow(<PageHeader title={title} subtitle={subtitle}></PageHeader>);

      // Arrange
      expect(renderedComponent.contains(expected)).toEqual(true);
    });

    it('should contain <PageSubtitle>{title}</PageSubtitle>', () => {
      // Arrange
      const title = <div>title</div>;
      const subtitle = <div>subtitle</div>;
      const expected = (<PageSubtitle>{subtitle}</PageSubtitle>);

      // Act
      const renderedComponent = shallow(<PageHeader title={title} subtitle={subtitle}></PageHeader>);

      // Arrange
      expect(renderedComponent.contains(expected)).toEqual(true);
    });

    it('should not contain <PageSubtitle>{title}</PageSubtitle>', () => {
      // Arrange
      const title = <div>title</div>;
      const expected = (<PageSubtitle>{title}</PageSubtitle>);

      // Act
      const renderedComponent = shallow(<PageHeader title={title}></PageHeader>);

      // Arrange
      expect(renderedComponent.contains(expected)).toEqual(false);
    });

    it('should contain <Divider />', () => {
      // Arrange
      const title = <div>title</div>;
      const subtitle = <div>subtitle</div>;
      const expected = (<Divider />);

      // Act
      const renderedComponent = shallow(<PageHeader title={title} subtitle={subtitle}></PageHeader>);

      // Arrange
      expect(renderedComponent.contains(expected)).toEqual(true);
    });
  });
});
