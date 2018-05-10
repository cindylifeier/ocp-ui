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
  SUMMARIZED_TABLE_COLUMNS,
  SUMMARY_VIEW_WIDTH,
  PATIENT_WORKSPACE_SUMMARIZED_TABLE_COLUMNS,
  PATIENT_WORKSPACE_EXPANDED_TABLE_COLUMNS,
} from './constants';

function AppointmentTable({ elements, appointmentStatuses, appointmentTypes, cancelAppointment, acceptAppointment, declineAppointment, tentativeAppointment, patientId, communicationBaseUrl, relativeTop, enableEditAppointment, manageAppointmentUrl, size, isPatientWorkspace }) { // eslint-disable-line react/prefer-stateless-function
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;

  function getColumns() {
    let columns = '';
    if (!isPatientWorkspace) {
      columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
    } else {
      columns = isExpanded ? PATIENT_WORKSPACE_EXPANDED_TABLE_COLUMNS : PATIENT_WORKSPACE_SUMMARIZED_TABLE_COLUMNS;
    }
    return columns;
  }
  function createTableHeaders() {
    const columns = getColumns();
    return (
      <TableHeader columns={columns} relativeTop={relativeTop}>
        {!isPatientWorkspace &&
        <TableHeaderColumn><FormattedMessage {...messages.columnHeaderPatientName} /></TableHeaderColumn>
        }
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
    const columns = getColumns();
    return (
      <TableRow key={uniqueId()} columns={columns}>
        {!isPatientWorkspace &&
        <TableRowColumn>{appointment.patientName}</TableRowColumn>
        }
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
            editAppointmentMenuItem,
            {
              primaryText: <FormattedMessage {...messages.cancelAppointment} />,
              disabled: !appointment.canCancel,
              onClick: () => cancelAppointment(appointment.logicalId),
            },
            {
              primaryText: <FormattedMessage {...messages.acceptAppointment} />,
              disabled: !appointment.canAccept,
              onClick: () => acceptAppointment(appointment.logicalId),
            },
            {
              primaryText: <FormattedMessage {...messages.declineAppointment} />,
              disabled: !appointment.canDecline,
              onClick: () => declineAppointment(appointment.logicalId),
            },
            {
              primaryText: <FormattedMessage {...messages.tentativeAppointment} />,
              disabled: !appointment.canTentativelyAccept,
              onClick: () => tentativeAppointment(appointment.logicalId),
            },
          ];
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
  acceptAppointment: PropTypes.func,
  declineAppointment: PropTypes.func,
  tentativeAppointment: PropTypes.func,
  communicationBaseUrl: PropTypes.string.isRequired,
  patientId: PropTypes.string,
  enableEditAppointment: PropTypes.bool,
  isPatientWorkspace: PropTypes.bool,
  manageAppointmentUrl: PropTypes.string,
};

export default sizeMeHOC(AppointmentTable);
