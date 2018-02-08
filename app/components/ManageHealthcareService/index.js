/**
*
* ManageHealthcareService
*
*/

import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import ManageHealthcareServiceForm from './ManageHealthcareServiceForm';

function ManageHealthcareService(props) {
  const { onSave } = props;
  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        render={(formikProps) => <ManageHealthcareServiceForm {...formikProps} {...props} />}
      />
    </div>
  );
}

ManageHealthcareService.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ManageHealthcareService;
