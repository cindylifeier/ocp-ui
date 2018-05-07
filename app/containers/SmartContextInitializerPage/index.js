/**
 *
 * SmartContextInitializerPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import queryString from 'query-string';
import identity from 'lodash/identity';
import pick from 'lodash/pick';
import { Step, StepButton } from 'material-ui-next/Stepper';
import Typography from 'material-ui-next/Typography';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import Page from 'components/Page';
import PageHeader from 'components/PageHeader';
import PageContent from 'components/PageContent';
import StyledFlatButton from 'components/StyledFlatButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledStepper from 'components/StyledStepper';
import Organizations from 'containers/Organizations';
import Patients from 'containers/Patients';
import makeSelectSmartContextInitializerPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

const InlineBlock = styled.span`
  display: inline-block;
`;

export class SmartContextInitializerPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      completed: {},
    };
    this.getSteps = this.getSteps.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.getRequiredSteps = this.getRequiredSteps.bind(this);
    this.getRequiredContexts = this.getRequiredContexts.bind(this);
    this.completedSteps = this.completedSteps.bind(this);
    this.totalSteps = this.totalSteps.bind(this);
    this.isLastStep = this.isLastStep.bind(this);
    this.allStepsCompleted = this.allStepsCompleted.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleStep = this.handleStep.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.renderPatientSelector = this.renderPatientSelector.bind(this);
    this.renderOrganizationSelector = this.renderOrganizationSelector.bind(this);
  }

  getSteps() {
    return {
      patient: 'Select Patient',
      organization: 'Select Organization',
      location: 'Select Location',
      encounter: 'Select Encounter',
      resource: 'Select Resource',
    };
  }

  getStepContent(step, keys) {
    const stepContents = {
      patient: this.renderPatientSelector,
      organization: this.renderOrganizationSelector,
      location: () => 'Location Selector Content',
      encounter: () => 'Encounter Selector Content',
      resource: () => 'Resource Selector Content',
    };
    const requiredStepContents = Object.values(pick(stepContents, keys));
    return requiredStepContents[step]();
  }

  getRequiredContexts() {
    const params = queryString.parse(this.props.location.search);
    const requiredContexts = params.required_context.split(',').filter(identity);
    return requiredContexts;
  }

  getRequiredSteps(requiredContexts) {
    const reqContexts = requiredContexts || this.getRequiredContexts();
    const steps = reqContexts.map((c) => this.getSteps()[c]);
    return steps;
  }

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  totalSteps() {
    const steps = this.getRequiredSteps();
    return steps.length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  handleNext() {
    let activeStep;

    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = this.getRequiredSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
  }

  handleBack() {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  }

  handleStep(step) {
    return () => {
      this.setState({
        activeStep: step,
      });
    };
  }

  handleComplete() {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  }

  handleReset() {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  }

  renderPatientSelector() {
    return (<Patients showSearchBarByDefault onPatientClick={console.log} />);
  }

  renderOrganizationSelector() {
    return (<Organizations showSearchBarByDefault onOrganizationClick={console.log} />);
  }

  render() {
    const requiredContexts = this.getRequiredContexts();
    const steps = this.getRequiredSteps(requiredContexts);
    const { activeStep } = this.state;

    return (
      <Page>
        <Helmet>
          <title>SmartContextInitializerPage</title>
          <meta name="description" content="Description of SmartContextInitializerPage" />
        </Helmet>
        <PageHeader title={<FormattedMessage {...messages.header} />} />
        <PageContent>
          <div>
            <StyledStepper nonLinear activeStep={activeStep}>
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepButton
                    onClick={this.handleStep(index)}
                    completed={this.state.completed[index]}
                  >
                    {label}
                  </StepButton>
                </Step>
              ))}
            </StyledStepper>
            <div>
              {this.allStepsCompleted() ? (
                <div>
                  <Typography>
                    All steps completed - you&quot;re finished
                  </Typography>
                  <StyledFlatButton onClick={this.handleReset}>Reset</StyledFlatButton>
                </div>
              ) : (
                <div>
                  <Typography component="div">
                    {this.getStepContent(activeStep, requiredContexts)}
                  </Typography>
                  <div>
                    <StyledRaisedButton
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      marginRight={8}
                    >
                      Back
                    </StyledRaisedButton>
                    <StyledRaisedButton
                      onClick={this.handleNext}
                      marginRight={8}
                    >
                      Next
                    </StyledRaisedButton>
                    {activeStep !== steps.length &&
                    (this.state.completed[this.state.activeStep] ? (
                      <InlineBlock>
                        <Typography variant="caption">
                          Step {activeStep + 1} already completed
                        </Typography></InlineBlock>
                    ) : (
                      <StyledRaisedButton
                        onClick={this.handleComplete}
                        marginRight={8}
                      >
                        {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                      </StyledRaisedButton>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </PageContent>
      </Page>
    );
  }
}

SmartContextInitializerPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  smartcontextinitializerpage: makeSelectSmartContextInitializerPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'smartContextInitializerPage', reducer });
const withSaga = injectSaga({ key: 'smartContextInitializerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SmartContextInitializerPage);
