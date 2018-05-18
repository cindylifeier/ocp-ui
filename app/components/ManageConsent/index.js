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
    securityLabel,
    purposeOfUse,
    editMode,
  } = props;
  const formData = {
    consentStateCodes,
    securityLabel,
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
            return yup.object().shape({
              consentStart: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
              consentEnd: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(consentStart.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
            });
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
  securityLabel: PropTypes.arrayOf(PropTypes.shape({
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
