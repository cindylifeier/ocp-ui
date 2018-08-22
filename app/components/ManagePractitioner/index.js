/**
 *
 * ManagePractitioner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import yup from 'yup';

import { TEXT_MIN_LENGTH } from './constants';
import ManagePractitionerForm from './ManagePractitionerForm';
import { setFormData } from './helpers';
import messages from './messages';

function ManagePractitioner(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const minimumOrganization = '1';

  const {
    onSave, uspsStates, identifierSystems, telecomSystems, telecomUses,
    providerRoles, providerSpecialties, editMode, practitioner, onPageClick, onSearch,
    organizations, organizationContext, initialSearchOrganizationResult,
    initialNewPractitionerValue,
  } = props;
  const formData = {
    uspsStates,
    identifierSystems,
    telecomSystems,
    telecomUses,
    providerRoles,
    providerSpecialties,
    onPageClick,
    onSearch,
    organizations,
    organizationContext,
    initialSearchOrganizationResult,
  };
  return (
    <div>
      {((editMode && practitioner) || !editMode) &&
      <Formik
        initialValues={(setFormData(practitioner, initialNewPractitionerValue)) || { practitionerRoles: [] }}
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
          identifierType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          practitionerRoles: yup.array()
            .of(
              yup.object().shape({
                organization: yup.object().shape({
                  reference: yup.string()
                    .required((<FormattedMessage {...messages.validation.required} />)),
                }),
                code: yup.string()
                  .required((<FormattedMessage {...messages.validation.required} />)),
                specialty: yup.string()
                  .required((<FormattedMessage {...messages.validation.required} />)),
                active: yup.boolean()
                  .required((<FormattedMessage {...messages.validation.required} />)),
              }),
            )
            .min(minimumOrganization, (
              <FormattedMessage
                {...messages.validation.minLengthAssociateOrganization}
                values={{ minimumOrganization }}
              />)),
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
  telecomSystems: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string.isRequired,
    display: PropTypes.string.isRequired,
  })).isRequired,
  telecomUses: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    display: PropTypes.string,
    definition: PropTypes.string,
  })).isRequired,
  providerRoles: PropTypes.array.isRequired,
  providerSpecialties: PropTypes.array.isRequired,
  editMode: PropTypes.bool.isRequired,
  practitioner: PropTypes.any,
  onPageClick: PropTypes.func.isRequired,
  initialSearchOrganizationResult: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  organizations: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    currentPage: PropTypes.number.isRequired,
    totalNumberOfPages: PropTypes.number.isRequired,
  }),
  organizationContext: PropTypes.shape({
    name: PropTypes.string.isRequired,
    identifiers: PropTypes.array,
    addresses: PropTypes.array,
    logicalId: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }),
  initialNewPractitionerValue: PropTypes.any,
};

export default ManagePractitioner;
