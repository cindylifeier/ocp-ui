/**
*
* TaskTable
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import { Link } from 'react-router-dom';
import { MANAGE_TASK_URL } from '../../containers/App/constants';
import messages from './messages';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';
import styles from './styles.css';

const iconStyles = {
  iconButton: {
    position: 'relative',
  },
  icon: {
    width: '100%',
    height: 26,
    position: 'absolute',
    top: '0',
    right: '0',
  },
};

function TaskTable({ elements, cancelTask }) {
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
          <TableHeaderColumn />
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
            <TableRowColumn>
              <div className={styles.iconButtonGridContainer}>
                <div className={styles.iconButtonGridItem}>
                  <IconMenu
                    iconButtonElement={
                      (<IconButton
                        className={styles.iconButton}
                        iconStyle={iconStyles.icon}
                        style={iconStyles.iconButton}
                      >
                        <NavigationMenu />
                      </IconButton>)
                    }
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                  >
                    <MenuItem
                      className={styles.menuItem}
                      primaryText={<FormattedMessage {...messages.editTask} />}
                      containerElement={<Link
                        to={{
                          pathname: `${MANAGE_TASK_URL}/${logicalId}`,
                          search: `?patientId=${logicalId}`,
                        }}
                      />}
                    />
                    <MenuItem
                      className={styles.menuItem}
                      primaryText={<FormattedMessage {...messages.cancelTask} />}
                      disabled={status.code === 'cancelled'}
                      onClick={() => cancelTask(logicalId)}
                    />
                  </IconMenu>
                </div>
              </div>
            </TableRowColumn>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

TaskTable.propTypes = {
  cancelTask: PropTypes.func.isRequired,
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
