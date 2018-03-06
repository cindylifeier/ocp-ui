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

function CareCoordinatorUpcomingAppointmentTable({ upcomingAppointments }) { // eslint-disable-line react/prefer-stateless-function
  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderDescription} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAppointmentType} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStart} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderEnd} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderParticipant} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {upcomingAppointments && upcomingAppointments.map((appointment) => (
          <TableRow key={uniqueId()}>
            <TableRowColumn>{appointment.description}</TableRowColumn>
            <TableRowColumn>{appointment.type}</TableRowColumn>
            <TableRowColumn>{appointment.status}</TableRowColumn>
            <TableRowColumn>{appointment.start}</TableRowColumn>
            <TableRowColumn>{appointment.end}</TableRowColumn>
            <TableRowColumn>
              {appointment.participant && appointment.participant.map((actor) => (
                <TableRowColumn key={uniqueId()}>{actor.name}</TableRowColumn>
              ))}
            </TableRowColumn>
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
                <StyledMenuItem primaryText={<FormattedMessage {...messages.menuItemEdit} />} disabled />
                <StyledMenuItem primaryText={<FormattedMessage {...messages.menuItemRemove} />} disabled />
              </IconMenu>
            </TableRowColumn>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

CareCoordinatorUpcomingAppointmentTable.propTypes = {
  upcomingAppointments: PropTypes.array.isRequired,
};

export default CareCoordinatorUpcomingAppointmentTable;
