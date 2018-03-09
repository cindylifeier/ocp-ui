/**
 *
 * CareCoordinatorUpcomingAppointmentTable
 *
 */

import React from 'react';
import uniqueId from 'lodash/uniqueId';
import find from 'lodash/find';

import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import { STATUS_CODE_CANCELLED } from 'containers/UpcomingAppointments/constants';
import messages from './messages';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';
import StyledIconButton from '../StyledIconButton';

function CareCoordinatorUpcomingAppointmentTable({ elements, appointmentStatuses, appointmentTypes, cancelAppointment }) { // eslint-disable-line react/prefer-stateless-function
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
            <TableRowColumn>{appointment.patientName}</TableRowColumn>
            <TableRowColumn>{mapDisplayFromCode(appointmentTypes, appointment.typeCode)}</TableRowColumn>
            <TableRowColumn>{mapDisplayFromCode(appointmentStatuses, appointment.statusCode)}</TableRowColumn>
            <TableRowColumn>{appointment.appointmentDate}</TableRowColumn>
            <TableRowColumn>{appointment.appointmentDuration}</TableRowColumn>
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
                <MenuItem
                  primaryText={<FormattedMessage {...messages.menuItemCancel} />}
                  disabled={appointment.statusCode === STATUS_CODE_CANCELLED}
                  onClick={() => cancelAppointment(appointment.logicalId)}
                />
              </IconMenu>
            </TableRowColumn>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

function mapDisplayFromCode(appointmentLookup, key) {
  if (key) {
    return find(appointmentLookup, { code: key }).display;
  }
  return key;
}

CareCoordinatorUpcomingAppointmentTable.propTypes = {
  elements: PropTypes.array.isRequired,
  appointmentStatuses: PropTypes.array,
  appointmentTypes: PropTypes.array,
  cancelAppointment: PropTypes.func,
};

export default CareCoordinatorUpcomingAppointmentTable;
