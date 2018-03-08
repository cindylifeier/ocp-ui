import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import DatePicker from 'components/DatePicker';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import FormSubtitle from 'components/FormSubtitle';
import messages from './messages';
import styles from './styles.css';

function ManagePatientForm(props) {
  const { isSubmitting, dirty, isValid, uspsStates, patientIdentifierSystems, administrativeGenders, usCoreRaces, usCoreEthnicities, usCoreBirthSexes, languages, telecomSystems } = props;
  return (
    <div>
      <FormSubtitle>
        <FormattedMessage {...messages.title} />
      </FormSubtitle>
      <Form>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.firstName}`}>
            <TextField
              fullWidth
              name="firstName"
              hintText={<FormattedMessage {...messages.hintText.firstName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.firstName} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.lastName}`}>
            <TextField
              fullWidth
              name="lastName"
              hintText={<FormattedMessage {...messages.hintText.lastName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.lastName} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.birthDate}`}>
            <DatePicker
              fullWidth
              name="birthDate"
              maxDate={new Date()}
              hintText={<FormattedMessage {...messages.hintText.dob} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.dob} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.genderCode}`}>
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
          </div>
          <div className={`${styles.gridItem} ${styles.identifierGroup}`}>
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
            <TextField
              fullWidth
              name="identifierValue"
              hintText={<FormattedMessage {...messages.hintText.identifierValue} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierValue} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.language}`}>
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
          </div>
          <div className={`${styles.gridItem} ${styles.race}`}>
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
          </div>
          <div className={`${styles.gridItem} ${styles.ethnicity}`}>
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
          </div>
          <div className={`${styles.gridItem} ${styles.birthSex}`}>
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
          </div>
          <div className={`${styles.gridItem} ${styles.address1}`}>
            <TextField
              fullWidth
              name="address1"
              hintText={<FormattedMessage {...messages.hintText.address1} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.address1} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.address2}`}>
            <TextField
              fullWidth
              name="address2"
              hintText={<FormattedMessage {...messages.hintText.address2} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.address2} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.city}`}>
            <TextField
              fullWidth
              name="city"
              hintText={<FormattedMessage {...messages.hintText.city} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.city} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.state}`}>
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
          </div>
          <div className={`${styles.gridItem} ${styles.postalCode}`}>
            <TextField
              fullWidth
              name="postalCode"
              hintText={<FormattedMessage {...messages.hintText.postalCode} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.postalCode} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.country}`}>
            <TextField
              fullWidth
              name="country"
              hintText={<FormattedMessage {...messages.hintText.country} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.country} />}
            >
            </TextField>
          </div>
          <div className={`${styles.gridItem} ${styles.contactGroup}`}>
            <SelectField
              fullWidth
              name="telecomType"
              hintText={<FormattedMessage {...messages.hintText.telecomType} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.telecomType} />}
            >
              {telecomSystems && telecomSystems.map((telecomType) =>
                <MenuItem key={telecomType.code} value={telecomType.code} primaryText={telecomType.display} />,
              )}
            </SelectField>
            <TextField
              fullWidth
              name="telecomValue"
              hintText={<FormattedMessage {...messages.hintText.telecomValue} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.telecomValue} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.buttonGroup}`}>
            <StyledRaisedButton
              fullWidth
              type="submit"
              label="Save"
              disabled={!dirty || isSubmitting || !isValid}
            />
            <StyledFlatButton
              fullWidth
              label="Cancel"
              default
              disabled={isSubmitting}
              containerElement={<Link to="/ocp-ui/patients" />}
            />
          </div>
        </div>
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
