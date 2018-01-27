/**
 *
 * ManagePractitioner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import isUndefined from 'lodash/isUndefined';
import merge from 'lodash/merge';
import identity from 'lodash/identity';
import pickBy from 'lodash/pickBy';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import yup from 'yup';
import ManagePractitionerForm from './ManagePractitionerForm';
import messages from './messages';
import { TEXT_MIN_LENGTH } from '../../containers/ManagePractitionerPage/constants';
import { EMPTY_STRING } from '../../containers/App/constants';

function ManagePractitioner(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const postalCodePattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  const { onSave, uspsStates, identifierSystems, telecomSystems, practitionerRoles, practitioner } = props;
  const formData = {
    uspsStates,
    identifierSystems,
    telecomSystems,
    practitionerRoles,
    practitioner,
  };
  return (
    <div>
      <Formik
        initialValues={setFormData(practitioner)}
        onSubmit={(values, actions) => {
          onSave(values, actions);
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
        render={(formikProps) => <ManagePractitionerForm {...formikProps} {...formData} />}
      />
    </div>
  );
}

ManagePractitioner.propTypes = {
  onSave: PropTypes.func.isRequired,
  uspsStates: PropTypes.array.isRequired,
  identifierSystems: PropTypes.array.isRequired,
  telecomSystems: PropTypes.array.isRequired,
  practitionerRoles: PropTypes.array.isRequired,
  practitioner: PropTypes.any,
};

export default ManagePractitioner;

function setFormData(practitioner) {
  let formData = null;
  if (!isEmpty(practitioner)) {
    formData = merge(mapPractitionerToFirstIdentifier(practitioner), mapPractitionerToFirstName(practitioner),
      mapPractitionerToFirstRole(practitioner), mapPractitionerToAddress(practitioner), mapPractitionerToFirstTelecoms(practitioner));
  }
  return pickBy(formData, identity);
}

function mapPractitionerToFirstIdentifier(practitioner) {
  let identifier = {};
  if (practitioner.identifiers.length > 0) {
    const firstIdentifier = practitioner.identifiers[0];
    identifier = {
      identifierType: setEmptyStringWhenUndefined(firstIdentifier.system),
      identifierValue: setEmptyStringWhenUndefined(firstIdentifier.value),
    };
  }
  return identifier;
}

function mapPractitionerToFirstName(practitioner) {
  let name = {};
  if (practitioner.name.length > 0) {
    const fName = practitioner.name[0];
    name = {
      firstName: setEmptyStringWhenUndefined(fName.firstName),
      lastName: setEmptyStringWhenUndefined(fName.lastName),
    };
  }
  return name;
}

function mapPractitionerToFirstRole(practitioner) {
  let role = {};
  if (practitioner.practitionerRoles.length > 0) {
    const firstRole = practitioner.practitionerRoles[0];
    role = {
      roleType: setEmptyStringWhenUndefined(firstRole.code),
    };
  }
  return role;
}

function mapPractitionerToAddress(practitioner) {
  let address = {};
  if (practitioner.address.length > 0) {
    const firstAddress = practitioner.address[0];
    address = {
      address1: setEmptyStringWhenUndefined(firstAddress.line1),
      address2: setEmptyStringWhenUndefined(firstAddress.line2),
      city: setEmptyStringWhenUndefined(firstAddress.city),
      state: setEmptyStringWhenUndefined(firstAddress.stateCode),
      postalCode: setEmptyStringWhenUndefined(firstAddress.postalCode),
      country: setEmptyStringWhenUndefined(firstAddress.countryCode),
    };
  }
  return address;
}

function mapPractitionerToFirstTelecoms(practitioner) {
  let telecom = {};
  if (practitioner.telecoms.length > 0) {
    const firstTelecom = practitioner.telecoms[0];
    telecom = {
      telecomType: setEmptyStringWhenUndefined(firstTelecom.system),
      telecomValue: setEmptyStringWhenUndefined(firstTelecom.value),
    };
  }
  return telecom;
}

export function setEmptyStringWhenUndefined(value) {
  return isUndefined(value) ? EMPTY_STRING : value;
}
