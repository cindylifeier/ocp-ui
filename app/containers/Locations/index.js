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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectLocations, makeSelectOrganization } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './Locations.css';
import { getFilteredLocations } from './actions';
import { STATUS_INACTIVE, STATUS_SUSPENDED } from './constants';
import StatusCheckbox from '../../components/StatusCheckbox';

export class Locations extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      inactiveStatus: false,
      suspendedStatus: false,
    };
    this.handleInactiveChecked = this.handleInactiveChecked.bind(this);
    this.handleSuspendedChecked = this.handleSuspendedChecked.bind(this);
  }
  getTelecoms(telecoms) {
    return telecoms.map((entry) =>
      (
        <div key={entry.value}>
          {entry.system}: {entry.value},
        </div>
      )
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
  createRows() {
    if (this.props.locations && this.props.locations.data) {
      return this.props.locations.data.map((location) => (
        <div key={`location-${location.resourceURL}`} className={styles.rowGridContainer}>
          <div>{location.name}</div>
          <div>{location.status}</div>
          <div>{this.getTelecoms(location.telecoms)}</div>
          <div>{this.getAddress(location.address)} </div>
        </div>
      ));
    }
    return '<div></div>';
  }
  createTable() {
    return (
      <div>
        <div className={styles.wrapper}>
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
            <div> <strong>Organization Name: </strong>
              { this.props.locations && this.props.locations.organization ? this.props.locations.organization.name : ''}</div>
          </div>
          <div className={styles.rowGridContainer}>
            <div className={styles.cellGridContainer}>Name</div>
            <div className={styles.cellGridContainer}>Status</div>
            <div className={styles.cellGridContainer}>Telecoms</div>
            <div className={styles.cellGridContainer}>Address</div>
          </div>
          {this.createRows()}
        </div>
      </div>
    );
  }
  createLocationTable() {
    if (!this.props.locations || !this.props.locations.data || !this.props.locations.data[0]) {
      return (<div className={styles.wrapper}><h3> No locations loaded. Please select an organization to view its locations.</h3></div>);
    }
    return this.createTable();
  }
  render() {
    return this.createLocationTable();
  }
}

Locations.propTypes = {
  onCheckShowInactive: PropTypes.func.isRequired,
  onCheckShowSuspended: PropTypes.func.isRequired,
  locations: PropTypes.shape({
    data: PropTypes.array,
    organization: PropTypes.object,
  }),
};

const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocations(),
  organization: makeSelectOrganization(),
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
      dispatch(getFilteredLocations(status));
    },
    onCheckShowSuspended: (evt, checked, inactiveCheckboxStatus) => {
      const status = [];
      if (checked) {
        status.push(STATUS_SUSPENDED);
      }
      if (inactiveCheckboxStatus) {
        status.push(STATUS_INACTIVE);
      }
      dispatch(getFilteredLocations(status));
    },
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
