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
import StyledRaisedButton from 'components/StyledRaisedButton';
import AddRelatedPersonTableRow from './AddRelatedPersonTableRow';
import messages from './messages';

function ManageRelatedPersonTable(props) {
  const { onAddRelatedPerson, participantRoles, relatedPersonsData } = props;
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
            const { isInCareTeam, memberFirstName, memberLastName, roleDisplay, startDate, endDate } = relatedPerson;
            return (
              isInCareTeam ?
                <TableRow key={uniqueId()}>
                  <TableRowColumn>{memberFirstName} {memberLastName}</TableRowColumn>
                  <TableRowColumn>{roleDisplay}</TableRowColumn>
                  <TableRowColumn>{startDate}</TableRowColumn>
                  <TableRowColumn>{endDate}</TableRowColumn>
                  <TableRowColumn>
                    <StyledRaisedButton>
                      <FormattedMessage {...messages.removeButton} />
                    </StyledRaisedButton>
                  </TableRowColumn>
                </TableRow> :
                <AddRelatedPersonTableRow
                  key={uniqueId()}
                  relatedPerson={relatedPerson}
                  participantRoles={participantRoles}
                  onAddRelatedPerson={onAddRelatedPerson}
                />
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
  onAddRelatedPerson: PropTypes.func.isRequired,
  participantRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
    definition: PropTypes.string,
    system: PropTypes.string,
  })).isRequired,
  relatedPersonsData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handleChangePage: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      isInCareTeam: PropTypes.bool.isRequired,
      memberId: PropTypes.string,
      memberFirstName: PropTypes.string,
      memberLastName: PropTypes.string,
      memberName: PropTypes.string,
      memberType: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
      onBehalfOfId: PropTypes.string,
      onBehalfOfName: PropTypes.string,
      roleCode: PropTypes.string,
      roleDisplay: PropTypes.string,
    })).isRequired,
  }).isRequired,
};

export default ManageRelatedPersonTable;

