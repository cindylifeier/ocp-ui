/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { TextField } from 'material-ui';
import { Cell, Grid } from 'styled-css-grid';
import { HOME_URL } from '../App/constants';
import StyledRaisedButton from '../../components/StyledRaisedButton/index';
import Card from '../../components/Card/index';

import H2 from '../../components/H2/index';
import H3 from '../../components/H3/index';
import StyledAppBar from '../../components/StyledAppBar/index';

const LoginTitle = H2.extend`
  color: #0b4361;
  font-family: 'Lato Regular', 'Lato', sans-serif;
  text-align: center;
`;

const Hint = H3.extend`
  font-size: 12px;
  font-family: 'Arial Regular', 'Arial', sans-serif;
`;

const LoginStyledRaisedButton = StyledRaisedButton.extend.attrs({
  backgroundColor: '#1ABC9C',
  label: 'Login',
  labelColor: 'white',
  style: {
    width: '256px',
  },
})`
`;

const LoginHeaderStyledAppBar = StyledAppBar.extend.attrs({
  title: 'Welcome To Omnibus Care Plan',
  showMenuIconButton: false,
  style: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#006666',
    width: '100%',
  },
})`
`;

const LoginStyledCard = Card.extend`
  background-color: #f2f2f2;
  min-width: 280px;
  width: 100%;
`;

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Grid
          columns={'repeat(5,1fr)'}
          areas={[
            'header header header header header',
            '. . loginCard . .',
          ]}
        >
          <Cell area="header">
            <LoginHeaderStyledAppBar></LoginHeaderStyledAppBar>
          </Cell>
          <Cell area="loginCard">
            <LoginStyledCard>
              <Grid flow="row" columns={1}>
                <Cell center>
                  <LoginTitle>Login to your account</LoginTitle>
                </Cell>
                <Cell center>
                  <TextField
                    hintText="Enter Access code"
                    floatingLabelText="Access code"
                  />
                </Cell>
                <Cell center>
                  <TextField
                    hintText="Enter Verify code"
                    floatingLabelText="Verify code"
                    type="password"
                  />
                </Cell>
                <Cell center>
                  <Hint>Forgot your username or password</Hint>
                </Cell>
                <Cell center>
                  <LoginStyledRaisedButton onClick={() => { this.props.history.push(HOME_URL); }}></LoginStyledRaisedButton>
                </Cell>
              </Grid>
            </LoginStyledCard>
          </Cell>
        </Grid>
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
