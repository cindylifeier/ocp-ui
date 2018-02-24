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
import RaisedButton from 'material-ui/RaisedButton';
import { teal500, white } from 'material-ui/styles/colors';
import { Cell, Grid } from 'styled-css-grid';

import TextField from '../TextField';
import messages from './messages';
import brandImg from '../../images/omnibus-care-plan-logo.png';
import StyledDivider from '../StyledDivider';
import LoginStyledCard from './LoginStyledCard';
import CardHeader from '../CardHeader';
import StyledBrandImage from '../StyledBrandImage';
import LoginFieldGrid from './LoginFieldGrid';

function Login(props) {
  const { onLogin, auth: { isAuthenticating } } = props;

  return (
    <div>
      <Grid
        columns={'400px 1fr 400px'}
        rows={'120px 1fr 120px'}
        areas={[
          'header header header',
          'leftSide content rightSide',
          'footer footer footer',
        ]}
      >
        <Cell area="header">
          <StyledBrandImage src={brandImg} alt={<FormattedMessage {...messages.brandImg} />} />
          <StyledDivider />
        </Cell>
        <Cell area="leftSide" />
        <Cell area="rightSide" />
        <Cell area="content" center>
          <LoginStyledCard>
            <CardHeader title={<FormattedMessage {...messages.title} />} />
            <Formik
              onSubmit={(values, actions) => {
                onLogin(values, actions);
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
                    <LoginFieldGrid
                      columns={1}
                      rows="120px 120px 45px 100px"
                      areas={[
                        'username',
                        'password',
                        'forgotLink',
                        'loginButton',
                      ]}
                    >
                      <Cell>
                        <TextField
                          name="username"
                          hintText={<FormattedMessage {...messages.hintText.username} />}
                          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.username} />}
                          fullWidth
                        />
                      </Cell>
                      <Cell>
                        <TextField
                          name="password"
                          type="password"
                          hintText={<FormattedMessage {...messages.hintText.password} />}
                          floatingLabelText={<FormattedMessage {...messages.floatingLabelText.password} />}
                          fullWidth
                        />
                      </Cell>
                      <Cell>
                        <FormattedMessage {...messages.forgotLink} />
                      </Cell>
                      <Cell>
                        <RaisedButton
                          type="submit"
                          backgroundColor={teal500}
                          labelColor={white}
                          fullWidth
                          label={
                            isAuthenticating ?
                              <FormattedMessage {...messages.authenticatingButton} /> :
                              <FormattedMessage {...messages.loginButton} />
                          }
                          disabled={!dirty || isSubmitting || !isValid}
                        />
                      </Cell>
                    </LoginFieldGrid>
                  </Form>
                );
              }}
            >
            </Formik>
          </LoginStyledCard>
        </Cell>
        <Cell area="footer" />
      </Grid>
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

export default Login;
