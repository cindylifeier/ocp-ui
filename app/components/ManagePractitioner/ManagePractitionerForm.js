import React from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import messages from './messages';
import styles from './styles.css';
import TextField from '../TextField';
import SelectField from '../SelectField';

function ManagePractitionerForm(props) {
  const { isSubmitting, dirty, isValid, uspsStates, identifierSystems, telecomSystems, practitionerRoles } = props;
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
              {practitionerRoles && practitionerRoles.map((roleType) =>
                <MenuItem key={roleType.code} value={roleType.code} primaryText={roleType.display} />,
              )}
            </SelectField>
          </div>
          <div className={styles.gridItem}>
            <SelectField
              name="identifierType"
              hintText={<FormattedMessage {...messages.hintText.identifierType} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.identifierType} />}
            >
              {identifierSystems && identifierSystems.map((identifierType) =>
                <MenuItem key={identifierType.uri} value={identifierType.uri} primaryText={identifierType.display} />,
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
            />
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
        <div className={`${styles.gridItem} ${styles.buttonGroup}`}>
          <Link to="/home">
            <RaisedButton
              label="Cancel"
              primary
              disabled={isSubmitting}
            />
          </Link>
          <RaisedButton
            type="submit"
            label="Save"
            primary
            disabled={!dirty || isSubmitting || !isValid}
          />
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
