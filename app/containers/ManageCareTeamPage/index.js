/**
 *
 * ManageCareTeamPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Divider from 'material-ui/Divider';
import { FormattedMessage } from 'react-intl';
import isUndefined from 'lodash/isUndefined';
import queryString from 'query-string';
import merge from 'lodash/merge';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getPatient, initializeManageCareTeam, saveCareTeam } from './actions';
import { makeSelectPatient } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ManageCareTeam from '../../components/ManageCareTeam';
import messages from './messages';
import styles from './styles.css';
import {
  makeSelectCareTeamCategories,
  makeSelectCareTeamStatuses,
  makeSelectParticipantRoles,
  makeSelectParticipantTypes,
} from '../App/selectors';

export class ManageCareTeamPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
    const queryObj = queryString.parse(this.props.location.search);
    this.props.getPatient(queryObj.patientId);
  }

  componentWillUnmount() {
    this.props.initializeManageCareTeam();
  }

  // TODO: will implement it
  handleSearch({ name, member }) {
    console.log(name);
    console.log(member);
  }

  handleSave(careTeamFormData, actions) {
    const patientId = this.props.selectedPatient.id;
    if (patientId) {
      merge(careTeamFormData, { patientId });
    }
    this.props.onSaveCareTeam(careTeamFormData, () => actions.setSubmitting(false));
  }

  render() {
    const {
      match,
      selectedPatient,
      careTeamCategories,
      participantTypes,
      participantRoles,
      careTeamStatuses,
    } = this.props;
    const editMode = !isUndefined(match.params.id);
    const manageCareTeamProps = {
      selectedPatient,
      careTeamCategories,
      participantTypes,
      participantRoles,
      careTeamStatuses,
    };
    return (
      <div>
        <Helmet>
          <title>Manage CareTeam</title>
          <meta name="description" content="Manage CareTeam page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.wrapper}>
          <div className={styles.card}>
            <h4 className={styles.font}>
              {editMode ? <FormattedMessage {...messages.editHeader} />
                : <FormattedMessage {...messages.createHeader} />}
            </h4>
            <Divider />
            <ManageCareTeam {...manageCareTeamProps} onSave={this.handleSave} onSearch={this.handleSearch} />
          </div>
        </div>
      </div>
    );
  }
}

ManageCareTeamPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  selectedPatient: PropTypes.object,
  getPatient: PropTypes.func.isRequired,
  initializeManageCareTeam: PropTypes.func.isRequired,
  onSaveCareTeam: PropTypes.func.isRequired,
  careTeamCategories: PropTypes.array,
  participantTypes: PropTypes.array,
  participantRoles: PropTypes.array,
  careTeamStatuses: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  selectedPatient: makeSelectPatient(),
  careTeamCategories: makeSelectCareTeamCategories(),
  participantTypes: makeSelectParticipantTypes(),
  participantRoles: makeSelectParticipantRoles(),
  careTeamStatuses: makeSelectCareTeamStatuses(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeManageCareTeam: () => dispatch(initializeManageCareTeam()),
    getPatient: (patientId) => dispatch(getPatient(patientId)),
    onSaveCareTeam: (careTeamFormData, handleSubmitting) => dispatch(saveCareTeam(careTeamFormData, handleSubmitting)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'manageCareTeamPage', reducer });
const withSaga = injectSaga({ key: 'manageCareTeamPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ManageCareTeamPage);
