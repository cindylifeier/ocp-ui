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
import { LOCATION_TABLE_HEADERS } from './constants';
import {
  getLocations,
  hideInActiveLocations,
  hideSuspendedLocations,
  showInActiveLocations,
  showSuspendedLocations,
} from './actions';
import DataTable from '../../components/DataTable/index';

export class Locations extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.getLocations(getLocations());
  }
  render() {
    const { locations } = this.props;
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
                  onCheck={this.props.onCheckShowInactive}
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
        <DataTable headers={LOCATION_TABLE_HEADERS} items={locations}></DataTable>
      </div>
    );
  }
}

Locations.propTypes = {
  getLocations: PropTypes.func,
  onCheckShowInactive: PropTypes.func,
  onCheckShowSuspended: PropTypes.func,
  locations: PropTypes.array,
  // locations: PropTypes.arrayOf(
  //                         PropTypes.shape({
  //                           id: PropTypes.string.isRequired,
  //                           name: PropTypes.string.isRequired,
  //                           status: PropTypes.string.isRequired,
  //                           telecom: PropTypes.string.isRequired,
  //                           address: PropTypes.string.isRequired,
  //                         }).isRequired
  //             ).isRequired,
};

const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocations(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLocations: () => dispatch(getLocations()),
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
