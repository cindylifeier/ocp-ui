/**
 *
 * UpcomingTaskTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import messages from './messages';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';

function UpcomingTaskTable({ elements }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderPatientName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderActivityType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTask} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskStartDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskEndDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
          <TableHeaderColumn />
        </TableHeader>
        {!isEmpty(elements) && elements.map(({ id, benificiary, definition, description, executionPeriod }) => (
          <TableRow key={id}>
            <TableRowColumn>{benificiary.display}</TableRowColumn>
            <TableRowColumn>{definition.display}</TableRowColumn>
            <TableRowColumn>{description}</TableRowColumn>
            <TableRowColumn>{executionPeriod.start}</TableRowColumn>
            <TableRowColumn>{executionPeriod.end}</TableRowColumn>
            <TableRowColumn>...</TableRowColumn>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

UpcomingTaskTable.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    benificiary: PropTypes.object.isRequired,
    definition: PropTypes.object,
    description: PropTypes.string,
    executionPeriod: PropTypes.object,
  })),
};

export default UpcomingTaskTable;

