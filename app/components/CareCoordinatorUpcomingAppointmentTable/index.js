/**
 *
 * CareCoordinatorUpcomingAppointmentTable
 *
 */

import React from 'react';
import uniqueId from 'lodash/uniqueId';

import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import messages from './messages';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';
import StyledMenuItem from '../StyledMenuItem';
import StyledIconButton from '../StyledIconButton';

function CareCoordinatorUpcomingAppointmentTable({ elements }) { // eslint-disable-line react/prefer-stateless-function
  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderPatientName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAppointmentType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTime} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderDescription} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {elements && elements.map((appointment) => (
          <TableRow key={uniqueId()}>
            <TableRowColumn>{appointment.displayPatientName}</TableRowColumn>
            <TableRowColumn>{appointment.typeCode}</TableRowColumn>
            <TableRowColumn>{appointment.statusCode}</TableRowColumn>
            <TableRowColumn>{appointment.displayDate}</TableRowColumn>
            <TableRowColumn>{appointment.displayDuration}</TableRowColumn>
            <TableRowColumn>{appointment.description}</TableRowColumn>
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
                <StyledMenuItem primaryText={<FormattedMessage {...messages.menuItemCancel} />} disabled />
              </IconMenu>
            </TableRowColumn>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

CareCoordinatorUpcomingAppointmentTable.propTypes = {
  elements: PropTypes.array.isRequired,
};

export default CareCoordinatorUpcomingAppointmentTable;
