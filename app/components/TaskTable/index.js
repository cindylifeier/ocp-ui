/**
 *
 * TaskTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import sizeMeHOC from 'utils/SizeMeUtils';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import {
  EXPANDED_TABLE_COLUMNS,
  SUMMARIZED_TABLE_COLUMNS,
  STATUS_CODE_CANCELLED,
  SUMMARY_VIEW_WIDTH,
} from 'components/TaskTable/constants';
import messages from './messages';

function TaskTable({ elements, cancelTask, patientId, communicationBaseUrl, taskBaseUrl, relativeTop, size }) {
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
  function createTableHeaders() {
    const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
    return (
      <TableHeader columns={columns} relativeTop={relativeTop}>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderActivityType} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
        {isExpanded &&
          <div>
            <TableHeaderColumn> <FormattedMessage {...messages.columnHeaderDescription} /></TableHeaderColumn>
            <TableHeaderColumn> <FormattedMessage {...messages.columnHeaderCreatedOn} /></TableHeaderColumn>
          </div>
        }
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskPeriod} /></TableHeaderColumn>
        {isExpanded &&
        <div>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCreatedBy} /></TableHeaderColumn>
          <TableHeaderColumn> <FormattedMessage {...messages.columnHeaderTaskOwner} /></TableHeaderColumn>
        </div>
        }
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
      </TableHeader>
    );
  }

  function createTableRows(logicalId, definition, status, description, authoredOn, executionPeriod, agent, owner, menuItems) {
    const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
    return (
      <TableRow key={logicalId} columns={columns}>
        <TableRowColumn>{definition && definition.display}</TableRowColumn>
        <TableRowColumn>{status && status.display}</TableRowColumn>
        {isExpanded &&
          <div>
            <TableRowColumn>{description}</TableRowColumn>
            <TableRowColumn>{authoredOn}</TableRowColumn>
          </div>
        }
        <TableRowColumn>{executionPeriod && executionPeriod.start}
          - {executionPeriod && executionPeriod.end} </TableRowColumn>
        {isExpanded &&
        <div>
          <TableRowColumn>{agent && agent.display} </TableRowColumn>
          <TableRowColumn>{owner && owner.display} </TableRowColumn>
        </div>
        }
        <TableRowColumn>
          <NavigationIconMenu menuItems={menuItems} />
        </TableRowColumn>
      </TableRow>
    );
  }

  return (
    <Table>
      {createTableHeaders()}
      {!isEmpty(elements) && elements.map(({ logicalId, definition, status, description, authoredOn, executionPeriod, agent, owner }) => {
        const menuItems = [{
          primaryText: <FormattedMessage {...messages.editTask} />,
          linkTo: {
            pathname: `${taskBaseUrl}/${logicalId}`,
            search: `?patientId=${patientId}&isMainTask=true`,
          },
        }, {
          primaryText: <FormattedMessage {...messages.addSubTask} />,
          linkTo: {
            pathname: `${taskBaseUrl}`,
            search: `?patientId=${patientId}&isMainTask=false&mainTaskId=${logicalId}`,
          },
        }, {
          primaryText: <FormattedMessage {...messages.addCommunication} />,
          linkTo: {
            pathname: `${communicationBaseUrl}`,
            search: `?patientId=${patientId}&taskId=${logicalId}`,
          },
        }, {
          primaryText: <FormattedMessage {...messages.cancelTask} />,
          disabled: status.code === STATUS_CODE_CANCELLED,
          onClick: () => cancelTask(logicalId),
        }];
        return createTableRows(logicalId, definition, status, description, authoredOn, executionPeriod, agent, owner, menuItems);
      })}
    </Table>
  );
}

TaskTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  cancelTask: PropTypes.func.isRequired,
  patientId: PropTypes.string.isRequired,
  communicationBaseUrl: PropTypes.string.isRequired,
  taskBaseUrl: PropTypes.string.isRequired,
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
  size: PropTypes.object.isRequired,
};

export default sizeMeHOC(TaskTable);
