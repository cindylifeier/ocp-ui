/**
 *
 * OrganizationTable
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
import OrganizationTableRow from '../OrganizationTableRow';

function OrganizationTable({ organizations, onRowClick }) {
  return (
    <Table>
      <TableHeader columns="repeat(5, 1fr) 50px">
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderOrganization} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderTelephone} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderId} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
      </TableHeader>
      {!isEmpty(organizations) && organizations.map((org) => (
        <OrganizationTableRow
          key={org.id}
          {...org}
          onRowClick={onRowClick}
        />
      ))}
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
