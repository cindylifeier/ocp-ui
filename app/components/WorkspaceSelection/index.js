/**
 *
 * WorkspaceSelection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import { Step, StepLabel, Stepper } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import SearchBar from 'components/SearchBar';
import InfoSection from 'components/InfoSection';
import StepperSection from './StepperSection';
import StepContent from './StepContent';
import RoleSelectField from './RoleSelectField';
import PatientTable from './PatientTable';
import OrganizationTable from './OrganizationTable';

class WorkspaceSelection extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      roleValue: props.defaultRole,
      careManagerValue: null,
      careCoordinatorValue: null,
      selectPatient: null,
      selectOrganization: null,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
    this.handleCareManagerChange = this.handleCareManagerChange.bind(this);
    this.handleCareCoordinatorChange = this.handleCareCoordinatorChange.bind(this);
    this.handlePatientSelect = this.handlePatientSelect.bind(this);
    this.handleNavigateTo = this.handleNavigateTo.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  getOrganizationName() {
    let organizationName = null;
    if (!isEmpty(this.state.selectOrganization) && this.state.selectOrganization.name) {
      organizationName = this.state.selectOrganization.name;
    }
    return organizationName;
  }

  getStepContentBasedOnRole() {
    const {
      ocpAdminWorkflowRole, careManagerWorkflowRole, careCoordinatorWorkflowRole, patientWorkflowRole,
    } = this.props.workflowRoles;

    switch (this.state.roleValue) {
      case ocpAdminWorkflowRole.value:
        return this.renderOcpAdminStepContent();
      case careManagerWorkflowRole.value:
        return this.renderCareManagerStepContent();
      case careCoordinatorWorkflowRole.value:
        return this.renderCareCoordinatorStepContent();
      case patientWorkflowRole.value:
        return this.renderPatientStepContent();
      default:
        return null;
    }
  }

  getAdminStepContent() {
    switch (this.state.stepIndex) {
      case 0:
        return this.renderSelectRoleContent();
      default:
        return null;
    }
  }

  getManagerStepContent() {
    const { careManagers, mapToName } = this.props;
    switch (this.state.stepIndex) {
      case 0:
        return this.renderSelectRoleContent();
      case 1:
        return this.renderSelectOrganizationContent();
      case 2:
        return (
          <div>
            <SelectField
              floatingLabelText="Select Care Manager"
              value={this.state.careManagerValue}
              onChange={this.handleCareManagerChange}
            >
              {careManagers && careManagers.map((careManager) =>
                (<MenuItem
                  key={careManager.logicalId}
                  value={careManager.logicalId}
                  primaryText={mapToName(careManager.name)}
                />),
              )}
            </SelectField>
          </div>
        );
      default:
        return null;
    }
  }

  getCoordinatorStepContent() {
    const { careCoordinators, mapToName } = this.props;
    switch (this.state.stepIndex) {
      case 0:
        return this.renderSelectRoleContent();
      case 1:
        return this.renderSelectOrganizationContent();
      case 2:
        return (
          <div>
            <SelectField
              floatingLabelText="Select Coordinator"
              value={this.state.careCoordinatorValue}
              onChange={this.handleCareCoordinatorChange}
            >
              {careCoordinators && careCoordinators.map((careCoordinator) =>
                (<MenuItem
                  key={careCoordinator.logicalId}
                  value={careCoordinator.logicalId}
                  primaryText={mapToName(careCoordinator.name)}
                />),
              )}
            </SelectField>
          </div>
        );
      default:
        return null;
    }
  }

  getPatientStepContent() {
    const { onPatientSearch, searchPatientsData, onChangePatientSearchPage, flattenPatientData } = this.props;
    switch (this.state.stepIndex) {
      case 0:
        return this.renderSelectRoleContent();
      case 1:
        return (
          <InfoSection margin="10px 0">
            <SearchBar showFilter onSearch={onPatientSearch} />
            <PatientTable
              searchPatientsData={searchPatientsData}
              onChangePatientSearchPage={onChangePatientSearchPage}
              flattenPatientData={flattenPatientData}
              onPatientSelect={this.handlePatientSelect}
            />
          </InfoSection>
        );
      default:
        return null;
    }
  }

  handleNext() {
    const { stepIndex } = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handlePrev() {
    const { stepIndex } = this.state;
    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  handleRoleChange(event, index, value) {
    this.setState({
      roleValue: value,
      careManagerValue: null,
      careCoordinatorValue: null,
      selectOrganization: null,
      selectPatient: null,
    });
  }

  handleOrganizationChange(selectOrganization) {
    this.setState({ selectOrganization });
    const { workflowRoles: { careManagerWorkflowRole, careCoordinatorWorkflowRole }, onPractitionerSelection, onCareManagerSelection, onCareCoordinatorSelection } = this.props;
    onPractitionerSelection(this.state.roleValue, selectOrganization.logicalId);
    switch (this.state.roleValue) {
      case careManagerWorkflowRole.value:
        onCareManagerSelection(this.state.roleValue, selectOrganization.logicalId);
        break;
      case careCoordinatorWorkflowRole.value:
        onCareCoordinatorSelection(this.state.roleValue, selectOrganization.logicalId);
        break;
      default:
    }
  }

  handleCareManagerChange(event, index, value) {
    this.setState({ careManagerValue: value });
  }

  handleCareCoordinatorChange(event, index, value) {
    this.setState({ careCoordinatorValue: value });
  }

  handlePatientSelect(selectPatient) {
    this.setState({ selectPatient });
  }

  handleNavigateTo() {
    const { careManagers, careCoordinators } = this.props;
    const careManager = find(careManagers, { logicalId: this.state.careManagerValue });
    const careCoordinator = find(careCoordinators, { logicalId: this.state.careCoordinatorValue });
    this.props.onSetWorkspaceContext(this.state.roleValue, this.state.selectOrganization, careManager, careCoordinator, this.state.selectPatient);
    const linkTo = this.props.getLinkUrlByRole(this.state.roleValue);
    this.props.history.push(linkTo);
  }

  handleReset(event) {
    event.preventDefault();
    this.props.initializeSearch();
    this.setState({
      finished: false,
      stepIndex: 0,
      roleValue: this.props.workflowRoles.careManagerWorkflowRole.value,
      careManagerValue: null,
      careCoordinatorValue: null,
      selectOrganization: null,
      selectPatient: null,
    });
  }

  renderSelectRoleContent() {
    const {
      ocpAdminWorkflowRole, careManagerWorkflowRole,
      careCoordinatorWorkflowRole, patientWorkflowRole,
    } = this.props.workflowRoles;
    return (
      <div>
        <RoleSelectField
          width="180px"
          floatingLabelText="Select Role"
          value={this.state.roleValue}
          onChange={this.handleRoleChange}
        >
          <MenuItem value={ocpAdminWorkflowRole.value} primaryText={ocpAdminWorkflowRole.display} />
          <MenuItem value={careManagerWorkflowRole.value} primaryText={careManagerWorkflowRole.display} />
          <MenuItem value={careCoordinatorWorkflowRole.value} primaryText={careCoordinatorWorkflowRole.display} />
          <MenuItem value={patientWorkflowRole.value} primaryText={patientWorkflowRole.display} />
        </RoleSelectField>
      </div>
    );
  }

  renderSelectOrganizationContent() {
    const { onOrganizationSearch, searchOrganizationsData, onChangeOrganizationSearchPage, flattenOrganizationData } = this.props;
    return (
      <InfoSection margin="10px 0">
        <SearchBar showFilter onSearch={onOrganizationSearch} />
        <OrganizationTable
          searchOrganizationsData={searchOrganizationsData}
          onChangeOrganizationSearchPage={onChangeOrganizationSearchPage}
          flattenOrganizationData={flattenOrganizationData}
          onOrganizationSelect={this.handleOrganizationChange}
        />
      </InfoSection>
    );
  }

  renderOcpAdminStepContent() {
    const { stepIndex } = this.state;
    return (
      <div>
        <StepperSection>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Role</StepLabel>
            </Step>
          </Stepper>
          <StepContent>
            <div>
              {this.getAdminStepContent()}
              <p><strong>Role:</strong> {this.state.roleValue}</p>
              <RaisedButton
                label="Continue"
                primary
                onClick={this.handleNavigateTo}
              />
            </div>
          </StepContent>
        </StepperSection>
      </div>
    );
  }

  renderCareManagerStepContent() {
    const { stepIndex, finished } = this.state;
    return (
      <div>
        <StepperSection>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Role</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Organization</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Care Manager</StepLabel>
            </Step>
          </Stepper>
          <StepContent>
            {finished ? (
              <div>
                <p><strong>Role:</strong> {this.state.roleValue}</p>
                <p><strong>Organization Name:</strong> {this.getOrganizationName()}</p>
                <p><strong>Care Manager ID:</strong> {this.state.careManagerValue}</p>
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Reset"
                      secondary
                      onClick={this.handleReset}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label="Continue"
                      primary
                      onClick={this.handleNavigateTo}
                    />
                  </Cell>
                </Grid>
              </div>
            ) : (
              <div>
                {this.getManagerStepContent()}
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label={stepIndex === 2 ? 'Finish' : 'Next'}
                      primary
                      onClick={this.handleNext}
                      disabled={(stepIndex > 0 && isEmpty(this.state.selectOrganization)) ||
                      (stepIndex > 1 && isEmpty(this.state.careManagerValue))
                      }
                    />
                  </Cell>
                </Grid>
              </div>
            )}
          </StepContent>
        </StepperSection>
      </div>
    );
  }

  renderCareCoordinatorStepContent() {
    const { stepIndex, finished } = this.state;
    return (
      <div>
        <StepperSection>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Role</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Organization</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Coordinator</StepLabel>
            </Step>
          </Stepper>
          <StepContent>
            {finished ? (
              <div>
                <p><strong>Role:</strong> {this.state.roleValue}</p>
                <p><strong>Organization Name:</strong> {this.getOrganizationName()}</p>
                <p><strong>Coordinator ID:</strong> {this.state.careCoordinatorValue}</p>
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Reset"
                      secondary
                      onClick={this.handleReset}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label="Continue"
                      primary
                      onClick={this.handleNavigateTo}
                    />
                  </Cell>
                </Grid>
              </div>
            ) : (
              <div>
                {this.getCoordinatorStepContent()}
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label={stepIndex === 2 ? 'Finish' : 'Next'}
                      primary
                      onClick={this.handleNext}
                      disabled={(stepIndex > 0 && isEmpty(this.state.selectOrganization)) ||
                      (stepIndex > 1 && isEmpty(this.state.careCoordinatorValue))
                      }
                    />
                  </Cell>
                </Grid>
              </div>
            )}
          </StepContent>
        </StepperSection>
      </div>
    );
  }

  renderPatientStepContent() {
    const { stepIndex, finished } = this.state;
    let patientName = null;
    if (!isEmpty(this.state.selectPatient) && this.state.selectPatient.name) {
      patientName = this.props.flattenPatientData(this.state.selectPatient).name;
    }
    return (
      <div>
        <StepperSection>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select Role</StepLabel>
            </Step>
            <Step>
              <StepLabel>Select Patient</StepLabel>
            </Step>
          </Stepper>
          <StepContent>
            {finished ? (
              <div>
                <p><strong>Role:</strong> {this.state.roleValue}</p>
                <p><strong>Patient Name:</strong> {patientName}</p>
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Reset"
                      secondary
                      onClick={this.handleReset}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label="Continue"
                      primary
                      onClick={this.handleNavigateTo}
                    />
                  </Cell>
                </Grid>
              </div>
            ) : (
              <div>
                {this.getPatientStepContent()}
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Back"
                      disabled={stepIndex === 0}
                      onClick={this.handlePrev}
                    />
                  </Cell>
                  <Cell>
                    <RaisedButton
                      label={stepIndex === 1 ? 'Finish' : 'Next'}
                      primary
                      onClick={() => {
                        this.setState({
                          stepIndex: stepIndex + 1,
                          finished: stepIndex >= 1,
                        });
                      }}
                      disabled={stepIndex > 0 && isEmpty(this.state.selectPatient)}
                    />
                  </Cell>
                </Grid>
              </div>
            )}
          </StepContent>
        </StepperSection>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.getStepContentBasedOnRole()}
      </div>
    );
  }
}

WorkspaceSelection.propTypes = {
  onPractitionerSelection: PropTypes.func.isRequired,
  onCareManagerSelection: PropTypes.func.isRequired,
  onCareCoordinatorSelection: PropTypes.func.isRequired,
  initializeSearch: PropTypes.func.isRequired,
  onPatientSearch: PropTypes.func.isRequired,
  onChangePatientSearchPage: PropTypes.func.isRequired,
  onOrganizationSearch: PropTypes.func.isRequired,
  onChangeOrganizationSearchPage: PropTypes.func.isRequired,
  getLinkUrlByRole: PropTypes.func.isRequired,
  mapToName: PropTypes.func.isRequired,
  onSetWorkspaceContext: PropTypes.func.isRequired,
  flattenOrganizationData: PropTypes.func.isRequired,
  flattenPatientData: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  careManagers: PropTypes.any.isRequired,
  careCoordinators: PropTypes.any.isRequired,
  searchOrganizationsData: PropTypes.any.isRequired,
  searchPatientsData: PropTypes.any.isRequired,
  workflowRoles: PropTypes.any.isRequired,
  defaultRole: PropTypes.string,
};

export default WorkspaceSelection;
