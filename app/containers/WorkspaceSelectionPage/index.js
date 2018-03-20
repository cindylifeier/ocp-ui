/**
 *
 * WorkspaceSelectionPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { setUser } from 'containers/App/contextActions';
import WorkspaceSelection from 'components/WorkspaceSelection';
import { getCareCoordinators, getCareManagers, getOrganizations, getPatients } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeCareCoordinatorsData,
  makeCareManagersData,
  makeSelectOrganizationsData,
  makeSelectPatientsData,
} from './selectors';

export class WorkspaceSelectionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.onSetWorkflowRole = this.onSetWorkflowRole.bind(this);
    this.handleSetOrganization = this.handleSetOrganization.bind(this);
    this.handleSetCareManager = this.handleSetCareManager.bind(this);
    this.handleSetCareCoordinator = this.handleSetCareCoordinator.bind(this);
    this.handleSetPatient = this.handleSetPatient.bind(this);
  }

  componentDidMount() {
    this.props.getOrganizations();
    this.props.getCareManagers();
    this.props.getCareCoordinators();
    this.props.getPatients();
  }

  onSetWorkflowRole(role) {
    const { user } = this.props;
    this.props.setUser({ ...user, role });
  }

  // Todo: Integrate with context
  handleSetOrganization(organization) {
    console.log(organization);
  }

  handleSetCareManager(careManager) {
    console.log(careManager);
  }

  handleSetCareCoordinator(careCoordinator) {
    console.log(careCoordinator);
  }

  handleSetPatient(patient) {
    console.log(patient);
  }

  render() {
    const {
      history, organizations, careManagers, careCoordinators, patients,
    } = this.props;
    const workspaceSelectionProps = {
      history,
      organizations,
      careManagers,
      careCoordinators,
      patients,
    };
    return (
      <div>
        <Helmet>
          <title>Workspace Selection</title>
          <meta name="description" content="Workspace selection page of Omnibus Care Plan application" />
        </Helmet>
        <WorkspaceSelection
          {...workspaceSelectionProps}
          onSetWorkflowRole={this.onSetWorkflowRole}
          onSetOrganization={this.handleSetOrganization}
          onSetCareManager={this.handleSetCareManager}
          onSetCareCoordinator={this.handleSetCareCoordinator}
          onSetPatient={this.handleSetPatient}
        />
      </div>
    );
  }
}

WorkspaceSelectionPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  organizations: PropTypes.any.isRequired,
  careManagers: PropTypes.any.isRequired,
  careCoordinators: PropTypes.any.isRequired,
  patients: PropTypes.any.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  getCareManagers: PropTypes.func.isRequired,
  getCareCoordinators: PropTypes.func.isRequired,
  getPatients: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  organizations: makeSelectOrganizationsData(),
  careManagers: makeCareManagersData(),
  careCoordinators: makeCareCoordinatorsData(),
  patients: makeSelectPatientsData(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOrganizations: () => dispatch(getOrganizations()),
    getCareManagers: () => dispatch(getCareManagers()),
    getCareCoordinators: () => dispatch(getCareCoordinators()),
    getPatients: () => dispatch(getPatients()),
    setUser: (user) => dispatch(setUser(user)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({ key: 'workspaceSelectionPage', reducer });
const withSaga = injectSaga({ key: 'workspaceSelectionPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WorkspaceSelectionPage);
