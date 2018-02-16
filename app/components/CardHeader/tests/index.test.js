import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';

import CardHeader from '../index';

configure({ adapter: new Adapter() });

describe('<CardHeader />', () => {
  it('should have children', () => {
    // Arrange
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<CardHeader>{children}</CardHeader>);

    // Assert
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should have styles', () => {
    // Arrange
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<CardHeader>{children}</CardHeader>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('font-size', '1.3rem');
    expect(renderedComponent).toHaveStyleRule('font-weight', 'bold');
    expect(renderedComponent).toHaveStyleRule('color', '#336666');
  });
});
