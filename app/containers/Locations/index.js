/**
 *
 * Locations
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import UltimatePagination from 'react-ultimate-pagination-material-ui';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import StatusCheckbox from 'components/StatusCheckbox';
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
import styles from './styles.css';
import { getFilteredLocations, initializeLocations } from './actions';

const iconStyles = {
  iconButton: {
    position: 'relative',
  },
  icon: {
    width: '100%',
    height: 26,
    position: 'absolute',
    top: '0',
    right: '0',
  },
};

export class Locations extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleIncludeInactive = this.handleIncludeInactive.bind(this);
    this.handleIncludeSuspended = this.handleIncludeSuspended.bind(this);
    this.handleRowClick = this.handleRowClick.bind(this);
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
        <div
          role="button"
          tabIndex="0"
          key={logicalId}
          className={styles.rowGridContainer}
          onClick={() => this.handleRowClick(logicalId, name)}
        >
          <div className={styles.cellGridItem}>{name}</div>
          <div className={styles.cellGridItem}>{status}</div>
          <div className={styles.cellGridItem}>{this.renderTelecoms(telecoms)}</div>
          <div className={styles.cellGridItem}>{this.renderAddress(address)} </div>
          <IconMenu
            iconButtonElement={
              (<IconButton
                className={styles.iconButton}
                iconStyle={iconStyles.icon}
                style={iconStyles.iconButton}
              >
                <NavigationMenu />
              </IconButton>)
            }
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem
              className={styles.menuItem}
              primaryText="Edit"
              containerElement={<Link to={`/ocp-ui/manage-location/${logicalId}`} />}
            />
            <MenuItem
              className={styles.menuItem}
              primaryText="Assign HealthCareService"
              containerElement={<Link to={`/ocp-ui/assign-healthcareservice-location/${logicalId}`} />}
            />
          </IconMenu>
        </div>
      ));
    }
    return '<div></div>';
  }

  renderTable() {
    return (
      <div className={styles.card}>
        <div className={styles.organizationInfoSection}>
          <div className={styles.organizationInfoLabel}>
            Organization&nbsp;:&nbsp;
          </div>
          {this.props.organization ? this.props.organization.name : ''}
        </div>
        <div className={styles.actionSection}>
          <div className={styles.filterGridContainer}>
            <div>
              <FormattedMessage {...messages.filterLabel} />
            </div>
            <StatusCheckbox
              messages={messages.inactive}
              elementId="inactiveCheckBox"
              checked={this.props.includeInactive}
              handleCheck={this.handleIncludeInactive}
            >
            </StatusCheckbox>
            <StatusCheckbox
              messages={messages.suspended}
              elementId="suspendedCheckBox"
              checked={this.props.includeSuspended}
              handleCheck={this.handleIncludeSuspended}
            >
            </StatusCheckbox>
          </div>
        </div>
        <div className={styles.table}>
          <div className={styles.rowHeaderGridContainer}>
            <div className={styles.cellGridHeaderItem}>Name</div>
            <div className={styles.cellGridHeaderItem}>Status</div>
            <div className={styles.cellGridHeaderItem}>Telecoms</div>
            <div className={styles.cellGridHeaderItem}>Address</div>
            <div></div>
          </div>
          {this.renderRows()}
          <div className={styles.pagination}>
            <UltimatePagination
              currentPage={this.props.currentPage}
              totalPages={this.props.totalNumberOfPages}
              boundaryPagesRange={1}
              siblingPagesRange={1}
              hidePreviousAndNextPageLinks={false}
              hideFirstAndLastPageLinks={false}
              hideEllipsis={false}
              onChange={this.handlePageClick}
            />
          </div>
        </div>
      </div>
    );
  }

  renderLocationTable() {
    const { data } = this.props;
    if (data && data.length > 0) {
      return this.renderTable();
    }
    return (<div className={styles.card}><h4> No locations loaded. Please select an organization to view its
      locations.</h4></div>);
  }

  render() {
    return this.renderLocationTable();
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
