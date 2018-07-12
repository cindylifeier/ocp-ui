/**
 *
 * ManageRelatedPersonTable
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import messages from './messages';

function ManageRelatedPersonTable() {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableHeader>
            <TableHeaderColumn>{
              <FormattedMessage {...messages.manageRelatedPersonTableHeaderName} />}</TableHeaderColumn>
            <TableHeaderColumn>{
              <FormattedMessage {...messages.manageRelatedPersonTableHeaderRole} />}</TableHeaderColumn>
            <TableHeaderColumn>{
              <FormattedMessage {...messages.manageRelatedPersonTableHeaderStartDate} />}</TableHeaderColumn>
            <TableHeaderColumn>{
              <FormattedMessage {...messages.manageRelatedPersonTableHeaderEndDate} />}</TableHeaderColumn>
            <TableHeaderColumn>{
              <FormattedMessage {...messages.manageRelatedPersonTableHeaderAction} />}</TableHeaderColumn>
          </TableHeader>
        </TableHeader>
      </Table>
    </div>
  );
}

ManageRelatedPersonTable.propTypes = {};

export default ManageRelatedPersonTable;

