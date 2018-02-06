import React from 'react';
import { shallow } from 'enzyme';

import TableHeaderColumn from '../index';

describe('<TableHeaderColumn />', () => {
  it('should match snapshot', () => {
    // Act
    const renderedComponent = shallow(
      (<TableHeaderColumn>Col</TableHeaderColumn>));

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
});
