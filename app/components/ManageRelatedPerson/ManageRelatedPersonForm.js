import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { teal500, white } from 'material-ui/styles/colors';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import messages from './messages';
import styles from './styles.css';
import TextField from '../TextField';
import SelectField from '../SelectField';
import DatePicker from '../DatePicker';
import { DATE_PICKER_MODE } from '../../containers/App/constants';
// import StatusCheckbox from '../StatusCheckbox/index';
import Checkbox from '../Checkbox/index';
import { mapToPatientName } from '../../containers/ManagePatientPage/api';

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
    selectedPatient } = props;
  return (
    <div>
      <div className={styles.title}>
        <FormattedMessage {...messages.title} />
      </div>
      <Form>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.patientName}`} >
            <strong>Patient: </strong>{mapToPatientName(selectedPatient)}
          </div>
          <div className={`${styles.gridItem} ${styles.active}`}>
            <Checkbox
              name="active"
              label={<FormattedMessage {...messages.active} />}
            >
            </Checkbox>
          </div>
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
          <div className={`${styles.gridItem} ${styles.startDate}`}>
            <DatePicker
              fullWidth
              name="startDate"
              minDate={today}
              mode={DATE_PICKER_MODE.LANDSCAPE}
              hintText={<FormattedMessage {...messages.hintText.startDate} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.startDate} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.endDate}`}>
            <DatePicker
              fullWidth
              name="endDate"
              minDate={today}
              mode={DATE_PICKER_MODE.LANDSCAPE}
              hintText={<FormattedMessage {...messages.hintText.endDate} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.endDate} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.relationshipType}`}>
            <SelectField
              fullWidth
              name="relationshipCode"
              hintText={<FormattedMessage {...messages.hintText.identifierType} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.relationshipType} />}
            >
              {relationshipTypes && relationshipTypes.reverse().map((relationshipType) =>
                <MenuItem key={relationshipType.code} value={relationshipType.code} primaryText={relationshipType.display} />,
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
              name="zip"
              hintText={<FormattedMessage {...messages.hintText.zip} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.zip} />}
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
          </div>
          <div className={`${styles.gridItem} ${styles.buttonGroup}`}>
            <RaisedButton
              fullWidth
              type="submit"
              label="Save"
              backgroundColor={teal500}
              labelColor={white}
              disabled={!dirty || isSubmitting || !isValid}
            />
            <FlatButton
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
