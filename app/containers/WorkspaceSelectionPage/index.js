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
import isEmpty from 'lodash/isEmpty';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getLinkUrlByRole, mapToName } from 'containers/App/helpers';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { setOrganization, setPatient, setUser } from 'containers/App/contextActions';
import WorkspaceSelection from 'components/WorkspaceSelection';
import { getCareCoordinators, getCareManagers, getOrganizations, getPatients, getWorkflowRoles } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeCareCoordinatorsData,
  makeCareManagersData,
  makeSelectOrganizationsData,
  makeSelectPatientsData,
  makeSelectWorkflowRolesData,
} from './selectors';
import { flattenPatientsData } from './mapping';

export class WorkspaceSelectionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.handleSetWorkspaceContext = this.handleSetWorkspaceContext.bind(this);
    this.state = {
      defaultRole: props.workflowRoles && props.workflowRoles.careManagerWorkflowRole && props.workflowRoles.careManagerWorkflowRole.value,
    };
  }

  componentDidMount() {
    this.props.getWorkflowRoles();
    this.props.getOrganizations();
    this.props.getPatients();
  }

  componentWillReceiveProps(nextProps) {
    const defaultRole = nextProps.workflowRoles && nextProps.workflowRoles.careManagerWorkflowRole && nextProps.workflowRoles.careManagerWorkflowRole.value;
    if (defaultRole !== this.state.defaultRole) {
      this.setState({ defaultRole });
    }
  }

  handleSetWorkspaceContext(role, organization, careManager, careCoordinator, patient) {
    const { user } = this.props;
    this.props.setUser({ ...user, role });
    if (!isEmpty(organization)) {
      this.props.setOrganization(organization);
    }
    if (!isEmpty(careManager)) {
      this.props.setUser({ ...user, role, resource: careManager });
    }
    if (!isEmpty(careCoordinator)) {
      this.props.setUser({ ...user, role, resource: careCoordinator });
    }
    if (!isEmpty(patient)) {
      this.props.setPatient(patient);
    }
  }

  render() {
    const {
      history, organizations, careManagers, careCoordinators, patients, workflowRoles,
    } = this.props;
    const workspaceSelectionProps = {
      history,
      organizations,
      careManagers,
      careCoordinators,
      patients,
      workflowRoles,
    };
    return (
      <div>
        <Helmet>
          <title>Workspace Selection</title>
          <meta name="description" content="Workspace selection page of Omnibus Care Plan application" />
        </Helmet>
        {!isEmpty(workflowRoles) &&
        <WorkspaceSelection
          {...workspaceSelectionProps}
          getLinkUrlByRole={getLinkUrlByRole}
          mapToName={mapToName}
          onSetWorkspaceContext={this.handleSetWorkspaceContext}
          flattenPatientsData={flattenPatientsData}
          defaultRole={this.state.defaultRole}
          onCareManagerSelection={this.props.getCareManagers}
          onCareCoordinatorSelection={this.props.getCareCoordinators}
        />
        }
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
  workflowRoles: PropTypes.any.isRequired,
  getWorkflowRoles: PropTypes.func.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  getCareManagers: PropTypes.func.isRequired,
  getCareCoordinators: PropTypes.func.isRequired,
  getPatients: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setOrganization: PropTypes.func.isRequired,
  setPatient: PropTypes.func.isRequired,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  workflowRoles: makeSelectWorkflowRolesData(),
  organizations: makeSelectOrganizationsData(),
  careManagers: makeCareManagersData(),
  careCoordinators: makeCareCoordinatorsData(),
  patients: makeSelectPatientsData(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getWorkflowRoles: () => dispatch(getWorkflowRoles()),
    getOrganizations: () => dispatch(getOrganizations()),
    getCareManagers: (role, organization) => dispatch(getCareManagers(role, organization)),
    getCareCoordinators: (role, organization) => dispatch(getCareCoordinators(role, organization)),
    getPatients: () => dispatch(getPatients()),
    setUser: (user) => dispatch(setUser(user)),
    setOrganization: (organization) => dispatch(setOrganization(organization)),
    setPatient: (patient) => dispatch(setPatient(patient)),
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
