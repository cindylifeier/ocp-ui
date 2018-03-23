import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import 'jest-styled-components';
import TodoCard from 'components/TodoCard/index';


configure({ adapter: new Adapter() });

describe('<TodoCard />', () => {
  it('should have children', () => {
    // Arrange
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<TodoCard>{children}</TodoCard>);

    // Assert
    expect(renderedComponent.contains(children)).toEqual(true);
  });

  it('should have styles', () => {
    // Arrange
    const children = (<span>test</span>);

    // Act
    const renderedComponent = shallow(<TodoCard>{children}</TodoCard>);

    // Assert
    expect(renderedComponent).toHaveStyleRule('padding', '4px !important');
    expect(renderedComponent).toHaveStyleRule('background-color', 'white');
    expect(renderedComponent).toHaveStyleRule('margin-top', '10px');
    expect(renderedComponent).toHaveStyleRule('min-width', '650px');
    expect(renderedComponent).toHaveStyleRule('min-height', '150px');
    expect(renderedComponent).toHaveStyleRule('height', '100%');
    expect(renderedComponent).toHaveStyleRule('border-radius', '2px');
    expect(renderedComponent).toHaveStyleRule('position', 'relative');
    expect(renderedComponent).toHaveStyleRule('box-shadow', '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)');
    expect(renderedComponent).toHaveStyleRule('transition', 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)');
    expect(renderedComponent).toHaveStyleRule('box-shadow', '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)', {
      modifier: ':hover',
    });
  });
});
