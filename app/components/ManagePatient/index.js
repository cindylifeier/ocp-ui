/**
*
* ManagePatient
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import yup from 'yup';
import ManagePatientForm from './ManagePatientForm';
import messages from './messages';
import { TEXT_MIN_LENGTH } from '../../containers/ManagePatientPage/constants';

function ManagePatient(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const postalCodePattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  const { onSave } = props;
  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          onSave(values);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          lastName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          firstName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          gender: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          dob: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          email: yup.string()
            .email((<FormattedMessage {...messages.validation.email} />)),
          postalCode: yup.string()
            .matches(postalCodePattern, (<FormattedMessage {...messages.validation.postalCode} />)),
        })}
        render={ManagePatientForm}
      />
    </div>
  );
}

ManagePatient.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ManagePatient;
