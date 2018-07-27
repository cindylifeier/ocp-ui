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
  const initialValues = { firstName: user.name[0].firstName, lastName: user.name[0].lastName, username: user.userName };
  return (
    <div>
      <Formik
        initialValues={{ ...initialValues }}
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
          repeatPassword: yup.string()
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
