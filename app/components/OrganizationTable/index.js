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

import messages from './messages';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';
import { ENTER_KEY } from '../../containers/App/constants';
import NavigationStyledIconMenu from '../StyledIconMenu/NavigationStyledIconMenu';

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
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderTelephone} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderId} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
      </TableHeader>
      {!isEmpty(organizations) && organizations.map((org) => {
        const { name, address, telephone, id, identifiers, status } = org;
        return (
          <TableRow
            columns={tableColumns}
            key={org.id}
            onClick={() => onRowClick && onRowClick(org)}
            onKeyPress={(e) => {
              if (e.key === ENTER_KEY) {
                if (onRowClick) {
                  onRowClick(org);
                }
              }
              e.preventDefault();
            }}
            role="button"
            tabIndex="0"
          >
            <TableRowColumn>{name}</TableRowColumn>
            <TableRowColumn>{address}</TableRowColumn>
            <TableRowColumn>{telephone}</TableRowColumn>
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
    telephone: PropTypes.string,
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  onRowClick: PropTypes.func,
};

export default OrganizationTable;
