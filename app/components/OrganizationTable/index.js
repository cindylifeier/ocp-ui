/**
 *
 * OrganizationTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import MenuItem from 'material-ui/MenuItem';

import { mapToOrganizationTelecoms } from 'utils/OrganizationUtils';
import { ENTER_KEY } from 'containers/App/constants';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import messages from './messages';
import { fromBackendToFrontendOrganization } from './mappings';

const tableColumns = 'repeat(5, 1fr) 50px';

function renderIdentifiers(identifiers) {
  return identifiers && identifiers.map((identifier) => (<div key={uniqueId()}>{identifier}</div>));
}

function OrganizationTable({ organizations, onRowClick }) {
  return (
    <Table>
      <TableHeader columns={tableColumns}>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderOrganization} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderTelecom} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderId} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
      </TableHeader>
      {!isEmpty(organizations) && organizations.map((organization) => {
        const org = fromBackendToFrontendOrganization(organization);
        const { name, address, id, identifiers, status } = org;
        return (
          <TableRow
            columns={tableColumns}
            key={org.id}
            onClick={() => onRowClick && onRowClick(organization)}
            onKeyPress={(e) => {
              if (e.key === ENTER_KEY) {
                if (onRowClick) {
                  onRowClick(organization);
                }
              }
              e.preventDefault();
            }}
            role="button"
            tabIndex="0"
          >
            <TableRowColumn>{name}</TableRowColumn>
            <TableRowColumn>{address}</TableRowColumn>
            <TableRowColumn>{mapToOrganizationTelecoms(org)}</TableRowColumn>
            <TableRowColumn>{renderIdentifiers(identifiers)}</TableRowColumn>
            <TableRowColumn>{status}</TableRowColumn>
            <TableRowColumn>
              <NavigationStyledIconMenu>
                <MenuItem
                  primaryText={<FormattedMessage {...messages.edit} />}
                  containerElement={<Link to={`/ocp-ui/manage-organization/${id}`} />}
                />
                <MenuItem
                  primaryText={<FormattedMessage {...messages.addLocation} />}
                  containerElement={<Link to={'/ocp-ui/manage-location'} />}
                />
                <MenuItem
                  primaryText={<FormattedMessage {...messages.addHealthCareService} />}
                  containerElement={<Link to={'/ocp-ui/manage-healthcare-service'} />}
                />
                <MenuItem
                  primaryText={<FormattedMessage {...messages.addActivityDefinition} />}
                  containerElement={<Link to={'/ocp-ui/manage-activity-definition'} />}
                />
                <MenuItem
                  primaryText={<FormattedMessage {...messages.remove} />}
                />
              </NavigationStyledIconMenu>
            </TableRowColumn>
          </TableRow>
        );
      })}
    </Table>
  );
}

OrganizationTable.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    telecoms: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      value: PropTypes.string,
    })),
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  onRowClick: PropTypes.func,
};

export default OrganizationTable;
