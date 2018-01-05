import React from 'react';
import { mount, shallow } from 'enzyme';
import withContext from '../withContext';

const children = (<h1>Test</h1>);

function SampleFunctionalComponentWithoutAnyName() {
  return children;
}

function SampleFunctionalComponentWithDisplayName() {
  return children;
}

SampleFunctionalComponentWithDisplayName.displayName = 'SampleFunctionalComponentWithDisplayName';

class SampleClassComponent extends React.PureComponent {
  render() {
    return children;
  }
}

describe('withContext', () => {
  it('should export a default withContext function', () => {
    // Assert
    expect(withContext).not.toBeNull();
    expect(typeof withContext).toBe('function');
  });

  it('should wrap functional component without any name and render', () => {
    // Arrange
    const toBeWrappedComponent = SampleFunctionalComponentWithoutAnyName;
    const WrappedComponent = withContext(toBeWrappedComponent);

    // Act
    const renderedComponent = shallow(
      WrappedComponent
    );

    // Assert
    expect(WrappedComponent.type.prototype).toBeInstanceOf(React.Component);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should wrap functional component with display name and render', () => {
    // Arrange
    const toBeWrappedComponent = SampleFunctionalComponentWithDisplayName;
    const WrappedComponent = withContext(toBeWrappedComponent);

    // Act
    const renderedComponent = shallow(
      WrappedComponent
    );

    // Assert
    expect(WrappedComponent.type.prototype).toBeInstanceOf(React.Component);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should to wrap class component and render', () => {
    // Arrange
    const toBeWrappedComponent = SampleClassComponent;
    const WrappedComponent = withContext(toBeWrappedComponent);

    // Act
    const renderedComponent = shallow(
      WrappedComponent
    );

    // Assert
    expect(WrappedComponent.type.prototype).toBeInstanceOf(toBeWrappedComponent);
    expect(renderedComponent).toMatchSnapshot();
  });

  it('should render children of functional component without any name', () => {
    // Arrange
    const toBeWrappedComponent = SampleFunctionalComponentWithoutAnyName;
    const WrappedComponent = withContext(toBeWrappedComponent);

    // Act
    const renderedComponent = mount(
      WrappedComponent
    );

    // Assert
    expect(WrappedComponent.type.prototype).toBeInstanceOf(React.Component);
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render children of functional component with display name', () => {
    // Arrange
    const toBeWrappedComponent = SampleFunctionalComponentWithoutAnyName;
    const WrappedComponent = withContext(toBeWrappedComponent);

    // Act
    const renderedComponent = mount(
      WrappedComponent
    );

    // Assert
    expect(WrappedComponent.type.prototype).toBeInstanceOf(React.Component);
    expect(renderedComponent.contains(children)).toBe(true);
  });

  it('should render children of class component', () => {
    // Arrange
    const toBeWrappedComponent = SampleClassComponent;
    const WrappedComponent = withContext(toBeWrappedComponent);

    // Act
    const renderedComponent = mount(
      WrappedComponent
    );

    // Assert
    expect(WrappedComponent.type.prototype).toBeInstanceOf(toBeWrappedComponent);
    expect(renderedComponent.contains(children)).toBe(true);
  });
});
