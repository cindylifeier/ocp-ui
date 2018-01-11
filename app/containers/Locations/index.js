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
import makeSelectLocations from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './Locations.css';
import { getFilteredLocations } from './actions';
import { STATUS_ACTIVE, STATUS_INACTIVE, STATUS_SUSPENDED } from './constants';
import StatusCheckbox from '../../components/StatusCheckbox';

export class Locations extends React.Component { // eslint-disable-line react/prefer-stateless-function
  getTelecoms(telecoms) {
    return telecoms.map((entry) =>
      (
        <div key={entry.value}>
          {entry.system}: {entry.value}
        </div>
      )
    );
  }

  getAddress(address) {
    return address ? (<div>{ address.line1} {address.line2}, {address.city}, {address.state} {address.postalCode} </div>) : '';
  }
  createRows() {
    return this.props.locations.map((location) => (
      <div key={`location-${location.resourceURL}`} className={styles.gridRow}>
        <div>{location.name}</div>
        <div>{location.status}</div>
        <div>{this.getTelecoms(location.telecoms)}</div>
        <div>{this.getAddress(location.address)} </div>
      </div>
    ));
  }
  createTable() {
    return (
      <div>
        <div className={styles.gridContainer}>
          <div className={styles.gridAction}>
            <StatusCheckbox
              messages={messages.inactive}
              elementId="inactiveCheckBox"
              handleCheck={this.props.onCheckShowInactive}
            >
            </StatusCheckbox>
            <StatusCheckbox
              messages={messages.suspended}
              elementId="suspendedCheckBox"
              handleCheck={this.props.onCheckShowSuspended}
            >
            </StatusCheckbox>
          </div>
          <div className={styles.gridRow}>
            <div className={styles.gridCell}>Name</div>
            <div className={styles.gridCell}>Status</div>
            <div className={styles.gridCell}>Telecoms</div>
            <div className={styles.gridCell}>Address</div>
          </div>
          {this.createRows()}
        </div>
      </div>
    );
  }
  createLocationTable() {
    if (this.props.locations && !this.props.locations[0]) {
      return (<h3> No locations loaded. Please select an organization to view its locations.</h3>);
    }
    return this.createTable();
  }
  render() {
    return this.createLocationTable();
  }
}

Locations.propTypes = {
  onCheckShowInactive: PropTypes.func,
  onCheckShowSuspended: PropTypes.func,
  locations: PropTypes.arrayOf({
    locations: PropTypes.shape({
      name: PropTypes.string,
      status: PropTypes.string,
      resourceUrl: PropTypes.string,
      telecoms: PropTypes.Object,
      address: PropTypes.Object,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocations(),
  // organizationId: makeSelectOrganizationId(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCheckShowInactive: (evt, checked) => {
      const status = [STATUS_ACTIVE];
      if (checked) {
        status.push(STATUS_INACTIVE);
      }

      const isSuspendedCheckBoxChecked = document.getElementById('suspendedCheckBox');
      if (isSuspendedCheckBoxChecked && isSuspendedCheckBoxChecked.checked) {
        status.push(STATUS_SUSPENDED);
      }
      dispatch(getFilteredLocations(status));
    },
    onCheckShowSuspended: (evt, checked) => {
      const status = [STATUS_ACTIVE];
      if (checked) {
        status.push(STATUS_SUSPENDED);
      }

      const isInactiveCheckBoxChecked = document.getElementById('inactiveCheckBox');
      if (isInactiveCheckBoxChecked && isInactiveCheckBoxChecked.checked) {
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
