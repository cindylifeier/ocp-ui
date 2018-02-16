/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppBar, Card, TextField } from 'material-ui';

import styles from './styles.css';
import { HOME_URL } from '../App/constants';
import StyledRaisedButton from '../../components/StyledRaisedButton/index';

const LoginStyledRaisedButton = StyledRaisedButton.extend.attrs({
  backgroundColor: '#006666',
  label: 'Login',
  labelColor: 'white',
  style: {
    width: '70%',
  },
})`
`;

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.margin20}>
        <AppBar
          style={{
            width: '50%',
            margin: '0 auto',
            border: '2px solid #FF9800',
            backgroundColor: '#ffd699',
          }}
          title="Welcome To Omnibus Care Plan"
          showMenuIconButton={false}
        />
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
            <LoginStyledRaisedButton onClick={() => { this.props.history.push(HOME_URL); }}></LoginStyledRaisedButton>
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
