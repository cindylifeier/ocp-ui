/**
 *
 * WorkspaceSelection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import find from 'lodash/find';
import { Step, StepLabel, Stepper } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import StepperSection from './StepperSection';
import StepContent from './StepContent';
import RoleSelectField from './RoleSelectField';

class WorkspaceSelection extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      roleValue: props.workflowRoles.careManagerWorkflowRole.value,
      organizationValue: null,
      careManagerValue: null,
      careCoordinatorValue: null,
      patientValue: null,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
    this.handleCareManagerChange = this.handleCareManagerChange.bind(this);
    this.handleCareCoordinatorChange = this.handleCareCoordinatorChange.bind(this);
    this.handlePatientChange = this.handlePatientChange.bind(this);
    this.handleNavigateTo = this.handleNavigateTo.bind(this);
  }

  getStepContentBasedOnRole(finished, stepIndex) {
    const {
      ocpAdminWorkflowRole, careManagerWorkflowRole, careCoordinatorWorkflowRole, patientWorkflowRole,
    } = this.props.workflowRoles;

    switch (this.state.roleValue) {
      case ocpAdminWorkflowRole.value:
        return this.renderOcpAdminStepContent(finished, stepIndex);
      case careManagerWorkflowRole.value:
        return this.renderCareManagerStepContent(finished, stepIndex);
      case careCoordinatorWorkflowRole.value:
        return this.renderCareCoordinatorStepContent(finished, stepIndex);
      case patientWorkflowRole.value:
        return this.renderPatientStepContent(finished, stepIndex);
      default:
        return null;
    }
  }

  getAdminStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return this.renderSelectRoleContent();
      default:
        return null;
    }
  }

  getManagerStepContent(stepIndex) {
    const { careManagers } = this.props;
    switch (stepIndex) {
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
                <MenuItem key={careManager.logicalId} value={careManager.logicalId} primaryText={careManager.name} />,
              )}
            </SelectField>
          </div>
        );
      default:
        return null;
    }
  }

  getCoordinatorStepContent(stepIndex) {
    const { careCoordinators } = this.props;
    switch (stepIndex) {
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
                  primaryText={careCoordinator.name}
                />),
              )}
            </SelectField>
          </div>
        );
      default:
        return null;
    }
  }

  getPatientStepContent(stepIndex) {
    const { patients } = this.props;
    switch (stepIndex) {
      case 0:
        return this.renderSelectRoleContent();
      case 1:
        return (
          <div>
            <SelectField
              floatingLabelText="Select Patient"
              value={this.state.patientValue}
              onChange={this.handlePatientChange}
            >
              {patients && patients.map((patient) =>
                <MenuItem key={patient.id} value={patient.id} primaryText={patient.name} />,
              )}
            </SelectField>
          </div>
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
    this.setState({ roleValue: value });
  }

  handleOrganizationChange(event, index, value) {
    this.setState({ organizationValue: value });
  }

  handleCareManagerChange(event, index, value) {
    this.setState({ careManagerValue: value });
  }

  handleCareCoordinatorChange(event, index, value) {
    this.setState({ careCoordinatorValue: value });
  }

  handlePatientChange(event, index, value) {
    this.setState({ patientValue: value });
  }

  handleNavigateTo() {
    const { organizations, careManagers, careCoordinators, patients } = this.props;
    const organization = find(organizations, { logicalId: this.state.organizationValue });
    const careManager = find(careManagers, { logicalId: this.state.careManagerValue });
    const careCoordinator = find(careCoordinators, { logicalId: this.state.careCoordinatorValue });
    const patient = find(patients, { logicalId: this.state.patientValue });
    this.props.onSetWorkspaceContext(this.state.roleValue, organization, careManager, careCoordinator, patient);
    const linkTo = this.props.onGetNavigateToLinkUrlByRole(this.state.roleValue);
    this.props.history.push(linkTo);
  }

  renderSelectRoleContent() {
    const {
      ocpAdminWorkflowRole, careManagerWorkflowRole,
      careCoordinatorWorkflowRole, patientWorkflowRole,
      orgAdminWorkflowRole, pcpWorkflowRole,
    } = this.props.workflowRoles;
    return (
      <div>
        <RoleSelectField
          floatingLabelText="Select Role"
          value={this.state.roleValue}
          onChange={this.handleRoleChange}
        >
          <MenuItem value={ocpAdminWorkflowRole.value} primaryText={ocpAdminWorkflowRole.display} />
          <MenuItem
            value={careManagerWorkflowRole.value}
            primaryText={`${careManagerWorkflowRole.display}/${orgAdminWorkflowRole.display}`}
          />
          <MenuItem
            value={careCoordinatorWorkflowRole.value}
            primaryText={`${careCoordinatorWorkflowRole.display}/${pcpWorkflowRole.display}`}
          />
          <MenuItem value={patientWorkflowRole.value} primaryText={patientWorkflowRole.display} />
        </RoleSelectField>
      </div>
    );
  }

  renderSelectOrganizationContent() {
    const { organizations } = this.props;
    return (
      <div>
        <SelectField
          floatingLabelText="Select Organization"
          value={this.state.organizationValue}
          onChange={this.handleOrganizationChange}
        >
          {organizations && organizations.map((organization) =>
            <MenuItem key={organization.logicalId} value={organization.logicalId} primaryText={organization.name} />,
          )}
        </SelectField>
      </div>
    );
  }

  renderOcpAdminStepContent(finished, stepIndex) {
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
              {this.getAdminStepContent(stepIndex)}
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

  renderCareManagerStepContent(finished, stepIndex) {
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
                <p><strong>Organization ID:</strong> {this.state.organizationValue}</p>
                <p><strong>Care Manager ID:</strong> {this.state.careManagerValue}</p>
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Reset"
                      secondary
                      onClick={(event) => {
                        event.preventDefault();
                        this.setState({ stepIndex: 0, finished: false });
                      }}
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
                {this.getManagerStepContent(stepIndex)}
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

  renderCareCoordinatorStepContent(finished, stepIndex) {
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
                <p><strong>Organization ID:</strong> {this.state.organizationValue}</p>
                <p><strong>Coordinator ID:</strong> {this.state.careCoordinatorValue}</p>
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Reset"
                      secondary
                      onClick={(event) => {
                        event.preventDefault();
                        this.setState({ stepIndex: 0, finished: false });
                      }}
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
                {this.getCoordinatorStepContent(stepIndex)}
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

  renderPatientStepContent(finished, stepIndex) {
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
                <p><strong>Patient ID:</strong> {this.state.patientValue}</p>
                <Grid columns={'90px 90px'} gap="12px">
                  <Cell>
                    <FlatButton
                      label="Reset"
                      secondary
                      onClick={(event) => {
                        event.preventDefault();
                        this.setState({ stepIndex: 0, finished: false });
                      }}
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
                {this.getPatientStepContent(stepIndex)}
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
    const { finished, stepIndex } = this.state;
    return (
      <div>
        {this.getStepContentBasedOnRole(finished, stepIndex)}
      </div>
    );
  }
}

WorkspaceSelection.propTypes = {
  onGetNavigateToLinkUrlByRole: PropTypes.func.isRequired,
  onSetWorkspaceContext: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  organizations: PropTypes.any.isRequired,
  careManagers: PropTypes.any.isRequired,
  careCoordinators: PropTypes.any.isRequired,
  patients: PropTypes.any.isRequired,
  workflowRoles: PropTypes.any.isRequired,
};

export default WorkspaceSelection;
