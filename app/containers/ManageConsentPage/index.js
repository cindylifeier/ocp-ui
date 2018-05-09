/**
 *
 * ManageConsentPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import {
  CONSENT_ACTION,
  CONSENT_CATEGORY,
  CONSENT_STATE_CODES,
  PURPOSE_OF_USE,
  SECURITY_ROLE_TYPE,
} from 'containers/App/constants';
import ManageConsent from 'components/ManageConsent';
import PageHeader from 'components/PageHeader';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import {
  makeSelectConsentAction,
  makeSelectConsentCategory,
  makeSelectConsentStateCodes,
  makeSelectPurposeOfUse,
  makeSelectSecurityRoleType,
} from 'containers/App/lookupSelectors';
import Util from 'utils/Util';
import find from 'lodash/find';
import isUndefined from 'lodash/isUndefined';
import reducer from './reducer';
import saga from './saga';
import { createConsent } from './actions';

export class ManageConsentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
  }

  handleSave(consentFormData, actions) {
    const consentDataToSubmit = {};
    const {
      consentType, pou, consentCategory, consentStart, consentEnd,
    } = consentFormData;
    consentDataToSubmit.generalDesignation = consentType;
    let code = pou || 'TREAT';
    const purposes = [];
    purposes.push(find(this.props.purposeOfUse, { code }));
    consentDataToSubmit.purpose = purposes;

    consentDataToSubmit.status = 'draft';

    if (consentStart || consentEnd) {
      consentDataToSubmit.period = {
        start: Util.formatDate(consentStart),
        end: Util.formatDate(consentEnd),
      };
    }
    code = consentCategory || '59284-0';
    const categories = [];
    categories.push(find(this.props.consentCategory, { code }));
    consentDataToSubmit.category = categories;

    // patient
    const patientId = this.props.patient.id;
    const name = getResourceDisplayName(this.props.patient);
    consentDataToSubmit.patient = {
      reference: `Patient/${patientId}`,
      display: name,
    };

    this.props.createConsent(consentDataToSubmit, () => actions.setSubmitting(false));
  }

  render() {
    const {
      patient,
      consentStateCodes,
      consentCategory,
      securityRoleType,
      consentAction,
      purposeOfUse,
      match,
      consents,
    } = this.props;
    const logicalId = match.params.id;
    const editMode = !isUndefined(match.params.id);
    let initialSelectedFromActors = [];
    const consent = consents && consents.listConsents && find(consents.listConsents.data.elements, { logicalId });
    if (consent && consent.recipient) {
      initialSelectedFromActors = consent.fromActor;
    }
    const consentProps = {
      patient,
      consentStateCodes,
      consentCategory,
      securityRoleType,
      consentAction,
      purposeOfUse,
      initialSelectedFromActors,
      editMode,
    };
    return (
      <Page>
        <Helmet>
          <title> Manage Consent </title>
          <meta name="description" content="Manage Consent page of Omnibus Care Plan application" />
        </Helmet>
        <PageHeader
          title={patient && `I,${getResourceDisplayName(patient)},here by authorize`}
        />
        <PageContent>
          <ManageConsent {...consentProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManageConsentPage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  consentStateCodes: PropTypes.array,
  consentCategory: PropTypes.array,
  securityRoleType: PropTypes.array,
  consentAction: PropTypes.array,
  match: PropTypes.object.isRequired,
  consents: PropTypes.object,
  purposeOfUse: PropTypes.array,
  createConsent: PropTypes.func,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
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
    createConsent: (consentFormData, handleSubmitting) => dispatch(createConsent(consentFormData, handleSubmitting)),
  };
}


function getResourceDisplayName(resource) {
  let name = {};
  if (resource.name.length > 0) {
    const fName = resource.name[0];
    const firstName = Util.setEmptyStringWhenUndefined(fName.firstName);
    const lastName = Util.setEmptyStringWhenUndefined(fName.lastName);
    name = `${firstName}-${lastName}`;
  }
  return name;
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageConsentPage', reducer });
const withSaga = injectSaga({ key: 'manageConsentPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageConsentPage);
