import React from 'react';
import { shallow } from 'enzyme';

import Table from '../index';
import TableHeaderColumn from '../../TableHeaderColumn';
import TableHeader from '../../TableHeader';
import TableRow from '../../TableRow';
import TableRowColumn from '../../TableRowColumn';

describe('<Table />', () => {
  it('shoud match snapshot', () => {
    // Act
    const renderedComponent = shallow(
      (<Table>
        <TableHeader>
          <TableHeaderColumn>Col</TableHeaderColumn>
        </TableHeader>
        <TableRow>
          <TableRowColumn>Row</TableRowColumn>
        </TableRow>
      </Table>),
    );

    // Assert
    expect(renderedComponent).toMatchSnapshot();
  });
})
;
