/**
 *
 * PermissionGroupsTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import TableHeaderColumn from 'components/TableHeaderColumn';
import messages from './messages';
import { PERMISSION_GROUPS_TABLE_COLUMNS } from './constants';
// import styled from 'styled-components';

const columns = PERMISSION_GROUPS_TABLE_COLUMNS;
function createTableHeaders() {
  return (
    <TableHeader columns={columns}>
      <TableHeaderColumn><FormattedMessage {...messages.permissionGroup} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.description} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.action} /></TableHeaderColumn>
    </TableHeader>
  );
}

function createTableRows() {
  return (
    <TableRow columns={columns}>
      <TableRowColumn>
        Administrator
      </TableRowColumn>
      <TableRowColumn>
        Resonsible for granting access and permission to other users.
      </TableRowColumn>
      <TableRowColumn>
        Aciton Button
      </TableRowColumn>
    </TableRow>
  );
}

function PermissionGroupsTable() { // eslint-disable-line react/prefer-stateless-function
  return (
    <Table>
      {createTableHeaders()}
      {createTableRows()}
    </Table>
  );
}

PermissionGroupsTable.propTypes = {

};

export default PermissionGroupsTable;
