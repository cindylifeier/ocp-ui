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
import PropTypes from 'prop-types';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import ManagePractitioner from '../../components/ManagePractitioner';
import messages from './messages';
import styles from './styles.css';
import {
  makeSelectIdentifierSystems,
  makeSelectPractitionerRoles,
  makeSelectTelecomSystems,
  makeSelectUspsStates,
} from '../App/selectors';
import { IDENTIFIERSYSTEM, PRACTITIONERROLES, TELECOMSYSTEM, USPSSTATES } from '../App/constants';
import { getLookupsAction } from '../App/actions';
import { makeSelectSavePractitionerError } from './selectors';
import { savePractitioner } from './actions';

export class ManagePractitionerPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    this.props.getLookUpFormData();
  }

  handleSave(practitionerFormData) {
    this.props.onSaveForm(practitionerFormData);
  }

  render() {
    const { match, error, uspsStates, identifierSystems, telecomSystems, practitionerRoles } = this.props;
    const formProps = {
      error,
      uspsStates,
      identifierSystems,
      telecomSystems,
      practitionerRoles,
    };
    return (
      <div>
        <Helmet>
          <title>Manage Practitioner</title>
          <meta name="description" content="Manage practitioner page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.card}>
          <h4 className={styles.font}>
            {match.params.id ? <FormattedMessage {...messages.editHeader} />
              : <FormattedMessage {...messages.createHeader} />}
          </h4>
          <Divider />
          <ManagePractitioner {...formProps} onSave={this.handleSave} />
        </div>
      </div>
    );
  }
}

ManagePractitionerPage.propTypes = {
  match: PropTypes.object,
  getLookUpFormData: PropTypes.func.isRequired,
  uspsStates: PropTypes.array,
  identifierSystems: PropTypes.array,
  telecomSystems: PropTypes.array,
  practitionerRoles: PropTypes.array,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onSaveForm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  uspsStates: makeSelectUspsStates(),
  identifierSystems: makeSelectIdentifierSystems(),
  telecomSystems: makeSelectTelecomSystems(),
  practitionerRoles: makeSelectPractitionerRoles(),
  error: makeSelectSavePractitionerError(),
});

function mapDispatchToProps(dispatch) {
  return {
    getLookUpFormData: () => dispatch(getLookupsAction([USPSSTATES, IDENTIFIERSYSTEM, TELECOMSYSTEM, PRACTITIONERROLES])),
    onSaveForm: (practitionerFormData) => dispatch(savePractitioner(practitionerFormData)),
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
