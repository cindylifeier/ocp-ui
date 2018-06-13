/**
 *
 * SmartAppsGallery
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Grid } from 'styled-css-grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE } from 'containers/App/constants';
import ShowHideWrapper from 'containers/ShowHideWrapper';
import PanelSection from 'components/PanelSection';
import StyledRaisedButton from 'components/StyledRaisedButton';
import makeSelectSmartAppsGallery from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class SmartAppsGallery extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <ShowHideWrapper allowedRoles={[CARE_COORDINATOR_ROLE_CODE, CARE_MANAGER_ROLE_CODE]}>
        <PanelSection>
          <Grid rows={1}>
            <StyledRaisedButton>Test</StyledRaisedButton>
          </Grid>
          <FormattedMessage {...messages.header} />
        </PanelSection>
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
