/**
 *
 * OrganizationTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import isEmpty from 'lodash/isEmpty';

import sizeMeHOC from 'utils/SizeMeUtils';
import RecordsRange from 'components/RecordsRange';
import NoResultsFoundText from 'components/NoResultsFoundText';
import CenterAlign from 'components/Align/CenterAlign';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import RefreshIndicatorLoading from 'components/RefreshIndicatorLoading';
import StyledFlatButton from 'components/StyledFlatButton';
import TableHeader from 'components/TableHeader';
import Table from 'components/Table';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import messages from './messages';
import { EXPANDED_TABLE_COLUMNS, SUMMARY_VIEW_WIDTH, SUMMARISED_TABLE_COLUMNS } from './constants';

const ENTER_KEY = 'Enter';

function OrganizationTable(props) {
  const { organizationData, flattenOrganizationData, onRowClick, relativeTop, onOrganizationViewDetails, size } = props;
  const isExpanded = size && size.width && (Math.floor(size.width) > SUMMARY_VIEW_WIDTH);
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARISED_TABLE_COLUMNS;

  return (
    <div>
      {organizationData.loading && <RefreshIndicatorLoading />}
      {(!organizationData.loading && organizationData.data && organizationData.data.length > 0
          ? <div>
            <Table>
              <TableHeader columns={tableColumns} relativeTop={relativeTop}>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderOrganization} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderId} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableColumnHeaderStatus} /></TableHeaderColumn>
              </TableHeader>
              {!isEmpty(organizationData.data) && organizationData.data.map((organization) => {
                const flattenOrganization = flattenOrganizationData(organization);
                const { logicalId, name, identifiers, active } = flattenOrganization;
                return (
                  <TableRow
                    columns={tableColumns}
                    key={logicalId}
                    onClick={() => onRowClick && onRowClick(organization)}
                    onKeyPress={(e) => {
                      if (e.key === ENTER_KEY) {
                        if (onRowClick) {
                          onRowClick(organization);
                        }
                      }
                      e.preventDefault();
                    }}
                    role="button"
                    tabIndex="0"
                  >
                    <TableRowColumn>{name}</TableRowColumn>
                    <TableRowColumn>{identifiers}</TableRowColumn>
                    <TableRowColumn>
                      {active ?
                        <FormattedMessage {...messages.active} /> :
                        <FormattedMessage {...messages.inactive} />
                      }
                    </TableRowColumn>
                    <TableRowColumn>
                      <StyledFlatButton color="primary" size="small" onClick={() => onOrganizationViewDetails()}>
                        <FormattedMessage {...messages.viewDetails} />
                      </StyledFlatButton>
                    </TableRowColumn>
                  </TableRow>
                );
              })}
            </Table>
            {!!organizationData && !!organizationData.currentPage &&
            <div>
              <CenterAlignedUltimatePagination
                currentPage={organizationData.currentPage}
                totalPages={organizationData.totalNumberOfPages}
                onChange={organizationData.handlePageClick}
              />
              <RecordsRange
                currentPage={organizationData.currentPage}
                totalPages={organizationData.totalNumberOfPages}
                totalElements={organizationData.totalElements}
                currentPageSize={organizationData.currentPageSize}
              />
            </div>}
          </div> :
          (<CenterAlign>
            <NoResultsFoundText>No organizations found</NoResultsFoundText>
          </CenterAlign>)
      )}
    </div>
  );
}

OrganizationTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  organizationData: PropTypes.shape({
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
      active: PropTypes.bool,
      name: PropTypes.string.isRequired,
      addresses: PropTypes.arrayOf(PropTypes.shape({
        line1: PropTypes.string,
        line2: PropTypes.string,
        city: PropTypes.string,
        stateCode: PropTypes.string,
        postalCode: PropTypes.string,
        countryCode: PropTypes.string,
        use: PropTypes.string,
      })),
      telecoms: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        value: PropTypes.string,
        use: PropTypes.string,
      })),
    })).isRequired,
  }),
  onRowClick: PropTypes.func,
  flattenOrganizationData: PropTypes.func.isRequired,
  onOrganizationViewDetails: PropTypes.func.isRequired,
  size: PropTypes.object.isRequired,
};

export default sizeMeHOC(OrganizationTable);
