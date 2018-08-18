/**
 *
 * PractitionerLookupResult
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import messages from './messages';

const columns = 'repeat(4, 1fr) .5fr';

function PractitionerLookupResult() {
  return (
    <Table>
      <TableHeader columns={columns}>
        <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnName} /></TableHeaderColumn>
        <TableHeaderColumn> <FormattedMessage {...messages.tableColumnHeaderRole} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnIdentifier} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderEmail} /></TableHeaderColumn>
        <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnAction} /></TableHeaderColumn>
      </TableHeader>
    </Table>
  );
}

PractitionerLookupResult.propTypes = {};

export default PractitionerLookupResult;
