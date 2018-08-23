import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import CustomErrorText from 'components/CustomErrorText';
import SelectField from 'components/SelectField';
import messages from './messages';


function AddedOrganizationsTable(props) {
  const tableColumns = 'repeat(4, 1fr)';
  const {
    practitionerRoles,
    roleType,
    specialtyType,
    errors,
  } = props;

  return (
    <Table>
      <TableHeader columns={tableColumns}>
        <TableHeaderColumn><FormattedMessage {...messages.addedOrganizationsTable.tableColumnName} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedOrganizationsTable.tableColumnCode} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedOrganizationsTable.tableColumnSpecialty} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.addedOrganizationsTable.tableColumnActive} /></TableHeaderColumn>
      </TableHeader>
      {errors && errors.practitionerRoles &&
      <CustomErrorText>{errors.practitionerRoles}</CustomErrorText>
      }
      {practitionerRoles && practitionerRoles.map((practitionerRole, index) => {
        const { organization } = practitionerRole;
        return (
          <TableRow key={uniqueId()} columns={tableColumns}>
            <TableRowColumn>{organization.display}</TableRowColumn>
            <TableRowColumn>
              <SelectField
                fullWidth
                name={`practitionerRoles.${index}.code`}
                hintText={<FormattedMessage {...messages.addedOrganizationsTable.roleTypeLabel} />}
              >
                {roleType && roleType.map((role) =>
                  (<MenuItem
                    key={role.code}
                    value={role.code}
                    primaryText={role.display}
                  />),
                )}
              </SelectField>
            </TableRowColumn>
            <TableRowColumn>
              <SelectField
                fullWidth
                name={`practitionerRoles.${index}.specialty`}
                hintText={<FormattedMessage {...messages.addedOrganizationsTable.specialtyLabel} />}
              >
                {specialtyType && specialtyType.map((specialty) =>
                  (<MenuItem
                    key={specialty.code}
                    value={specialty.code}
                    primaryText={specialty.display}
                  />),
                )}
              </SelectField>
            </TableRowColumn>
            <TableRowColumn>
              <SelectField
                fullWidth
                name={`practitionerRoles.${index}.active`}
                hintText={<FormattedMessage {...messages.addedOrganizationsTable.activeLabel} />}
              >
                <MenuItem value primaryText={<FormattedMessage {...messages.addedOrganizationsTable.activeLabel} />} />
                <MenuItem value={false} primaryText="Inactive" />
              </SelectField>
            </TableRowColumn>
          </TableRow>
        );
      })}
    </Table>
  );
}

AddedOrganizationsTable.propTypes = {
  roleType: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  specialtyType: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  errors: PropTypes.object,
  practitionerRoles: PropTypes.array,
};

export default AddedOrganizationsTable;
