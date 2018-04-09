/**
 *
 * ManageConsent
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import messages from './messages';
import ManageConsentForm from './ManageConsentForm';

// import styled from 'styled-components';

function ManageConsent(props) {
  const {
    onSave,
    consentStateCodes,
    consentCategory,
    securityRoleType,
    consentAction,
    purposeOfUse,
    editMode,
  } = props;
  const formData = {
    consentStateCodes,
    consentCategory,
    securityRoleType,
    consentAction,
    purposeOfUse,
    editMode,
  };
  return (
    <div>
      <Formik
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
    reference: PropTypes.string,
    display: PropTypes.string,
  }))),
  consentCategory: PropTypes.arrayOf((PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }))),
  securityRoleType: PropTypes.arrayOf((PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }))),
  consentAction: PropTypes.arrayOf((PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }))),
  purposeOfUse: PropTypes.arrayOf((PropTypes.shape({
    reference: PropTypes.string,
    display: PropTypes.string,
  }))),
  onSave: PropTypes.func,
  editMode: PropTypes.bool,
};

export default ManageConsent;
