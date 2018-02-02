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
        {!isEmpty(elements) && elements.map(({ id, name, status, categories, participants }) => (
          <TableRow key={id}>
            <TableRowColumn>{id}</TableRowColumn>
            <TableRowColumn>{name}</TableRowColumn>
            <TableRowColumn>{status && status.display}</TableRowColumn>
            <TableRowColumn>
              <ul>{!isEmpty(categories) && categories.map(({ code: categoryCode, display: categoryDisplay }) => (
                <li key={categoryCode}>{categoryDisplay}</li>))}
              </ul>
            </TableRowColumn>
            <TableRowColumn>
              <ul>{!isEmpty(participants) && participants
                .map(({ member: { firstName, lastName, name: orgName, id: memberId }, role: { display: roleDisplay } }) => (
                  <li key={memberId}>
                    {`${[firstName, lastName, orgName].filter((value) => !isEmpty(value)).join(' ')} / ${roleDisplay}`}
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
    status: PropTypes.shape({
      code: PropTypes.string,
      system: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    }),
    categories: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string,
      definition: PropTypes.string,
      display: PropTypes.string,
    })),
    subject: PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    participants: PropTypes.arrayOf(PropTypes.shape({
      role: PropTypes.shape({
        code: PropTypes.string,
        definition: PropTypes.string,
        display: PropTypes.string.isRequired,
      }).isRequired,
      member: PropTypes.shape({
        id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        name: PropTypes.string,
      }).isRequired,
    })),
  })),
};

export default CareTeamTable;

