/**
 *
 * AttestConsent
 *
 */

import React from 'react';
// import styled from 'styled-components';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';

import FormSubtitle from 'components/FormSubtitle';
import Checkbox from 'components/Checkbox';
import H2 from 'components/H2';
import StyledRaisedButton from 'components/StyledRaisedButton';
import GoBackButton from 'components/GoBackButton';
import CheckPassword from './CheckPassword';
import messages from './messages';
import AttestConsentGrid from './AttestConsentGrid';

class AttestConsent extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      authenticationDialogOpen: false,
    };
    this.handleCheckPassword = this.handleCheckPassword.bind(this);
    this.handleDialogCallback = this.handleDialogCallback.bind(this);
  }

  handleCheckPassword() {
    this.setState({ authenticationDialogOpen: true });
  }

  checkPassword(values) {
    console.log(values.password);
  }

  handleDialogCallback() {
    this.setState({ authenticationDialogOpen: false });
  }

  render() {
    const { onSubmit } = this.props;
    return (
      <div>
        <Dialog
          open={this.state.authenticationDialogOpen}
        >
          <CheckPassword callback={this.handleDialogCallback} checkPassword={this.checkPassword} />
        </Dialog>
        <Formik
          onSubmit={onSubmit}
          render={({ isSubmitting }) => (
            <Form>
              <AttestConsentGrid>
                <Cell area="header">
                  <H2><FormattedMessage {...messages.header} /></H2>
                </Cell>
                <Cell area="patientName">
                  <FormattedMessage {...messages.label.patientName} />
                  patient name
                </Cell>
                <Cell area="patientDob">
                  <FormattedMessage {...messages.label.patientDob} />
                  patient dob
                </Cell>
                <Cell area="authorization">
                  <FormSubtitle margin="3vh 0 1vh 0">
                    <FormattedMessage {...messages.subtitle.authorization} />
                  </FormSubtitle>
                </Cell>
                <Cell area="healthInfo">
                  <FormSubtitle margin="3vh 0 1vh 0">
                    <FormattedMessage {...messages.subtitle.healthInfo} />
                  </FormSubtitle>
                </Cell>
                <Cell area="consentTerm">
                  <FormSubtitle margin="3vh 0 1vh 0">
                    <FormattedMessage {...messages.subtitle.consentTerm} />
                  </FormSubtitle>
                  <FormattedMessage {...messages.attestTerm} />
                </Cell>
                <Cell area="agreement">
                  <Checkbox
                    fullWidth
                    name="agreement"
                    label={<FormattedMessage {...messages.agreementTerm} />}
                    onCheck={this.handleCheckPassword}
                  />
                </Cell>
                <Cell area="buttonGroup">
                  <Grid columns={2}>
                    <Cell>
                      <StyledRaisedButton
                        fullWidth
                        type="submit"
                        label="Complete"
                        disabled={!this.isAuthenticated}
                      />
                    </Cell>
                    <Cell>
                      <GoBackButton disabled={!isSubmitting} />
                    </Cell>
                  </Grid>
                </Cell>
              </AttestConsentGrid>
            </Form>
          )}
        />
      </div>
    );
  }
}

AttestConsent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default AttestConsent;
