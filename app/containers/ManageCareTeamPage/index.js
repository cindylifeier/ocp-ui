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
import saga from './saga';
import reducer from './reducer';
import ManageCareTeam from '../../components/ManageCareTeam';
import messages from './messages';
import styles from './styles.css';
import {
  makeSelectCareTeamCategories,
  makeSelectCareTeamStatuses,
  makeSelectParticipantRoles,
  makeSelectParticipantTypes,
} from '../App/selectors';
import SearchParticipant from '../SearchParticipant';


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
  }

  componentWillMount() {
    const queryObj = queryString.parse(this.props.location.search);
    this.props.getPatient(queryObj.patientId);
  }

  componentWillUnmount() {
    this.props.initializeManageCareTeam();
  }

  handleSave(careTeamFormData, actions) {
    const patientId = this.props.selectedPatient.id;
    if (patientId) {
      merge(careTeamFormData, { patientId });
    }
    this.props.onSaveCareTeam(careTeamFormData, () => actions.setSubmitting(false));
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleOpen() {
    this.setState({ open: true });
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
    // Todo: implement to dispatch participants
    const hasParticipants = true;
    const manageCareTeamProps = {
      selectedPatient,
      careTeamCategories,
      participantTypes,
      participantRoles,
      careTeamStatuses,
      hasParticipants,
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
            <ManageCareTeam
              {...manageCareTeamProps}
              onSave={this.handleSave}
              handleOpen={this.handleOpen}
            />
            <SearchParticipant
              isOpen={this.state.open}
              handleOpen={this.handleOpen}
              handleClose={this.handleClose}
            >
            </SearchParticipant>
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
