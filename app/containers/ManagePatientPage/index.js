/**
 *
 * ManagePatientPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import find from 'lodash/find';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import ManagePatient from 'components/ManagePatient';
import {
  makeSelectAdministrativeGenders,
  makeSelectLanguages,
  makeSelectPatientIdentifierSystems,
  makeSelectTelecomSystems,
  makeSelectUsCoreBirthSexes,
  makeSelectUsCoreEthnicities,
  makeSelectUsCoreRaces,
  makeSelectUspsStates,
} from 'containers/App/lookupSelectors';
import {
  ADMINISTRATIVEGENDER,
  LANGUAGE,
  PATIENTIDENTIFIERSYSTEM,
  TELECOMSYSTEM,
  USCOREBIRTHSEX,
  USCOREETHNICITY,
  USCORERACE,
  USPSSTATES,
} from 'containers/App/constants';
import { getLookupsAction } from 'containers/App/actions';
import { makeSelectPatientSearchResult } from 'containers/Patients/selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { savePatient } from './actions';
import { mapToFrontendPatientForm } from './api';

export class ManagePatientPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    this.props.getLookUpFormData();
  }

  handleSave(patientFormData, actions) {
    this.props.onSaveForm(patientFormData, () => actions.setSubmitting(false));
  }

  render() {
    const { match, patients, uspsStates, patientIdentifierSystems, administrativeGenders, usCoreRaces, usCoreEthnicities, usCoreBirthSexes, languages, telecomSystems } = this.props;
    const patientId = match.params.id;
    let patient = null;
    if (patientId) {
      patient = mapToFrontendPatientForm(getPatientById(patients, patientId));
    }
    const formProps = {
      uspsStates,
      patientIdentifierSystems,
      administrativeGenders,
      usCoreRaces,
      usCoreEthnicities,
      usCoreBirthSexes,
      languages,
      telecomSystems,
      patient,
    };
    return (
      <Page>
        <Helmet>
          <title>Manage Patient</title>
          <meta name="description" content="Manage patient page of Omnibus Care Plan application" />
        </Helmet>
        <PageHeader
          title={match.params.id ?
            <FormattedMessage {...messages.updateHeader} /> :
            <FormattedMessage {...messages.createHeader} />}
        />
        <PageContent>
          <ManagePatient {...formProps} onSave={this.handleSave} />
        </PageContent>
      </Page>
    );
  }
}

ManagePatientPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onSaveForm: PropTypes.func,
  getLookUpFormData: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  patientIdentifierSystems: PropTypes.array,
  administrativeGenders: PropTypes.array,
  usCoreRaces: PropTypes.array,
  usCoreEthnicities: PropTypes.array,
  usCoreBirthSexes: PropTypes.array,
  languages: PropTypes.array,
  telecomSystems: PropTypes.array,
  patients: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  patientIdentifierSystems: makeSelectPatientIdentifierSystems(),
  administrativeGenders: makeSelectAdministrativeGenders(),
  usCoreRaces: makeSelectUsCoreRaces(),
  usCoreEthnicities: makeSelectUsCoreEthnicities(),
  usCoreBirthSexes: makeSelectUsCoreBirthSexes(),
  languages: makeSelectLanguages(),
  telecomSystems: makeSelectTelecomSystems(),
  patients: makeSelectPatientSearchResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSaveForm: (patientFormData, handleSubmitting) => {
      dispatch(savePatient(patientFormData, handleSubmitting));
    },
    getLookUpFormData: () => dispatch(getLookupsAction([USPSSTATES, PATIENTIDENTIFIERSYSTEM, ADMINISTRATIVEGENDER,
      USCORERACE, USCOREETHNICITY, USCOREBIRTHSEX, LANGUAGE, TELECOMSYSTEM])),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'managePatientPage', reducer });
const withSaga = injectSaga({ key: 'managePatientPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagePatientPage);

function getPatientById(patients, id) {
  return find(patients, { id });
}
