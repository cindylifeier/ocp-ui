/**
 *
 * ManageConsent
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import yup from 'yup';
import { Formik } from 'formik';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import ManageConsentForm from './ManageConsentForm';
import messages from './messages';


function ManageConsent(props) {
  const {
    onSave,
    consentStateCodes,
    securityLabels,
    purposeOfUse,
    editMode,
  } = props;
  const formData = {
    consentStateCodes,
    securityLabels,
    purposeOfUse,
    editMode,
  };
  return (
    <div>
      <Formik
        initialValues={setFormData(props.consent)}
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
  onSave: PropTypes.func,
  editMode: PropTypes.bool,
  consent: PropTypes.object,
};

export default ManageConsent;

function setFormData(consent) {
  let formData = null;
  if (isEmpty(consent)) {
    const consentStart = new Date();
    const consentEnd = new Date();
    consentEnd.setFullYear(consentEnd.getFullYear() + 1);
    formData = {
      consentType: false,
      consentStart,
      consentEnd,
    };
  }
  return formData;
}
