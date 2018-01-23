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
import DatePicker from '../DatePicker';

// Todo: Get from global store
const gendersLookup = [{ code: 'male', name: 'male' }, { code: 'female', name: 'female' }];
const identifierTypesLookup = [{ code: 'ssn', name: 'SSN' }, { code: 'tax', name: 'Tax ID' }, { code: 'dl', name: 'Driver License' }];
const uspsStatesLookup = [{ code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }];
const countriesLookup = [{ code: 'us', name: 'Unites States' }, { code: 'uk', name: 'United Kingdom' }];
const languagesLookup = [{ code: 'en', name: 'English' }, { code: 'es', name: 'Spanish' }];
const racesLookup = [{ code: '1002-5', name: 'American Indian or Alaska Native' }, { code: '2106-3', name: 'White' }];
const ethnicitiesLookup = [{ code: '2135-2', name: 'Hispanic or Latino' }, { code: '2186-5', name: 'Non Hispanic or Latino' }];
const birthsexesLookup = [{ code: 'F', name: 'Female' }, { code: 'M', name: 'Male' }, { code: 'UNK', name: 'Unknown' }];

function ManagePatientForm(props) {
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
            <DatePicker
              name="dob"
              hintText={<FormattedMessage {...messages.hintText.dob} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.dob} />}
            />
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="gender"
              hintText={<FormattedMessage {...messages.hintText.gender} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.gender} />}
            >
              {gendersLookup && gendersLookup.map((genderType) =>
                <MenuItem key={genderType.code} value={genderType.code} primaryText={genderType.name} />,
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
            <SelectField
              name="language"
              hintText={<FormattedMessage {...messages.hintText.language} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.language} />}
            >
              {languagesLookup && languagesLookup.map((languageType) =>
                <MenuItem key={languageType.code} value={languageType.code} primaryText={languageType.name} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="race"
              hintText={<FormattedMessage {...messages.hintText.race} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.race} />}
            >
              {racesLookup && racesLookup.map((raceType) =>
                <MenuItem key={raceType.code} value={raceType.code} primaryText={raceType.name} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="ethnicity"
              hintText={<FormattedMessage {...messages.hintText.ethnicity} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.ethnicity} />}
            >
              {ethnicitiesLookup && ethnicitiesLookup.map((ethnicityType) =>
                <MenuItem key={ethnicityType.code} value={ethnicityType.code} primaryText={ethnicityType.name} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="birthsex"
              hintText={<FormattedMessage {...messages.hintText.birthsex} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.birthsex} />}
            >
              {birthsexesLookup && birthsexesLookup.map((birthsexType) =>
                <MenuItem key={birthsexType.code} value={birthsexType.code} primaryText={birthsexType.name} />,
              )}
            </SelectField>
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

ManagePatientForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
};

export default ManagePatientForm;
