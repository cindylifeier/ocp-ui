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

function ManagePatientForm(props) {
  const { isSubmitting, dirty, isValid, uspsStates, patientIdentifierSystems, administrativeGenders, usCoreRaces, usCoreEthnicities, usCoreBirthSexes, languages, telecomSystems } = props;
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
              name="birthDate"
              maxDate={new Date()}
              hintText={<FormattedMessage {...messages.hintText.dob} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.dob} />}
            />
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="genderCode"
              hintText={<FormattedMessage {...messages.hintText.gender} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.gender} />}
            >
              {administrativeGenders && administrativeGenders.map((genderType) =>
                <MenuItem key={genderType.code} value={genderType.code} primaryText={genderType.display} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="identifierType"
              hintText={<FormattedMessage {...messages.hintText.identifierType} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierType} />}
            >
              {patientIdentifierSystems && patientIdentifierSystems.reverse().map((identifierType) =>
                <MenuItem key={identifierType.oid} value={identifierType.oid} primaryText={identifierType.display} />,
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
              {languages && languages.map((languageType) =>
                <MenuItem key={languageType.code} value={languageType.code} primaryText={languageType.display} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="race"
              hintText={<FormattedMessage {...messages.hintText.race} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.race} />}
            >
              {usCoreRaces && usCoreRaces.map((raceType) =>
                <MenuItem key={raceType.code} value={raceType.code} primaryText={raceType.display} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="ethnicity"
              hintText={<FormattedMessage {...messages.hintText.ethnicity} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.ethnicity} />}
            >
              {usCoreEthnicities && usCoreEthnicities.map((ethnicityType) =>
                <MenuItem key={ethnicityType.code} value={ethnicityType.code} primaryText={ethnicityType.display} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="birthSex"
              hintText={<FormattedMessage {...messages.hintText.birthSex} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.birthSex} />}
            >
              {usCoreBirthSexes && usCoreBirthSexes.map((birthsexType) =>
                <MenuItem key={birthsexType.code} value={birthsexType.code} primaryText={birthsexType.display} />,
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
              {uspsStates && uspsStates.map((uspsState) =>
                <MenuItem key={uspsState.code} value={uspsState.code} primaryText={uspsState.display} />,
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
            <TextField
              name="country"
              hintText={<FormattedMessage {...messages.hintText.country} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.country} />}
            >
            </TextField>
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="telecomType"
              hintText={<FormattedMessage {...messages.hintText.telecomType} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.telecomType} />}
            >
              {telecomSystems && telecomSystems.map((telecomType) =>
                <MenuItem key={telecomType.code} value={telecomType.code} primaryText={telecomType.display} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <TextField
              name="telecomValue"
              hintText={<FormattedMessage {...messages.hintText.telecomValue} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.telecomValue} />}
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
  })),
};

export default ManagePatientForm;
