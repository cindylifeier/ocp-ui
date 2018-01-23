/**
 *
 * ManagePractitioner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Divider from 'material-ui/Divider';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import yup from 'yup';
import ManagePractitionerForm from './ManagePractitionerForm';
import messages from './messages';
import styles from './styles.css';
import { TEXT_MIN_LENGTH } from '../../containers/ManagePractitionerPage/constants';

const initialValues = {
  firstName: '',
  middleName: '',
  lastName: '',
  roleType: '',
  identifierType: '',
  identifierValue: '',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  email: '',
  phone: '',
};

function ManagePractitioner(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const { onSave } = props;
  return (
    <div className={styles.card}>
      <h4 className={styles.font}><FormattedMessage {...messages.header} /></h4>
      <Divider />
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          onSave(values);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          lastName: yup.string()
            .required((<FormattedMessage {...messages.manageForm.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.manageForm.validation.minLength} values={{ minimumLength }} />)),
          identifierType: yup.string()
            .required((<FormattedMessage {...messages.manageForm.validation.required} />)),
          identifierValue: yup.string()
            .required((<FormattedMessage {...messages.manageForm.validation.required} />)),
        })}
        render={ManagePractitionerForm}
      />
    </div>
  );
}

ManagePractitioner.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ManagePractitioner;
