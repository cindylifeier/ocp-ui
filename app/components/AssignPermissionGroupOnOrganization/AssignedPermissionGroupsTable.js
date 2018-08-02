import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import CustomErrorText from 'components/CustomErrorText';
import messages from './messages';

function AssignedPermissionGroupsTable(props) {
  const tableColumns = 'repeat(2, 1fr) 80px';
  const {
    roles,
    errors,
    arrayHelpers,
    onEditPermissionGroup,
  } = props;

  return (
    <div>
      <Table>
        <TableHeader columns={tableColumns}>
          <TableHeaderColumn><FormattedMessage {...messages.assignedGroupsTable.tableHeaderOrganization} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.assignedGroupsTable.tableHeaderRole} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.assignedGroupsTable.tableHeaderAction} /></TableHeaderColumn>
        </TableHeader>
        {errors && errors.roles &&
        <CustomErrorText>{errors.roles}</CustomErrorText>
        }
        {roles && roles.map((permissionGroup, index) => {
          const { orgId, role } = permissionGroup;
          const menuItems = [{
            primaryText: <FormattedMessage {...messages.assignedGroupsTable.tableActionEdit} />,
            onClick: () => onEditPermissionGroup(index, permissionGroup),
          }, {
            primaryText: <FormattedMessage {...messages.assignedGroupsTable.tableActionRemove} />,
            onClick: () => arrayHelpers.remove(index),
          }];
          return (
            <TableRow key={uniqueId()} columns={tableColumns}>
              <TableRowColumn>{orgId}</TableRowColumn>
              <TableRowColumn>{role}</TableRowColumn>
              <TableRowColumn>
                <NavigationIconMenu menuItems={menuItems} />
              </TableRowColumn>
            </TableRow>
          );
        })}
      </Table>
    </div>
  );
}

AssignedPermissionGroupsTable.propTypes = {
  errors: PropTypes.object,
  arrayHelpers: PropTypes.object,
  onEditPermissionGroup: PropTypes.func,
  roles: PropTypes.arrayOf(PropTypes.shape({
    orgId: PropTypes.string,
    role: PropTypes.string,
  })),
};

export default AssignedPermissionGroupsTable;
