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
import { PATIENT } from './constants';

// import styled from 'styled-components';

function ManageUser(props) {
  const passwordPattern = new RegExp('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@!#$]).*$');
  const { user, groups, onSave, resourceType } = props;
  const formData = {
    user, groups, resourceType,
  };
  const organization = resourceType === PATIENT ? user.organization && user.organization.reference : '';
  const patientGroup = groups.filter((group) => group.displayName.includes(PATIENT.toLowerCase()));
  const role = resourceType === PATIENT ? patientGroup[0].id : '';
  const initialValues = { firstName: user.name[0].firstName, lastName: user.name[0].lastName, username: user.userName, organization, role };
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
            .matches(passwordPattern, <FormattedMessage {...messages.validation.passwordPattern} />),
          repeatPassword: yup.string()
            .oneOf([yup.ref('password')], <FormattedMessage {...messages.validation.notMatch} />)
            .required((<FormattedMessage {...messages.validation.required} />)),
          organization: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          role: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        })}

        render={(formikProps) => <ManageUserForm {...formikProps} {...formData} />}
      />
    </div>
  );
}

ManageUser.propTypes = {
  user: PropTypes.object,
  resourceType: PropTypes.string,
  groups: PropTypes.array,
  onSave: PropTypes.func,
};

export default ManageUser;
