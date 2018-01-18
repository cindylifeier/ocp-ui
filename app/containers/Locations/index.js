/**
 *
 * Locations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import UltimatePagination from 'react-ultimate-pagination-material-ui';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {
  makeSelectCurrentPage, makeSelectLocations, makeSelectOrganization,
  makeSelectTotalNumberOfPages,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import { getFilteredLocations } from './actions';
import { STATUS_INACTIVE, STATUS_SUSPENDED } from './constants';
import StatusCheckbox from '../../components/StatusCheckbox';

export class Locations extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      inactiveStatus: false,
      suspendedStatus: false,
      currentPage: 1,
    };
    this.handleInactiveChecked = this.handleInactiveChecked.bind(this);
    this.handleSuspendedChecked = this.handleSuspendedChecked.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  getTelecoms(telecoms) {
    return telecoms.map((entry) =>
      (
        <div key={entry.value}>
          {entry.system}: {entry.value},
        </div>
      ),
    );
  }

  getAddress(address) {
    return address ? (<div>
      {address.line1}
      {address.line2},
      {address.city}, {address.stateCode} {address.postalCode},
      {address.countryCode}</div>) : '';
  }

  handleInactiveChecked(event, newValue) {
    this.setState({ inactiveStatus: newValue });
    const suspendedStatus = this.state.suspendedStatus;
    this.props.onCheckShowInactive(event, newValue, suspendedStatus);
  }

  handleSuspendedChecked(event, newValue) {
    this.setState({ suspendedStatus: newValue });
    const inactiveStatus = this.state.inactiveStatus;
    this.props.onCheckShowSuspended(event, newValue, inactiveStatus);
  }

  handlePageClick(currentPage) {
    const status = [];
    this.setState({ currentPage });
    if (this.state.inactiveStatus) {
      status.push(STATUS_INACTIVE);
    }

    if (this.state.suspendedStatus) {
      status.push(STATUS_SUSPENDED);
    }

    this.props.onChangePage(status, currentPage);
  }

  createRows() {
    if (this.props.data) {
      return this.props.data.map((location) => (
        <div key={location.logicalId} className={styles.rowGridContainer}>
          <div className={styles.cellGridItem}>{location.name}</div>
          <div className={styles.cellGridItem}>{location.status}</div>
          <div className={styles.cellGridItem}>{this.getTelecoms(location.telecoms)}</div>
          <div className={styles.cellGridItem}>{this.getAddress(location.address)} </div>
        </div>
      ));
    }
    return '<div></div>';
  }

  createTable() {
    return (
      <div>
        <div className={styles.wrapper}>
          <div><strong>Organization Name: </strong>
            {this.props.organization ? this.props.organization.name : ''}</div>
          <div className={styles.actionGridContainer}>
            <StatusCheckbox
              messages={messages.inactive}
              elementId="inactiveCheckBox"
              handleCheck={this.handleInactiveChecked}
            >
            </StatusCheckbox>
            <StatusCheckbox
              messages={messages.suspended}
              elementId="suspendedCheckBox"
              handleCheck={this.handleSuspendedChecked}
            >
            </StatusCheckbox>
          </div>
          <div className={styles.table}>
            <div className={styles.rowGridContainer}>
              <div className={styles.cellGridHeaderItem}>Name</div>
              <div className={styles.cellGridHeaderItem}>Status</div>
              <div className={styles.cellGridHeaderItem}>Telecoms</div>
              <div className={styles.cellGridHeaderItem}>Address</div>
            </div>
            {this.createRows()}
          </div>
        </div>
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
    );
  }

  createLocationTable() {
    const { data } = this.props;
    if (data && data.length > 0) {
      return this.createTable();
    }
    return (<div className={styles.wrapper}><h3> No locations loaded. Please select an organization to view its
      locations.</h3></div>);
  }

  render() {
    return this.createLocationTable();
  }
}

Locations.propTypes = {
  onCheckShowInactive: PropTypes.func.isRequired,
  onCheckShowSuspended: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  data: PropTypes.array,
  organization: PropTypes.object,
  currentPage: PropTypes.number,
  totalNumberOfPages: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  data: makeSelectLocations(),
  organization: makeSelectOrganization(),
  currentPage: makeSelectCurrentPage(),
  totalNumberOfPages: makeSelectTotalNumberOfPages(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCheckShowInactive: (evt, checked, suspendedCheckboxStatus) => {
      const status = [];
      if (checked) {
        status.push(STATUS_INACTIVE);
      }
      if (suspendedCheckboxStatus) {
        status.push(STATUS_SUSPENDED);
      }
      const currentPage = 1;
      dispatch(getFilteredLocations(status, currentPage));
    },
    onCheckShowSuspended: (evt, checked, inactiveCheckboxStatus) => {
      const status = [];
      if (checked) {
        status.push(STATUS_SUSPENDED);
      }
      if (inactiveCheckboxStatus) {
        status.push(STATUS_INACTIVE);
      }
      const currentPage = 1;
      dispatch(getFilteredLocations(status, currentPage));
    },
    onChangePage: (status, currentPage) => dispatch(getFilteredLocations(status, currentPage)),
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
