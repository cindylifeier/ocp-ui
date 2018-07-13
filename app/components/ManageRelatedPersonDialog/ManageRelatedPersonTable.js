/**
 *
 * ManageRelatedPersonTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { LinearProgress } from 'material-ui-next/Progress';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';

import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import RecordsRange from 'components/RecordsRange';
import messages from './messages';

function ManageRelatedPersonTable(props) {
  const { relatedPersonsData } = props;
  return (
    <div>
      {relatedPersonsData.loading && <LinearProgress />}

      {!relatedPersonsData.loading && relatedPersonsData.data && relatedPersonsData.data.length === 0 &&
      <CenterAlign>
        <NoResultsFoundText><FormattedMessage {...messages.noRelatedPersonFoundText} /></NoResultsFoundText>
      </CenterAlign>
      }
      {!relatedPersonsData.loading && relatedPersonsData.data && relatedPersonsData.data.length > 0 &&
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
          {!isEmpty(relatedPersonsData.data) && relatedPersonsData.data.map((relatedPerson) => {
            const { lastName, firstName } = relatedPerson;
            return (
              <TableRow key={uniqueId()}>
                <TableRowColumn>{firstName} {lastName}</TableRowColumn>
              </TableRow>
            );
          })}
        </Table>
        <CenterAlignedUltimatePagination
          currentPage={relatedPersonsData.currentPage}
          totalPages={relatedPersonsData.totalNumberOfPages}
          onChange={relatedPersonsData.handleChangePage}
        />
        <RecordsRange
          currentPage={relatedPersonsData.currentPage}
          totalPages={relatedPersonsData.totalNumberOfPages}
          totalElements={relatedPersonsData.totalElements}
          currentPageSize={relatedPersonsData.currentPageSize}
        />
      </div>
      }
    </div>
  );
}

ManageRelatedPersonTable.propTypes = {
  relatedPersonsData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handleChangePage: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      memberFirstName: PropTypes.string,
      memberLastName: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      roleCode: PropTypes.string,
      roleDisplay: PropTypes.string,
    })).isRequired,
  }).isRequired,
};

export default ManageRelatedPersonTable;

