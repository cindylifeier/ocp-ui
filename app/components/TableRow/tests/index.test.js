import React from 'react';
import { shallow } from 'enzyme';

import TableRow from '../index';
import TableRowColumn from '../../TableRowColumn';

describe('<TableRow />', () => {
  it('should match snapshot', () => {
    // Act
    const renderedComponent = shallow(
      (<TableRow>
        <TableRowColumn>Row</TableRowColumn>
      </TableRow>)
    );

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
});
