/**
 *
 * ManageRelatedPerson
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as yup from 'yup';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';
import { FormattedMessage } from 'react-intl';

import Util from 'utils/Util';
import messages from './messages';
import ManageRelatedPersonForm from './ManageRelatedPersonForm';
import { TEXT_MIN_LENGTH } from './constants';

function ManageRelatedPerson(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const postalCodePattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  const {
    onSave,
    uspsStates,
    patientIdentifierSystems,
    administrativeGenders,
    telecomUses,
    telecomSystems,
    relationshipTypes,
    selectedPatient,
    selectedRelatedPerson,
  } = props;
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
    <Formik
      initialValues={setInitialValues(selectedRelatedPerson)}
      onSubmit={(values, actions) => {
        const relatedPerson = mapToRelatedPerson(values, selectedPatient, administrativeGenders, relationshipTypes);
        onSave(relatedPerson, actions);
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
  selectedRelatedPerson: PropTypes.object,
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
    country,
    identifierType,
    identifierValue,
  } = capturedFormData;
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
    country,
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

function setInitialValues(selectedRelatedPerson) {
  let initialValues = null;
  if (!isEmpty(selectedRelatedPerson)) {
    initialValues = merge(
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'active'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'firstName'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'lastName'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'relationshipCode'),
      mapRelatedPersonToDate(selectedRelatedPerson, 'birthDate'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'genderCode'),
      mapRelatedPersonToDate(selectedRelatedPerson, 'startDate'),
      mapRelatedPersonToDate(selectedRelatedPerson, 'endDate'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'identifierType'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'identifierValue'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'address1'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'address2'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'city'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'state'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'zip'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'country'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'telecomCode'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'telecomValue'),
      mapRelatedPersonToFormFields(selectedRelatedPerson, 'telecomUse'),
    );
  }
  return Util.pickByIdentity(initialValues);
}

function mapRelatedPersonToFormFields(selectedRelatedPerson, fieldName) {
  const fieldObject = {};
  if (!isUndefined(selectedRelatedPerson[fieldName])) {
    fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(selectedRelatedPerson[fieldName]);
  }
  return fieldObject;
}

function mapRelatedPersonToDate(selectedRelatedPerson, fieldName) {
  const fieldObject = {};
  if (!isUndefined(selectedRelatedPerson[fieldName])) {
    fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(selectedRelatedPerson[fieldName]) && new Date(selectedRelatedPerson[fieldName]);
  }
  return fieldObject;
}
