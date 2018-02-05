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
import { HOME_URL } from '../../containers/App/constants';

function ManagePractitionerForm(props) {
  const { isSubmitting, dirty, isValid, uspsStates, identifierSystems, telecomSystems, practitionerRoles } = props;
  return (
    <div>
      <div className={styles.title}>
        <FormattedMessage {...messages.title} />
      </div>
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
          <div className={`${styles.gridItem} ${styles.middleName}`}>
            <TextField
              fullWidth
              name="middleName"
              hintText={<FormattedMessage {...messages.hintText.middleName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.middleName} />}
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
          <div className={`${styles.gridItem} ${styles.roleType}`}>
            <SelectField
              fullWidth
              name="roleType"
              hintText={<FormattedMessage {...messages.hintText.roleType} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.roleType} />}
            >
              {practitionerRoles && practitionerRoles.map((roleType) =>
                <MenuItem key={roleType.code} value={roleType.code} primaryText={roleType.display} />,
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
              {identifierSystems && identifierSystems.map((identifierType) =>
                <MenuItem key={identifierType.uri} value={identifierType.uri} primaryText={identifierType.display} />,
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
          <div />
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
            />
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
              containerElement={<Link to={HOME_URL} />}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}

ManagePractitionerForm.propTypes = {
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  uspsStates: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  identifierSystems: PropTypes.arrayOf(PropTypes.shape({
    uri: PropTypes.string.isRequired,
    oid: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  practitionerRoles: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
};

export default ManagePractitionerForm;
