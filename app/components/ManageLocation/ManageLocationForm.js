import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import uniqueId from 'lodash/uniqueId';
import { Cell, Grid } from 'styled-css-grid';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import FormSubtitle from 'components/FormSubtitle';
import InlineLabel from 'components/InlineLabel';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import ErrorText from 'components/ErrorText';
import { HOME_URL } from 'containers/App/constants';
import messages from './messages';
import ManageLocationFormGrid from './ManageLocationFormGrid';
import LocationGroupGrid from './LocationGroupGrid';
import IdentifierGroupGrid from './IdentifierGroupGrid';
import ContactGroupGrid from './ContactGroupGrid';

function ManageLocationForm(props) {
  const {
    error,
    dirty,
    isValid,
    uspsStates,
    locationPhysicalTypes,
    addressUses,
    locationStatuses,
    identifierSystems,
    telecomSystems,
    telecomUses,
    isSubmitting,
    organization,
    location,
  } = props;
  const ORGANIZATION_NAME_HTML_ID = uniqueId('organization_name_');
  return (
    <Form>
      <ManageLocationFormGrid gap="1vw">
        <Cell area="generalInformationSubtitle">
          <FormSubtitle margin="3vh 0 1vh 0">
            <FormattedMessage {...messages.mainLabel} />
          </FormSubtitle>
        </Cell>
        <Cell area="organizationName">
          <InlineLabel htmlFor={ORGANIZATION_NAME_HTML_ID}>
            <FormattedMessage {...messages.organizationNameLabel} />&nbsp;
          </InlineLabel>
          <span id={ORGANIZATION_NAME_HTML_ID}>{organization.name}</span>
        </Cell>
        <Cell area="name">
          <TextField
            name="name"
            fullWidth
            hintText={<FormattedMessage {...messages.locationNameHintText} />}
            floatingLabelText={<FormattedMessage {...messages.locationNameFloatingLabelText} />}
          />
        </Cell>
        <Cell area="status">
          {(location && location.logicalId &&
            <SelectField
              name="status"
              fullWidth
              floatingLabelText={<FormattedMessage {...messages.statusFloatingLabelText} />}
            >
              {locationStatuses && locationStatuses.map((locationStatuse) => (
                <MenuItem key={uniqueId()} value={locationStatuse.code} primaryText={locationStatuse.display} />
              ))}
            </SelectField>
          )}
        </Cell>
        <Cell area="locationGroup">
          <LocationGroupGrid gap="">
            <Cell area="physicalType">
              <SelectField
                name="physicalType"
                fullWidth
                floatingLabelText={<FormattedMessage {...messages.locationPhysicalType} />}
              >
                {locationPhysicalTypes && locationPhysicalTypes.map((locationType) => (
                  <MenuItem key={uniqueId()} value={locationType.display} primaryText={locationType.display} />
                ))}
              </SelectField>
            </Cell>
            <Cell area="managingLocationLogicalId">
              <TextField
                fullWidth
                name="managingLocationLogicalId"
                hintText={<FormattedMessage {...messages.locationPartOfHintText} />}
                floatingLabelText={<FormattedMessage {...messages.managingLocationLogicalIdFloatingLabelText} />}
              />
            </Cell>
          </LocationGroupGrid>
        </Cell>
        <Cell area="identifierGroup">
          <IdentifierGroupGrid gap="">
            <Cell area="identifierSystem">
              <SelectField
                fullWidth
                name="identifierSystem"
                floatingLabelText={<FormattedMessage {...messages.identifierSystemTypeFloatingLabelText} />}
              >
                {identifierSystems && identifierSystems.map((identifierSystem) => (
                  <MenuItem key={uniqueId()} value={identifierSystem.display} primaryText={identifierSystem.display} />
                ))}
              </SelectField>
            </Cell>
            <Cell area="identifierValue">
              <TextField
                name="identifierValue"
                fullWidth
                hintText={<FormattedMessage {...messages.identifierValueHintText} />}
                floatingLabelText={<FormattedMessage {...messages.identifierVlueFloatingLabelText} />}
              />
            </Cell>
          </IdentifierGroupGrid>
        </Cell>
        <Cell area="contactGroup">
          <ContactGroupGrid gap="">
            <Cell area="telecomSystem">
              <SelectField
                name="telecomSystem"
                fullWidth
                hintText={<FormattedMessage {...messages.telecomSystemTypeHintText} />}
                floatingLabelText={<FormattedMessage {...messages.telecomSystemTypeFloatingLabelText} />}
              >
                {telecomSystems && telecomSystems.map((telecomSystem) => (
                  <MenuItem value={telecomSystem.code} primaryText={telecomSystem.display} key={uniqueId()} />
                ))}
              </SelectField>
            </Cell>
            <Cell area="telecomSystemValue">
              <TextField
                name="telecomSystemValue"
                fullWidth
                hintText={<FormattedMessage {...messages.telecomSystemValueHintText} />}
                floatingLabelText={<FormattedMessage {...messages.telecomSystemValueFloatingLabelText} />}
              />
            </Cell>
          </ContactGroupGrid>
        </Cell>
        <Cell area="contactPurpose">
          <SelectField
            name="telecomUse"
            fullWidth
            floatingLabelText={<FormattedMessage {...messages.telecomUseFloatingLabelText} />}
          >
            {telecomUses && telecomUses.map((telecomUse) => (
              <MenuItem value={telecomUse.code} primaryText={telecomUse.display} key={uniqueId()} />
            ))}
          </SelectField>
        </Cell>
        <Cell area="address1">
          <TextField
            name="line1"
            fullWidth
            hintText={<FormattedMessage {...messages.address1HintText} />}
            floatingLabelText={<FormattedMessage {...messages.address1FloatingLabelText} />}
          />
        </Cell>
        <Cell area="address2">
          <TextField
            name="line2"
            fullWidth
            hintText={<FormattedMessage {...messages.address2HintText} />}
            floatingLabelText={<FormattedMessage {...messages.address2FloatingLabelText} />}
          />
        </Cell>
        <Cell area="city">
          <TextField
            name="city"
            fullWidth
            hintText={<FormattedMessage {...messages.cityHintText} />}
            floatingLabelText={<FormattedMessage {...messages.cityFloatingLabelText} />}
          />
        </Cell>
        <Cell area="state">
          <SelectField
            name="stateCode"
            fullWidth
            floatingLabelText={<FormattedMessage {...messages.statesFloatingLabelText} />}
          >
            {uspsStates && uspsStates.map((uspsState) => (
              <MenuItem key={uniqueId()} value={uspsState.code} primaryText={uspsState.display} />
            ))}
          </SelectField>
        </Cell>
        <Cell area="postalCode">
          <TextField
            name="postalCode"
            fullWidth
            hintText={<FormattedMessage {...messages.postalCodeHintText} />}
            floatingLabelText={<FormattedMessage {...messages.postalCodeFloatingLabelText} />}
          />
        </Cell>
        <Cell area="addressUse">
          <SelectField
            fullWidth
            name="use"
            floatingLabelText={<FormattedMessage {...messages.addressUseFloatingLabelText} />}
          >
            {addressUses && addressUses.map((addressUse) => (
              <MenuItem key={uniqueId()} value={addressUse.use} primaryText={addressUse.display} />
            ))}
          </SelectField>
        </Cell>
        <Cell area="buttonGroup">
          <Grid columns={2}>
            <Cell>
              <StyledRaisedButton
                fullWidth
                label="Save"
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
              />
            </Cell>
            <Cell>
              <StyledFlatButton
                fullWidth
                type="button"
                label="Cancel"
                default
                disabled={isSubmitting}
                containerElement={<Link to={HOME_URL} />}
              />
            </Cell>
          </Grid>
        </Cell>
        <Cell area="errorMessage">
          {error ?
            <ErrorText><FormattedMessage {...messages.saveLocationError} /></ErrorText> : ''}
        </Cell>
      </ManageLocationFormGrid>
    </Form>
  );
}

ManageLocationForm.propTypes = {
  uspsStates: PropTypes.array.isRequired,
  locationPhysicalTypes: PropTypes.array.isRequired,
  locationStatuses: PropTypes.array.isRequired,
  telecomUses: PropTypes.array.isRequired,
  telecomSystems: PropTypes.array.isRequired,
  addressUses: PropTypes.array.isRequired,
  identifierSystems: PropTypes.array.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  organization: PropTypes.object.isRequired,
  location: PropTypes.object,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
};

export default ManageLocationForm;
