import React from 'react';
import PropTypes from 'prop-types';
import { Cell, Grid } from 'styled-css-grid';
import { FormattedMessage } from 'react-intl';
import { Form } from 'formik';

import { GoBackButton } from 'components/GoBackButton';
import FormSubtitle from 'components/FormSubtitle';
import InfoSection from 'components/InfoSection';
import StyledRaisedButton from 'components/StyledRaisedButton';
import DatePicker from 'components/DatePicker';
import Checkbox from 'components/Checkbox';
import SelectConsentActors from 'components/SelectConsentActors';
import SelectMedicalInformation from 'components/SelectMedicalInformation';
import ConsentFormSection from 'components/ConsentFormSection';
import PurposeOfUse from 'components/PurposeOfUse';
import ManageConsentFormGrid from './ManageConsentFormGrid';
import messages from './messages';


function ManageConsentForm(props) {
  const datePickerLandscapeMode = 'landscape';
  const {
    isSubmitting, dirty, isValid, errors, values,
    purposeOfUse,
    securityLabels,
    isCareCoordinator,
  } = props;

  const isGeneralDesignation = values.consentType;
  const today = new Date();

  const selectActorsProps = {
    errors,
    consentFromActors: values.consentFromActors,
    consentToActors: values.consentToActors,
    isCareCoordinator,
  };
  const selectMedicalInfoProps = {
    errors,
    securityLabels,
    medicalInformation: values.medicalInformation || [],
    isGeneralDesignation,
  };
  const purposeOfUseProps = {
    errors,
    purposeOfUse,
    purpose: values.purpose || [],
    isGeneralDesignation,
  };

  return (
    <Form>
      <ManageConsentFormGrid>
        <Cell area="careTeamGroup">
          <ConsentFormSection title={<FormattedMessage {...messages.selectActors} />}>
            <Checkbox
              name="consentType"
              label={<FormattedMessage {...messages.consentType} />}
            >
            </Checkbox>
            {!isGeneralDesignation &&
            <SelectConsentActors {...selectActorsProps} />
            }
          </ConsentFormSection>
        </Cell>
        <Cell area="medicalInfoGroup">
          <FormSubtitle margin="2vh 0 0 0">
            <FormattedMessage {...messages.medicalInformation} />
          </FormSubtitle>
          <SelectMedicalInformation {...selectMedicalInfoProps} />
        </Cell>
        <Cell area="purposeOfUseGroup">
          <FormSubtitle margin="2vh 0 0 0">
            <FormattedMessage {...messages.purposeOfUseInformation} />
          </FormSubtitle>
          <PurposeOfUse {...purposeOfUseProps} />
        </Cell>
        <Cell area="consentTermGroup">
          <FormSubtitle margin="2vh 0 0 0">
            <FormattedMessage {...messages.consentTermInformation} />
          </FormSubtitle>
          <InfoSection>
            <FormattedMessage {...messages.consentTermTitle} />
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
          </InfoSection>
        </Cell>
        <Cell area="buttonGroup">
          <Grid columns={2}>
            <Cell>
              <StyledRaisedButton
                fullWidth
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
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
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  errors: PropTypes.shape({
    consentType: PropTypes.any,
    consentFromActors: PropTypes.any,
    consentToActors: PropTypes.any,
    medicalInformation: PropTypes.any,
    consentStart: PropTypes.any,
    consentEnd: PropTypes.any,
  }),
  values: PropTypes.shape({
    consentType: PropTypes.bool.isRequired,
    consentFromActors: PropTypes.array,
    consentToActors: PropTypes.array,
  }),
  securityLabels: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
  purposeOfUse: PropTypes.arrayOf((PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  }))),
  isCareCoordinator: PropTypes.bool.isRequired,
};

export default ManageConsentForm;
