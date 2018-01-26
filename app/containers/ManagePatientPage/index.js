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
import Divider from 'material-ui/Divider';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styles from './styles.css';
import ManagePatient from '../../components/ManagePatient';
import { savePatient } from './actions';
import {
  makeSelectAdministrativeGenders, makeSelectLanguages, makeSelectPatientIdentifierSystems, makeSelectTelecomSystems,
  makeSelectUsCoreBirthSexes,
  makeSelectUsCoreEthnicities,
  makeSelectUsCoreRaces,
  makeSelectUspsStates,
} from '../App/selectors';
import {
  ADMINISTRATIVEGENDER, LANGUAGE, PATIENTIDENTIFIERSYSTEM, TELECOMSYSTEM, USCOREBIRTHSEX, USCOREETHNICITY, USCORERACE,
  USPSSTATES,
} from '../App/constants';
import { getLookupsAction } from '../App/actions';

export class ManagePatientPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    this.props.getLookUpFormData();
  }

  handleSave(patientFormData, actions) {
    this.props.onSaveForm(patientFormData, () => actions.setSubmitting(false));
  }

  render() {
    const { match, uspsStates, patientIdentifierSystems, administrativeGenders, usCoreRaces, usCoreEthnicities, usCoreBirthSexes, languages, telecomSystems } = this.props;
    const formProps = {
      uspsStates,
      patientIdentifierSystems,
      administrativeGenders,
      usCoreRaces,
      usCoreEthnicities,
      usCoreBirthSexes,
      languages,
      telecomSystems,
    };
    return (
      <div>
        <Helmet>
          <title>Manage Patient</title>
          <meta name="description" content="Manage patient page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.card}>
          <h4 className={styles.font}>
            {match.params.id ? <FormattedMessage {...messages.editHeader} /> : <FormattedMessage {...messages.createHeader} />}
          </h4>
          <Divider />
          <ManagePatient {...formProps} onSave={this.handleSave} />
        </div>
      </div>
    );
  }
}

ManagePatientPage.propTypes = {
  match: PropTypes.object,
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
});

function mapDispatchToProps(dispatch) {
  return {
    onSaveForm: (patientFormData, handleSubmitting) => { dispatch(savePatient(patientFormData, handleSubmitting)); },
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
