import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedMessage } from 'react-intl';
import { Form } from 'formik';
import { GoBackButton } from 'components/GoBackButton';
import FormSubtitle from 'components/FormSubtitle';
import StyledRaisedButton from 'components/StyledRaisedButton';
import DatePicker from 'components/DatePicker';
import Checkbox from 'components/Checkbox';
import { RadioButton } from 'material-ui';
import ManageConsentFormGrid from './ManageConsentFormGrid';
import messages from './messages';

function ManageConsentForm(props) {
  const datePickerLandscapeMode = 'landscape';
  const {
    patient,
    isSubmitting,
    dirty,
    isValid,
  } = props;
  const today = new Date();

  function getPatientName(selectedPatient) {
    let patientName = '';
    if (selectedPatient && selectedPatient.name && selectedPatient.name.length > 0) {
      const name = selectedPatient.name[0];
      patientName = (name && name.firstName && name.lastName) ? name.firstName.concat(' ').concat(name.lastName) : '';
    }
    return patientName;
  }

  return (
    <Form>
      <ManageConsentFormGrid gap="1vw">
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="3vh 0 1vh 0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="patientName">
          {patient &&
          <span>`I,{getPatientName(patient)},here by authorize`</span>
        }
        </Cell>
        <Cell area="careTeamGroup">
          <FormSubtitle margin="3vh 0 1vh 0">
            <FormattedMessage {...messages.floatingLabelText.selectCareTeams} />
          </FormSubtitle>
          <Checkbox
            fullWidth
            name="consentType"
            hintText={<FormattedMessage {...messages.hintText.consentType} />}
            label={<FormattedMessage {...messages.floatingLabelText.consentType} />}
          />
        </Cell>
        <Cell area="medicalInfoGroup">
          <FormSubtitle margin="3vh 0 1vh 0">
            <FormattedMessage {...messages.floatingLabelText.medicalInformation} />
          </FormSubtitle>
          <span>
          </span>
          <span>
            {<FormattedMessage {...messages.floatingLabelText.medInfoTitle} />}
          </span>

          <span>
          </span>

          <RadioButton
            fullWidth
            name="shareAll"
            hintText={<FormattedMessage {...messages.hintText.shareAll} />}
            label={<FormattedMessage {...messages.floatingLabelText.shareAll} />}
          />
        </Cell>
        <Cell area="purposeOfUseGroup">
          <FormSubtitle margin="3vh 0 1vh 0">
            <FormattedMessage {...messages.floatingLabelText.purposeOfUseInformation} />
          </FormSubtitle>
          <span>
          </span>
          <span>
            {<FormattedMessage {...messages.floatingLabelText.purposeOfUseTitle} />}
          </span>

          <span>
          </span>

          <RadioButton
            fullWidth
            name="shareAll"
            hintText={<FormattedMessage {...messages.hintText.purposeOfUseSubTitle} />}
            label={<FormattedMessage {...messages.floatingLabelText.purposeOfUseSubTitle} />}
          />
        </Cell>
        <Cell area="consentTermGroup">
          <FormSubtitle margin="3vh 0 1vh 0">
            <FormattedMessage {...messages.floatingLabelText.consentTermInformation} />
          </FormSubtitle>
          <span>
          </span>
          <span>
            {<FormattedMessage {...messages.floatingLabelText.consentTermTitle} />}
          </span>

          <span>
          </span>

          <DatePicker
            fullWidth
            name="consentStart"
            mode={datePickerLandscapeMode}
            minDate={today}
            hintText={<FormattedMessage {...messages.hintText.consentStart} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.consentStart} />}
          />
          <DatePicker
            fullWidth
            name="consentEnd"
            minDate={today}
            mode={datePickerLandscapeMode}
            hintText={<FormattedMessage {...messages.hintText.consentEnd} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.consentEnd} />}
          />
        </Cell>
        <Cell area="buttonGroup">
          <Grid columns={2}>
            <Cell>
              <StyledRaisedButton
                fullWidth
                type="submit"
                label="Save"
                disabled={!dirty || isSubmitting || !isValid}
              />
            </Cell>
            <Cell>
              <GoBackButton disabled={isSubmitting} />
            </Cell>
          </Grid>
        </Cell>
      </ManageConsentFormGrid>
    </Form>
  );
}

ManageConsentForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  patient: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.array.isRequired,
  }),
};

export default ManageConsentForm;
