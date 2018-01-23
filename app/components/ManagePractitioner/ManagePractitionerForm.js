import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import messages from './messages';
import styles from './styles.css';
import TextField from '../TextField';
import SelectField from '../SelectField';

// Todo: Get from global store
const roleTypesLookup = [{ code: 'doctor', name: 'Doctor' }, { code: 'nurse', name: 'Nurse' }];
const identifierTypesLookup = [{ code: 'npi', name: 'NPI' }, { code: 'tax', name: 'Tax ID' }];
const uspsStatesLookup = [{ code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }];
const countriesLookup = [{ code: 'us', name: 'Unites States' }, { code: 'uk', name: 'United Kingdom' }];

function ManagePractitionerForm(props) {
  const { isSubmitting, dirty, isValid } = props;
  return (
    <div>
      <h4><FormattedMessage {...messages.title} /></h4>
      <Form>
        <div className={styles.gridContainer}>
          <div className={styles.gridItem}>
            <TextField
              name="firstName"
              hintText={<FormattedMessage {...messages.hintText.firstName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.firstName} />}
            />
          </div>
          <div className={styles.gridItem}>
            <TextField
              name="middleName"
              hintText={<FormattedMessage {...messages.hintText.middleName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.middleName} />}
            />
          </div>
          <div className={styles.gridItem}>
            <TextField
              name="lastName"
              hintText={<FormattedMessage {...messages.hintText.lastName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastName} />}
            />
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="roleType"
              hintText={<FormattedMessage {...messages.hintText.roleType} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.roleType} />}
            >
              {roleTypesLookup && roleTypesLookup.map((roleType) =>
                <MenuItem key={roleType.code} value={roleType.code} primaryText={roleType.name} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="identifierType"
              hintText={<FormattedMessage {...messages.hintText.identifierType} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierType} />}
            >
              {identifierTypesLookup && identifierTypesLookup.map((identifierType) =>
                <MenuItem key={identifierType.code} value={identifierType.code} primaryText={identifierType.name} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <TextField
              name="identifierValue"
              hintText={<FormattedMessage {...messages.hintText.identifierValue} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierValue} />}
            />
          </div>
          <div className={styles.gridItem}>
            <TextField
              name="address1"
              hintText={<FormattedMessage {...messages.hintText.address1} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.address1} />}
            />
          </div>
          <div className={styles.gridItem}>
            <TextField
              name="address2"
              hintText={<FormattedMessage {...messages.hintText.address2} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.address2} />}
            />
          </div>
          <div />
          <div className={styles.gridItem}>
            <TextField
              name="city"
              hintText={<FormattedMessage {...messages.hintText.city} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.city} />}
            />
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="state"
              hintText={<FormattedMessage {...messages.hintText.state} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.state} />}
            >
              {uspsStatesLookup && uspsStatesLookup.map((uspsState) =>
                <MenuItem key={uspsState.code} value={uspsState.code} primaryText={uspsState.name} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <TextField
              name="postalCode"
              hintText={<FormattedMessage {...messages.hintText.postalCode} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.postalCode} />}
            />
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="country"
              hintText={<FormattedMessage {...messages.hintText.country} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.country} />}
            >
              {countriesLookup && countriesLookup.map((country) =>
                <MenuItem key={country.code} value={country.code} primaryText={country.name} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <TextField
              name="email"
              hintText={<FormattedMessage {...messages.hintText.email} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.email} />}
            />
          </div>
          <div className={styles.gridItem}>
            <TextField
              name="phone"
              hintText={<FormattedMessage {...messages.hintText.phone} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.phone} />}
            />
          </div>
        </div>
        <RaisedButton
          type="submit"
          className={styles.saveButton}
          label="Save"
          primary
          disabled={!dirty || isSubmitting || !isValid}
        />
      </Form>
    </div>
  );
}

ManagePractitionerForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default ManagePractitionerForm;
