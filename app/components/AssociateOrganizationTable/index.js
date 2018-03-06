/**
*
* AssociateOrganizationTable
*
*/

import React from 'react';
// import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';
import { teal500, white } from 'material-ui/styles/colors';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';

const tableColumns = 'repeat(5, 1fr) 50px';

function renderIdentifiers(identifiers) {
  return identifiers && identifiers.map((identifier) => (<div key={uniqueId()}>{identifier}</div>));
}

function AssociateOrganizationTable({ organizations, onAddAssociateOrganization, callback }) {
  return (
    <Table>
      <TableHeader columns={tableColumns}>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderOrganization} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderAddress} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderId} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
        <TableHeaderColumn />
      </TableHeader>
      {!isEmpty(organizations) && organizations.map((org) => {
        const { name, address, id, identifiers, status } = org;
        return (
          <TableRow
            columns={tableColumns}
            key={id}
            role="button"
            tabIndex="0"
          >
            <TableRowColumn>{name}</TableRowColumn>
            <TableRowColumn>{address}</TableRowColumn>
            <TableRowColumn>{renderIdentifiers(identifiers)}</TableRowColumn>
            <TableRowColumn>{status}</TableRowColumn>
            <TableRowColumn>
              <StyledRaisedButton
                label={'Add'}
                backgroundColor={teal500}
                labelColor={white}
                onClick={() => { onAddAssociateOrganization({ organization: { reference: `Organization/${id}`, display: name } }); callback(); }}
              />
            </TableRowColumn>
          </TableRow>
        );
      })}
    </Table>
  );
}

AssociateOrganizationTable.propTypes = {
  organizations: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  })).isRequired,
  onAddAssociateOrganization: PropTypes.func,
  callback: PropTypes.func,
};

export default AssociateOrganizationTable;
