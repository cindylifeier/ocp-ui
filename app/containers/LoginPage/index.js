/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppBar, Card, RaisedButton, TextField } from 'material-ui';

import styles from './LoginPage.css';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div className={styles.margin20}>
        <AppBar title="Welcome To Omnibus Care Plan" showMenuIconButton={false} />
        <br />
        <Card className={styles.loginCard}>
          <form >
            <TextField
              hintText="Enter Access code"
              floatingLabelText="Access code"
            /><br />
            <TextField
              hintText="Enter Verify code"
              floatingLabelText="Verify code"
              type="password"
            /><br />
            <RaisedButton label="Sign in" primary onClick={() => { this.props.history.push('/home'); }} />
          </form>
        </Card>
      </div>
    );
  }
}

LoginPage.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.object,
};


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(
  withConnect,
)(LoginPage);
