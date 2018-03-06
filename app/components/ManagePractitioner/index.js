/**
 *
 * ManagePractitioner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import yup from 'yup';
import ManagePractitionerForm from './ManagePractitionerForm';
import messages from './messages';
import { TEXT_MIN_LENGTH } from '../../containers/ManagePractitionerPage/constants';
import Util from '../../utils/Util';

function ManagePractitioner(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const postalCodePattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  const { onSave, uspsStates, identifierSystems, telecomSystems, practitionerRoles, editMode, practitioner, onPageClick, onSearch, currentPage,
    totalNumberOfPages,
    organizations } = props;
  const formData = {
    uspsStates,
    identifierSystems,
    telecomSystems,
    practitionerRoles,
    onPageClick,
    onSearch,
    organizations,
    currentPage,
    totalNumberOfPages,
  };
  return (
    <div>
      {((editMode && practitioner) || !editMode) &&
      <Formik
        initialValues={(editMode && setFormData(practitioner)) || { practitionerRole: [] }}
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
          practitionerRole: yup.array()
            .required((<FormattedMessage {...messages.validation.required} />)),
          postalCode: yup.string()
            .matches(postalCodePattern, (<FormattedMessage {...messages.validation.postalCode} />)),
        })}
        render={(formikProps) => <ManagePractitionerForm {...formikProps} {...formData} />}
      />
      }
    </div>
  );
}

ManagePractitioner.propTypes = {
  onSave: PropTypes.func.isRequired,
  uspsStates: PropTypes.array.isRequired,
  identifierSystems: PropTypes.array.isRequired,
  telecomSystems: PropTypes.array.isRequired,
  practitionerRoles: PropTypes.array.isRequired,
  editMode: PropTypes.bool.isRequired,
  practitioner: PropTypes.any,
  onPageClick: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalNumberOfPages: PropTypes.number.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }),
};

export default ManagePractitioner;

function setFormData(practitioner) {
  let formData = null;
  if (!isEmpty(practitioner)) {
    formData = merge(mapPractitionerToFirstIdentifier(practitioner), mapPractitionerToFirstName(practitioner),
      mapPractitionerToFirstRole(practitioner), mapPractitionerToAddress(practitioner), mapPractitionerToFirstTelecoms(practitioner));
  }
  return Util.pickByIdentity(formData);
}

function mapPractitionerToFirstIdentifier(practitioner) {
  let identifier = {};
  if (practitioner.identifiers.length > 0) {
    const firstIdentifier = practitioner.identifiers[0];
    identifier = {
      identifierType: Util.setEmptyStringWhenUndefined(firstIdentifier.system),
      identifierValue: Util.setEmptyStringWhenUndefined(firstIdentifier.value),
    };
  }
  return identifier;
}

function mapPractitionerToFirstName(practitioner) {
  let name = {};
  if (practitioner.name.length > 0) {
    const fName = practitioner.name[0];
    name = {
      firstName: Util.setEmptyStringWhenUndefined(fName.firstName),
      lastName: Util.setEmptyStringWhenUndefined(fName.lastName),
    };
  }
  return name;
}

function mapPractitionerToFirstRole(practitioner) {
  let role = {};
  if (practitioner.practitionerRoles.length > 0) {
    const firstRole = practitioner.practitionerRoles[0];
    role = {
      roleType: Util.setEmptyStringWhenUndefined(firstRole.code),
    };
  }
  return role;
}

function mapPractitionerToAddress(practitioner) {
  let address = {};
  if (practitioner.address.length > 0) {
    const firstAddress = practitioner.address[0];
    address = {
      address1: Util.setEmptyStringWhenUndefined(firstAddress.line1),
      address2: Util.setEmptyStringWhenUndefined(firstAddress.line2),
      city: Util.setEmptyStringWhenUndefined(firstAddress.city),
      state: Util.setEmptyStringWhenUndefined(firstAddress.stateCode),
      postalCode: Util.setEmptyStringWhenUndefined(firstAddress.postalCode),
      country: Util.setEmptyStringWhenUndefined(firstAddress.countryCode),
    };
  }
  return address;
}

function mapPractitionerToFirstTelecoms(practitioner) {
  let telecom = {};
  if (practitioner.telecoms.length > 0) {
    const firstTelecom = practitioner.telecoms[0];
    telecom = {
      telecomType: Util.setEmptyStringWhenUndefined(firstTelecom.system),
      telecomValue: Util.setEmptyStringWhenUndefined(firstTelecom.value),
    };
  }
  return telecom;
}
