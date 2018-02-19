/**
*
* ManageRelatedPerson
*
*/

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Formik } from 'formik';
import * as yup from 'yup';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
// import ManagePatientForm from '../ManagePatient/ManagePatientForm';
import ManageRelatedPersonForm from './ManageRelatedPersonForm';
// import { TEXT_MIN_LENGTH } from '../../containers/ManageRelatedPersonPage/constants';


function ManageRelatedPerson(props) {
  // const minimumLength = TEXT_MIN_LENGTH;
  // const postalCodePattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  const { onSave, uspsStates, patientIdentifierSystems, administrativeGenders, telecomSystems, relationshipTypes } = props;
  const lookUpFormData = {
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    telecomSystems,
    relationshipTypes,
  };
  return (
    <div>
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={yup.object().shape({
          // lastName: yup.string()
          //   .required((<FormattedMessage {...messages.validation.required} />))
          //   .min(minimumLength, (
          //     <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          // firstName: yup.string()
          //   .required((<FormattedMessage {...messages.validation.required} />))
          //   .min(minimumLength, (
          //     <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          // genderCode: yup.string()
          //   .required((<FormattedMessage {...messages.validation.required} />)),
          // birthDate: yup.date()
          //   .required((<FormattedMessage {...messages.validation.required} />)),
          // identifierType: yup.string()
          //   .required((<FormattedMessage {...messages.validation.required} />)),
          // identifierValue: yup.string()
          //   .required((<FormattedMessage {...messages.validation.required} />)),
          // postalCode: yup.string()
          //   .matches(postalCodePattern, (<FormattedMessage {...messages.validation.postalCode} />)),
        })}
        render={(formikProps) => <ManageRelatedPersonForm {...formikProps} {...lookUpFormData} />}
      />
    </div>
  );
}

ManageRelatedPerson.propTypes = {
  onSave: PropTypes.func.isRequired,
  uspsStates: PropTypes.array.isRequired,
  patientIdentifierSystems: PropTypes.array.isRequired,
  administrativeGenders: PropTypes.array.isRequired,
  telecomSystems: PropTypes.array.isRequired,
  relationshipTypes: PropTypes.array.isRequired,
  // patient: PropTypes.object,
};

export default ManageRelatedPerson;
