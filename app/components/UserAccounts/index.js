/**
 *
 * UserAccounts
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import TableHeader from 'components/TableHeader';
import Table from 'components/Table';
import TableRow from 'components/TableRow';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRowColumn from 'components/TableRowColumn';
import uniqueId from 'lodash/uniqueId';
import messages from './messages';


function createData(username, userRole, organization) {
  const password = 'P@ssword123';
  return { username, password, userRole, organization };
}

const userAccounts = [
  createData('Charity', 'Organization Administrator', 'Evergreen Health Primary Care'),
  createData('Jan', 'Organization Administrator', 'Overlake Internal Medicine'),
  createData('Elbert', 'Organization Administrator', 'Swedish Primary Care'),
  createData('Preston', 'Organization Administrator', 'One Medical'),
];

class UserAccounts extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Table>
        <TableHeader>
          <TableHeaderColumn><FormattedMessage {...messages.tableHeaderUsername} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableHeaderPassword} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableHeaderUserRole} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableHeaderOrganization} /></TableHeaderColumn>
        </TableHeader>
        {userAccounts.map((userAccount) => (
          <TableRow key={uniqueId()}>
            <TableRowColumn>{userAccount.username}</TableRowColumn>
            <TableRowColumn>{userAccount.password}</TableRowColumn>
            <TableRowColumn>{userAccount.userRole}</TableRowColumn>
            <TableRowColumn>{userAccount.organization}</TableRowColumn>
          </TableRow>
        ))}
      </Table>
    );
  }
}

UserAccounts.propTypes = {};

export default UserAccounts;
