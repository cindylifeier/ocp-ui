/**
*
* LocationTable
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Cell } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';

import PropTypes from 'prop-types';
import sizeMeHOC from 'utils/SizeMeUtils';
import NavigationIconMenu from 'components/NavigationIconMenu';
import TableRowColumn from 'components/TableRowColumn';
import TableRow from 'components/TableRow';
import SizedStickyDiv from 'components/StickyDiv/SizedStickyDiv';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import StyledFlatButton from 'components/StyledFlatButton';
import FilterSection from 'components/FilterBar/FilterSection';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import StatusCheckbox from 'components/StatusCheckbox';
import TableHeader from 'components/TableHeader';
import Table from 'components/Table';
import TableHeaderColumn from 'components/TableHeaderColumn';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import RecordsRange from 'components/RecordsRange';
import { EXPANDED_TABLE_COLUMNS, SUMMARISED_TABLE_COLUMNS, SUMMARY_VIEW_WIDTH } from 'components/LocationTable/constants';
import messages from './messages';

function LocationTable(props) {
  const {
    data,
    panelHeight,
    handleFilterResize,
    handlePageClick,
    isShowSearchResult,
    handleRowClick,
    handleIncludeInactive,
    includeSuspended,
    handleIncludeSuspended,
    orgNameHtmlId,
    organization,
    location,
    clearLocation,
    includeInactive,
    filterHeight,
    currentPage,
    totalNumberOfPages,
    currentPageSize,
    totalElements,
    size,
  } = props;
  const isExpanded = size && size.width ? (Math.floor(size.width) > SUMMARY_VIEW_WIDTH) : false;
  const columns = isExpanded ? EXPANDED_TABLE_COLUMNS : SUMMARISED_TABLE_COLUMNS;

  function renderTelecoms(telecoms) {
    return telecoms.map((entry) =>
      (
        <div key={entry.value}>
          {entry.system}: {entry.value},
        </div>
      ),
    );
  }

  function renderAddress(address) {
    const { line1, line2, city, stateCode, postalCode, countryCode } = address;
    const addressStr = [line1, line2, city, stateCode, postalCode, countryCode].filter((i) => i && i !== '').join(', ');
    return addressStr ? (<div>{addressStr}</div>) : '';
  }

  function renderRows() {
    if (data) {
      return data.map((entry) => {
        const { logicalId, name, status, telecoms, address } = entry;
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
            key={uniqueId()}
            onClick={() => handleRowClick(entry)}
            columns={columns}
          >
            <TableRowColumn>{name}</TableRowColumn>
            <TableRowColumn>{renderTelecoms(telecoms)}</TableRowColumn>
            {isExpanded &&
            <TableRowColumn>{renderAddress(address)}</TableRowColumn>
            }
            <TableRowColumn>{status}</TableRowColumn>
            <TableRowColumn>
              <NavigationIconMenu menuItems={menuItems} />
            </TableRowColumn>
          </TableRow>
        );
      });
    }
    return '<TableRow />';
  }

  return (
    <div>
      <SizedStickyDiv onSize={handleFilterResize} top={`${panelHeight}px`}>
        <InfoSection margin="0px">
          <div>
            {isShowSearchResult ? 'Search' : 'The'}&nbsp;
            <FormattedMessage {...messages.locations} /> for &nbsp;
            <InlineLabel htmlFor={orgNameHtmlId}>
              <span id={orgNameHtmlId}>
                {organization ? organization.name : ''}&nbsp;
              </span>
            </InlineLabel>
            are :
          </div>
        </InfoSection>
        {location &&
        <InfoSection margin="0px" width="fit-content" maxWidth="500px">
          <StyledFlatButton onClick={clearLocation}>
            Clear
          </StyledFlatButton>
        </InfoSection>
        }
        {!isShowSearchResult &&
        <FilterSection>
          <CheckboxFilterGrid>
            <Cell>
              <FormattedMessage {...messages.filterLabel} />
            </Cell>
            <Cell>
              <StatusCheckbox
                messages={messages.inactive}
                elementId="inactiveCheckBox"
                checked={includeInactive}
                handleCheck={handleIncludeInactive}
              />
            </Cell>
            <Cell>
              <StatusCheckbox
                messages={messages.suspended}
                elementId="suspendedCheckBox"
                checked={includeSuspended}
                handleCheck={handleIncludeSuspended}
              />
            </Cell>
          </CheckboxFilterGrid>
        </FilterSection>
        }
      </SizedStickyDiv>
      <Table>
        <TableHeader columns={columns} relativeTop={panelHeight + filterHeight}>
          <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnName} /></TableHeaderColumn>
          <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnTelecoms} /></TableHeaderColumn>
          {isExpanded &&
          <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnAddress} /></TableHeaderColumn>
          }
          <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
          <TableHeaderColumn />
        </TableHeader>
        {renderRows(columns)}
        <CenterAlignedUltimatePagination
          currentPage={currentPage}
          totalPages={totalNumberOfPages}
          onChange={handlePageClick}
        />
        <RecordsRange
          currentPage={currentPage}
          totalPages={totalNumberOfPages}
          totalElements={totalElements}
          currentPageSize={currentPageSize}
        />
      </Table>
    </div>
  );
}

LocationTable.propTypes = {
  data: PropTypes.array.isRequired,
  organization: PropTypes.object,
  location: PropTypes.object,
  includeInactive: PropTypes.bool,
  includeSuspended: PropTypes.bool,
  clearLocation: PropTypes.func.isRequired,
  handleFilterResize: PropTypes.func.isRequired,
  handleIncludeInactive: PropTypes.func.isRequired,
  handleRowClick: PropTypes.func.isRequired,
  handleIncludeSuspended: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  totalNumberOfPages: PropTypes.number,
  currentPageSize: PropTypes.number,
  totalElements: PropTypes.number,
  panelHeight: PropTypes.number,
  filterHeight: PropTypes.number,
  isShowSearchResult: PropTypes.bool,
  orgNameHtmlId: PropTypes.string,
  size: PropTypes.object.isRequired,
  handlePageClick: PropTypes.func.isRequired,
};

export default sizeMeHOC(LocationTable);
