/**
 *
 * ManageConsent
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import yup from 'yup';
import { Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';

import ManageConsentForm from './ManageConsentForm';
import messages from './messages';


function ManageConsent(props) {
  const {
    onSave,
    consentStateCodes,
    securityLabels,
    purposeOfUse,
    editMode,
    careCoordinatorContext,
  } = props;
  const formData = {
    consentStateCodes,
    securityLabels,
    purposeOfUse,
    editMode,
    isCareCoordinator: !isEmpty(careCoordinatorContext),
  };
  return (
    <div>
      <Formik
        initialValues={setFormData(props.consent, props.careCoordinatorContext)}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        enableReinitialize
        validationSchema={() =>
          yup.lazy((values) => {
            let consentStart = new Date();
            if (values.consentStart) {
              consentStart = values.consentStart;
            }
            let schema = yup.object().shape({
              consentFromActors: yup.array()
                .required((<FormattedMessage {...messages.validation.minFromActors} />)),
              consentToActors: yup.array()
                .required((<FormattedMessage {...messages.validation.minToActors} />)),
              medicalInformation: yup.array()
                .required((<FormattedMessage {...messages.validation.minMedicalInfo} />)),
              consentStart: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
              consentEnd: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(consentStart.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
            });
            if (values.consentType) {
              schema = yup.object().shape({
                consentStart: yup.date()
                  .required((<FormattedMessage {...messages.validation.required} />))
                  .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
                consentEnd: yup.date()
                  .required((<FormattedMessage {...messages.validation.required} />))
                  .min(consentStart.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
              });
            }
            return schema;
          })}
        render={(formikProps) => <ManageConsentForm {...formikProps} {...formData} />}
      />
    </div>
  );
}

ManageConsent.propTypes = {
  consentStateCodes: PropTypes.arrayOf((PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  }))),
  securityLabels: PropTypes.arrayOf(PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  })),
  purposeOfUse: PropTypes.arrayOf((PropTypes.shape({
    code: PropTypes.string.isRequired,
    system: PropTypes.string,
    definition: PropTypes.string,
    display: PropTypes.string,
  }))),
  careCoordinatorContext: PropTypes.shape({
    logicalId: PropTypes.string.isRequired,
    name: PropTypes.string,
    organization: PropTypes.object.isRequired,
  }),
  onSave: PropTypes.func,
  editMode: PropTypes.bool,
  consent: PropTypes.object,
};

function setFormData(consent, careCoordinatorContext) {
  let formData = null;
  if (isEmpty(consent)) {
    const consentStart = new Date();
    const consentEnd = new Date();
    consentEnd.setFullYear(consentEnd.getFullYear() + 1);
    if (!isEmpty(careCoordinatorContext)) {
      const practitionerReference = {
        reference: {
          logicalId: careCoordinatorContext.logicalId,
          type: 'Practitioner',
        },
        display: careCoordinatorContext.name,
        identifiers: careCoordinatorContext.identifiers,
      };
      const orgReference = {
        reference: {
          logicalId: careCoordinatorContext.organization.logicalId,
          type: 'Organization',
        },
        display: careCoordinatorContext.organization.name,
        identifiers: careCoordinatorContext.organization.identifiers,
      };
      const fromActor = [orgReference, practitionerReference];
      formData = {
        consentType: false,
        consentStart,
        consentEnd,
        consentFromActors: fromActor,
      };
    } else {
      formData = {
        consentType: false,
        consentStart,
        consentEnd,
      };
    }
  }
  return formData;
}

export default ManageConsent;

