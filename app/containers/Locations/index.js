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
import OcpTable from '../../components/OcpTable';
import { LOCATION_TABLE_HEADERS, LOCATIONS } from './constants';

export class Locations extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const items = LOCATIONS.filter((location) => (location.status !== 'Suspended' && location.status !== 'Inactive'));

    return (
      <div>
        <span>
          <FormattedMessage {...messages.inactive} >
            {(msg) => (
              <Checkbox
                className={style.inlineElement}
                label={msg}
                labelPosition="left"
              />
            )}
          </FormattedMessage>
          <FormattedMessage {...messages.suspended} >
            {(msg) => (
              <Checkbox
                className={style.inlineElement}
                label={msg}
                labelPosition="left"
              />
            )}
          </FormattedMessage>
        </span>
        <OcpTable headers={LOCATION_TABLE_HEADERS} items={items}></OcpTable>
      </div>
    );
  }
}

Locations.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocations(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
