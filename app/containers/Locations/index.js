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
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import StatusCheckbox from 'components/StatusCheckbox';
import Card from 'components/Card';
import CardHeader from 'components/CardHeader';
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
import StyledMenuItem from 'components/StyledMenuItem';
import CenterAlignedUltimatePagination from 'components/CenterAlignedUltimatePagination';
import { getHealthcareServicesByLocation } from 'containers/HealthcareServices/actions';
import {
  makeSelectCurrentPage,
  makeSelectIncludeInactive,
  makeSelectIncludeSuspended,
  makeSelectLocations,
  makeSelectOrganization,
  makeSelectTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getFilteredLocations, initializeLocations } from './actions';

export class Locations extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  static TABLE_COLUMNS = '3fr 1fr 3fr 3fr 50px';

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleIncludeInactive = this.handleIncludeInactive.bind(this);
    this.handleIncludeSuspended = this.handleIncludeSuspended.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
    this.ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
  }

  componentDidMount() {
    this.props.initializeLocations();
  }

  handleRowClick(locationLogicalId, locationName) {
    const { organization: { id, name } } = this.props;
    this.props.getHealthcareServicesByLocation(id, name, locationLogicalId, locationName);
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
      return this.props.data.map(({ logicalId, name, status, telecoms, address }) => (
        <TableRow
          role="button"
          tabIndex="0"
          key={logicalId}
          onClick={() => this.handleRowClick(logicalId, name)}
          columns={Locations.TABLE_COLUMNS}
        >
          <TableRowColumn>{name}</TableRowColumn>
          <TableRowColumn>{status}</TableRowColumn>
          <TableRowColumn>{this.renderTelecoms(telecoms)}</TableRowColumn>
          <TableRowColumn>{this.renderAddress(address)}</TableRowColumn>
          <TableRowColumn>
            <NavigationStyledIconMenu>
              <StyledMenuItem
                primaryText={<FormattedMessage {...messages.actionLabelEdit} />}
                containerElement={<Link to={`/ocp-ui/manage-location/${logicalId}`} />}
              />
              <StyledMenuItem
                primaryText={<FormattedMessage {...messages.actionLabelAssignHealthCareService} />}
                containerElement={<Link to={`/ocp-ui/assign-healthcareservice-location/${logicalId}`} />}
              />
            </NavigationStyledIconMenu>
          </TableRowColumn>
        </TableRow>
      ));
    }
    return '<TableRow />';
  }

  renderTable() {
    return (
      <div>
        <InfoSection>
          <InlineLabel htmlFor={this.ORGANIZATION_NAME_HTML_ID}>
            <FormattedMessage {...messages.labelOrganization} />&nbsp;
          </InlineLabel>
          <span
            id={this.ORGANIZATION_NAME_HTML_ID}
          >
            {this.props.organization ? this.props.organization.name : ''}
          </span>
        </InfoSection>
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
        <Table>
          <TableHeader columns={Locations.TABLE_COLUMNS}>
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
    return (
      <Card>
        <CardHeader title={<FormattedMessage {...messages.header} />} />
        {this.renderLocationTable()}
      </Card>);
  }
}

Locations.propTypes = {
  onCheckIncludeInactive: PropTypes.func.isRequired,
  onCheckIncludeSuspended: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  initializeLocations: PropTypes.func.isRequired,
  getHealthcareServicesByLocation: PropTypes.func.isRequired,
  data: PropTypes.array,
  organization: PropTypes.object,
  currentPage: PropTypes.number,
  totalNumberOfPages: PropTypes.number,
  includeInactive: PropTypes.bool,
  includeSuspended: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectLocations(),
  organization: makeSelectOrganization(),
  currentPage: makeSelectCurrentPage(),
  totalNumberOfPages: makeSelectTotalNumberOfPages(),
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
    getHealthcareServicesByLocation: (organizationId, organizationName, locationId, locationName) => dispatch(getHealthcareServicesByLocation(organizationId, organizationName, locationId, locationName)),
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
