/**
*
* ManageHealthcareService
*
*/

import React from 'react';
import { Formik } from 'formik';
import yup from 'yup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ManageHealthcareServiceForm from './ManageHealthcareServiceForm';
import messages from '../ManagePractitioner/messages';
import { TEXT_MIN_LENGTH } from '../../containers/ManagePractitionerPage/constants';

function ManageHealthcareService(props) {
  const { onSave } = props;
  const minimumLength = TEXT_MIN_LENGTH;
  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={yup.object().shape({
          name: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          programName: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          type: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          category: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={(formikProps) => <ManageHealthcareServiceForm {...formikProps} {...props} />}
      />
    </div>
  );
}

ManageHealthcareService.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ManageHealthcareService;
