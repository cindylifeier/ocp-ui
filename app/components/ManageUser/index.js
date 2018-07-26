/**
*
* ManageUser
*
*/

import React from 'react';
import { FormattedMessage } from 'react-intl';
import yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import messages from './messages';
import ManageUserForm from './ManageUserForm';

// import styled from 'styled-components';

function ManageUser(props) {
  const PASSWORD_MIN_LENGTH = 8;
  const { user, groups, onSave } = props;
  const formData = {
    user, groups,
  };
  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={yup.object().shape({
          username: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          password: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(PASSWORD_MIN_LENGTH, (
              <FormattedMessage {...messages.validation.minLength} values={{ PASSWORD_MIN_LENGTH }} />)),
          retypePassword: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}

        render={(formikProps) => <ManageUserForm {...formikProps} {...formData} />}
      />
    </div>
  );
}

ManageUser.propTypes = {
  user: PropTypes.object,
  groups: PropTypes.array,
  onSave: PropTypes.func,
};

export default ManageUser;
