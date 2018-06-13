/**
 *
 * SmartAppsGallery
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE } from 'containers/App/constants';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import SmartApps from 'components/SmartApps';
import makeSelectSmartAppsGallery from './selectors';
import reducer from './reducer';
import saga from './saga';

export class SmartAppsGallery extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ShowHideWrapper allowedRoles={[CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE]}>
        <SmartApps />
      </ShowHideWrapper>
    );
  }
}

SmartAppsGallery.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  smartappsgallery: makeSelectSmartAppsGallery(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'smartAppsGallery', reducer });
const withSaga = injectSaga({ key: 'smartAppsGallery', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SmartAppsGallery);
