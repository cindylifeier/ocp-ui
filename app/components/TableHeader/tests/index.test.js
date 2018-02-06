import React from 'react';
import { shallow } from 'enzyme';

import TableHeader from '../index';
import TableHeaderColumn from '../../TableHeaderColumn';

describe('<TableHeader />', () => {
  it('should match snapshot', () => {
    // Act
    const renderedComponent = shallow(
      (<TableHeader>
        <TableHeaderColumn>Col</TableHeaderColumn>
      </TableHeader>),
    );

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
});
