/**
 *
 * CareTeamTable
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import { Cell, Grid } from 'styled-css-grid';

import messages from './messages';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';
import { MANAGE_CARE_TEAM_URL } from '../../containers/App/constants';
import StyledIconButton from '../StyledIconButton';

function CareTeamTable({ elements }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCategories} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderParticipantsAndRoles} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStartDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderEndDate} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderReason} /></TableHeaderColumn>
          <TableHeaderColumn />
        </TableHeader>
        {!isEmpty(elements) && elements.map(({ id, name, statusDisplay, categoryDisplay, participants, subjectId, startDate, endDate, reasonDisplay }) => (
          <TableRow key={id}>
            <TableRowColumn>{name}</TableRowColumn>
            <TableRowColumn>{statusDisplay}</TableRowColumn>
            <TableRowColumn>{categoryDisplay}</TableRowColumn>
            <TableRowColumn>
              {!isEmpty(participants) && participants
                .map(({ memberId, memberFirstName, memberLastName, memberName, roleDisplay }) => (
                  <div key={memberId}>
                    {`${[memberFirstName, memberLastName, memberName].filter((value) => !isEmpty(value)).join(' ')}${isEmpty(roleDisplay) ? '' : ` / ${roleDisplay}`}`}
                  </div>))
              }
            </TableRowColumn>
            <TableRowColumn>{startDate}</TableRowColumn>
            <TableRowColumn>{endDate}</TableRowColumn>
            <TableRowColumn>{reasonDisplay}</TableRowColumn>
            <TableRowColumn>
              <Grid columns="1fr 50px" gap="0px">
                <Cell left="2">
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
                      primaryText={<FormattedMessage {...messages.menuItemEdit} />}
                      containerElement={<Link
                        to={{
                          pathname: `${MANAGE_CARE_TEAM_URL}/${id}`,
                          search: `?patientId=${subjectId}`,
                        }}
                      />}
                    />
                    <MenuItem primaryText={<FormattedMessage {...messages.menuItemRemove} />} disabled />
                  </IconMenu>
                </Cell>
              </Grid>
            </TableRowColumn>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

CareTeamTable.propTypes = {
  elements: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    reasonCode: PropTypes.string,
    reasonDisplay: PropTypes.string,
    statusCode: PropTypes.string,
    statusDisplay: PropTypes.string,
    categoryCode: PropTypes.string,
    categoryDisplay: PropTypes.string,
    subjectId: PropTypes.string.isRequired,
    subjectFirstName: PropTypes.string.isRequired,
    subjectLastName: PropTypes.string.isRequired,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    participants: PropTypes.arrayOf(PropTypes.shape({
      roleCode: PropTypes.string,
      roleDisplay: PropTypes.string,
      memberId: PropTypes.string.isRequired,
      memberFirstName: PropTypes.string,
      memberLastName: PropTypes.string,
      memberName: PropTypes.string,
      memberType: PropTypes.string.isRequired,
      onBehalfOfId: PropTypes.string,
      onBehalfOfName: PropTypes.string,
    })),
  })),
};

export default CareTeamTable;

