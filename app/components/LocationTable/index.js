/**
 *
 * LocationTable
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import RecordsRange from 'components/RecordsRange';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import messages from './messages';


const tableColumns = 'repeat(4, 1fr) 50px';

function LocationTable(props) {
  const {
    relativeTop,
    handleRowClick,
    flattenLocationData,
    locationTableData: { data, currentPage, totalNumberOfPages, totalElements, currentPageSize, handlePageChange },
  } = props;
  return (
    <div>
      {data && data.length > 0 ?
        <div>
          <Table>
            <TableHeader columns={tableColumns} relativeTop={relativeTop}>
              <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnName} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnTelecoms} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnAddress} /></TableHeaderColumn>
            </TableHeader>
            {data.map((location) => {
              const flattenedLocation = flattenLocationData(location);
              const { logicalId, name, status, telecoms, address } = flattenedLocation;
              const menuItems = [{
                primaryText: <FormattedMessage {...messages.actionLabelEdit} />,
                linkTo: `/ocp-ui/manage-location/${logicalId}`,
              }, {
                primaryText: <FormattedMessage {...messages.actionLabelAssignHealthCareService} />,
                linkTo: `/ocp-ui/assign-healthcareservice-location/${logicalId}`,
              }];
              return (
                <TableRow
                  role="button"
                  tabIndex="0"
                  key={logicalId}
                  onClick={() => handleRowClick(location)}
                  columns={tableColumns}
                >
                  <TableRowColumn>{name}</TableRowColumn>
                  <TableRowColumn>{status}</TableRowColumn>
                  <TableRowColumn>{telecoms}</TableRowColumn>
                  <TableRowColumn>{address}</TableRowColumn>
                  <TableRowColumn>
                    <NavigationIconMenu menuItems={menuItems} />
                  </TableRowColumn>
                </TableRow>
              );
            })
            }
          </Table>
          <CenterAlignedUltimatePagination
            currentPage={currentPage}
            totalPages={totalNumberOfPages}
            onChange={handlePageChange}
          />
          <RecordsRange
            currentPage={currentPage}
            totalPages={totalNumberOfPages}
            totalElements={totalElements}
            currentPageSize={currentPageSize}
          />
        </div> :
        <CenterAlign>
          <NoResultsFoundText><FormattedMessage {...messages.noLocationsFound} /></NoResultsFoundText>
        </CenterAlign>
      }
    </div>
  );
}

LocationTable.propTypes = {
  relativeTop: PropTypes.number.isRequired,
  locationTableData: PropTypes.PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
    totalElements: PropTypes.number,
    currentPageSize: PropTypes.number,
    handlePageChange: PropTypes.func.isRequired,
    data: PropTypes.arrayOf(PropTypes.shape({
      managingLocationLogicalId: PropTypes.string,
      logicalId: PropTypes.string.isRequired,
      status: PropTypes.string,
      physicalType: PropTypes.string,
      address: PropTypes.shape({
        line1: PropTypes.string,
        line2: PropTypes.string,
        city: PropTypes.string,
        stateCode: PropTypes.string,
        postalCode: PropTypes.string,
        countryCode: PropTypes.string,
        use: PropTypes.string,
      }),
      telecoms: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        value: PropTypes.string,
        use: PropTypes.string,
      })),
      name: PropTypes.string,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
    })).isRequired,
  }).isRequired,
  handleRowClick: PropTypes.func.isRequired,
  flattenLocationData: PropTypes.func.isRequired,
};

export default LocationTable;
