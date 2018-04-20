/**
 *
 * AppointmentTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import find from 'lodash/find';
import uniqueId from 'lodash/uniqueId';

import sizeMeHOC from 'utils/SizeMeUtils';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import messages from './messages';
import { EXPANDED_TABLE_COLUMNS,
  SUMMARISED_TABLE_COLUMNS,
  SUMMARY_VIEW_WIDTH,
} from './constants';

function AppointmentTable({ elements, appointmentStatuses, appointmentTypes, cancelAppointment, patientId, communicationBaseUrl, relativeTop, cancelledStatus, enableEditAppointment, manageAppointmentUrl, size }) { // eslint-disable-line react/prefer-stateless-function
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
  function createTableHeaders() {
    const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARISED_TABLE_COLUMNS;
    return (
      <TableHeader columns={columns} relativeTop={relativeTop}>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderPatientName} /></TableHeaderColumn>
        {isExpanded &&
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAppointmentType} /></TableHeaderColumn>
        }
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderDate} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderTime} /></TableHeaderColumn>
        {isExpanded &&
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderDescription} /></TableHeaderColumn>
        }
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
      </TableHeader>
    );
  }

  function createTableRows(appointment, menuItems) {
    const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARISED_TABLE_COLUMNS;
    return (
      <TableRow key={uniqueId()} columns={columns}>
        <TableRowColumn>{appointment.patientName}</TableRowColumn>
        {isExpanded &&
        <TableRowColumn>{mapDisplayFromCode(appointmentTypes, appointment.typeCode)}</TableRowColumn>
        }
        <TableRowColumn>{mapDisplayFromCode(appointmentStatuses, appointment.statusCode)}</TableRowColumn>
        <TableRowColumn>{appointment.appointmentDate}</TableRowColumn>
        <TableRowColumn>{appointment.appointmentDuration}</TableRowColumn>
        {isExpanded &&
        <TableRowColumn>{appointment.description}</TableRowColumn>
        }
        <TableRowColumn>
          <NavigationIconMenu menuItems={menuItems} />
        </TableRowColumn>
      </TableRow>
    );
  }
  return (
    <div>
      <Table>
        { createTableHeaders()}
        {elements && elements.map((appointment) => {
          const addCommunicationMenuItem = patientId ? {
            primaryText: <FormattedMessage {...messages.addCommunication} />,
            linkTo: {
              pathname: `${communicationBaseUrl}`,
              search: `?patientId=${patientId}&appointmentId=${appointment.logicalId}`,
            },
          } : null;
          const editAppointmentMenuItem = enableEditAppointment ? {
            primaryText: <FormattedMessage {...messages.editAppointment} />,
            linkTo: `${manageAppointmentUrl}/${appointment.logicalId}`,
          } : null;
          const menuItems = [
            addCommunicationMenuItem,
            editAppointmentMenuItem, {
              primaryText: <FormattedMessage {...messages.cancelAppointment} />,
              disabled: appointment.statusCode === cancelledStatus,
              onClick: () => cancelAppointment(appointment.logicalId),
            }];
          return createTableRows(appointment, menuItems);
        })}
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
  size: PropTypes.object.isRequired,
  appointmentStatuses: PropTypes.array,
  appointmentTypes: PropTypes.array,
  cancelAppointment: PropTypes.func,
  communicationBaseUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string,
  cancelledStatus: PropTypes.string,
  enableEditAppointment: PropTypes.bool,
  manageAppointmentUrl: PropTypes.string,
};

export default sizeMeHOC(AppointmentTable);
