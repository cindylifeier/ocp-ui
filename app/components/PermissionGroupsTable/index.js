/**
 *
 * PermissionGroupsTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import TableHeaderColumn from 'components/TableHeaderColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import messages from './messages';
import { PERMISSION_GROUPS_TABLE_COLUMNS } from './constants';

const columns = PERMISSION_GROUPS_TABLE_COLUMNS;
const menuItems = [{
  primaryText: <FormattedMessage {...messages.manageGroup} />,
  disabled: true,
}];

function createTableHeaders() {
  return (
    <TableHeader columns={columns}>
      <TableHeaderColumn><FormattedMessage {...messages.permissionGroup} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.description} /></TableHeaderColumn>
      <TableHeaderColumn><FormattedMessage {...messages.action} /></TableHeaderColumn>
    </TableHeader>
  );
}

function createTableRows(groups) {
  return (
    <div>
      {groups && groups.map((permissionGroup) => (
        <TableRow key={permissionGroup.id} columns={columns}>
          <TableRowColumn>
            {permissionGroup.displayName}
          </TableRowColumn>
          <TableRowColumn>
            {permissionGroup.description}
          </TableRowColumn>
          <TableRowColumn>
            <NavigationIconMenu menuItems={menuItems} />
          </TableRowColumn>
        </TableRow>
        ))}
    </div>
  );
}

function PermissionGroupsTable(props) { // eslint-disable-line react/prefer-stateless-function
  const { groups } = props;
  return (
    <Table>
      {createTableHeaders()}
      {createTableRows(groups)}
    </Table>
  );
}

PermissionGroupsTable.propTypes = {
  groups: PropTypes.array,
};

export default PermissionGroupsTable;
