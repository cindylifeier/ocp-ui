/**
 *
 * TaskTable
 *
 */

import ActionEvent from '@material-ui/icons/Event';
import ContentFlag from '@material-ui/icons/Flag';
import NotificationPriorityHigh from '@material-ui/icons/PriorityHigh';
import ExpansionTableRow from 'components/ExpansionTableRow';
import NavigationIconMenu from 'components/NavigationIconMenu';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRowColumn from 'components/TableRowColumn';
import {
  DUE_TODAY,
  EXPANDED_TABLE_COLUMNS,
  OVER_DUE,
  STATUS_CODE_CANCELLED,
  SUMMARIZED_TABLE_COLUMNS,
  UPCOMING,
} from 'components/TaskTable/constants';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import sizeMeHOC from 'utils/SizeMeUtils';
import messages from './messages';
import TaskExpansionRowDetails from './TaskExpansionRowDetails';

function TaskTable({ onTaskClick, elements, cancelTask, patientId, communicationBaseUrl, taskBaseUrl, relativeTop, isExpanded, isPatient }) {
  function getTaskDueWithIcon(statusStr) {
    let statusElement = null;
    if (statusStr === UPCOMING) {
      statusElement = (<div><ContentFlag color="#009688" /><FormattedMessage {...messages.todoStatusUpcoming} /></div>);
    } else if (statusStr === OVER_DUE) {
      statusElement = (
        <div><NotificationPriorityHigh color="#d86344" /><FormattedMessage {...messages.todoStatusOverdue} /></div>);
    } else if (statusStr === DUE_TODAY) {
      statusElement = (<div><ActionEvent color="#f4b942" /><FormattedMessage {...messages.todoStatusDueToday} /></div>);
    }
    return statusElement;
  }

  function createTableHeaders() {
    const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
    return (
      <TableHeader columns={columns} relativeTop={relativeTop}>
        <TableHeaderColumn />
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderActivityType} /></TableHeaderColumn>
        <TableHeaderColumn />
        <TableHeaderColumn> <FormattedMessage {...messages.columnHeaderTaskOwner} /></TableHeaderColumn>
        {isExpanded &&
        <TableHeaderColumn> <FormattedMessage {...messages.columnHeaderDescription} /></TableHeaderColumn>
        }
        {isExpanded &&
        <TableHeaderColumn> <FormattedMessage {...messages.columnHeaderCreatedOn} /></TableHeaderColumn>
        }
        {!isExpanded ?
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskEndDate} /></TableHeaderColumn>
          :
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskPeriod} /></TableHeaderColumn>
        }
        {isExpanded &&
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderLastModified} /></TableHeaderColumn>
        }
        {isExpanded &&
        <TableHeaderColumn><FormattedMessage {...messages.subTasks} /></TableHeaderColumn>
        }
        {isExpanded &&
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
        }
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
      </TableHeader>
    );
  }

  function createTableRows(task, isPatientRole) {
    const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
    const { logicalId, definition, status, description, authoredOn, executionPeriod, owner, lastModified, remainingSubtasks, totalSubtasks, taskDue } = task;
    const menuItems = (isPatientRole) ? [] : [{
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
    return (
      <ExpansionTableRow
        key={logicalId}
        columns={columns}
        expansionTableRowDetails={<TaskExpansionRowDetails task={task} />}
      >
        <TableRowColumn
          onClick={() => {
            onTaskClick(task);
          }}
        >{definition && definition.display}</TableRowColumn>
        <TableRowColumn>{getTaskDueWithIcon(taskDue)}</TableRowColumn>
        <TableRowColumn
          onClick={() => {
            onTaskClick(task);
          }}
        >{owner && owner.display} </TableRowColumn>
        {isExpanded &&
        <TableRowColumn
          onClick={() => {
            onTaskClick(task);
          }}
        >{description}</TableRowColumn>
        }
        {isExpanded &&
        <TableRowColumn
          onClick={() => {
            onTaskClick(task);
          }}
        >{authoredOn}</TableRowColumn>
        }
        {!isExpanded ?
          <TableRowColumn
            onClick={() => {
              onTaskClick(task);
            }}
          >{executionPeriod && executionPeriod.end} </TableRowColumn>
          :
          <TableRowColumn
            onClick={() => {
              onTaskClick(task);
            }}
          >{executionPeriod && executionPeriod.start}
            - {executionPeriod && executionPeriod.end} </TableRowColumn>
        }
        {isExpanded &&
        <TableRowColumn
          onClick={() => {
            onTaskClick(task);
          }}
        >{lastModified} </TableRowColumn>
        }
        {isExpanded &&
        <TableRowColumn
          onClick={() => {
            onTaskClick(task);
          }}
        >{remainingSubtasks}/{totalSubtasks} tasks remaining</TableRowColumn>
        }
        {isExpanded &&
        <TableRowColumn
          onClick={() => {
            onTaskClick(task);
          }}
        >{status && status.display}</TableRowColumn>
        }
        <TableRowColumn>
          <NavigationIconMenu menuItems={menuItems} />
        </TableRowColumn>
      </ExpansionTableRow>
    );
  }

  return (
    <Table>
      {createTableHeaders()}
      {!isEmpty(elements) && elements.map((element) => createTableRows(element, isPatient))}
    </Table>
  );
}

TaskTable.propTypes = {
  isExpanded: PropTypes.bool,
  relativeTop: PropTypes.number.isRequired,
  cancelTask: PropTypes.func.isRequired,
  onTaskClick: PropTypes.func,
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
    totalSubtasks: PropTypes.number.isRequired,
    remainingSubtasks: PropTypes.number.isRequired,
  })),
  isPatient: PropTypes.bool,
};

export default sizeMeHOC(TaskTable);
