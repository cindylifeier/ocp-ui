/**
 *
 * Locations
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Checkbox } from 'material-ui';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLocations from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './Locations.css';
import {
  getFilteredLocations,
} from './actions';
import { STATUS_ACTIVE, STATUS_INACTIVE, STATUS_SUSPENDED } from './constants';

export class Locations extends React.Component { // eslint-disable-line react/prefer-stateless-function
  getTelecoms(telecoms) {
    return telecoms.map((entry) =>
      (
        <div>
          {entry.system}: {entry.value}
        </div>
      )
    );
  }

  getAddress(address) {
    return address ? (<div>{ address.line1} {address.line2}, {address.city}, {address.state} {address.postalCode} </div>) : '';
  }

  createGridRows() {
    return this.props.locations.map((location) => (
      <div key={`location-${location.name}`} className={styles.col}>
        <div>{location.name}</div>
        <div>{location.status}</div>
        <div>{this.getTelecoms(location.telecoms)}</div>
        <div>{this.getAddress(location.address)} </div>
      </div>
    ));
  }
  render() {
    return (
      <div>
        <div>
          <FormattedMessage {...messages.inactive} >
            {(msg) => (
              <Checkbox
                className={styles.box}
                label={msg}
                labelPosition="left"
                id="inactiveCheckBox"
                onCheck={this.props.onCheckShowInactive}
              />
            )}
          </FormattedMessage>
          <FormattedMessage {...messages.suspended} >
            {(msg) => (
              <Checkbox
                className={styles.box}
                label={msg}
                labelPosition="left"
                id="suspendedCheckBox"
                onCheck={this.props.onCheckShowSuspended}
              />
            )}
          </FormattedMessage>
        </div>
        <div className={styles.table}>
          <div className={styles.rowGridContainer}>
            <div className={styles.cellGridItem}>Name</div>
            <div className={styles.cellGridItem}>Address</div>
            <div className={styles.cellGridItem}>Telecoms</div>
            <div className={styles.cellGridItem}>Status</div>
          </div>
          <div className={styles.rowGridContainer}>
            <div className={styles.cellGridItem}>BlueCross Blue Shield</div>
            <div className={styles.cellGridItem}>212 Franklin Street, Columbia MD, 00221</div>
            <div className={styles.cellGridItem}>305-222-3254</div>
            <div className={styles.cellGridItem}>Active</div>
          </div>
          <div className={styles.rowGridContainer}>
            <div className={styles.cellGridItem}>BlueCross Blue Shield</div>
            <div className={styles.cellGridItem}>212 Franklin Street, Columbia MD, 00221</div>
            <div className={styles.cellGridItem}>305-222-3254</div>
            <div className={styles.cellGridItem}>Inactive</div>
          </div>
          <div className={styles.rowGridContainer}>
            <div className={styles.cellGridItem}>BlueCross Blue Shield</div>
            <div className={styles.cellGridItem}>212 Franklin Street, Columbia MD, 00221</div>
            <div className={styles.cellGridItem}>305-222-3254</div>
            <div className={styles.cellGridItem}>Suspended</div>
          </div>
        </div>
      </div>

    );
  }
}

Locations.propTypes = {
  onCheckShowInactive: PropTypes.func,
  onCheckShowSuspended: PropTypes.func,
  locations: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocations(),
});

function mapDispatchToProps(dispatch) {
  return {
    onCheckShowInactive: (evt, checked) => {
      if (checked) {
        dispatch(getFilteredLocations([STATUS_ACTIVE, STATUS_INACTIVE]));
      } else {
        const isSuspendedCheckBoxChecked = document.getElementById('suspendedCheckBox').checked;
        if (isSuspendedCheckBoxChecked) {
          dispatch(getFilteredLocations([STATUS_ACTIVE, STATUS_SUSPENDED]));
        } else {
          dispatch(getFilteredLocations([STATUS_ACTIVE]));
        }
      }
    },
    onCheckShowSuspended: (evt, checked) => {
      if (checked) {
        dispatch(getFilteredLocations([STATUS_ACTIVE, STATUS_SUSPENDED]));
      } else {
        const isInactiveCheckBoxChecked = document.getElementById('inactiveCheckBox').checked;
        if (isInactiveCheckBoxChecked) {
          dispatch(getFilteredLocations([STATUS_ACTIVE, STATUS_INACTIVE]));
        } else {
          dispatch(getFilteredLocations([STATUS_ACTIVE]));
        }
        dispatch(getFilteredLocations(checked));
      }
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
