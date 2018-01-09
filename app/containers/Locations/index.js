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
import { LOCATION_TABLE_HEADERS } from './constants';
import {
  hideInActiveLocations,
  hideSuspendedLocations,
  showInActiveLocations,
  showSuspendedLocations,
} from './actions';
import DataTable from '../../components/DataTable/index';

export class Locations extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { locations } = this.props;
    return (
      <div className={styles.container} >
        <div >
          <div className={`${styles.box} ${styles.showInactive}`} >
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
          </div>
          <div className={`${styles.box} ${styles.showSuspended}`}>
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
          </div>
          <div className={`${styles.box} ${styles.dataTable}`}>
            <DataTable headers={LOCATION_TABLE_HEADERS} items={locations}></DataTable>
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
