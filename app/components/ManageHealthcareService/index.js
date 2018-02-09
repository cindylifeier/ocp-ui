/**
*
* ManageHealthcareService
*
*/

import React from 'react';
import { Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import styles from './styles.css';
import ManageHealthcareServiceForm from './ManageHealthcareServiceForm';
import messages from '../ManagePractitioner/messages';
import { TEXT_MIN_LENGTH } from '../../containers/ManagePractitionerPage/constants';

function ManageHealthcareService(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const { onSave, healthcareServiceCategories, healthcareServiceTypes, healthcareServiceSpecialities, healthcareServiceReferralMethods, telecomSystems, organization } = props;
  const formData = { organization, healthcareServiceCategories, healthcareServiceTypes, healthcareServiceSpecialities, healthcareServiceReferralMethods, telecomSystems };
  return (
    <div className={styles.root}>
      <Formik
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={yup.object().shape({
          name: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          hcsProgramName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          hcsType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          category: yup.object()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={(formikProps) => <ManageHealthcareServiceForm {...formikProps} {...formData} />}
      />
    </div>
  );
}

ManageHealthcareService.propTypes = {
  onSave: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  healthcareServiceCategories: PropTypes.array.isRequired,
  healthcareServiceTypes: PropTypes.array.isRequired,
  healthcareServiceSpecialities: PropTypes.array.isRequired,
  healthcareServiceReferralMethods: PropTypes.array.isRequired,
  telecomSystems: PropTypes.array.isRequired,
};

export default ManageHealthcareService;
