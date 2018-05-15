/**
 *
 * AddedConsentActorsTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import uniqueId from 'lodash/uniqueId';

import InfoSection from 'components/InfoSection';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import messages from './messages';


function AddedConsentActorsTable(props) {
  const tableColumns = 'repeat(2, 1fr) 50px';
  const { actors } = props;
  return (
    <div>
      <InfoSection margin="10px -10px">
        <Table>
          <TableHeader columns={tableColumns}>
            <TableHeaderColumn><FormattedMessage {...messages.name} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.reference} /></TableHeaderColumn>
          </TableHeader>
          {actors && actors.map((actor) => {
            const { display, reference } = actor;
            return (
              <TableRow key={uniqueId()} columns={tableColumns}>
                <TableRowColumn>{display}</TableRowColumn>
                <TableRowColumn>{reference}</TableRowColumn>
              </TableRow>
            );
          })}
        </Table>
      </InfoSection>
    </div>
  );
}

AddedConsentActorsTable.propTypes = {
  actors: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    reference: PropTypes.string.isRequired,
  })),
};

export default AddedConsentActorsTable;
