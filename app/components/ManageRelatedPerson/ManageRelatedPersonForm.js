import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import { Cell, Grid } from 'styled-css-grid';
import uniqueId from 'lodash/uniqueId';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import Checkbox from 'components/Checkbox';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import InlineLabel from 'components/InlineLabel';
import FormSubtitle from 'components/FormSubtitle';
import FieldGroupGrid from 'components/FieldGroupGrid';
import PrefixCell from 'components/FieldGroupGrid/PrefixCell';
import MainCell from 'components/FieldGroupGrid/MainCell';
import SuffixCell from 'components/FieldGroupGrid/SuffixCell';
import { DATE_PICKER_MODE } from 'containers/App/constants';
import { mapToPatientName } from 'utils/PatientUtils';
import messages from './messages';
import ManageRelatedPersonFormGrid from './ManageRelatedPersonFormGrid';

function ManageRelatedPersonForm(props) {
  const today = new Date();
  const {
    isSubmitting,
    dirty,
    isValid,
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    telecomUses,
    telecomSystems,
    relationshipTypes,
    selectedPatient,
  } = props;
  const PATIENT_NAME_HTML_ID = uniqueId('patient_name_');
  return (
    <Form>
      <ManageRelatedPersonFormGrid>
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="0">
            <FormattedMessage {...messages.title} />
          </FormSubtitle>
        </Cell>
        <Cell area="patientName">
          <InlineLabel htmlFor={PATIENT_NAME_HTML_ID}>
            <FormattedMessage {...messages.patientLabel} />&nbsp;
          </InlineLabel>
          <span id={PATIENT_NAME_HTML_ID}>{mapToPatientName(selectedPatient)}</span>
        </Cell>
        <Cell area="active">
          <Checkbox
            name="active"
            label={<FormattedMessage {...messages.active} />}
          >
          </Checkbox>
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
        <Cell area="relationshipCode">
          <SelectField
            fullWidth
            name="relationshipCode"
            hintText={<FormattedMessage {...messages.hintText.identifierType} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.relationshipType} />}
          >
            {relationshipTypes && relationshipTypes.reverse().map((relationshipType) => (
              <MenuItem
                key={relationshipType.code}
                value={relationshipType.code}
                primaryText={relationshipType.display}
              />),
            )}
          </SelectField>
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
        <Cell area="startDate">
          <DatePicker
            fullWidth
            name="startDate"
            minDate={today}
            mode={DATE_PICKER_MODE.LANDSCAPE}
            hintText={<FormattedMessage {...messages.hintText.startDate} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
          />
        </Cell>
        <Cell area="endDate">
          <DatePicker
            fullWidth
            name="endDate"
            minDate={today}
            mode={DATE_PICKER_MODE.LANDSCAPE}
            hintText={<FormattedMessage {...messages.hintText.endDate} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
          />
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
                  <MenuItem key={identifierType.oid} value={identifierType.oid} primaryText={identifierType.display} />,
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
        <Cell area="address1">
          <TextField
            fullWidth
            name="address1"
            hintText={<FormattedMessage {...messages.hintText.address1} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.address1} />}
          />
        </Cell>
        <Cell area="address2">
          <TextField
            fullWidth
            name="address2"
            hintText={<FormattedMessage {...messages.hintText.address2} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.address2} />}
          />
        </Cell>
        <Cell area="city">
          <TextField
            fullWidth
            name="city"
            hintText={<FormattedMessage {...messages.hintText.city} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.city} />}
          />
        </Cell>
        <Cell area="state">
          <SelectField
            fullWidth
            name="state"
            hintText={<FormattedMessage {...messages.hintText.state} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.state} />}
          >
            {uspsStates && uspsStates.map((uspsState) =>
              <MenuItem key={uspsState.code} value={uspsState.code} primaryText={uspsState.display} />,
            )}
          </SelectField>
        </Cell>
        <Cell area="zip">
          <TextField
            fullWidth
            name="zip"
            hintText={<FormattedMessage {...messages.hintText.zip} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.zip} />}
          />
        </Cell>
        <Cell area="country">
          <TextField
            fullWidth
            name="country"
            hintText={<FormattedMessage {...messages.hintText.country} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.country} />}
          >
          </TextField>
        </Cell>
        <Cell area="contactGroup">
          <FieldGroupGrid withSuffix>
            <PrefixCell>
              <SelectField
                fullWidth
                name="telecomCode"
                hintText={<FormattedMessage {...messages.hintText.telecomType} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.telecomType} />}
              >
                {telecomSystems && telecomSystems.map((telecomType) =>
                  <MenuItem key={telecomType.code} value={telecomType.code} primaryText={telecomType.display} />,
                )}
              </SelectField>
            </PrefixCell>
            <MainCell>
              <TextField
                fullWidth
                name="telecomValue"
                hintText={<FormattedMessage {...messages.hintText.telecomValue} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.telecomValue} />}
              />
            </MainCell>
            <SuffixCell>
              <SelectField
                fullWidth
                name="telecomUse"
                hintText={<FormattedMessage {...messages.hintText.telecomUse} />}
                floatingLabelText={<FormattedMessage {...messages.floatingLabelText.telecomUse} />}
              >
                {telecomUses && telecomUses.map((telecomUse) =>
                  <MenuItem key={telecomUse.code} value={telecomUse.code} primaryText={telecomUse.display} />,
                )}
              </SelectField>
            </SuffixCell>
          </FieldGroupGrid>
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
              <StyledFlatButton
                fullWidth
                label="Cancel"
                default
                disabled={isSubmitting}
                containerElement={<Link to="/ocp-ui/patients" />}
              />
            </Cell>
          </Grid>
        </Cell>
      </ManageRelatedPersonFormGrid>
    </Form>
  );
}

ManageRelatedPersonForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
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
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  relationshipTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  selectedPatient: PropTypes.object,
};

export default ManageRelatedPersonForm;
