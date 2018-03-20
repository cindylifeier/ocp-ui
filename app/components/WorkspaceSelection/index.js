/**
 *
 * WorkspaceSelection
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';
import { Step, StepLabel, Stepper } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import { CARE_COORDINATOR, CARE_MANAGER, OCP_ADMIN, ORGANIZATION_ADMIN, PATIENT, PCP } from 'containers/App/constants';
import { getLinkUrlByRole } from 'components/PrivateNavigation';
import StepperSection from './StepperSection';
import StepContent from './StepContent';
import RoleSelectField from './RoleSelectField';


class WorkspaceSelection extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      roleValue: CARE_MANAGER,
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

  getStepContentBasedOnRole(finished, stepIndex, organizations, careManagers, careCoordinators, patients) {
    switch (this.state.roleValue) {
      case OCP_ADMIN:
        return this.renderOcpAdminStepContent(finished, stepIndex);
      case CARE_MANAGER:
        return this.renderCareManagerStepContent(finished, stepIndex, organizations, careManagers);
      case CARE_COORDINATOR:
        return this.renderCareCoordinatorStepContent(finished, stepIndex, organizations, careCoordinators);
      case PATIENT:
        return this.renderPatientStepContent(finished, stepIndex, patients);
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

  getManagerStepContent(stepIndex, organizations, careManagers) {
    switch (stepIndex) {
      case 0:
        return this.renderSelectRoleContent();
      case 1:
        return this.renderSelectOrganizationContent(organizations);
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

  getCoordinatorStepContent(stepIndex, organizations, careCoordinators) {
    switch (stepIndex) {
      case 0:
        return this.renderSelectRoleContent();
      case 1:
        return this.renderSelectOrganizationContent(organizations);
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

  getPatientStepContent(stepIndex, patients) {
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
    this.props.onSetWorkflowRole(this.state.roleValue);
    if (!isEmpty(this.state.organizationValue)) {
      this.props.onSetOrganization(find(organizations, { logicalId: this.state.organizationValue }));
    }
    if (!isEmpty(this.state.careManagerValue)) {
      this.props.onSetCareManager(find(careManagers, { logicalId: this.state.careManagerValue }));
    }
    if (!isEmpty(this.state.careCoordinatorValue)) {
      this.props.onSetCareCoordinator(find(careCoordinators, { logicalId: this.state.careCoordinatorValue }));
    }
    if (!isEmpty(this.state.patientValue)) {
      this.props.onSetPatient(find(patients, { id: this.state.patientValue }));
    }
    const linkTo = getLinkUrlByRole(this.state.roleValue);
    this.props.history.push(linkTo);
  }

  renderSelectRoleContent() {
    return (
      <div>
        <RoleSelectField
          floatingLabelText="Select Role"
          value={this.state.roleValue}
          onChange={this.handleRoleChange}
        >
          <MenuItem value={OCP_ADMIN} primaryText={OCP_ADMIN} />
          <MenuItem value={CARE_MANAGER} primaryText={`${CARE_MANAGER}/${ORGANIZATION_ADMIN}`} />
          <MenuItem value={CARE_COORDINATOR} primaryText={`${CARE_COORDINATOR}/${PCP}`} />
          <MenuItem value={PATIENT} primaryText={PATIENT} />
        </RoleSelectField>
      </div>
    );
  }

  renderSelectOrganizationContent(organizations) {
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

  renderCareManagerStepContent(finished, stepIndex, organizations, careManagers) {
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
                {this.getManagerStepContent(stepIndex, organizations, careManagers)}
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

  renderCareCoordinatorStepContent(finished, stepIndex, organizations, careCoordinators) {
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
                {this.getCoordinatorStepContent(stepIndex, organizations, careCoordinators)}
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

  renderPatientStepContent(finished, stepIndex, patients) {
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
                {this.getPatientStepContent(stepIndex, patients)}
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
    const { organizations, careManagers, careCoordinators, patients } = this.props;
    const { finished, stepIndex } = this.state;
    return (
      <div>
        {this.getStepContentBasedOnRole(finished, stepIndex, organizations, careManagers, careCoordinators, patients)}
      </div>
    );
  }
}

WorkspaceSelection.propTypes = {
  onSetWorkflowRole: PropTypes.func.isRequired,
  onSetOrganization: PropTypes.func.isRequired,
  onSetCareManager: PropTypes.func.isRequired,
  onSetCareCoordinator: PropTypes.func.isRequired,
  onSetPatient: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  organizations: PropTypes.any.isRequired,
  careManagers: PropTypes.any.isRequired,
  careCoordinators: PropTypes.any.isRequired,
  patients: PropTypes.any.isRequired,
};

export default WorkspaceSelection;
