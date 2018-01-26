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
  const { onSave, patient, uspsStates, patientIdentifierSystems, administrativeGenders, usCoreRaces, usCoreEthnicities, usCoreBirthSexes, languages, telecomSystems } = props;
  const lookUpFormData = {
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    usCoreRaces,
    usCoreEthnicities,
    usCoreBirthSexes,
    languages,
    telecomSystems,
  };
  return (
    <div>
      <Formik
        initialValues={patient}
        onSubmit={(values, actions) => {
          onSave(values, actions);
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
          genderCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          birthDate: yup.date()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
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
  telecomSystems: PropTypes.array.isRequired,
  patient: PropTypes.object,
};

export default ManagePatient;
