/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import AppBar from 'material-ui/AppBar';
import { Card } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectLoginPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import styles from './styles.css';
import { HOME_URL } from '../App/constants';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet>
          <title>Login</title>
          <meta name="description" content="Login page of Omnibus Care Plan application" />
        </Helmet>
        <AppBar title="Welcome To Omnibus Care Plan" showMenuIconButton={false} />
        <br />
        <Card className={styles.loginCard}>
          <form>
            <TextField
              hintText="Enter Access code"
              floatingLabelText="Access code"
            /><br />
            <TextField
              hintText="Enter Verify code"
              floatingLabelText="Verify code"
              type="password"
            /><br />
            <RaisedButton
              label="Sign in"
              primary
              onClick={() => {
                this.props.history.push(HOME_URL);
              }}
            />
          </form>
        </Card>
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loginpage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(LoginPage);
