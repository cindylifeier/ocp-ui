import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedMessage } from 'react-intl';
import { Form } from 'formik';

import SelectConsentActors from 'containers/SelectConsentActors';
import { GoBackButton } from 'components/GoBackButton';
import FormSubtitle from 'components/FormSubtitle';
import InfoSection from 'components/InfoSection';
import StyledRaisedButton from 'components/StyledRaisedButton';
import DatePicker from 'components/DatePicker';
import Checkbox from 'components/Checkbox';
import RadioButtonGroup from 'components/RadioButtonGroup';
import { RadioButton } from 'material-ui';
import PurposeOfUse from 'components/PurposeOfUse';
import ManageConsentFormGrid from './ManageConsentFormGrid';
import messages from './messages';

function ManageConsentForm(props) {
  const datePickerLandscapeMode = 'landscape';
  const {
    isSubmitting,
    purposeOfUse,
  } = props;
  const pouProps = {
    purposeOfUse,
  };
  const today = new Date();

  return (
    <Form>
      <ManageConsentFormGrid gap="1vw">
        <Cell area="careTeamGroup">
          <FormSubtitle margin="2vh 0 0 0">
            <FormattedMessage {...messages.selectActors} />
          </FormSubtitle>
          <Checkbox
            name="consentType"
            label={<FormattedMessage {...messages.floatingLabelText.consentType} />}
          >
          </Checkbox>
          <SelectConsentActors />
        </Cell>
        <Cell area="medicalInfoGroup">
          <FormSubtitle margin="2vh 0 0 0">
            <FormattedMessage {...messages.floatingLabelText.medicalInformation} />
          </FormSubtitle>
          <InfoSection>
            {<FormattedMessage {...messages.floatingLabelText.medInfoTitle} />}
          </InfoSection>
          <RadioButtonGroup name="medInfo" defaultSelected="shareAll">
            <RadioButton
              value="shareAll"
              label={<FormattedMessage {...messages.floatingLabelText.shareAll} />}
            />
            <RadioButton
              value="shareSpecific"
              label={<FormattedMessage {...messages.floatingLabelText.shareSpecific} />}
            />
          </RadioButtonGroup>
        </Cell>
        <Cell area="purposeOfUseGroup">
          <FormSubtitle margin="2vh 0 0 0">
            <FormattedMessage {...messages.floatingLabelText.purposeOfUseInformation} />
          </FormSubtitle>
          <InfoSection>
            {<FormattedMessage {...messages.floatingLabelText.purposeOfUseTitle} />}
          </InfoSection>
          <cell area="pou">
            <PurposeOfUse {...pouProps} />
          </cell>
          <RadioButtonGroup name="pouInfo" defaultSelected="pou">
            <RadioButton
              name="pou"
              value="pou"
              disabled
              label={<FormattedMessage {...messages.floatingLabelText.purposeOfUseSubTitle} />}
            />
          </RadioButtonGroup>
        </Cell>
        <Cell area="consentTermGroup">
          <FormSubtitle margin="2vh 0 0 0">
            <FormattedMessage {...messages.floatingLabelText.consentTermInformation} />
          </FormSubtitle>
          <InfoSection>
            {<FormattedMessage {...messages.floatingLabelText.consentTermTitle} />}
          </InfoSection>
          <Grid columns={4} gap="30px">
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
          </Grid>
        </Cell>
        <Cell area="buttonGroup">
          <Grid columns={2}>
            <Cell>
              <StyledRaisedButton
                fullWidth
                type="submit"
              >
                Save
              </StyledRaisedButton>
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
  purposeOfUse: PropTypes.array,
};

export default ManageConsentForm;
