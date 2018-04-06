/**
 *
 * CheckPassword
 *
 */

import React from 'react';
import Close from 'material-ui/svg-icons/navigation/close';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import yup from 'yup';

import H2 from 'components/H1';
import TextField from 'components/TextField';
import CloseButton from 'components/ConfirmPatientModal/CloseButton';
import StyledRaisedButton from 'components/StyledRaisedButton';
import messages from './messages';


function CheckPassword(props) {
  const { callback, checkPassword } = props;
  return (
    <div>
      <CloseButton tooltip="Close" onClick={callback}><Close /></CloseButton>
      <H2>{<FormattedMessage {...messages.authentication.header} />}</H2>
      <FormattedMessage {...messages.authentication.term} />
      <Formik
        onSubmit={(values) => {
          checkPassword(values);
        }}
        validationSchema={yup.object().shape({
          password: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        }
        )}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <TextField
              fullWidth="100%"
              name="password"
              type="password"
              hintText={<FormattedMessage {...messages.authentication.label} />}
              floatingLabelText={<FormattedMessage {...messages.authentication.label} />}
            />
            <StyledRaisedButton
              type="submit"
              label="Continue"
              disabled={!dirty || isSubmitting || !isValid}
            />
          </Form>
        )}
      />
    </div>
  );
}

CheckPassword.propTypes = {
  callback: PropTypes.func.isRequired,
  checkPassword: PropTypes.func.isRequired,
};

export default CheckPassword;
