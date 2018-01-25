/**
 *
 * ManagePractitioner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import yup from 'yup';
import ManagePractitionerForm from './ManagePractitionerForm';
import messages from './messages';
import { TEXT_MIN_LENGTH } from '../../containers/ManagePractitionerPage/constants';

function ManagePractitioner(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const postalCodePattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  const { onSave, error, uspsStates, identifierSystems, telecomSystems, practitionerRoles, practitioner } = props;
  const lookUpFormData = {
    uspsStates,
    identifierSystems,
    telecomSystems,
    practitionerRoles,
    practitioner,
  };
  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          onSave(values);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          firstName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          lastName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          roleType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          postalCode: yup.string()
            .matches(postalCodePattern, (<FormattedMessage {...messages.validation.postalCode} />)),
        })}
        render={(formikProps) => <ManagePractitionerForm {...formikProps} {...lookUpFormData} />}
      />
      {isEmpty(error) ? null : <p>Save practitioner failed!</p>}
    </div>
  );
}

ManagePractitioner.propTypes = {
  onSave: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  uspsStates: PropTypes.array.isRequired,
  identifierSystems: PropTypes.array.isRequired,
  telecomSystems: PropTypes.array.isRequired,
  practitionerRoles: PropTypes.array.isRequired,
  practitioner: PropTypes.any,
};

export default ManagePractitioner;
