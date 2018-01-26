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

function ManageLocation(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const postalCodePattern = new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$');
  const { onSave, location } = props;
  const name = location.name;
  const initialValues = { name };
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
          managingLocationLogicalId: yup.string()
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          identifierSystem: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          identifierValue: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          telecomSystemValue: yup.string()
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          line1: yup.string()
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          city: yup.string()
            .min(minimumLength, (
              <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
          postalCode: yup.string()
            .matches(postalCodePattern, (<FormattedMessage {...messages.validation.postalCode} />)),
        })}
        render={(formikProps) => <ManageLocationForm {...formikProps} {...props} />}
      />
    </div>
  );
}

ManageLocation.propTypes = {
  onSave: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default ManageLocation;
