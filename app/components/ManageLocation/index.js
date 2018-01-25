/**
*
* ManageLocation
*
*/

import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import yup from 'yup';
import messages from './messages';
import styles from './styles.css';
import ManageLocationForm from './ManageLocationForm';
import { TEXT_MIN_LENGTH } from '../../containers/ManageLocationPage/constants';


const initialValues = { };

function ManageLocation(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const postalCodePattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  const { onSave } = props;
  return (
    <div className={styles.root} >
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          onSave(values);
          actions.setSubmitting(false);
        }}
        validationSchema={yup.object().shape({
          name: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          status: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          physicalType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          managingLocationLogicalId: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          identifierSystem: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          telecomSystem: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          telecomUse: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          telecomSystemValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          addressType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          line1: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          city: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          stateCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          postalCode: yup.string()
            .matches(postalCodePattern, (<FormattedMessage {...messages.validation.postalCode} />)),
          use: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}
        render={(formikProps) => <ManageLocationForm {...formikProps} {...props} />}
      />
    </div>
  );
}

ManageLocation.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ManageLocation;
