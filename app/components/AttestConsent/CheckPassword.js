/**
 *
 * CheckPassword
 *
 */

import React from 'react';
import Close from '@material-ui/icons/Close';
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
        onSubmit={(values, actions) => {
          checkPassword(values.password, actions);
        }}
        validationSchema={yup.object().shape({
          password: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
        }
        )}
        render={({ isSubmitting, dirty, isValid }) => (
          <Form>
            <TextField
              width="300px"
              name="password"
              type="password"
              hintText={<FormattedMessage {...messages.authentication.label} />}
              floatingLabelText={<FormattedMessage {...messages.authentication.label} />}
            />
            <div>
              <StyledRaisedButton
                type="submit"
                disabled={!dirty || isSubmitting || !isValid}
              >
                Continue
              </StyledRaisedButton>
            </div>
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
