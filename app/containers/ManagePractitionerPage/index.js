/**
 *
 * ManagePractitionerPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Divider from 'material-ui/Divider';
import merge from 'lodash/merge';
import isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import ManagePractitioner from '../../components/ManagePractitioner';
import messages from './messages';
import styles from './styles.css';
import {
  makeSelectPractitionerIdentifierSystems,
  makeSelectPractitionerRoles,
  makeSelectTelecomSystems,
  makeSelectUspsStates,
} from '../App/selectors';
import { getPractitioner, initializeManagePractitioner, savePractitioner } from './actions';
import { makeSelectPractitioner } from './selectors';

export class ManagePractitionerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      this.props.getPractitioner(logicalId);
    }
  }

  componentWillUnmount() {
    this.props.initializeManagePractitioner();
  }

  handleSave(practitionerFormData, actions) {
    const logicalId = this.props.match.params.id;
    if (logicalId) {
      merge(practitionerFormData, { logicalId });
    }
    this.props.onSaveForm(practitionerFormData, () => actions.setSubmitting(false));
  }

  render() {
    const { match, uspsStates, identifierSystems, telecomSystems, practitionerRoles, selectedPractitioner } = this.props;
    const editMode = !isUndefined(match.params.id);
    let practitioner = null;
    if (editMode && selectedPractitioner) {
      practitioner = selectedPractitioner;
    }
    const formProps = {
      uspsStates,
      identifierSystems,
      telecomSystems,
      practitionerRoles,
      editMode,
      practitioner,
    };
    return (
      <div className={styles.wrapper}>
        <Helmet>
          <title>Manage Practitioner</title>
          <meta name="description" content="Manage practitioner page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.header}>
          {editMode ? <FormattedMessage {...messages.editHeader} />
            : <FormattedMessage {...messages.createHeader} />}
        </div>
        <Divider />
        <ManagePractitioner {...formProps} onSave={this.handleSave} />
      </div>
    );
  }
}

ManagePractitionerPage.propTypes = {
  match: PropTypes.object,
  getPractitioner: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  identifierSystems: PropTypes.array,
  telecomSystems: PropTypes.array,
  practitionerRoles: PropTypes.array,
  selectedPractitioner: PropTypes.object,
  onSaveForm: PropTypes.func,
  initializeManagePractitioner: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  identifierSystems: makeSelectPractitionerIdentifierSystems(),
  telecomSystems: makeSelectTelecomSystems(),
  practitionerRoles: makeSelectPractitionerRoles(),
  selectedPractitioner: makeSelectPractitioner(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeManagePractitioner: () => dispatch(initializeManagePractitioner()),
    onSaveForm: (practitionerFormData, handleSubmitting) => dispatch(savePractitioner(practitionerFormData, handleSubmitting)),
    getPractitioner: (logicalId) => dispatch(getPractitioner(logicalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'managePractitionerPage', reducer });
const withSaga = injectSaga({ key: 'managePractitionerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManagePractitionerPage);
