/**
 *
 * Login
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';
import { Card } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import { teal500, white } from 'material-ui/styles/colors';

import TextField from '../TextField';
import messages from './messages';
import ocpLogo from '../../images/omnibus-care-plan-logo.png';
import styles from './styles.css';

const inlineStyles = {
  divider: {
    backgroundColor: teal500,
    height: '3px',
  },
  card: {
    borderWidth: '1px',
    backgroundColor: 'rgba(242, 242, 242, 1)',
  },
};

function Login(props) {
  const { onLogin } = props;

  return (
    <div>
      <div>
        <img className={styles.logo} src={ocpLogo} alt="ocp logo" />
      </div>
      <Divider style={inlineStyles.divider} />
      <Card style={inlineStyles.card} className={styles.loginCard}>
        <div className={styles.title}>
          <FormattedMessage {...messages.title} />
        </div>
        <Formik
          onSubmit={(values) => {
            onLogin(values);
          }}
          validationSchema={yup.object().shape({
            username: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
            password: yup.string()
              .required((<FormattedMessage {...messages.validation.required} />)),
          })}
          render={(loginFormProps) => {
            const { isSubmitting, dirty, isValid } = loginFormProps;
            return (
              <Form>
                <div className={styles.gridContainer}>
                  <div className={`${styles.gridItem} ${styles.username}`}>
                    <TextField
                      name="username"
                      hintText={<FormattedMessage {...messages.hintText.username} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.username} />}
                      fullWidth
                    />
                  </div>
                  <div className={`${styles.gridItem} ${styles.password}`}>
                    <TextField
                      name="password"
                      hintText={<FormattedMessage {...messages.hintText.password} />}
                      floatingLabelText={<FormattedMessage {...messages.floatingLabelText.password} />}
                      fullWidth
                    />
                  </div>
                  <div className={`${styles.gridItem} ${styles.forgotLink}`}>
                    <FormattedMessage {...messages.forgotLink} />
                  </div>
                  <div className={`${styles.gridItem} ${styles.button}`}>
                    <RaisedButton
                      type="submit"
                      backgroundColor={teal500}
                      labelColor={white}
                      fullWidth
                      label={<FormattedMessage {...messages.loginButton} />}
                      disabled={!dirty || isSubmitting || !isValid}
                    />
                  </div>
                </div>
              </Form>
            );
          }}
        >
        </Formik>
      </Card>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
