import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import StyledRaisedButton from 'components/StyledRaisedButton';
import ErrorText from 'components/ErrorText';
import GoBackButton from 'components/GoBackButton';
import FormSubtitle from 'components/FormSubtitle';
import FieldGroupGrid from 'components/FieldGroupGrid';
import PrefixCell from 'components/FieldGroupGrid/PrefixCell';
import MainCell from 'components/FieldGroupGrid/MainCell';
import AddMultipleTelecoms from 'components/AddMultipleTelecoms';
import AddMultipleAddresses from 'components/AddMultipleAddresses';
import uniqueId from 'lodash/uniqueId';
import AddFlags from 'components/AddFlags';
import InfoSection from 'components/InfoSection';
import InlineLabel from 'components/InlineLabel';
import AddEpisodeOfCare from 'components/AddEpisodeOfCare';
import { EMAIL, PHONE } from 'components/ManagePatient/constants';
import AddCoverages from 'components/AddCoverages';
import ManagePatientFormGrid from './ManagePatientFormGrid';
import messages from './messages';


function ManagePatientForm(props) {
  const {
    isSubmitting, dirty, isValid, values, errors,
    uspsStates, patientIdentifierSystems, administrativeGenders, usCoreRaces, usCoreEthnicities, usCoreBirthSexes, languages, telecomSystems, telecomUses,
    flagStatuses, flagCategories, practitioner, practitioners, organization, episodeOfCareType,
    policyHolderRelationship, coverageFmStatus, coverageType, subscriptionOptions,
    episodeOfCareStatus, composePatientReference, patient, getPatientFullName,
  } = props;
  const addAddressesProps = {
    uspsStates,
    errors,
    addresses: values.addresses,
  };
  const addTelecomsProps = {
    telecomSystems,
    telecomUses,
    errors,
    telecoms: values.telecoms,
  };
  const addFlagsProps = {
    flagStatuses,
    flagCategories,
    errors,
    flags: values.flags,
    practitioners,
    practitioner,
    patientName: (values.firstName !== undefined && values.lastName !== undefined) ? `${values.firstName} ${values.lastName}` : null,
  };

  const addEpisodeOfCareProps = {
    episodeOfCares: values.episodeOfCares,
    episodeOfCareStatus,
    episodeOfCareType,
    errors,
    practitioner,
    practitioners,
    patientName: (values.firstName !== undefined && values.lastName !== undefined) ? `${values.firstName} ${values.lastName}` : null,
  };

  const addCoverageProps = {
    coverages: values.coverages,
    errors,
    patient,
    practitioners,
    policyHolderRelationship,
    coverageFmStatus,
    coverageType,
    subscriptionOptions,
    getPatientFullName,
    composePatientReference,
    patientName: (values.firstName !== undefined && values.lastName !== undefined) ? `${values.firstName} ${values.lastName}` : null,
  };

  const ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');

  function hasEmailContact() {
    const emailContacts = values && values.telecoms && values.telecoms.filter((entry) => entry.system === EMAIL);
    return emailContacts && emailContacts.length > 0;
  }

  function hasPhoneContact() {
    const phoneContacts = values && values.telecoms && values.telecoms.filter((entry) => entry.system === PHONE);
    return phoneContacts && phoneContacts.length > 0;
  }
  function hasEpisodeOfCare() {
    return values && values.episodeOfCares && values.episodeOfCares.length > 0;
  }
  function hasAddress() {
    return values && values.addresses && values.addresses.length > 0;
  }

  return (
    <Form>
      <ManagePatientFormGrid>
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="contextGroup">
          <Grid columns={4} gap="30px">
            <InfoSection margin="4vh 0 0 0">
              <InlineLabel htmlFor={ORGANIZATION_NAME_HTML_ID}><FormattedMessage {...messages.floatingLabelText.organization} />&nbsp;
              </InlineLabel>
              <span id={ORGANIZATION_NAME_HTML_ID}>{organization && organization.name}</span>
            </InfoSection>
          </Grid>
        </Cell>
        <Cell area="firstName">
          <TextField
            fullWidth
            name="firstName"
            hintText={<FormattedMessage {...messages.hintText.firstName} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.firstName} />}
          />
        </Cell>
        <Cell area="lastName">
          <TextField
            fullWidth
            name="lastName"
            hintText={<FormattedMessage {...messages.hintText.lastName} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastName} />}
          />
        </Cell>
        <Cell area="birthDate">
          <DatePicker
            fullWidth
            name="birthDate"
            maxDate={new Date()}
            hintText={<FormattedMessage {...messages.hintText.dob} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.dob} />}
          />
        </Cell>
        <Cell area="genderCode">
          <SelectField
            fullWidth
            name="genderCode"
            hintText={<FormattedMessage {...messages.hintText.gender} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.gender} />}
          >
            {administrativeGenders && administrativeGenders.map((genderType) =>
              <MenuItem key={genderType.code} value={genderType.code} primaryText={genderType.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="identifierGroup">
          <FieldGroupGrid>
            <PrefixCell>
              <SelectField
                fullWidth
                name="identifierType"
                hintText={<FormattedMessage {...messages.hintText.identifierType} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierType} />}
              >
                {patientIdentifierSystems && patientIdentifierSystems.reverse().map((identifierType) =>
                  <MenuItem key={identifierType.oid} value={identifierType.uri} primaryText={identifierType.display} />,
                )}
              </SelectField>
            </PrefixCell>
            <MainCell>
              <TextField
                fullWidth
                name="identifierValue"
                hintText={<FormattedMessage {...messages.hintText.identifierValue} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierValue} />}
              />
            </MainCell>
          </FieldGroupGrid>
        </Cell>
        <Cell area="language">
          <SelectField
            fullWidth
            name="language"
            hintText={<FormattedMessage {...messages.hintText.language} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.language} />}
          >
            {languages && languages.map((languageType) =>
              <MenuItem key={languageType.code} value={languageType.code} primaryText={languageType.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="race">
          <SelectField
            fullWidth
            name="race"
            hintText={<FormattedMessage {...messages.hintText.race} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.race} />}
          >
            {usCoreRaces && usCoreRaces.map((raceType) =>
              <MenuItem key={raceType.code} value={raceType.code} primaryText={raceType.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="ethnicity">
          <SelectField
            fullWidth
            name="ethnicity"
            hintText={<FormattedMessage {...messages.hintText.ethnicity} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.ethnicity} />}
          >
            {usCoreEthnicities && usCoreEthnicities.map((ethnicityType) =>
              <MenuItem key={ethnicityType.code} value={ethnicityType.code} primaryText={ethnicityType.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="birthSex">
          <SelectField
            fullWidth
            name="birthSex"
            hintText={<FormattedMessage {...messages.hintText.birthSex} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.birthSex} />}
          >
            {usCoreBirthSexes && usCoreBirthSexes.map((birthsexType) =>
              <MenuItem key={birthsexType.code} value={birthsexType.code} primaryText={birthsexType.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="addresses">
          <AddMultipleAddresses{...addAddressesProps} />
          { hasAddress() ? '' :
          <ErrorText>
            <FormattedMessage {...messages.validation.addressRequired} />
          </ErrorText>
          }
        </Cell>
        <Cell area="contacts">
          <AddMultipleTelecoms {...addTelecomsProps} />
          { hasEmailContact() ? '' :
          <ErrorText>
            <FormattedMessage {...messages.validation.emailContact} /><br />
          </ErrorText>
          }
          { hasPhoneContact() ? '' :
          <ErrorText>
            <FormattedMessage {...messages.validation.phoneContact} />
          </ErrorText>
          }
        </Cell>
        <Cell area="flags">
          <AddFlags {...addFlagsProps} />
        </Cell>
        <Cell area="episodeOfCares">
          <AddEpisodeOfCare {...addEpisodeOfCareProps} />
          { hasEpisodeOfCare() ? '' :
          <ErrorText>
            <FormattedMessage {...messages.validation.noEpisodeOfCares} />
          </ErrorText>
          }
        </Cell>
        {patient &&
          <Cell area="coverages">
            <AddCoverages {...addCoverageProps} />
          </Cell>
        }
        <Cell area="buttonGroup">
          <Grid columns={2}>
            <Cell>
              <StyledRaisedButton
                fullWidth
                type="submit"
                disabled={!dirty || isSubmitting || !isValid || !hasEmailContact() || !hasEpisodeOfCare() || !hasPhoneContact()}
              >
                Save
              </StyledRaisedButton>
            </Cell>
            <Cell>
              <GoBackButton disabled={isSubmitting} />
            </Cell>
          </Grid>
        </Cell>
      </ManagePatientFormGrid>
    </Form>
  );
}

ManagePatientForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  values: PropTypes.object,
  errors: PropTypes.object,
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  patientIdentifierSystems: PropTypes.arrayOf(PropTypes.shape({
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  administrativeGenders: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  usCoreRaces: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  usCoreEthnicities: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  usCoreBirthSexes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  languages: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })).isRequired,
  flagStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  flagCategories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  practitioner: PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }),
  practitioners: PropTypes.arrayOf(PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  })),
  organization: PropTypes.object,
  episodeOfCareType: PropTypes.array,
  episodeOfCareStatus: PropTypes.array,
  policyHolderRelationship: PropTypes.array,
  coverageFmStatus: PropTypes.array,
  coverageType: PropTypes.array,
  subscriptionOptions: PropTypes.array,
  composePatientReference: PropTypes.func,
  getPatientFullName: PropTypes.func,
  patient: PropTypes.object,
};

export default ManagePatientForm;
