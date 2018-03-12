/**
 *
 * UpcomingTaskTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import IconMenu from 'material-ui/IconMenu';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

import StyledIconButton from 'components/StyledIconButton';
import messages from './messages';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';


const tableColumns = 'repeat(6, 1fr) 50px';

function UpcomingTaskTable({ elements }) {
  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderPatientName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderActivityType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTask} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskStartDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTaskEndDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
          <TableHeaderColumn />
        </TableHeader>
        {!isEmpty(elements) && elements.map(({ logicalId, beneficiary, definition, description, executionPeriod }) => (
          <TableRow
            columns={tableColumns}
            key={logicalId}
          >
            <TableRowColumn>{beneficiary.display}</TableRowColumn>
            <TableRowColumn>{definition.display}</TableRowColumn>
            <TableRowColumn>{description}</TableRowColumn>
            <TableRowColumn>{executionPeriod.start}</TableRowColumn>
            <TableRowColumn>{executionPeriod.end}</TableRowColumn>
            <TableRowColumn>
              <IconMenu
                iconButtonElement={
                (<StyledIconButton>
                  <NavigationMenu />
                </StyledIconButton>)
              }
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
              </IconMenu></TableRowColumn>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

UpcomingTaskTable.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    beneficiary: PropTypes.object.isRequired,
    definition: PropTypes.object,
    description: PropTypes.string,
    executionPeriod: PropTypes.object,
  })),
};

export default UpcomingTaskTable;

