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
import { DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';
import { makeSelectUser } from 'containers/App/contextSelectors';
import { setOrganization, setPatient, setUser } from 'containers/App/contextActions';
import WorkspaceSelection from 'components/WorkspaceSelection';
import { getCareCoordinators, getCareManagers, getWorkflowRoles, searchOrganizations, searchPatients } from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  makeCareCoordinatorsData,
  makeCareManagersData,
  makeSelectOrganizationsData,
  makeSelectPatientsData,
  makeSelectWorkflowRolesData,
} from './selectors';
import { flattenPatientData } from './helpers';

export class WorkspaceSelectionPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      defaultRole: props.workflowRoles && props.workflowRoles.careManagerWorkflowRole && props.workflowRoles.careManagerWorkflowRole.value,
      searchPatients: {
        searchValue: '',
        searchType: 'name',
        showInactive: false,
        currentPage: 1,
      },
      searchOrganizations: {
        searchValue: '',
        searchType: 'name',
        showInactive: false,
        currentPage: 1,
      },
    };
    this.handleSetWorkspaceContext = this.handleSetWorkspaceContext.bind(this);
    this.handlePatientSearch = this.handlePatientSearch.bind(this);
    this.handleChangeSearchPage = this.handleChangeSearchPage.bind(this);
    this.handleOrganizationSearch = this.handleOrganizationSearch.bind(this);
    this.handleChangeOrganizationSearchPage = this.handleChangeOrganizationSearchPage.bind(this);
  }

  componentDidMount() {
    this.props.getWorkflowRoles();
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

  handleOrganizationSearch(searchValue, showInactive, searchType) {
    this.setState({
      searchOrganizations: { searchValue, showInactive, searchType },
    });
    this.props.searchOrganizations(searchValue, showInactive, searchType, DEFAULT_START_PAGE_NUMBER);
  }

  handleChangeOrganizationSearchPage(currentPage) {
    this.props.searchOrganizations(this.state.searchOrganizations.searchValue, this.state.searchOrganizations.showInactive, this.state.searchOrganizations.searchType, currentPage);
  }

  handlePatientSearch(searchValue, showInactive, searchType) {
    this.setState({
      searchPatients: { searchValue, showInactive, searchType },
    });
    this.props.searchPatients(searchValue, showInactive, searchType, DEFAULT_START_PAGE_NUMBER);
  }

  handleChangeSearchPage(currentPage) {
    this.props.searchPatients(this.state.searchPatients.searchValue, this.state.searchPatients.showInactive, this.state.searchPatients.searchType, currentPage);
  }

  render() {
    const {
      history, searchOrganizationsData, careManagers, careCoordinators, searchPatientsData, workflowRoles,
    } = this.props;
    const workspaceSelectionProps = {
      history,
      searchOrganizationsData,
      careManagers,
      careCoordinators,
      searchPatientsData,
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
          flattenPatientData={flattenPatientData}
          defaultRole={this.state.defaultRole}
          onCareManagerSelection={this.props.getCareManagers}
          onCareCoordinatorSelection={this.props.getCareCoordinators}
          onPatientSearch={this.handlePatientSearch}
          onChangeSearchPage={this.handleChangeSearchPage}
          onOrganizationSearch={this.handleOrganizationSearch}
          onChangeOrganizationSearchPage={this.handleChangeOrganizationSearchPage}
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
  careManagers: PropTypes.any.isRequired,
  careCoordinators: PropTypes.any.isRequired,
  searchPatientsData: PropTypes.any.isRequired,
  searchOrganizationsData: PropTypes.any.isRequired,
  workflowRoles: PropTypes.any.isRequired,
  user: PropTypes.object,
  getWorkflowRoles: PropTypes.func.isRequired,
  getCareManagers: PropTypes.func.isRequired,
  getCareCoordinators: PropTypes.func.isRequired,
  searchPatients: PropTypes.func.isRequired,
  searchOrganizations: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  setOrganization: PropTypes.func.isRequired,
  setPatient: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  workflowRoles: makeSelectWorkflowRolesData(),
  searchOrganizationsData: makeSelectOrganizationsData(),
  careManagers: makeCareManagersData(),
  careCoordinators: makeCareCoordinatorsData(),
  searchPatientsData: makeSelectPatientsData(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getWorkflowRoles: () => dispatch(getWorkflowRoles()),
    getCareManagers: (role, organization) => dispatch(getCareManagers(role, organization)),
    getCareCoordinators: (role, organization) => dispatch(getCareCoordinators(role, organization)),
    searchOrganizations: (searchValue, showInactive, searchType, currentPage) => dispatch(searchOrganizations(searchValue, showInactive, searchType, currentPage)),
    searchPatients: (searchValue, showInactive, searchType, currentPage) => dispatch(searchPatients(searchValue, showInactive, searchType, currentPage)),
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
