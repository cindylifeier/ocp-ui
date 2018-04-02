/**
 *
 * AppointmentTable
 *
 */

import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import { STATUS_CODE_CANCELLED } from 'containers/PatientAppointments/constants';
import find from 'lodash/find';
import uniqueId from 'lodash/uniqueId';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import messages from './messages';

function AppointmentTable({ elements, appointmentStatuses, appointmentTypes, cancelAppointment, patientId, communicationBaseUrl, relativeTop }) { // eslint-disable-line react/prefer-stateless-function
  return (
    <div>
      <Table>
        <TableHeader relativeTop={relativeTop}>
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
              <NavigationStyledIconMenu>
                {patientId &&
                <MenuItem
                  primaryText={<FormattedMessage {...messages.addCommunication} />}
                  containerElement={<Link
                    to={{
                      pathname: `${communicationBaseUrl}`,
                      search: `?patientId=${patientId}&appointmentId=${appointment.logicalId}`,
                    }}
                  />}
                />
                }
                <MenuItem
                  primaryText={<FormattedMessage {...messages.menuItemCancel} />}
                  disabled={appointment.statusCode === STATUS_CODE_CANCELLED}
                  onClick={() => cancelAppointment(appointment.logicalId)}
                />
              </NavigationStyledIconMenu>
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

AppointmentTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  elements: PropTypes.array.isRequired,
  appointmentStatuses: PropTypes.array,
  appointmentTypes: PropTypes.array,
  cancelAppointment: PropTypes.func,
  communicationBaseUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string,
};

export default AppointmentTable;
