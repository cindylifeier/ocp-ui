import React from 'react';
import { shallow } from 'enzyme';

import TableRowColumn from '../index';

describe('<TableRowColumn />', () => {
  it('should match snapshot', () => {
    // Act
    const renderedComponent = shallow(
      (<TableRowColumn>Row</TableRowColumn>),
    );

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
});
