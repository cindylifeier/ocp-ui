/**
*
* TaskTable
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

function TaskTable({ elements }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderActivityType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderPriority} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCreatedOn} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskPeriod} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCreatedBy} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskOwner} /></TableHeaderColumn>
        </TableHeader>
        {!isEmpty(elements) && elements.map(({ logicalId, definition, status, priority, authoredOn, executionPeriod, agent, owner }) => (
          <TableRow key={logicalId}>
            <TableRowColumn>{definition && definition.display}</TableRowColumn>
            <TableRowColumn>{status && status.display}</TableRowColumn>
            <TableRowColumn>{priority && priority.display}</TableRowColumn>
            <TableRowColumn>{authoredOn}</TableRowColumn>
            <TableRowColumn>{executionPeriod && executionPeriod.start } - {executionPeriod && executionPeriod.end } </TableRowColumn>
            <TableRowColumn>{agent && agent.display } </TableRowColumn>
            <TableRowColumn>{owner && owner.display } </TableRowColumn>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

TaskTable.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    definition: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    status: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
    priority: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
    authoredOn: PropTypes.string,
    executionPeriod: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string,
    }),
    agent: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
    owner: PropTypes.shape({
      reference: PropTypes.string,
      display: PropTypes.string,
    }),
  })),
};

export default TaskTable;
