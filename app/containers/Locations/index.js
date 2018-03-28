/**
 *
 * Locations
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Cell } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';
import isEqual from 'lodash/isEqual';
import MenuItem from 'material-ui/MenuItem';

import RecordsRange from 'components/RecordsRange';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import StatusCheckbox from 'components/StatusCheckbox';
import Card from 'components/Card';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import FilterSection from 'components/FilterSection';
import CheckboxFilterGrid from 'components/CheckboxFilterGrid';
import Table from 'components/Table';
import TableHeader from 'components/TableHeader';
import TableHeaderColumn from 'components/TableHeaderColumn';
import TableRow from 'components/TableRow';
import TableRowColumn from 'components/TableRowColumn';
import NavigationStyledIconMenu from 'components/StyledIconMenu/NavigationStyledIconMenu';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import StyledFlatButton from 'components/StyledFlatButton';
import PanelToolbar from 'components/PanelToolbar';
import { MANAGE_LOCATION_URL } from 'containers/App/constants';
import { makeSelectLocation, makeSelectOrganization } from 'containers/App/contextSelectors';
import { clearLocation, setLocation } from 'containers/App/contextActions';
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
import { getActiveLocations, getFilteredLocations, initializeLocations } from './actions';
import SizedStickyDiv from '../../components/StickyDiv/SizedStickyDiv';

export class Locations extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static TABLE_COLUMNS = '3fr 1fr 3fr 3fr 50px';

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      panelHeight: 0,
      filterHeight: 0,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleIncludeInactive = this.handleIncludeInactive.bind(this);
    this.handleIncludeSuspended = this.handleIncludeSuspended.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.handlePanelResize = this.handlePanelResize.bind(this);
    this.handleFilterResize = this.handleFilterResize.bind(this);
    this.ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
    this.LOCATION_NAME_HTML_ID = uniqueId('location_name_');
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
    }
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

  handlePageClick(currentPage) {
    this.props.onChangePage(currentPage, this.props.includeInactive, this.props.includeSuspended);
  }

  renderTelecoms(telecoms) {
    return telecoms.map((entry) =>
      (
        <div key={entry.value}>
          {entry.system}: {entry.value},
        </div>
      ),
    );
  }

  renderAddress(address) {
    const { line1, line2, city, stateCode, postalCode, countryCode } = address;
    const addressStr = [line1, line2, city, stateCode, postalCode, countryCode].filter((i) => i && i !== '').join(', ');
    return addressStr ? (<div>{addressStr}</div>) : '';
  }

  renderRows() {
    if (this.props.data) {
      return this.props.data.map((location) => {
        const { logicalId, name, status, telecoms, address } = location;
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
            <TableRowColumn>{this.renderTelecoms(telecoms)}</TableRowColumn>
            <TableRowColumn>{this.renderAddress(address)}</TableRowColumn>
            <TableRowColumn>
              <NavigationStyledIconMenu>
                <MenuItem
                  primaryText={<FormattedMessage {...messages.actionLabelEdit} />}
                  containerElement={<Link to={`/ocp-ui/manage-location/${logicalId}`} />}
                />
                <MenuItem
                  primaryText={<FormattedMessage {...messages.actionLabelAssignHealthCareService} />}
                  containerElement={<Link to={`/ocp-ui/assign-healthcareservice-location/${logicalId}`} />}
                />
              </NavigationStyledIconMenu>
            </TableRowColumn>
          </TableRow>
        );
      });
    }
    return '<TableRow />';
  }

  renderTable() {
    return (
      <div>
        <SizedStickyDiv onSize={this.handleFilterResize} top={`${this.state.panelHeight}px`}>
          <InfoSection margin="0px">
            <div>
              The <FormattedMessage {...messages.locations} /> for &nbsp;
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
            <StyledFlatButton
              label="Clear"
              onClick={this.props.clearLocation}
            />

          </InfoSection>
          }
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
        </SizedStickyDiv>
        <Table>
          <TableHeader columns={Locations.TABLE_COLUMNS} relativeTop={this.state.panelHeight + this.state.filterHeight}>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnName} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnStatus} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnTelecoms} /></TableHeaderColumn>
            <TableHeaderColumn><FormattedMessage {...messages.tableHeaderColumnAddress} /></TableHeaderColumn>
            <TableHeaderColumn />
          </TableHeader>
          {this.renderRows()}
          <CenterAlignedUltimatePagination
            currentPage={this.props.currentPage}
            totalPages={this.props.totalNumberOfPages}
            onChange={this.handlePageClick}
          />
          <RecordsRange
            currentPage={this.props.currentPage}
            totalPages={this.props.totalNumberOfPages}
            totalElements={this.props.totalElements}
            currentPageSize={this.props.currentPageSize}
          />
        </Table>
      </div>
    )
      ;
  }

  renderLocationTable() {
    const { data } = this.props;
    if (data && data.length > 0) {
      return this.renderTable();
    }
    return (<h4><FormattedMessage {...messages.noLocationsFound} /></h4>);
  }

  render() {
    const addNewItem = {
      labelName: <FormattedMessage {...messages.buttonLabelCreateNew} />,
      linkUrl: MANAGE_LOCATION_URL,
    };
    return (
      <Card>
        <PanelToolbar addNewItem={addNewItem} showSearchIcon={false} onSize={this.handlePanelResize} />
        {this.renderLocationTable()}
      </Card>);
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
  data: PropTypes.array,
  organization: PropTypes.object,
  location: PropTypes.object,
  currentPage: PropTypes.number,
  totalNumberOfPages: PropTypes.number,
  totalElements: PropTypes.number,
  currentPageSize: PropTypes.number,
  includeInactive: PropTypes.bool,
  includeSuspended: PropTypes.bool,
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
