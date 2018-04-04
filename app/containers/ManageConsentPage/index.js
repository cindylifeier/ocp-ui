/**
 *
 * ManageConsentPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { CONSENT_ACTION, CONSENT_CATEGORY, CONSENT_STATE_CODES, PURPOSE_OF_USE, SECURITY_ROLE_TYPE } from 'containers/App/constants';
import ManageConsent from 'components/ManageConsent';
import PageHeader from 'components/PageHeader';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import { makeSelectConsentStateCodes, makeSelectConsentCategory, makeSelectSecurityRoleType, makeSelectConsentAction, makeSelectPurposeOfUse } from 'containers/App/lookupSelectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

export class ManageConsentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    this.props.getLookups();
  }
  render() {
    const {
      patient,
      consentStateCodes,
      consentCategory,
      securityRoleType,
      consentAction,
      purposeOfUse,
    } = this.props;
    const consentProps = {
      patient,
      consentStateCodes,
      consentCategory,
      securityRoleType,
      consentAction,
      purposeOfUse,
    };
    return (
      <Page>
        <Helmet>
          <title>Manage Consent</title>
          <meta name="description" content="Manage Consent page of Omnibus Care Plan application" />
        </Helmet>
        <PageHeader
          title={<FormattedMessage {...messages.createHeader} />}
        />
        <PageContent>
          <ManageConsent {...consentProps} />
        </PageContent>
      </Page>
    );
  }
}

ManageConsentPage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  patient: PropTypes.object,
  consentStateCodes: PropTypes.array,
  consentCategory: PropTypes.array,
  securityRoleType: PropTypes.array,
  consentAction: PropTypes.array,
  purposeOfUse: PropTypes.array,


};

const mapStateToProps = createStructuredSelector({
  patient: makeSelectPatient(),
  consentStateCodes: makeSelectConsentStateCodes(),
  consentCategory: makeSelectConsentCategory(),
  securityRoleType: makeSelectSecurityRoleType(),
  consentAction: makeSelectConsentAction(),
  purposeOfUse: makeSelectPurposeOfUse(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([CONSENT_STATE_CODES, CONSENT_CATEGORY, SECURITY_ROLE_TYPE, CONSENT_ACTION, PURPOSE_OF_USE])),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageConsentPage', reducer });
const withSaga = injectSaga({ key: 'manageConsentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageConsentPage);
