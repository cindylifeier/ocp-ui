import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedMessage } from 'react-intl';
import { Form } from 'formik';
import { GoBackButton } from 'components/GoBackButton';
import FormSubtitle from 'components/FormSubtitle';
import StyledRaisedButton from 'components/StyledRaisedButton';
import DatePicker from 'components/DatePicker';
import ManageConsentFormGrid from './ManageConsentFormGrid';
import messages from './messages';

function ManageConsentForm(props) {
  const datePickerLandscapeMode = 'landscape';
  const {
    isSubmitting,
    dirty,
    isValid,
  } = props;
  const today = new Date();

  return (
    <Form>
      <ManageConsentFormGrid gap="1vw">
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="3vh 0 1vh 0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="consentStart">
          <DatePicker
            fullWidth
            name="consentStart"
            mode={datePickerLandscapeMode}
            minDate={today}
            hintText={<FormattedMessage {...messages.hintText.consentStart} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.consentStart} />}
          />
        </Cell>
        <Cell area="consentEnd">
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
};

export default ManageConsentForm;
