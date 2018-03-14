/**
 *
 * WorkspaceSelectionPage
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Step, StepLabel, Stepper } from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { HOME_URL } from 'containers/App/constants';
import makeSelectWorkspaceSelectionPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import StepperSection from './StepperSection';
import StepContent from './StepContent';

export class WorkspaceSelectionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      roleValue: 1,
      organizationValue: 1,
      careManagerValue: 1,
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleOrganizationChange = this.handleOrganizationChange.bind(this);
    this.handleCareManagerChange = this.handleCareManagerChange.bind(this);
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <SelectField
              floatingLabelText="Select Role"
              value={this.state.roleValue}
              onChange={this.handleRoleChange}
            >
              <MenuItem value={1} primaryText="OCP Admin" />
              <MenuItem value={2} primaryText="Care Manager" />
              <MenuItem value={3} primaryText="Care Coordinator" />
              <MenuItem value={4} primaryText="Patient" />
              <MenuItem value={5} primaryText="PCP" />
            </SelectField>
          </div>
        );
      case 1:
        return (
          <div>
            <SelectField
              floatingLabelText="Select Organization"
              value={this.state.organizationValue}
              onChange={this.handleOrganizationChange}
            >
              <MenuItem value={1} primaryText="Organization A" />
              <MenuItem value={2} primaryText="Organization B" />
              <MenuItem value={3} primaryText="Organization C" />
              <MenuItem value={4} primaryText="Organization D" />
              <MenuItem value={5} primaryText="Organization E" />
            </SelectField>
          </div>
        );
      case 2:
        return (
          <div>
            <SelectField
              floatingLabelText="Select Care Manager"
              value={this.state.careManagerValue}
              onChange={this.handleCareManagerChange}
            >
              <MenuItem value={1} primaryText="Care Manager A" />
              <MenuItem value={2} primaryText="Care Manager B" />
              <MenuItem value={3} primaryText="Care Manager C" />
              <MenuItem value={4} primaryText="Care Manager D" />
              <MenuItem value={5} primaryText="Care Manager E" />
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

  render() {
    const { finished, stepIndex } = this.state;
    return (
      <div>
        <Helmet>
          <title>Switch Role</title>
          <meta name="description" content="Switch role page of Omnibus Care Plan application" />
        </Helmet>
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
                <p><strong>Organization:</strong> {this.state.organizationValue}</p>
                <p><strong>Care Manager:</strong> {this.state.careManagerValue}</p>
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
                      containerElement={<Link to={HOME_URL} />}
                    />
                  </Cell>
                </Grid>
              </div>
            ) : (
              <div>
                {this.getStepContent(stepIndex, this.state.value, this.handleChange)}
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
}

WorkspaceSelectionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  workspaceselectionpage: makeSelectWorkspaceSelectionPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
