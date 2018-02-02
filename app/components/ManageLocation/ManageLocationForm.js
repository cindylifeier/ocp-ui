import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import { teal500, white } from 'material-ui/styles/colors';
import uniqueId from 'lodash/uniqueId';
import styles from './styles.css';
import messages from './messages';

import TextField from '../TextField';
import SelectField from '../SelectField';
import { HOME_URL } from '../../containers/App/constants';


// Material UI Styles
const floatingLabelStyle = { fontFamily: 'Roboto, sans-serif' };

export const SEARCH_BY_NAME = 'name';
export const SEARCH_BY_ID = 'logicalId';

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
  return (
    <div>
      <div className={styles.title}>
        <FormattedMessage {...messages.mainLabel} />
      </div>
      <Form>
        <div className={styles.organizationName}>
          <div>
            {<FormattedMessage {...messages.organizationNameLabel} />}
          </div>
          <div>
            <strong>{organization.name}</strong>
          </div>
        </div>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.name}`}>
            <TextField
              name="name"
              fullWidth
              floatingLabelStyle={floatingLabelStyle}
              hintText={<FormattedMessage {...messages.locationNameHintText} />}
              floatingLabelText={<FormattedMessage {...messages.locationNameFloatingLabelText} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.status}`}>
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
          </div>
          <div className={`${styles.gridItem} ${styles.locationGroup}`}>
            <SelectField
              name="physicalType"
              fullWidth
              floatingLabelText={<FormattedMessage {...messages.locationPhysicalType} />}
            >
              {locationPhysicalTypes && locationPhysicalTypes.map((locationType) => (
                <MenuItem key={uniqueId()} value={locationType.display} primaryText={locationType.display} />
              ))}
            </SelectField>
            <TextField
              fullWidth
              name="managingLocationLogicalId"
              floatingLabelStyle={floatingLabelStyle}
              hintText={<FormattedMessage {...messages.locationPartOfHintText} />}
              floatingLabelText={<FormattedMessage {...messages.managingLocationLogicalIdFloatingLabelText} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.identifierGroup}`}>
            <SelectField
              fullWidth
              name="identifierSystem"
              floatingLabelText={<FormattedMessage {...messages.identifierSystemTypeFloatingLabelText} />}
            >
              {identifierSystems && identifierSystems.map((identifierSystem) => (
                <MenuItem key={uniqueId()} value={identifierSystem.display} primaryText={identifierSystem.display} />
              ))}
            </SelectField>
            <TextField
              name="identifierValue"
              fullWidth
              floatingLabelStyle={floatingLabelStyle}
              hintText={<FormattedMessage {...messages.identifierValueHintText} />}
              floatingLabelText={<FormattedMessage {...messages.identifierVlueFloatingLabelText} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.contactGroup}`}>
            <SelectField
              name="telecomSystem"
              fullWidth
              floatingLabelText={<FormattedMessage {...messages.telecomSystemTypeFloatingLabelText} />}
            >
              {telecomSystems && telecomSystems.map((telecomSystem) => (
                <MenuItem value={telecomSystem.code} primaryText={telecomSystem.display} key={uniqueId()} />
              ))}
            </SelectField>
            <TextField
              name="telecomSystemValue"
              fullWidth
              floatingLabelStyle={floatingLabelStyle}
              hintText={<FormattedMessage {...messages.telecomSystemValueHintText} />}
              floatingLabelText={<FormattedMessage {...messages.telecomSystemValueFloatingLabelText} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.contactPurpose}`}>
            <SelectField
              name="telecomUse"
              fullWidth
              floatingLabelText={<FormattedMessage {...messages.telecomUseFloatingLabelText} />}
            >
              {telecomUses && telecomUses.map((telecomUse) => (
                <MenuItem value={telecomUse.code} primaryText={telecomUse.display} key={uniqueId()} />
              ))}
            </SelectField>
          </div>
          <div className={`${styles.gridItem} ${styles.address1}`}>
            <TextField
              name="line1"
              fullWidth
              floatingLabelStyle={floatingLabelStyle}
              hintText={<FormattedMessage {...messages.address1HintText} />}
              floatingLabelText={<FormattedMessage {...messages.address1FloatingLabelText} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.address2}`}>
            <TextField
              name="line2"
              fullWidth
              floatingLabelStyle={floatingLabelStyle}
              hintText={<FormattedMessage {...messages.address2HintText} />}
              floatingLabelText={<FormattedMessage {...messages.address2FloatingLabelText} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.city}`}>
            <TextField
              name="city"
              fullWidth
              floatingLabelStyle={floatingLabelStyle}
              hintText={<FormattedMessage {...messages.cityHintText} />}
              floatingLabelText={<FormattedMessage {...messages.cityFloatingLabelText} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.state}`}>
            <SelectField
              name="stateCode"
              fullWidth
              floatingLabelText={<FormattedMessage {...messages.statesFloatingLabelText} />}
            >
              {uspsStates && uspsStates.map((uspsState) => (
                <MenuItem key={uniqueId()} value={uspsState.code} primaryText={uspsState.display} />
              ))}
            </SelectField>
          </div>
          <div className={`${styles.gridItem} ${styles.postalCode}`}>
            <TextField
              name="postalCode"
              fullWidth
              floatingLabelStyle={floatingLabelStyle}
              hintText={<FormattedMessage {...messages.postalCodeHintText} />}
              floatingLabelText={<FormattedMessage {...messages.postalCodeFloatingLabelText} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.addressUse}`}>
            <SelectField
              fullWidth
              name="use"
              floatingLabelText={<FormattedMessage {...messages.addressUseFloatingLabelText} />}
            >
              {addressUses && addressUses.map((addressUse) => (
                <MenuItem key={uniqueId()} value={addressUse.use} primaryText={addressUse.display} />
              ))}
            </SelectField>
          </div>
          <div className={`${styles.gridItem} ${styles.buttonGroup}`}>
            <RaisedButton
              backgroundColor={teal500}
              labelColor={white}
              label="Save"
              type="submit"
              primary
              disabled={!dirty || isSubmitting || !isValid}
            />
            <FlatButton
              type="button"
              label="Cancel"
              default
              disabled={isSubmitting}
              containerElement={<Link to={HOME_URL} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.errorMessage}`}>
            {error ?
              <p className={styles.validationMessage}>{<FormattedMessage {...messages.saveLocationError} />}</p> : ''}
          </div>
        </div>
      </Form>
    </div>
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
