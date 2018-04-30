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
import sizeMeHOC from 'utils/SizeMeUtils';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import {
  EXPANDED_TABLE_COLUMNS,
  SUMMARIZED_TABLE_COLUMNS,
  SUMMARY_VIEW_WIDTH,
} from 'components/LocationTable/constants';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import messages from './messages';


function LocationTable(props) {
  const {
    size,
    relativeTop,
    handleRowClick,
    flattenLocationData,
    locationTableData: { data, currentPage, totalNumberOfPages, totalElements, currentPageSize, handlePageChange },
  } = props;
  const isExpanded = size && size.width && (Math.floor(size.width) > SUMMARY_VIEW_WIDTH);
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARIZED_TABLE_COLUMNS;
  return (
    <div>
      {data && data.length > 0 ?
        <div>
          <Table>
            <TableHeader columns={columns} relativeTop={relativeTop}>
              <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnName} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnTelecoms} /></TableHeaderColumn>
              <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
              {isExpanded &&
              <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnAddress} /></TableHeaderColumn>
              }
              <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnAction} /></TableHeaderColumn>
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
                  columns={columns}
                >
                  <TableRowColumn>{name}</TableRowColumn>
                  <TableRowColumn>{telecoms}</TableRowColumn>
                  <TableRowColumn>{status}</TableRowColumn>
                  {isExpanded &&
                  <TableRowColumn>{address}</TableRowColumn>
                  }
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
  size: PropTypes.object.isRequired,
};

export default sizeMeHOC(LocationTable);
