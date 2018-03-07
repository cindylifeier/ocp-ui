import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form } from 'formik';
import { FormattedMessage } from 'react-intl';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { teal500, white } from 'material-ui/styles/colors';

import TextField from 'components/TextField';
import SelectField from 'components/SelectField';
import { HOME_URL } from 'containers/App/constants';
import styles from './styles.css';
import messages from './messages';

function ManageHealthcareServiceForm(props) {
  const {
    organization,
    healthcareServiceCategories,
    healthcareServiceTypes,
    healthcareServiceSpecialities,
    healthcareServiceReferralMethods,
    healthcareServiceStatuses,
    telecomSystems,
    isSubmitting, dirty, isValid, editMode,
  } = props;
  return (
    <div>
      <div className={styles.title}>
        <FormattedMessage {...messages.title} />
      </div>
      <Form>
        <div className={styles.organizationInfoSection}>
          <div className={styles.organizationInfoLabel}>
            {<FormattedMessage {...messages.hintText.organizationNameLabel} />}
          </div>
          <div className={styles.organizationName}>
            {organization.name}
          </div>
        </div>
        <div className={styles.gridContainer}>
          <div className={`${styles.gridItem} ${styles.name}`}>
            <TextField
              fullWidth
              name="name"
              hintText={<FormattedMessage {...messages.hintText.name} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.name} />}
            />
          </div>
          <div className={`${styles.gridItem} ${styles.programName}`}>
            <TextField
              fullWidth
              name="hcsProgramName"
              hintText={<FormattedMessage {...messages.hintText.programName} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.programName} />}
            />
          </div>
          {editMode &&
          <SelectField
            fullWidth
            name="hcsStatus"
            hintText={<FormattedMessage {...messages.hintText.status} />}
            floatingLabelText={<FormattedMessage {...messages.floatingLabelText.status} />}
          >
            {healthcareServiceStatuses && healthcareServiceStatuses.map((hcsStatus) =>
              (<MenuItem key={hcsStatus.code} value={hcsStatus.code} primaryText={hcsStatus.display} />)
            )}
          </SelectField>
          }
          <div className={`${styles.gridItem} ${styles.serviceGroup}`}>
            <SelectField
              fullWidth
              name="category"
              hintText={<FormattedMessage {...messages.hintText.category} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.category} />}
            >
              {healthcareServiceCategories && healthcareServiceCategories.map((hcsCategory) =>
                (<MenuItem key={hcsCategory.code} value={hcsCategory.code} primaryText={hcsCategory.display} />)
              )}
            </SelectField>
            <SelectField
              fullWidth
              name="hcsType"
              hintText={<FormattedMessage {...messages.hintText.type} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.type} />}
            >
              {healthcareServiceTypes && healthcareServiceTypes.map((type) =>
                (<MenuItem key={type.code} value={type.code} primaryText={type.display} />)
              )}
            </SelectField>
            <SelectField
              fullWidth
              name="hcsSpecialty"
              hintText={<FormattedMessage {...messages.hintText.specialty} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.specialty} />}
            >
              {healthcareServiceSpecialities && healthcareServiceSpecialities.map((type) =>
                (<MenuItem key={type.code} value={type.code} primaryText={type.display} />)
              )}
            </SelectField>
            <SelectField
              fullWidth
              name="hcsReferralMethod"
              hintText={<FormattedMessage {...messages.hintText.referralMethod} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.referralMethod} />}
            >
              {healthcareServiceReferralMethods && healthcareServiceReferralMethods.map((type) =>
                (<MenuItem key={type.code} value={type.code} primaryText={type.display} />)
              )}
            </SelectField>
          </div>
          <div className={`${styles.gridItem} ${styles.contactGroup}`}>
            <SelectField
              fullWidth
              name="telecomType"
              hintText={<FormattedMessage {...messages.hintText.telecomType} />}
              floatingLabelText={<FormattedMessage {...messages.floatingLabelText.telecomType} />}
            >
              {telecomSystems && telecomSystems.map((telecomType) =>
                (<MenuItem key={telecomType.code} value={telecomType.code} primaryText={telecomType.display} />)
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

ManageHealthcareServiceForm.propTypes = {
  organization: PropTypes.object.isRequired,
  healthcareServiceCategories: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  healthcareServiceTypes: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  healthcareServiceSpecialities: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string.isRequired,
  })),
  healthcareServiceStatuses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.bool.isRequired,
    display: PropTypes.string.isRequired,
  })),
  healthcareServiceReferralMethods: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })),
  isSubmitting: PropTypes.bool.isRequired,
  dirty: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
};

export default ManageHealthcareServiceForm;
