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
  hideInActiveLocations,
  hideSuspendedLocations,
  showInActiveLocations,
  showSuspendedLocations,
} from './actions';

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
      <div className={styles.container} >
        <FormattedMessage {...messages.inactive} >
          {(msg) => (
            <Checkbox
              className={styles.box}
              label={msg}
              labelPosition="left"
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
              onCheck={this.props.onCheckShowSuspended}
            />
          )}
        </FormattedMessage>
        <div className={styles.header}>
          <div className={styles.col}>
            <div>Name</div>
            <div>Status</div>
            <div>Telecoms</div>
            <div>Address</div>
          </div>
        </div>
        <div className={styles.row}>
          { this.createGridRows()}
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
        dispatch(showInActiveLocations(checked));
      } else {
        dispatch(hideInActiveLocations(checked));
      }
    },
    onCheckShowSuspended: (evt, checked) => {
      if (checked) {
        dispatch(showSuspendedLocations(checked));
      } else {
        dispatch(hideSuspendedLocations(checked));
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
