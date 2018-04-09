/**
 *
 * AttestConsent
 *
 */

import React from 'react';
// import styled from 'styled-components';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import uniqueId from 'lodash/uniqueId';

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
    this.checkPassword = this.checkPassword.bind(this);
  }

  handleCheckPassword() {
    this.setState({ authenticationDialogOpen: true });
  }

  handleDialogCallback() {
    this.setState({ authenticationDialogOpen: false });
  }

  checkPassword(password) {
    this.props.checkPassword(password);
    if (this.props.isAuthenticated) {
      this.setState({ authenticationDialogOpen: false });
    }
  }

  render() {
    const { onSubmit, consent, isAuthenticated, patient } = this.props;
    const patientName = consent && consent.patient && consent.patient.display;
    return (
      <div>
        <Dialog
          open={!isAuthenticated && this.state.authenticationDialogOpen}
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
                  <strong>{consent && consent.patient && consent.patient.display}</strong>
                </Cell>
                <Cell area="patientDob">
                  <FormattedMessage {...messages.label.patientDob} />
                  <strong>{patient && patient.birthDate}</strong>
                </Cell>
                <Cell area="authorization">
                  <FormSubtitle margin="3vh 0 1vh 0">
                    <FormattedMessage {...messages.subtitle.authorization} />
                  </FormSubtitle>
                  <FormattedMessage {...messages.label.authorizes} />
                  <strong> {consent && consent.fromActor && consent.fromActor.map(({ display }) =>
                    (
                      <div key={uniqueId()}>
                        {display}
                      </div>
                    ),
                  )}
                  </strong>
                </Cell>
                <Cell area="disclose">
                  <FormattedMessage {...messages.label.discloses} />
                  <strong>{consent && consent.toActor && consent.toActor.map(({ display }) =>
                    (
                      <div key={uniqueId()}>
                        {display}
                      </div>
                    ),
                  )}
                  </strong>
                </Cell>
                <Cell area="healthInfo">
                  <FormSubtitle margin="3vh 0 1vh 0">
                    <FormattedMessage {...messages.subtitle.healthInfo} />
                  </FormSubtitle>
                  <FormattedMessage {...messages.label.purposes} />
                  <strong>{consent && consent.purpose && consent.purpose.map(({ display }) =>
                    (
                      <div key={uniqueId()}>
                        {display}
                      </div>
                    ),
                  )}
                  </strong>
                </Cell>
                <Cell area="consentTerm">
                  <FormSubtitle margin="3vh 0 1vh 0">
                    <FormattedMessage {...messages.subtitle.consentTerm} />
                  </FormSubtitle>
                  <FormattedHTMLMessage {...messages.attestTerm} values={{ patientName }} />
                </Cell>
                <Cell area="start">
                  <FormattedMessage {...messages.label.effectiveDate} /><strong>{consent && consent.period && consent.period.start}</strong>
                </Cell>
                <Cell area="end">
                  <FormattedMessage {...messages.label.expirationDate} /><strong>{consent && consent.period && consent.period.end}</strong>
                </Cell>
                <Cell area="agreement">
                  <Checkbox
                    name="agreement"
                    checked={isAuthenticated}
                    label={<FormattedHTMLMessage {...messages.agreementTerm} values={{ patientName }} />}
                    onCheck={this.handleCheckPassword}
                  />
                </Cell>
                <Cell area="buttonGroup">
                  <Grid columns={2}>
                    <Cell>
                      <StyledRaisedButton
                        type="submit"
                        label="Complete"
                        disabled={!isAuthenticated}
                      />
                    </Cell>
                    <Cell>
                      <GoBackButton disabled={isSubmitting} />
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
  checkPassword: PropTypes.func.isRequired,
  consent: PropTypes.object,
  patient: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

export default AttestConsent;
