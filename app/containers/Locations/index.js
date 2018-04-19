/**
 *
 * Locations
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Cell } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { DEFAULT_START_PAGE_NUMBER, MANAGE_LOCATION_URL, ORGANIZATION_ADMIN_ROLE_CODE } from 'containers/App/constants';
import { makeSelectLocation, makeSelectOrganization } from 'containers/App/contextSelectors';
import { clearLocation, setLocation } from 'containers/App/contextActions';
import StatusCheckbox from 'components/StatusCheckbox';
import RecordsRange from 'components/RecordsRange';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import FilterSection from 'components/FilterSection';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationIconMenu from 'components/NavigationIconMenu';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import StyledFlatButton from 'components/StyledFlatButton';
import PanelToolbar from 'components/PanelToolbar';
import SizedStickyDiv from 'components/StickyDiv/SizedStickyDiv';
import CenterAlign from 'components/Align/CenterAlign';
import NoResultsFoundText from 'components/NoResultsFoundText';
import {
  makeSelectCurrentPage,
  makeSelectCurrentPageSize,
  makeSelectIncludeInactive,
  makeSelectIncludeSuspended,
  makeSelectLocations,
  makeSelectTotalElements,
  makeSelectTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getActiveLocations, getFilteredLocations, initializeLocations, searchLocations } from './actions';
import { flattenLocationData } from './helpers';


export class Locations extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static TABLE_COLUMNS = 'repeat(4, 1fr) 50px';
  static initalState = {
    panelHeight: 0,
    filterHeight: 0,
    isShowSearchResult: false,
    listLocations: {
      currentPage: 1,
    },
    searchLocations: {
      currentPage: 1,
      searchValue: '',
      includeInactive: false,
      searchType: 'name',
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      ...Locations.initalState,
    };
    this.onSize = this.onSize.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.handleSearchPageClick = this.handleSearchPageClick.bind(this);
    this.handleIncludeInactive = this.handleIncludeInactive.bind(this);
    this.handleIncludeSuspended = this.handleIncludeSuspended.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleFilterResize = this.handleFilterResize.bind(this);
    this.ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
  }

  componentDidMount() {
    this.props.initializeLocations();
    const { organization } = this.props;
    if (organization) {
      this.props.getActiveLocations(1);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { organization } = this.props;
    const { organization: newOrganization } = nextProps;
    if (!isEqual(organization, newOrganization)) {
      this.props.getActiveLocations(1);
      this.setState([...Locations.initalState]);
    }
  }

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }

  handleSearch(searchValue, includeInactive, searchType) {
    this.setState({
      searchLocations: { searchValue, includeInactive, searchType },
      isShowSearchResult: true,
    });
    this.props.searchLocations(searchValue, includeInactive, searchType, DEFAULT_START_PAGE_NUMBER);
  }

  handlePanelResize(size) {
    this.setState({ panelHeight: size.height });
  }

  handleFilterResize(size) {
    this.setState({ filterHeight: size.height });
  }

  handleRowClick(location) {
    this.props.setLocation(location);
  }

  handleIncludeInactive(event, checked) {
    this.props.onCheckIncludeInactive(event, checked, this.props.includeSuspended);
  }

  handleIncludeSuspended(event, checked) {
    this.props.onCheckIncludeSuspended(event, checked, this.props.includeInactive);
  }

  handleListPageClick(currentPage) {
    this.props.onChangePage(currentPage, this.props.includeInactive, this.props.includeSuspended);
  }

  handleSearchPageClick(currentPage) {
    this.props.searchLocations(this.state.searchLocations.searchValue, this.state.searchLocations.includeInactive, this.state.searchLocations.searchType, currentPage);
  }

  renderRows() {
    if (this.props.data) {
      return this.props.data.map((location) => {
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
            onClick={() => this.handleRowClick(location)}
            columns={Locations.TABLE_COLUMNS}
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
      });
    }
    return '<TableRow />';
  }

  renderTable() {
    const { data } = this.props;
    return (
      <div>
        {data && data.length > 0 ?
          <div>
            <Table>
              <TableHeader
                columns={Locations.TABLE_COLUMNS}
                relativeTop={this.state.panelHeight + this.state.filterHeight}
              >
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnName} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnTelecoms} /></TableHeaderColumn>
                <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnAddress} /></TableHeaderColumn>
              </TableHeader>
              {this.renderRows()}
            </Table>
            <CenterAlignedUltimatePagination
              currentPage={this.props.currentPage}
              totalPages={this.props.totalNumberOfPages}
              onChange={this.state.isShowSearchResult ? this.handleSearchPageClick : this.handleListPageClick}
            />
            <RecordsRange
              currentPage={this.props.currentPage}
              totalPages={this.props.totalNumberOfPages}
              totalElements={this.props.totalElements}
              currentPageSize={this.props.currentPageSize}
            />
          </div> :
          <CenterAlign>
            <NoResultsFoundText><FormattedMessage {...messages.noLocationsFound} /></NoResultsFoundText>
          </CenterAlign>
        }
      </div>
    )
      ;
  }

  renderActionSection() {
    return (
      <SizedStickyDiv onSize={this.handleFilterResize} top={`${this.state.panelHeight}px`}>
        <InfoSection margin="0px">
          <div>
            {this.state.isShowSearchResult ? 'Search' : 'The'}&nbsp;
            <FormattedMessage {...messages.locations} /> for &nbsp;
            <InlineLabel htmlFor={this.ORGANIZATION_NAME_HTML_ID}>
              <span id={this.ORGANIZATION_NAME_HTML_ID}>
                {this.props.organization ? this.props.organization.name : ''}&nbsp;
              </span>
            </InlineLabel>
            are :
          </div>
        </InfoSection>
        {this.props.location &&
        <InfoSection margin="0px" width="fit-content" maxWidth="500px">
          <StyledFlatButton onClick={this.props.clearLocation}>
            Clear
          </StyledFlatButton>
        </InfoSection>
        }
        {!this.state.isShowSearchResult &&
        <FilterSection>
          <CheckboxFilterGrid>
            <Cell>
              <FormattedMessage {...messages.filterLabel} />
            </Cell>
            <Cell>
              <StatusCheckbox
                messages={messages.inactive}
                elementId="inactiveCheckBox"
                checked={this.props.includeInactive}
                handleCheck={this.handleIncludeInactive}
              />
            </Cell>
            <Cell>
              <StatusCheckbox
                messages={messages.suspended}
                elementId="suspendedCheckBox"
                checked={this.props.includeSuspended}
                handleCheck={this.handleIncludeSuspended}
              />
            </Cell>
          </CheckboxFilterGrid>
        </FilterSection>
        }
      </SizedStickyDiv>
    );
  }

  // Todo: Refactor to create presentational location table component
  render() {
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_LOCATION_URL,
    };
    return (
      <div>
        {this.props.showActionSection &&
        <PanelToolbar
          addNewItem={addNewItem}
          allowedAddNewItemRoles={ORGANIZATION_ADMIN_ROLE_CODE}
          onSearch={this.handleSearch}
          onSize={this.handlePanelResize}
          showFilter={false}
        />
        }
        {this.props.showActionSection && this.renderActionSection()}
        {this.renderTable()}
      </div>);
  }
}

Locations.propTypes = {
  onCheckIncludeInactive: PropTypes.func.isRequired,
  onCheckIncludeSuspended: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initializeLocations: PropTypes.func.isRequired,
  getActiveLocations: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  clearLocation: PropTypes.func.isRequired,
  showActionSection: PropTypes.bool,
  data: PropTypes.array,
  organization: PropTypes.object,
  location: PropTypes.object,
  currentPage: PropTypes.number,
  totalNumberOfPages: PropTypes.number,
  totalElements: PropTypes.number,
  currentPageSize: PropTypes.number,
  includeInactive: PropTypes.bool,
  includeSuspended: PropTypes.bool,
  searchLocations: PropTypes.func,
};

Locations.defaultProps = {
  showActionSection: true,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectLocations(),
  organization: makeSelectOrganization(),
  location: makeSelectLocation(),
  currentPage: makeSelectCurrentPage(),
  totalNumberOfPages: makeSelectTotalNumberOfPages(),
  currentPageSize: makeSelectCurrentPageSize(),
  totalElements: makeSelectTotalElements(),
  includeInactive: makeSelectIncludeInactive(),
  includeSuspended: makeSelectIncludeSuspended(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCheckIncludeInactive: (evt, checked, includeSuspended) => {
      const currentPage = 1;
      dispatch(getFilteredLocations(currentPage, checked, includeSuspended));
    },
    onCheckIncludeSuspended: (evt, checked, includeInactive) => {
      const currentPage = 1;
      dispatch(getFilteredLocations(currentPage, includeInactive, checked));
    },
    onChangePage: (currentPage, includeInactive, includeSuspended) => dispatch(getFilteredLocations(currentPage, includeInactive, includeSuspended)),
    initializeLocations: () => dispatch(initializeLocations()),
    getActiveLocations: (currentPage) => dispatch(getActiveLocations(currentPage)),
    setLocation: (location) => dispatch(setLocation(location)),
    clearLocation: () => dispatch(clearLocation()),
    searchLocations: (searchValue, includeInactive, searchType, currentPage) =>
      dispatch(searchLocations(searchValue, includeInactive, searchType, currentPage)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'locations', reducer });
const withSaga = injectSaga({ key: 'locations', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Locations);
