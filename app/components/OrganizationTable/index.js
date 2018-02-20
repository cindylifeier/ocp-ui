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

import messages from './messages';
import Table from '../Table';
import TableHeader from '../TableHeader';
import TableHeaderColumn from '../TableHeaderColumn';
import TableRow from '../TableRow';
import TableRowColumn from '../TableRowColumn';
import { ENTER_KEY } from '../../containers/App/constants';
import StyledMenuItem from '../StyledMenuItem';
import NavigationStyledIconMenu from '../StyledIconMenu/NavigationStyledIconMenu';

const tableColumns = 'repeat(5, 1fr) 50px';

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
        const { name, address, telephone, id, status } = org;
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
            <TableRowColumn>{id}</TableRowColumn>
            <TableRowColumn>{status}</TableRowColumn>
            <TableRowColumn>
              <NavigationStyledIconMenu>
                <StyledMenuItem
                  primaryText={<FormattedMessage {...messages.edit} />}
                  containerElement={<Link to={`/ocp-ui/manage-organization/${id}`} />}
                />
                <StyledMenuItem
                  primaryText={<FormattedMessage {...messages.addLocation} />}
                  containerElement={<Link to={'/ocp-ui/manage-location'} />}
                />
                <StyledMenuItem
                  primaryText={<FormattedMessage {...messages.addHealthCareService} />}
                  containerElement={<Link to={'/ocp-ui/manage-health-care-service'} />}
                />
                <StyledMenuItem
                  primaryText={<FormattedMessage {...messages.addActivityDefinition} />}
                  containerElement={<Link to={'/ocp-ui/manage-activity-definition'} />}
                />
                <StyledMenuItem
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
