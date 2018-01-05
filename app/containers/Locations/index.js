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
import style from './Locations.css';
import { LOCATION_TABLE_HEADERS, LOCATIONS } from './constants';
import { showInActiveLocations, showSuspendedLocations } from './actions';
import DataTable from '../../components/DataTable/index';

export class Locations extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    // const items = LOCATIONS.filter((location) => (location.status !== 'Suspended' && location.status !== 'Inactive'));

    return (
      <div>
        <form>
          <span>
            <FormattedMessage {...messages.inactive} >
              {(msg) => (
                <Checkbox
                  className={style.inlineElement}
                  label={msg}
                  labelPosition="left"
                  onCheck={this.props.onCheckShowInActive}
                />
              )}
            </FormattedMessage>
            <FormattedMessage {...messages.suspended} >
              {(msg) => (
                <Checkbox
                  className={style.inlineElement}
                  label={msg}
                  labelPosition="left"
                  onCheck={this.props.onCheckShowSuspended}
                />
              )}
            </FormattedMessage>
          </span>
        </form>
        <DataTable headers={LOCATION_TABLE_HEADERS} items={LOCATIONS}></DataTable>
      </div>
    );
  }
}

Locations.propTypes = {
  onCheckShowInActive: PropTypes.func,
  onCheckShowSuspended: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocations(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onCheckShowInActive: (evt) => dispatch(showInActiveLocations(evt.target.value)),
    onCheckShowSuspended: (evt) => dispatch(showSuspendedLocations(evt.target.value)),
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
