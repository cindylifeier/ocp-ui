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
import find from 'lodash/find';
import isUndefined from 'lodash/isUndefined';

import injectSaga from 'utils/injectSaga';
import { getLookupsAction } from 'containers/App/actions';
import {
  makeSelectConsentStateCodes,
  makeSelectPurposeOfUse,
  makeSelectSecurityLabel,
} from 'containers/App/lookupSelectors';
import { makeSelectOrganization, makeSelectPatient, makeSelectUser } from 'containers/App/contextSelectors';
import { CONSENT_STATE_CODES, PURPOSE_OF_USE, SECURITY_LABEL } from 'containers/App/constants';
import ManageConsent from 'components/ManageConsent';
import PageHeader from 'components/PageHeader';
import Page from 'components/Page';
import PageContent from 'components/PageContent';
import saga from './saga';
import { saveConsent } from './actions';
import { isCareCoordinator, mapResourceName } from './helpers';


export class ManageConsentPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getLookups();
  }

  handleSave(consentFormData, actions) {
    this.props.saveConsent(consentFormData, () => actions.setSubmitting(false));
  }

  render() {
    const {
      patient,
      user,
      organization,
      consentStateCodes,
      securityLabels,
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

    let careCoordinatorContext = null;
    if (isCareCoordinator(user.role)) {
      careCoordinatorContext = {
        logicalId: user.fhirResource.logicalId,
        name: mapResourceName(user.fhirResource.name),
        identifiers: user.fhirResource.identifiers,
        organization: {
          logicalId: organization.logicalId,
          name: organization.name,
          identifiers: organization.identifiers,
        },
      };
    }
    const consentProps = {
      patient,
      careCoordinatorContext,
      consentStateCodes,
      securityLabels,
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
        <PageHeader title={patient && `I,${mapResourceName(patient.name)},here by authorize`} />
        <PageContent>
          <ManageConsent {...consentProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManageConsentPage.propTypes = {
  getLookups: PropTypes.func.isRequired,
  consentStateCodes: PropTypes.arrayOf((PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  }))),
  securityLabels: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
  purposeOfUse: PropTypes.arrayOf((PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  }))),
  match: PropTypes.object.isRequired,
  consents: PropTypes.object,
  saveConsent: PropTypes.func,
  user: PropTypes.shape({
    role: PropTypes.string.isRequired,
    fhirResource: PropTypes.shape({
      logicalId: PropTypes.string,
      name: PropTypes.array,
      identifiers: PropTypes.arrayOf(PropTypes.shape({
        system: PropTypes.string,
        oid: PropTypes.string,
        value: PropTypes.string,
        priority: PropTypes.number,
        display: PropTypes.string,
      })),
    }),
  }),
  organization: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    identifiers: PropTypes.arrayOf(PropTypes.shape({
      system: PropTypes.string,
      oid: PropTypes.string,
      value: PropTypes.string,
      priority: PropTypes.number,
      display: PropTypes.string,
    })),
  }),
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  organization: makeSelectOrganization(),
  patient: makeSelectPatient(),
  consentStateCodes: makeSelectConsentStateCodes(),
  securityLabels: makeSelectSecurityLabel(),
  purposeOfUse: makeSelectPurposeOfUse(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookups: () => dispatch(getLookupsAction([CONSENT_STATE_CODES, SECURITY_LABEL, PURPOSE_OF_USE])),
    saveConsent: (consentFormData, handleSubmitting) => dispatch(saveConsent(consentFormData, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'manageConsentPage', saga });

export default compose(
  withSaga,
  withConnect,
)(ManageConsentPage);
