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
import { getCareTeam, getPatient, initializeManageCareTeam, saveCareTeam } from './actions';
import { makeSelectCareTeam, makeSelectPatient } from './selectors';
import reducer from './reducer';
import saga from './saga';
import ManageCareTeam from '../../components/ManageCareTeam';
import { CARETEAMCATEGORY, CARETEAMREASON, CARETEAMSTATUS, PARTICIPANTROLE, PARTICIPANTTYPE } from '../App/constants';
import { getLookupsAction } from '../App/actions';
import messages from './messages';
import styles from './styles.css';
import {
  makeSelectCareTeamCategories,
  makeSelectCareTeamReasons,
  makeSelectCareTeamStatuses,
  makeSelectParticipantRoles,
  makeSelectParticipantTypes,
} from '../App/selectors';
import SearchParticipant from '../SearchParticipant';
import { makeSelectSelectedParticipants } from '../SearchParticipant/selectors';
import { removeParticipant } from '../SearchParticipant/actions';
import { mapToEditParticipants } from './api';

export class ManageCareTeamPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      name: '',
      member: '',
    };
    this.handleSave = this.handleSave.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleRemoveParticipant = this.handleRemoveParticipant.bind(this);
  }

  componentDidMount() {
    this.props.getLookUpFormData();
    const queryObj = queryString.parse(this.props.location.search);
    const patientId = queryObj.patientId;
    if (patientId) {
      this.props.getPatient(patientId);
    }
    const careTeamId = this.props.match.params.id;
    if (careTeamId) {
      this.props.getCareTeam(careTeamId);
    }
  }

  componentWillUnmount() {
    this.props.initializeManageCareTeam();
  }

  handleSave(careTeamFormData, actions) {
    const patientId = this.props.selectedPatient.id;
    if (patientId) {
      merge(careTeamFormData, { patientId });
    }

    const careTeamId = this.props.match.params.id;
    if (careTeamId) {
      merge(careTeamFormData, { careTeamId });
    }
    // Add selected participants to form data
    merge(careTeamFormData, { participants: this.props.selectedParticipants });
    this.props.onSaveCareTeam(careTeamFormData, () => actions.setSubmitting(false));
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleRemoveParticipant(participant) {
    this.props.removeParticipant(participant);
  }

  render() {
    const {
      match,
      selectedPatient,
      selectedCareTeam,
      careTeamCategories,
      participantTypes,
      participantRoles,
      careTeamStatuses,
      careTeamReasons,
      selectedParticipants,
    } = this.props;
    const editMode = !isUndefined(match.params.id);

    let careTeam = null;
    let initialSelectedParticipants = [];
    if (editMode && selectedCareTeam) {
      careTeam = selectedCareTeam;
      initialSelectedParticipants = mapToEditParticipants(careTeam.participants);
    }
    const manageCareTeamProps = {
      selectedPatient,
      careTeam,
      editMode,
      careTeamCategories,
      careTeamReasons,
      participantTypes,
      participantRoles,
      careTeamStatuses,
      selectedParticipants,
    };

    return (
      <div>
        <Helmet>
          <title>Manage CareTeam</title>
          <meta name="description" content="Manage CareTeam page of Omnibus Care Plan application" />
        </Helmet>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            {editMode ? <FormattedMessage {...messages.editHeader} />
              : <FormattedMessage {...messages.createHeader} />}
          </div>
          <Divider />
          <ManageCareTeam
            {...manageCareTeamProps}
            onSave={this.handleSave}
            removeParticipant={this.handleRemoveParticipant}
            handleOpen={this.handleOpen}
          />
          {((editMode && careTeam) || !editMode) &&
          <SearchParticipant
            initialSelectedParticipants={initialSelectedParticipants}
            isOpen={this.state.open}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
          >
          </SearchParticipant>
          }
        </div>
      </div>
    );
  }
}

ManageCareTeamPage.propTypes = {
  match: PropTypes.object,
  location: PropTypes.object,
  selectedPatient: PropTypes.object,
  selectedCareTeam: PropTypes.object,
  getPatient: PropTypes.func.isRequired,
  getCareTeam: PropTypes.func.isRequired,
  initializeManageCareTeam: PropTypes.func.isRequired,
  getLookUpFormData: PropTypes.func.isRequired,
  onSaveCareTeam: PropTypes.func.isRequired,
  removeParticipant: PropTypes.func.isRequired,
  careTeamCategories: PropTypes.array,
  participantTypes: PropTypes.array,
  participantRoles: PropTypes.array,
  careTeamStatuses: PropTypes.array,
  careTeamReasons: PropTypes.array,
  selectedParticipants: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  selectedPatient: makeSelectPatient(),
  selectedCareTeam: makeSelectCareTeam(),
  careTeamCategories: makeSelectCareTeamCategories(),
  participantTypes: makeSelectParticipantTypes(),
  participantRoles: makeSelectParticipantRoles(),
  careTeamStatuses: makeSelectCareTeamStatuses(),
  careTeamReasons: makeSelectCareTeamReasons(),
  selectedParticipants: makeSelectSelectedParticipants(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeManageCareTeam: () => dispatch(initializeManageCareTeam()),
    getLookUpFormData: () => dispatch(getLookupsAction([CARETEAMCATEGORY, PARTICIPANTTYPE, CARETEAMSTATUS, CARETEAMREASON, PARTICIPANTROLE])),
    getPatient: (patientId) => dispatch(getPatient(patientId)),
    getCareTeam: (careTeamId) => dispatch(getCareTeam(careTeamId)),
    onSaveCareTeam: (careTeamFormData, handleSubmitting) => dispatch(saveCareTeam(careTeamFormData, handleSubmitting)),
    removeParticipant: (participant) => dispatch(removeParticipant(participant)),
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
