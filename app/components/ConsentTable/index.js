/**
*
* ConsentTable
*
*/
import React from 'react';
// import styled from 'styled-components';

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import RecordsRange from 'components/RecordsRange';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import TableHeader from 'components/TableHeader';
import Table from 'components/Table';
import TableHeaderColumn from 'components/TableHeaderColumn';
import ConsentExpandableTableRow from './ConsentExpandableTableRow';
import messages from './messages';

const tableColumns = '50px repeat(4, 1fr) 50px';

function ConsentTable(props) {
  const { consentData, relativeTop, allowedAttestConsentRoles } = props;
  return (
    <div>
      {consentData.loading && <RefreshIndicatorLoading />}
      {(!consentData.loading && consentData.data && consentData.data.length > 0
          ? <div>
            <Table>
              <TableHeader columns={tableColumns} relativeTop={relativeTop}>
                <TableHeaderColumn></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderFromActor} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderToActor} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderPeriod} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
              </TableHeader>
              {!isEmpty(consentData.data) && consentData.data.map((consent) => (
                <ConsentExpandableTableRow
                  key={consent.logicalId}
                  consent={consent}
                  tableColumns={tableColumns}
                  allowedAttestConsentRoles={allowedAttestConsentRoles}
                />
                ))}
            </Table>
            {!!consentData && !!consentData.currentPage &&
            <div>
              <CenterAlignedUltimatePagination
                currentPage={consentData.currentPage}
                totalPages={consentData.totalNumberOfPages}
                onChange={consentData.handlePageClick}
              />
              <RecordsRange
                currentPage={consentData.currentPage}
                totalPages={consentData.totalNumberOfPages}
                totalElements={consentData.totalElements}
                currentPageSize={consentData.currentPageSize}
              />
            </div>}
          </div> :
          (<CenterAlign>
            <NoResultsFoundText>No consents found.</NoResultsFoundText>
          </CenterAlign>)
      )}
    </div>
  );
}

ConsentTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  allowedAttestConsentRoles: PropTypes.string,
  consentData: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    currentPageSize: PropTypes.number,
    totalElements: PropTypes.number,
    handlePageClick: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      logicalId: PropTypes.string.isRequired,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
      status: PropTypes.shape({
        code: PropTypes.string,
        display: PropTypes.string,
      }),
      fromActor: PropTypes.array,
      toActor: PropTypes.array,
      period: PropTypes.shape({
        start: PropTypes.date,
        end: PropTypes.date,
      }),
    })).isRequired,
  }),

};

export default ConsentTable;
