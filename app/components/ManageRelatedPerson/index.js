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
import find from 'lodash/find';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import ManageRelatedPersonForm from './ManageRelatedPersonForm';
import { TEXT_MIN_LENGTH } from '../../containers/ManageRelatedPersonPage/constants';

function ManageRelatedPerson(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const postalCodePattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  const { onSave, uspsStates, patientIdentifierSystems, administrativeGenders, telecomUses, telecomSystems, relationshipTypes, selectedPatient } = props;
  const lookUpFormData = {
    onSave,
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    telecomSystems,
    telecomUses,
    relationshipTypes,
    selectedPatient,
  };
  return (
    <div>
      <Formik
        initialValues={{}}
        onSubmit={(values, actions) => {
          const relatedPerson = mapToRelatedPerson(values, selectedPatient, administrativeGenders, relationshipTypes);
          onSave(relatedPerson);
          actions.setSubmitting(false);
        }}
        validationSchema={() =>
          yup.lazy((values) => {
            let startDate = new Date();
            if (values.startDate) {
              startDate = values.startDate;
            }
            return yup.object().shape({
              firstName: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(minimumLength, (
                  <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
              lastName: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(minimumLength, (
                  <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
              relationshipCode: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              birthDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />)),
              genderCode: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              startDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
              endDate: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(startDate.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
              identifierType: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
              identifierValue: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(minimumLength, (
                  <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
              zip: yup.string()
                .matches(postalCodePattern, (<FormattedMessage {...messages.validation.zip} />)),
            });
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
  telecomUses: PropTypes.array.isRequired,
  telecomSystems: PropTypes.array.isRequired,
  relationshipTypes: PropTypes.array.isRequired,
  selectedPatient: PropTypes.object,
};

function mapToRelatedPerson(capturedFormData, selectedPatient, administrativeGenders, relationshipTypes) {
  const {
    startDate,
    endDate,
    active,
    firstName,
    lastName,
    relationshipCode,
    telecomCode,
    telecomUse,
    telecomValue,
    genderCode,
    birthDate,
    address1,
    address2,
    city,
    zip,
    state,
    identifierType,
    identifierValue } = capturedFormData;
  const selectedAdministrativeGenders = find(administrativeGenders, { code: genderCode });
  const genderValue = selectedAdministrativeGenders.display;
  const selectedRelationshipTypes = find(relationshipTypes, { code: relationshipCode });
  const relationshipValue = selectedRelationshipTypes.display;
  const relatedPerson = {
    firstName,
    lastName,
    relationshipCode,
    telecomCode,
    telecomUse,
    telecomValue,
    genderCode,
    genderValue,
    relationshipValue,
    address1,
    address2,
    city,
    state,
    zip,
    identifierType,
    identifierValue,
    active,
    patient: selectedPatient.id,
    startDate: startDate.toLocaleDateString(),
    endDate: endDate.toLocaleDateString(),
    birthDate: birthDate.toLocaleDateString(),
  };
  return relatedPerson;
}


export default ManageRelatedPerson;

