/**
 *
 * TaskTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import MenuItem from 'material-ui/MenuItem';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import { MANAGE_TASK_URL } from 'containers/App/constants';
import messages from './messages';
import { STATUS_CODE_CANCELLED, TASK_TABLE_COLUMNS } from './constants';

function TaskTable({ elements, cancelTask, selectedPatientId }) {
  return (
    <Table>
      <TableHeader columns={TASK_TABLE_COLUMNS}>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderActivityType} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderPriority} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCreatedOn} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskPeriod} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCreatedBy} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskOwner} /></TableHeaderColumn>
        <TableHeaderColumn />
      </TableHeader>
      {!isEmpty(elements) && elements.map(({ logicalId, definition, status, priority, authoredOn, executionPeriod, agent, owner }) => (
        <TableRow key={logicalId} columns={TASK_TABLE_COLUMNS}>
          <TableRowColumn>{definition && definition.display}</TableRowColumn>
          <TableRowColumn>{status && status.display}</TableRowColumn>
          <TableRowColumn>{priority && priority.display}</TableRowColumn>
          <TableRowColumn>{authoredOn}</TableRowColumn>
          <TableRowColumn>{executionPeriod && executionPeriod.start} - {executionPeriod && executionPeriod.end} </TableRowColumn>
          <TableRowColumn>{agent && agent.display} </TableRowColumn>
          <TableRowColumn>{owner && owner.display} </TableRowColumn>
          <TableRowColumn>
            <NavigationStyledIconMenu>
              <MenuItem
                primaryText={<FormattedMessage {...messages.editTask} />}
                containerElement={<Link
                  to={{
                    pathname: `${MANAGE_TASK_URL}/${logicalId}`,
                    search: `?patientId=${selectedPatientId}&isMainTask=true`,
                  }}
                />}
              />
              <MenuItem
                primaryText={<FormattedMessage {...messages.addSubTask} />}
                containerElement={<Link
                  to={{
                    pathname: `${MANAGE_TASK_URL}`,
                    search: `?patientId=${selectedPatientId}&isMainTask=false&mainTaskId=${logicalId}`,
                  }}
                />}
              />
              <MenuItem
                primaryText={<FormattedMessage {...messages.cancelTask} />}
                disabled={status.code === STATUS_CODE_CANCELLED}
                onClick={() => cancelTask(logicalId)}
              />
            </NavigationStyledIconMenu>
          </TableRowColumn>
        </TableRow>
      ))}
    </Table>
  );
}

TaskTable.propTypes = {
  cancelTask: PropTypes.func.isRequired,
  selectedPatientId: PropTypes.string.isRequired,
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
