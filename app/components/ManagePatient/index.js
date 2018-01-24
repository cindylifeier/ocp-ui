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

const initialValues = {
  firstName: 'abc',
  middleName: 'dfv',
  lastName: 'ghj',
  gender: 'male',
  dob: new Date('2010,1,22'),
  identifierType: 'ssn',
  identifierValue: '1234',
  address1: '',
  address2: '',
  city: '',
  state: '',
  postalCode: '',
  country: '',
  email: '',
  phone: '',
};

function ManagePatient(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const postalCodePattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  const { onSave, uspsStates, patientIdentifierSystems, administrativeGenders, usCoreRaces, usCoreEthnicities, usCoreBirthSexes, languages } = props;
  const lookUpFormData = {
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    usCoreRaces,
    usCoreEthnicities,
    usCoreBirthSexes,
    languages,
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
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
         /* dob: yup.date()
            .required((<FormattedMessage {...messages.validation.required} />)),*/
          identifierType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          email: yup.string()
            .email((<FormattedMessage {...messages.validation.email} />)),
          postalCode: yup.string()
            .matches(postalCodePattern, (<FormattedMessage {...messages.validation.postalCode} />)),
        })}
        render={(formikProps) => <ManagePatientForm {...formikProps} {...lookUpFormData} />}
      />
    </div>
  );
}

ManagePatient.propTypes = {
  onSave: PropTypes.func.isRequired,
  uspsStates: PropTypes.array.isRequired,
  patientIdentifierSystems: PropTypes.array.isRequired,
  administrativeGenders: PropTypes.array.isRequired,
  usCoreRaces: PropTypes.array.isRequired,
  usCoreEthnicities: PropTypes.array.isRequired,
  usCoreBirthSexes: PropTypes.array.isRequired,
  languages: PropTypes.array.isRequired,
};

export default ManagePatient;
