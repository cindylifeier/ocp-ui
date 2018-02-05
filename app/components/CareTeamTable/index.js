/**
 *
 * CareTeamTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import messages from './messages';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';

function CareTeamTable({ elements }) {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderId} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderStatus} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderCategories} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.columnHeaderParticipantsAndRoles} /></TableHeaderColumn>
        </TableHeader>
        {!isEmpty(elements) && elements.map(({ id, name, statusDisplay, categoryDisplay, participants }) => (
          <TableRow key={id}>
            <TableRowColumn>{id}</TableRowColumn>
            <TableRowColumn>{name}</TableRowColumn>
            <TableRowColumn>{statusDisplay}</TableRowColumn>
            <TableRowColumn>{categoryDisplay}</TableRowColumn>
            <TableRowColumn>
              <ul>{!isEmpty(participants) && participants
                .map(({ memberId, memberFirstName, memberLastName, memberName, roleDisplay }) => (
                  <li key={memberId}>
                    {`${[memberFirstName, memberLastName, memberName].filter((value) => !isEmpty(value)).join(' ')} / ${roleDisplay}`}
                  </li>))
              }</ul>
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
    reasonCode: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    })),
    statusCode: PropTypes.string,
    statusDisplay: PropTypes.string,
    categoryCode: PropTypes.string,
    categoryDisplay: PropTypes.string,
    subjectId: PropTypes.string.isRequired,
    subjectFirstName: PropTypes.string.isRequired,
    subjectLastName: PropTypes.string.isRequired,
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

